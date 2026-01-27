"""
PDF generation utilities for exporting resume analysis
"""
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.platypus import Image as RLImage
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from datetime import datetime
import io
import json


def generate_resume_analysis_pdf(resume, output_path=None):
    """
    Generate a PDF report of resume analysis
    
    Args:
        resume: Resume model object
        output_path: Path to save PDF (if None, returns BytesIO object)
        
    Returns:
        BytesIO object if output_path is None, else None
    """
    # Create PDF buffer or file
    if output_path:
        pdf_buffer = output_path
    else:
        pdf_buffer = io.BytesIO()
    
    # Create PDF document
    doc = SimpleDocTemplate(pdf_buffer, pagesize=letter,
                           rightMargin=72, leftMargin=72,
                           topMargin=72, bottomMargin=18)
    
    # Container for PDF elements
    elements = []
    
    # Styles
    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#6366f1'),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    heading_style = ParagraphStyle(
        'CustomHeading',
        parent=styles['Heading2'],
        fontSize=16,
        textColor=colors.HexColor('#4f46e5'),
        spaceAfter=12,
        spaceBefore=12
    )
    
    # Title
    title = Paragraph("Resume Analysis Report", title_style)
    elements.append(title)
    elements.append(Spacer(1, 0.2*inch))
    
    # Basic Information
    info_data = [
        ['Filename:', resume.filename],
        ['Upload Date:', resume.upload_date.strftime('%Y-%m-%d %H:%M:%S')],
        ['Overall Score:', f"{resume.score}/100"],
    ]
    
    info_table = Table(info_data, colWidths=[2*inch, 4*inch])
    info_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f3f4f6')),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 10),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('GRID', (0, 0), (-1, -1), 1, colors.grey),
    ]))
    
    elements.append(info_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Score Visualization
    score_heading = Paragraph("Performance Score", heading_style)
    elements.append(score_heading)
    
    score = resume.score
    score_color = colors.green if score >= 70 else (colors.orange if score >= 40 else colors.red)
    
    score_data = [['Category', 'Score']]
    score_data.append(['Overall Resume Quality', f"{score}%"])
    
    score_table = Table(score_data, colWidths=[4*inch, 2*inch])
    score_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6366f1')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 12),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (-1, -1), colors.beige),
        ('TEXTCOLOR', (1, 1), (1, 1), score_color),
        ('FONTNAME', (1, 1), (1, 1), 'Helvetica-Bold'),
        ('FONTSIZE', (1, 1), (1, 1), 14),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    
    elements.append(score_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Skills Section
    skills_heading = Paragraph("Technical Skills", heading_style)
    elements.append(skills_heading)
    
    skills = json.loads(resume.skills) if resume.skills else []
    if skills:
        skills_text = ", ".join(skills)
        skills_para = Paragraph(skills_text, styles['Normal'])
        elements.append(skills_para)
    else:
        elements.append(Paragraph("No technical skills detected", styles['Normal']))
    
    elements.append(Spacer(1, 0.2*inch))
    
    # Experience Section
    experience_heading = Paragraph("Professional Experience", heading_style)
    elements.append(experience_heading)
    
    exp_text = f"{resume.experience_years} years of professional experience"
    elements.append(Paragraph(exp_text, styles['Normal']))
    elements.append(Spacer(1, 0.2*inch))
    
    # Education Section
    education_heading = Paragraph("Education", heading_style)
    elements.append(education_heading)
    
    education = json.loads(resume.education) if resume.education else []
    if education:
        for edu in education:
            elements.append(Paragraph(f"• {edu}", styles['Normal']))
    else:
        elements.append(Paragraph("No education information detected", styles['Normal']))
    
    elements.append(Spacer(1, 0.2*inch))
    
    # Contact Information
    contact_heading = Paragraph("Contact Information", heading_style)
    elements.append(contact_heading)
    
    contact_data = []
    if resume.email:
        contact_data.append(['Email:', resume.email])
    if resume.phone:
        contact_data.append(['Phone:', resume.phone])
    
    if contact_data:
        contact_table = Table(contact_data, colWidths=[1.5*inch, 4.5*inch])
        contact_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f3f4f6')),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 10),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.grey),
        ]))
        elements.append(contact_table)
    else:
        elements.append(Paragraph("No contact information detected", styles['Normal']))
    
    elements.append(Spacer(1, 0.3*inch))
    
    # Footer
    footer_text = f"Generated by AI Resume Analyzer on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    footer = Paragraph(footer_text, ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.grey,
        alignment=TA_CENTER
    ))
    elements.append(footer)
    
    # Build PDF
    doc.build(elements)
    
    if output_path is None:
        pdf_buffer.seek(0)
        return pdf_buffer
    
    return None


def generate_comparison_pdf(resumes, output_path=None):
    """
    Generate a PDF comparison report for multiple resumes
    
    Args:
        resumes: List of Resume model objects
        output_path: Path to save PDF (if None, returns BytesIO object)
        
    Returns:
        BytesIO object if output_path is None, else None
    """
    if output_path:
        pdf_buffer = output_path
    else:
        pdf_buffer = io.BytesIO()
    
    doc = SimpleDocTemplate(pdf_buffer, pagesize=A4,
                           rightMargin=50, leftMargin=50,
                           topMargin=50, bottomMargin=18)
    
    elements = []
    styles = getSampleStyleSheet()
    
    # Title
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.HexColor('#6366f1'),
        spaceAfter=20,
        alignment=TA_CENTER
    )
    
    title = Paragraph("Resume Comparison Report", title_style)
    elements.append(title)
    elements.append(Spacer(1, 0.2*inch))
    
    # Comparison Table
    table_data = [['Metric'] + [f"Resume {i+1}" for i in range(len(resumes))]]
    
    # Filenames
    table_data.append(['Filename'] + [r.filename[:20] for r in resumes])
    
    # Scores
    table_data.append(['Score'] + [f"{r.score}/100" for r in resumes])
    
    # Skills count
    table_data.append(['Skills Count'] + [
        str(len(json.loads(r.skills)) if r.skills else 0) for r in resumes
    ])
    
    # Experience
    table_data.append(['Experience (years)'] + [
        str(r.experience_years) for r in resumes
    ])
    
    # Create table
    col_width = (A4[0] - 100) / (len(resumes) + 1)
    col_widths = [col_width] * (len(resumes) + 1)
    
    comparison_table = Table(table_data, colWidths=col_widths)
    comparison_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#6366f1')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
        ('BACKGROUND', (0, 1), (0, -1), colors.HexColor('#f3f4f6')),
        ('FONTNAME', (0, 1), (0, -1), 'Helvetica-Bold'),
        ('GRID', (0, 0), (-1, -1), 1, colors.black),
    ]))
    
    elements.append(comparison_table)
    elements.append(Spacer(1, 0.3*inch))
    
    # Footer
    footer_text = f"Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    footer = Paragraph(footer_text, ParagraphStyle(
        'Footer',
        parent=styles['Normal'],
        fontSize=8,
        textColor=colors.grey,
        alignment=TA_CENTER
    ))
    elements.append(footer)
    
    doc.build(elements)
    
    if output_path is None:
        pdf_buffer.seek(0)
        return pdf_buffer
    
    return None
