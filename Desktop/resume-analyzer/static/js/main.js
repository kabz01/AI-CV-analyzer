// AI Resume Analyzer - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const uploadBox = document.getElementById('uploadBox');
    const fileInput = document.getElementById('fileInput');
    const progressSection = document.getElementById('progressSection');
    const resultsSection = document.getElementById('resultsSection');
    
    // Check if elements exist
    if (!uploadBox) {
        console.error('Upload box not found');
        return;
    }
    if (!fileInput) {
        console.error('File input not found');
        return;
    }
    
    console.log('Upload elements initialized successfully');
    
    // Click to upload - simplified approach
    uploadBox.addEventListener('click', function() {
        console.log('Upload box clicked - opening file browser');
        fileInput.click();
    });
    
    // Drag and drop handlers
    uploadBox.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = 'var(--primary-color)';
        uploadBox.style.background = 'rgba(99, 102, 241, 0.05)';
    });
    
    uploadBox.addEventListener('dragleave', function() {
        uploadBox.style.borderColor = 'var(--border-color)';
        uploadBox.style.background = 'transparent';
    });
    
    uploadBox.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadBox.style.borderColor = 'var(--border-color)';
        uploadBox.style.background = 'transparent';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    });
    
    // File input change
    fileInput.addEventListener('change', function(e) {
        console.log('File selected');
        if (e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    });
});

function handleFileUpload(file) {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or DOCX file.');
        return;
    }
    
    // Validate file size (16MB)
    if (file.size > 16 * 1024 * 1024) {
        alert('File size must be less than 16MB.');
        return;
    }
    
    // Show progress
    document.querySelector('.upload-section .upload-box').style.display = 'none';
    document.getElementById('progressSection').classList.remove('hidden');
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    // Simulate progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        document.getElementById('progressFill').style.width = progress + '%';
        
        if (progress >= 90) {
            clearInterval(progressInterval);
        }
    }, 200);
    
    // Upload file
    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        clearInterval(progressInterval);
        document.getElementById('progressFill').style.width = '100%';
        
        if (data.success) {
            setTimeout(() => {
                displayResults(data.analysis);
            }, 500);
        } else {
            alert('Error: ' + (data.error || 'Upload failed'));
            resetUpload();
        }
    })
    .catch(error => {
        clearInterval(progressInterval);
        console.error('Error:', error);
        alert('An error occurred during upload. Please try again.');
        resetUpload();
    });
}

function displayResults(analysis) {
    // Hide progress, show results
    document.getElementById('progressSection').classList.add('hidden');
    document.getElementById('resultsSection').classList.remove('hidden');
    
    // Score
    document.getElementById('scoreValue').textContent = analysis.score || 0;
    
    // ATS Score (if element exists)
    const atsScoreElement = document.getElementById('atsScore');
    if (atsScoreElement) {
        atsScoreElement.textContent = analysis.ats_score || 0;
    }
    
    // Personal Information
    const personalInfo = document.getElementById('personalInfo');
    if (personalInfo) {
        personalInfo.textContent = '';

        function appendInfoRow(label, value, isLink = false, prefix = 'https://') {
            if (!value) return;
            const p = document.createElement('p');
            const strong = document.createElement('strong');
            strong.textContent = label + ': ';
            p.appendChild(strong);

            if (isLink) {
                const a = document.createElement('a');
                a.href = prefix + value;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = value;
                p.appendChild(a);
            } else {
                const span = document.createElement('span');
                span.textContent = value;
                p.appendChild(span);
            }
            personalInfo.appendChild(p);
        }

        appendInfoRow('Name', analysis.name);
        appendInfoRow('Location', analysis.location);
        appendInfoRow('Email', analysis.email);
        appendInfoRow('Phone', analysis.phone);
        appendInfoRow('LinkedIn', analysis.linkedin, true);
        appendInfoRow('GitHub', analysis.github, true);
        appendInfoRow('Website', analysis.website, true);

        if (!personalInfo.hasChildNodes()) {
            const p = document.createElement('p');
            p.textContent = 'No personal information found';
            personalInfo.appendChild(p);
        }
    }
    
    // Skills
    const skillsList = document.getElementById('skillsList');
    skillsList.textContent = '';
    if (analysis.skills && analysis.skills.length > 0) {
        analysis.skills.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = skill;
            skillsList.appendChild(tag);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'No technical skills detected';
        skillsList.appendChild(p);
    }
    
    // Soft Skills
    const softSkillsList = document.getElementById('softSkillsList');
    if (softSkillsList) {
        if (analysis.soft_skills && analysis.soft_skills.length > 0) {
            softSkillsList.textContent = '';
            analysis.soft_skills.forEach(skill => {
                const tag = document.createElement('span');
                tag.className = 'tag tag-soft';
                tag.textContent = skill;
                softSkillsList.appendChild(tag);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No soft skills detected. Include skills like leadership, communication, teamwork, etc.';
            softSkillsList.textContent = '';
            softSkillsList.appendChild(p);
        }
    }
    
    // Education
    const educationList = document.getElementById('educationList');
    educationList.textContent = '';
    if (analysis.education && analysis.education.length > 0) {
        analysis.education.forEach(edu => {
            const p = document.createElement('p');
            p.textContent = `• ${edu}`;
            educationList.appendChild(p);
        });
    } else {
        const p = document.createElement('p');
        p.textContent = 'No education information found';
        educationList.appendChild(p);
    }
    
    // Experience
    document.getElementById('experienceYears').textContent = 
        (analysis.experience_years || 0) + ' years';
    
    // Work History
    const workHistoryList = document.getElementById('workHistoryList');
    if (workHistoryList) {
        workHistoryList.textContent = '';
        if (analysis.work_history && analysis.work_history.length > 0) {
            analysis.work_history.forEach(job => {
                const p = document.createElement('p');
                p.textContent = `• ${job}`;
                workHistoryList.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No work history detected. Add job titles to your resume.';
            workHistoryList.appendChild(p);
        }
    }
    
    // Certifications
    const certificationsList = document.getElementById('certificationsList');
    if (certificationsList) {
        certificationsList.textContent = '';
        if (analysis.certifications && analysis.certifications.length > 0) {
            analysis.certifications.forEach(cert => {
                const p = document.createElement('p');
                p.textContent = `• ${cert}`;
                certificationsList.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No certifications detected. Add certifications if you have any.';
            certificationsList.appendChild(p);
        }
    }
    
    // Languages
    const languagesList = document.getElementById('languagesList');
    if (languagesList) {
        languagesList.textContent = '';
        if (analysis.languages && analysis.languages.length > 0) {
            analysis.languages.forEach(lang => {
                const tag = document.createElement('span');
                tag.className = 'tag';
                tag.textContent = lang;
                languagesList.appendChild(tag);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No languages detected. Add a "Languages" section if applicable.';
            languagesList.appendChild(p);
        }
    }
    
    // Projects
    const projectsList = document.getElementById('projectsList');
    if (projectsList) {
        projectsList.textContent = '';
        if (analysis.projects && analysis.projects.length > 0) {
            analysis.projects.forEach(project => {
                const p = document.createElement('p');
                p.textContent = `• ${project}`;
                projectsList.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No projects detected. Add a "Projects" section to showcase your work.';
            projectsList.appendChild(p);
        }
    }
    
    // Achievements
    const achievementsList = document.getElementById('achievementsList');
    if (achievementsList) {
        achievementsList.textContent = '';
        if (analysis.achievements && analysis.achievements.length > 0) {
            analysis.achievements.forEach(achievement => {
                const p = document.createElement('p');
                p.textContent = `✓ ${achievement}`;
                achievementsList.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No achievements detected. Use action words like "achieved", "improved", or "delivered".';
            achievementsList.appendChild(p);
        }
    }
    
    // Recommendations
    const recommendationsList = document.getElementById('recommendationsList');
    if (recommendationsList) {
        recommendationsList.textContent = '';
        if (analysis.recommendations && analysis.recommendations.length > 0) {
            analysis.recommendations.forEach(rec => {
                const p = document.createElement('p');
                p.textContent = `💡 ${rec}`;
                recommendationsList.appendChild(p);
            });
        } else {
            const p = document.createElement('p');
            p.style.color = 'var(--text-secondary)';
            p.textContent = 'No recommendations generated. Your resume looks good!';
            recommendationsList.appendChild(p);
        }
    }
    
    // Contact (fallback for old structure)
    const contactInfo = document.getElementById('contactInfo');
    if (contactInfo) {
        contactInfo.textContent = '';
        if (analysis.email || analysis.phone) {
            if (analysis.email) {
                const p = document.createElement('p');
                p.textContent = `📧 ${analysis.email}`;
                contactInfo.appendChild(p);
            }
            if (analysis.phone) {
                const p = document.createElement('p');
                p.textContent = `📱 ${analysis.phone}`;
                contactInfo.appendChild(p);
            }
        } else {
            contactInfo.textContent = 'No contact information found';
        }
    }
}

function resetUpload() {
    document.querySelector('.upload-section .upload-box').style.display = 'block';
    document.getElementById('progressSection').classList.add('hidden');
    document.getElementById('resultsSection').classList.add('hidden');
    document.getElementById('fileInput').value = '';
    document.getElementById('progressFill').style.width = '0%';
}
