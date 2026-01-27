"""
NLP analysis utilities for resume content analysis
Uses regex-based parsing for maximum compatibility
"""
import re
from collections import Counter


# Common technical skills to look for
TECHNICAL_SKILLS = {
    # Programming Languages
    'python', 'java', 'javascript', 'typescript', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin',
    'go', 'rust', 'scala', 'r', 'matlab', 'sql', 'html', 'css',
    
    # Frameworks & Libraries
    'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring', 'asp.net',
    'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy',
    
    # Databases
    'mysql', 'postgresql', 'mongodb', 'redis', 'elasticsearch', 'oracle', 'sqlite', 'dynamodb',
    
    # Cloud & DevOps
    'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'git', 'ci/cd', 'terraform',
    
    # Other Technologies
    'rest', 'api', 'graphql', 'microservices', 'agile', 'scrum', 'machine learning',
    'deep learning', 'nlp', 'computer vision', 'data science', 'big data'
}

# Education keywords
EDUCATION_KEYWORDS = {
    'bachelor', 'master', 'phd', 'diploma', 'degree', 'university', 'college',
    'b.s.', 'm.s.', 'b.a.', 'm.a.', 'mba', 'certification'
}


def analyze_resume_content(text):
    """
    Analyze resume content using regex-based NLP
    
    Args:
        text (str): Resume text content
        
    Returns:
        dict: Analysis results including skills, experience, education, contact info, and score
    """
    analysis = {
        'skills': extract_skills(text),
        'experience_years': estimate_experience_years(text),
        'education': extract_education(text),
        'email': extract_email(text),
        'phone': extract_phone(text),
        'name': extract_name(text),
        'location': extract_location(text),
        'linkedin': extract_linkedin(text),
        'github': extract_github(text),
        'website': extract_website(text),
        'certifications': extract_certifications(text),
        'languages': extract_languages(text),
        'work_history': extract_work_history(text),
        'projects': extract_projects(text),
        'achievements': extract_achievements(text),
        'soft_skills': extract_soft_skills(text),
        'job_titles': extract_job_titles(text),
        'companies': extract_companies(text),
        'recommendations': generate_recommendations(text),
        'ats_score': calculate_ats_score(text),
        'keyword_density': analyze_keyword_density(text),
        'score': 0.0
    }
    
    # Calculate overall score
    analysis['score'] = calculate_resume_score(analysis)
    
    return analysis


def extract_skills(text):
    """
    Extract technical skills from resume text using pattern matching
    
    Args:
        text (str): Resume text
        
    Returns:
        list: List of identified skills
    """
    text_lower = text.lower()
    found_skills = set()
    
    # Check for technical skills with word boundaries to avoid partial matches
    for skill in TECHNICAL_SKILLS:
        # Use word boundaries for exact matches
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text_lower):
            found_skills.add(skill.title())
    
    return sorted(list(found_skills))


def estimate_experience_years(text):
    """
    Estimate years of experience from resume
    
    Args:
        text (str): Resume text
        
    Returns:
        float: Estimated years of experience
    """
    # Look for explicit year mentions
    year_patterns = [
        r'(\d+)\+?\s*years?\s+(?:of\s+)?experience',
        r'experience\s+(?:of\s+)?(\d+)\+?\s*years?',
        r'(\d+)\+?\s*yrs?\s+(?:of\s+)?experience'
    ]
    
    years = []
    for pattern in year_patterns:
        matches = re.findall(pattern, text.lower())
        years.extend([int(m) for m in matches])
    
    if years:
        return max(years)
    
    # Look for date ranges (e.g., 2018-2023)
    date_pattern = r'(19|20)\d{2}\s*[-–—]\s*(19|20)\d{2}|present'
    date_matches = re.findall(r'(19|20)\d{2}', text)
    
    if date_matches:
        years_list = [int(y) for y in date_matches]
        if years_list:
            min_year = min(years_list)
            max_year = 2026  # Current year
            estimated_years = max_year - min_year
            return min(estimated_years, 30)  # Cap at 30 years
    
    return 0.0


def extract_education(text):
    """
    Extract education information from resume
    
    Args:
        text (str): Resume text
        
    Returns:
        list: List of education entries
    """
    education_list = []
    text_lower = text.lower()
    
    # Look for degree types
    degree_patterns = [
        r'(bachelor|master|phd|doctorate|associate|diploma|b\.s\.|m\.s\.|b\.a\.|m\.a\.|mba)[\s\w]*',
        r'degree\s+in\s+[\w\s]+',
        r'(b\.tech|m\.tech|b\.e\.|m\.e\.)[\s\w]*'
    ]
    
    for pattern in degree_patterns:
        matches = re.finditer(pattern, text_lower)
        for match in matches:
            education_entry = match.group(0).strip()
            if len(education_entry) > 3:
                education_list.append(education_entry.title())
    
    return list(set(education_list))[:5]  # Return unique entries, max 5


def extract_email(text):
    """
    Extract email address from resume
    
    Args:
        text (str): Resume text
        
    Returns:
        str or None: Email address if found
    """
    email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    matches = re.findall(email_pattern, text)
    return matches[0] if matches else None


def extract_phone(text):
    """
    Extract phone number from resume
    
    Args:
        text (str): Resume text
        
    Returns:
        str or None: Phone number if found
    """
    phone_patterns = [
        r'\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}',
        r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
    ]
    
    for pattern in phone_patterns:
        matches = re.findall(pattern, text)
        if matches:
            return matches[0]
    
    return None




def extract_name(text):
    """Extract name from resume (usually first line)"""
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    if lines:
        # Typically name is in the first few lines
        first_line = lines[0]
        # Check if it looks like a name (2-4 words, mostly letters)
        words = first_line.split()
        if 2 <= len(words) <= 4 and all(word.replace('.', '').isalpha() for word in words):
            return first_line
    return None


def extract_location(text):
    """Extract location/address from resume"""
    location_patterns = [
        r'(?:location|address|based in)[\s:]+([^,\n]+(?:,\s*[^,\n]+)*)',
        r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z]{2}(?:\s+\d{5})?)\b',
        r'\b([A-Z][a-z]+,\s*[A-Z][a-z]+)\b'
    ]
    
    for pattern in location_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        if matches:
            return matches[0].strip()
    return None


def extract_linkedin(text):
    """Extract LinkedIn profile URL"""
    linkedin_pattern = r'(?:linkedin\.com/in/|linkedin\.com/pub/)([a-zA-Z0-9-]+)'
    matches = re.findall(linkedin_pattern, text.lower())
    if matches:
        return f"linkedin.com/in/{matches[0]}"
    return None


def extract_github(text):
    """Extract GitHub profile URL"""
    github_pattern = r'(?:github\.com/)([a-zA-Z0-9-]+)'
    matches = re.findall(github_pattern, text.lower())
    if matches:
        return f"github.com/{matches[0]}"
    return None


def extract_website(text):
    """Extract personal website/portfolio URL"""
    website_patterns = [
        r'(?:portfolio|website|blog)[\s:]+([a-zA-Z0-9.-]+\.[a-z]{2,})',
        r'((?:www\.)?[a-zA-Z0-9-]+\.(?:com|net|org|io|dev|me))'
    ]
    
    for pattern in website_patterns:
        matches = re.findall(pattern, text.lower())
        if matches:
            site = matches[0]
            # Filter out linkedin, github, email domains
            if not any(x in site for x in ['linkedin', 'github', 'gmail', 'yahoo', 'outlook']):
                return site
    return None


def extract_certifications(text):
    """Extract certifications from resume"""
    cert_keywords = [
        'aws certified', 'azure certified', 'google cloud', 'pmp', 'cissp',
        'comptia', 'certified', 'certification', 'certificate',
        'professional certification', 'accreditation'
    ]
    
    certifications = []
    text_lower = text.lower()
    lines = text.split('\n')
    
    for i, line in enumerate(lines):
        line_lower = line.lower()
        if any(keyword in line_lower for keyword in cert_keywords):
            # Get the certification line
            cert = line.strip()
            if 5 < len(cert) < 100:  # Reasonable length
                certifications.append(cert)
    
    return list(set(certifications))[:10]


def extract_languages(text):
    """Extract spoken/programming languages"""
    common_languages = {
        'english', 'spanish', 'french', 'german', 'chinese', 'japanese',
        'korean', 'arabic', 'hindi', 'portuguese', 'russian', 'italian'
    }
    
    found_languages = []
    text_lower = text.lower()
    
    # Look for language section
    language_section_pattern = r'(?:languages?|linguistic)[\s:]+([^\n]+(?:\n[^\n]+){0,5})'
    matches = re.findall(language_section_pattern, text_lower)
    
    if matches:
        section_text = ' '.join(matches)
        for lang in common_languages:
            if lang in section_text:
                found_languages.append(lang.title())
    
    return found_languages


def extract_work_history(text):
    """Extract work history/job positions"""
    job_history = []
    
    # Look for common job title indicators
    experience_patterns = [
        r'((?:senior|junior|lead|principal|staff)?\s*(?:software|data|machine learning|full[\s-]?stack|front[\s-]?end|back[\s-]?end|devops|cloud|mobile|web)?\s*(?:engineer|developer|architect|analyst|scientist|manager|designer|specialist|consultant))',
        r'((?:chief|director|head|vp|vice president)\s+(?:of|for)?\s+[\w\s]+)',
    ]
    
    for pattern in experience_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        job_history.extend([m.strip().title() for m in matches if len(m.strip()) > 5])
    
    # Remove duplicates while preserving order
    seen = set()
    unique_jobs = []
    for job in job_history:
        if job.lower() not in seen:
            seen.add(job.lower())
            unique_jobs.append(job)
    
    return unique_jobs[:10]


def extract_projects(text):
    """Extract project descriptions"""
    projects = []
    
    # Look for project section indicators
    project_indicators = ['projects', 'personal projects', 'key projects', 'portfolio']
    lines = text.split('\n')
    
    in_project_section = False
    for line in lines:
        line_lower = line.lower().strip()
        
        # Check if we're entering project section
        if any(indicator in line_lower for indicator in project_indicators):
            in_project_section = True
            continue
        
        # Stop at next major section
        if in_project_section and any(section in line_lower for section in ['experience', 'education', 'skills', 'certification']):
            break
        
        # Extract project lines
        if in_project_section and line.strip() and len(line.strip()) > 20:
            projects.append(line.strip()[:200])  # Limit length
            
            if len(projects) >= 5:  # Max 5 projects
                break
    
    return projects


def extract_achievements(text):
    """Extract achievements and accomplishments"""
    achievements = []
    
    # Look for achievement indicators
    achievement_patterns = [
        r'(?:achieved|accomplished|improved|increased|decreased|reduced|delivered|led|managed|developed)\s+([^.!?\n]{20,150})',
        r'(?:awarded|recognized|honored|certified)\s+([^.!?\n]{10,100})'
    ]
    
    for pattern in achievement_patterns:
        matches = re.findall(pattern, text, re.IGNORECASE)
        achievements.extend([m.strip() for m in matches])
    
    return list(set(achievements))[:10]


def extract_soft_skills(text):
    """Extract soft skills from resume"""
    soft_skill_keywords = {
        'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking',
        'time management', 'adaptability', 'creativity', 'collaboration', 'interpersonal',
        'analytical', 'decision making', 'conflict resolution', 'negotiation', 'mentoring',
        'public speaking', 'presentation', 'project management', 'strategic thinking'
    }
    
    found_skills = []
    text_lower = text.lower()
    
    for skill in soft_skill_keywords:
        if skill in text_lower:
            found_skills.append(skill.title())
    
    return found_skills


def extract_job_titles(text):
    """Extract job titles from resume"""
    # This is similar to work_history but focuses on title extraction
    return extract_work_history(text)


def extract_companies(text):
    """Extract company names from resume"""
    companies = []
    
    # Look for common company patterns (names before job titles or dates)
    # This is a simplified approach - can be enhanced with company database
    company_indicators = ['inc.', 'llc', 'corp', 'corporation', 'ltd', 'limited', 'co.', 'company']
    
    lines = text.split('\n')
    for line in lines:
        line_lower = line.lower()
        if any(indicator in line_lower for indicator in company_indicators):
            # Extract potential company name
            company = line.strip()
            if 3 < len(company) < 100:
                companies.append(company)
    
    return list(set(companies))[:10]


def generate_recommendations(text):
    """Generate personalized recommendations for resume improvement"""
    recommendations = []
    analysis_text = text.lower()
    
    # Check for missing elements
    if not extract_email(text):
        recommendations.append("Add an email address for better contact visibility")
    
    if not extract_phone(text):
        recommendations.append("Include a phone number to improve reachability")
    
    if not extract_linkedin(text):
        recommendations.append("Add your LinkedIn profile URL to showcase your professional network")
    
    if len(extract_skills(text)) < 5:
        recommendations.append("List more relevant technical skills to match job requirements")
    
    if len(extract_certifications(text)) == 0:
        recommendations.append("Include relevant certifications to boost your credibility")
    
    if 'achieved' not in analysis_text and 'accomplished' not in analysis_text:
        recommendations.append("Use action words like 'achieved', 'improved', or 'delivered' to highlight impact")
    
    if len(extract_projects(text)) < 2:
        recommendations.append("Add more projects to demonstrate practical experience")
    
    # Check for quantifiable metrics
    if not re.search(r'\d+%', text):
        recommendations.append("Include quantifiable achievements (e.g., 'increased revenue by 30%')")
    
    if len(text.split()) < 200:
        recommendations.append("Expand your resume with more detailed descriptions of your experience")
    elif len(text.split()) > 800:
        recommendations.append("Consider condensing your resume to 1-2 pages for better readability")
    
    return recommendations


def calculate_ats_score(text):
    """Calculate ATS (Applicant Tracking System) compatibility score"""
    score = 0
    max_score = 100
    
    # Contact information (20 points)
    if extract_email(text): score += 10
    if extract_phone(text): score += 10
    
    # Skills section (30 points)
    skills_count = len(extract_skills(text))
    score += min(skills_count * 3, 30)
    
    # Experience quantification (20 points)
    numbers_count = len(re.findall(r'\d+[%+]?', text))
    score += min(numbers_count * 2, 20)
    
    # Keywords usage (15 points)
    keyword_score = min(len(extract_soft_skills(text)) * 3, 15)
    score += keyword_score
    
    # Structure indicators (15 points)
    sections = sum([
        'experience' in text.lower(),
        'education' in text.lower(),
        'skills' in text.lower(),
    ]) * 5
    score += sections
    
    return round(min(score, max_score), 2)


def analyze_keyword_density(text):
    """Analyze keyword density for common job search terms"""
    words = text.lower().split()
    total_words = len(words)
    
    if total_words == 0:
        return {}
    
    # Count skill occurrences
    keyword_counts = {}
    for skill in TECHNICAL_SKILLS:
        count = len(re.findall(r'\b' + re.escape(skill) + r'\b', text.lower()))
        if count > 0:
            keyword_counts[skill] = {
                'count': count,
                'density': round((count / total_words) * 100, 2)
            }
    
    # Return top 10 keywords by count
    sorted_keywords = dict(sorted(keyword_counts.items(), key=lambda x: x[1]['count'], reverse=True)[:10])
    return sorted_keywords


def calculate_resume_score(analysis):
    """
    Calculate overall resume score based on various factors
    
    Args:
        analysis (dict): Resume analysis results
        
    Returns:
        float: Score between 0 and 100
    """
    score = 0.0
    
    # Skills (25 points max)
    skill_count = len(analysis.get('skills', []))
    score += min(skill_count * 2.5, 25)
    
    # Experience (20 points max)
    experience = analysis.get('experience_years', 0)
    score += min(experience * 2, 20)
    
    # Education (15 points max)
    education_count = len(analysis.get('education', []))
    score += min(education_count * 5, 15)
    
    # Contact info (10 points max)
    contact_score = 0
    if analysis.get('email'): contact_score += 3
    if analysis.get('phone'): contact_score += 3
    if analysis.get('linkedin'): contact_score += 2
    if analysis.get('github'): contact_score += 2
    score += contact_score
    
    # Certifications (10 points max)
    cert_count = len(analysis.get('certifications', []))
    score += min(cert_count * 2, 10)
    
    # Projects (10 points max)
    project_count = len(analysis.get('projects', []))
    score += min(project_count * 2, 10)
    
    # Soft skills (5 points max)
    soft_skill_count = len(analysis.get('soft_skills', []))
    score += min(soft_skill_count * 0.5, 5)
    
    # Achievements (5 points max)
    achievement_count = len(analysis.get('achievements', []))
    score += min(achievement_count * 1, 5)
    
    return round(min(score, 100), 2)
