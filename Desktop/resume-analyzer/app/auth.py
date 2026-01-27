"""
Authentication routes for Resume Analyzer
"""
from flask import Blueprint, request, jsonify, render_template, redirect, url_for, flash
from flask_login import login_user, logout_user, login_required, current_user
from datetime import datetime
from app import db
from models.user import User

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    """User login"""
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        username = data.get('username')
        password = data.get('password')
        remember = data.get('remember', False)
        
        user = User.query.filter_by(username=username).first()
        
        if user and user.check_password(password):
            login_user(user, remember=remember)
            user.last_login = datetime.utcnow()
            db.session.commit()
            
            if request.is_json:
                return jsonify({
                    'success': True,
                    'message': 'Login successful',
                    'user': user.to_dict()
                }), 200
            
            next_page = request.args.get('next')
            return redirect(next_page if next_page else url_for('main.index'))
        
        if request.is_json:
            return jsonify({'error': 'Invalid username or password'}), 401
        
        flash('Invalid username or password', 'error')
        return redirect(url_for('auth.login'))
    
    return render_template('login.html')


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    """User registration"""
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('first_name')
        last_name = data.get('last_name')
        
        # Validation
        if not username or not email or not password:
            error = 'Username, email, and password are required'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.register'))
        
        # Check if user already exists
        if User.query.filter_by(username=username).first():
            error = 'Username already exists'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.register'))
        
        if User.query.filter_by(email=email).first():
            error = 'Email already registered'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.register'))
        
        # Create new user
        user = User(
            username=username,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        if request.is_json:
            return jsonify({
                'success': True,
                'message': 'Registration successful',
                'user': user.to_dict()
            }), 201
        
        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('register.html')


@auth_bp.route('/logout')
@login_required
def logout():
    """User logout"""
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('auth.login'))


@auth_bp.route('/profile')
@login_required
def profile():
    """User profile page"""
    return render_template('profile.html', user=current_user)


@auth_bp.route('/update-theme', methods=['POST'])
@login_required
def update_theme():
    """Update user theme preference"""
    data = request.get_json()
    theme = data.get('theme', 'light')
    
    if theme not in ['light', 'dark']:
        return jsonify({'error': 'Invalid theme'}), 400
    
    current_user.theme_preference = theme
    db.session.commit()
    
    return jsonify({
        'success': True,
        'theme': theme
    }), 200


@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    """Request password reset"""
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        email = data.get('email')
        
        if not email:
            error = 'Email is required'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.forgot_password'))
        
        user = User.query.filter_by(email=email).first()
        
        if user:
            # Generate reset token
            token = user.generate_reset_token()
            db.session.commit()
            
            # In a real application, you would send this via email
            # For now, we'll just show it in the flash message
            reset_url = url_for('auth.reset_password', token=token, _external=True)
            
            if request.is_json:
                return jsonify({
                    'success': True,
                    'message': 'Password reset link generated',
                    'reset_url': reset_url  # In production, send this via email
                }), 200
            
            flash(f'Password reset link: {reset_url}', 'info')
            flash('Copy this link to reset your password (in production, this would be emailed)', 'warning')
        else:
            # Don't reveal that the email doesn't exist for security
            if request.is_json:
                return jsonify({
                    'success': True,
                    'message': 'If the email exists, a reset link has been sent'
                }), 200
            flash('If the email exists, a reset link has been generated', 'info')
        
        return redirect(url_for('auth.login'))
    
    return render_template('forgot_password.html')


@auth_bp.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    """Reset password using token"""
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    # Find user with this token
    user = User.query.filter_by(reset_token=token).first()
    
    if not user or not user.verify_reset_token(token):
        flash('Invalid or expired reset link', 'error')
        return redirect(url_for('auth.forgot_password'))
    
    if request.method == 'POST':
        data = request.get_json() if request.is_json else request.form
        new_password = data.get('password')
        confirm_password = data.get('confirm_password')
        
        if not new_password or not confirm_password:
            error = 'Both password fields are required'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.reset_password', token=token))
        
        if new_password != confirm_password:
            error = 'Passwords do not match'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.reset_password', token=token))
        
        if len(new_password) < 6:
            error = 'Password must be at least 6 characters long'
            if request.is_json:
                return jsonify({'error': error}), 400
            flash(error, 'error')
            return redirect(url_for('auth.reset_password', token=token))
        
        # Reset the password
        user.reset_password(new_password)
        db.session.commit()
        
        if request.is_json:
            return jsonify({
                'success': True,
                'message': 'Password reset successful'
            }), 200
        
        flash('Your password has been reset! You can now log in.', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('reset_password.html', token=token)
