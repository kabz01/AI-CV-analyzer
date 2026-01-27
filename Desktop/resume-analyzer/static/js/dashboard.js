// Dashboard JavaScript

function viewResume(resumeId) {
    fetch(`/api/resumes/${resumeId}`)
        .then(response => response.json())
        .then(data => {
            // Create modal or navigate to detail page
            alert(`Resume Details:\n\nFilename: ${data.filename}\nScore: ${data.score}\nSkills: ${data.skills.join(', ')}\nExperience: ${data.experience_years} years`);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load resume details');
        });
}

function deleteResume(resumeId) {
    if (!confirm('Are you sure you want to delete this resume?')) {
        return;
    }
    
    fetch(`/api/resumes/${resumeId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Resume deleted successfully');
            location.reload();
        } else {
            alert('Failed to delete resume');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while deleting the resume');
    });
}
