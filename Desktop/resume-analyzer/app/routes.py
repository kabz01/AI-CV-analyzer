"""
Application routes for Resume Analyzer
"""
from flask import Blueprint, request, jsonify, render_template, send_file, current_app, flash, redirect, url_for
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
import os
import json
from app import db, limiter
from models.resume import Resume
from utils.file_processor import process_uploaded_file
from utils.nlp_analyzer import analyze_resume_content
from utils.pdf_generator import generate_resume_analysis_pdf, generate_comparison_pdf

# Create blueprints
main_bp = Blueprint('main', __name__)
api_bp = Blueprint('api', __name__)


@main_bp.route('/')
def index():
    """Render the main page"""
    theme = current_user.theme_preference if current_user.is_authenticated else 'light'
    return render_template('index.html', theme=theme)


@main_bp.route('/dashboard')
@login_required
def dashboard():
    """Render the dashboard page"""
    resumes = Resume.query.filter_by(user_id=current_user.id).order_by(Resume.upload_date.desc()).all()
    theme = current_user.theme_preference
    return render_template('dashboard.html', resumes=resumes, theme=theme)


@main_bp.route('/compare')
@login_required
def compare():
    """Resume comparison page"""
    resumes = Resume.query.filter_by(user_id=current_user.id).order_by(Resume.upload_date.desc()).all()
    theme = current_user.theme_preference
    return render_template('compare.html', resumes=resumes, theme=theme)


@api_bp.route('/upload', methods=['POST'])
@limiter.limit("100 per hour")
@login_required
def upload_resume():
    """
    Upload and analyze a resume
    
    Returns:
        JSON response with analysis results
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Only PDF and DOCX allowed'}), 400
    
    try:
        # Save file
        filename = secure_filename(file.filename)
        upload_folder = current_app.config['UPLOAD_FOLDER']
        os.makedirs(upload_folder, exist_ok=True)
        filepath = os.path.join(upload_folder, filename)
        file.save(filepath)
        
        # Process file and extract text
        text_content = process_uploaded_file(filepath)
        
        # Analyze content using NLP
        analysis_results = analyze_resume_content(text_content)
        
        # Save to database (convert lists to JSON strings)
        resume = Resume(
            user_id=current_user.id,
            filename=filename,
            filepath=filepath,
            text_content=text_content,
            skills=json.dumps(analysis_results.get('skills', [])),
            experience_years=analysis_results.get('experience_years', 0),
            education=json.dumps(analysis_results.get('education', [])),
            email=analysis_results.get('email'),
            phone=analysis_results.get('phone'),
            score=analysis_results.get('score', 0),
            name=analysis_results.get('name'),
            location=analysis_results.get('location'),
            linkedin=analysis_results.get('linkedin'),
            github=analysis_results.get('github'),
            website=analysis_results.get('website'),
            certifications=json.dumps(analysis_results.get('certifications', [])),
            languages=json.dumps(analysis_results.get('languages', [])),
            work_history=json.dumps(analysis_results.get('work_history', [])),
            projects=json.dumps(analysis_results.get('projects', [])),
            achievements=json.dumps(analysis_results.get('achievements', [])),
            soft_skills=json.dumps(analysis_results.get('soft_skills', [])),
            job_titles=json.dumps(analysis_results.get('job_titles', [])),
            companies=json.dumps(analysis_results.get('companies', [])),
            recommendations=json.dumps(analysis_results.get('recommendations', [])),
            ats_score=analysis_results.get('ats_score', 0),
            keyword_density=json.dumps(analysis_results.get('keyword_density', {}))
        )
        db.session.add(resume)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'resume_id': resume.id,
            'analysis': analysis_results
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_bp.route('/resumes', methods=['GET'])
@limiter.limit("100 per hour")
@login_required
def get_resumes():
    """Get all resumes for current user"""
    resumes = Resume.query.filter_by(user_id=current_user.id).order_by(Resume.upload_date.desc()).all()
    return jsonify([resume.to_dict() for resume in resumes]), 200


@api_bp.route('/resumes/<int:resume_id>', methods=['GET'])
@limiter.limit("100 per hour")
@login_required
def get_resume(resume_id):
    """Get a specific resume by ID"""
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user.id).first_or_404()
    return jsonify(resume.to_dict()), 200


@api_bp.route('/resumes/<int:resume_id>', methods=['DELETE'])
@limiter.limit("100 per hour")
@login_required
def delete_resume(resume_id):
    """Delete a resume"""
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user.id).first_or_404()
    
    # Delete file from filesystem
    if os.path.exists(resume.filepath):
        os.remove(resume.filepath)
    
    db.session.delete(resume)
    db.session.commit()
    
    return jsonify({'success': True, 'message': 'Resume deleted'}), 200


@api_bp.route('/resumes/<int:resume_id>/export', methods=['GET'])
@limiter.limit("100 per hour")
@login_required
def export_resume(resume_id):
    """Export resume analysis as PDF"""
    resume = Resume.query.filter_by(id=resume_id, user_id=current_user.id).first_or_404()
    
    try:
        pdf_buffer = generate_resume_analysis_pdf(resume)
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'resume_analysis_{resume.id}.pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@api_bp.route('/compare/export', methods=['POST'])
@limiter.limit("100 per hour")
@login_required
def export_comparison():
    """Export resume comparison as PDF"""
    data = request.get_json()
    resume_ids = data.get('resume_ids', [])
    
    if not resume_ids or len(resume_ids) < 2:
        return jsonify({'error': 'Please select at least 2 resumes to compare'}), 400
    
    resumes = Resume.query.filter(
        Resume.id.in_(resume_ids),
        Resume.user_id == current_user.id
    ).all()
    
    if len(resumes) < 2:
        return jsonify({'error': 'Invalid resume selection'}), 400
    
    try:
        pdf_buffer = generate_comparison_pdf(resumes)
        return send_file(
            pdf_buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name='resume_comparison.pdf'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def allowed_file(filename):
    """Check if file extension is allowed"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ['pdf', 'docx', 'doc']
