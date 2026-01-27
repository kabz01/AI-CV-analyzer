// Chart.js Visualizations for Resume Analyzer

// Chart configuration defaults
Chart.defaults.font.family = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
Chart.defaults.color = '#475569';
Chart.defaults.plugins.legend.display = true;
Chart.defaults.plugins.legend.position = 'bottom';

// Color schemes
const colorSchemes = {
    primary: {
        bg: 'rgba(37, 99, 235, 0.8)',
        border: 'rgba(37, 99, 235, 1)',
        hover: 'rgba(37, 99, 235, 0.9)'
    },
    success: {
        bg: 'rgba(16, 185, 129, 0.8)',
        border: 'rgba(16, 185, 129, 1)',
        hover: 'rgba(16, 185, 129, 0.9)'
    },
    warning: {
        bg: 'rgba(245, 158, 11, 0.8)',
        border: 'rgba(245, 158, 11, 1)',
        hover: 'rgba(245, 158, 11, 0.9)'
    },
    teal: {
        bg: 'rgba(20, 184, 166, 0.8)',
        border: 'rgba(20, 184, 166, 1)',
        hover: 'rgba(20, 184, 166, 0.9)'
    },
    gradient: [
        'rgba(37, 99, 235, 0.8)',
        'rgba(20, 184, 166, 0.8)',
        'rgba(99, 102, 241, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)'
    ]
};

// 1. SKILLS CHART - Doughnut chart for skills distribution
window.createSkillsChart = function(canvasId, skills) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const skillNames = skills.map(s => s.name || s);
    const skillLevels = skills.map(s => s.level || Math.floor(Math.random() * 50) + 50);
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: skillNames,
            datasets: [{
                data: skillLevels,
                backgroundColor: colorSchemes.gradient,
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Skills Distribution',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1500
            }
        }
    });
};

// 2. EXPERIENCE TIMELINE - Bar chart for experience over time
window.createExperienceChart = function(canvasId, years, counts) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Years of Experience',
                data: counts,
                backgroundColor: colorSchemes.primary.bg,
                borderColor: colorSchemes.primary.border,
                borderWidth: 2,
                borderRadius: 8,
                hoverBackgroundColor: colorSchemes.primary.hover
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Experience Timeline',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    display: false
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
};

// 3. RESUME SCORE - Radial/Gauge chart for overall score
window.createScoreGauge = function(canvasId, score) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    const scorePercentage = (score / 100) * 100;
    const remaining = 100 - scorePercentage;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [scorePercentage, remaining],
                backgroundColor: [
                    scorePercentage >= 80 ? colorSchemes.success.bg :
                    scorePercentage >= 60 ? colorSchemes.primary.bg :
                    colorSchemes.warning.bg,
                    'rgba(241, 245, 249, 0.5)'
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeInOutQuart'
            }
        },
        plugins: [{
            id: 'gaugeText',
            beforeDraw: (chart) => {
                const { width, height, ctx } = chart;
                ctx.restore();
                
                const fontSize = (height / 100).toFixed(2);
                ctx.font = `bold ${fontSize * 2}em Inter, sans-serif`;
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#0f172a';
                
                const text = Math.round(score);
                const textX = Math.round((width - ctx.measureText(text).width) / 2);
                const textY = height / 1.8;
                
                ctx.fillText(text, textX, textY);
                
                ctx.font = `${fontSize}em Inter, sans-serif`;
                ctx.fillStyle = '#64748b';
                const subText = '/ 100';
                const subTextX = Math.round((width - ctx.measureText(subText).width) / 2);
                ctx.fillText(subText, subTextX, textY + 25);
                
                ctx.save();
            }
        }]
    });
};

// 4. COMPARISON CHART - Radar chart for comparing resumes
window.createComparisonChart = function(canvasId, categories, resume1Data, resume2Data) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categories,
            datasets: [
                {
                    label: 'Resume 1',
                    data: resume1Data,
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    borderColor: colorSchemes.primary.border,
                    borderWidth: 2,
                    pointBackgroundColor: colorSchemes.primary.border,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colorSchemes.primary.border
                },
                {
                    label: 'Resume 2',
                    data: resume2Data,
                    backgroundColor: 'rgba(20, 184, 166, 0.2)',
                    borderColor: colorSchemes.teal.border,
                    borderWidth: 2,
                    pointBackgroundColor: colorSchemes.teal.border,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colorSchemes.teal.border
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 20
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Resume Comparison',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            animation: {
                duration: 1500
            }
        }
    });
};

// 5. TREND CHART - Line chart for analysis trends
window.createTrendChart = function(canvasId, dates, scores) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Score Trend',
                data: scores,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderColor: colorSchemes.primary.border,
                borderWidth: 3,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: colorSchemes.primary.border,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Score Progress Over Time',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    display: false
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
};

// 6. CATEGORY BREAKDOWN - Horizontal bar chart
window.createCategoryChart = function(canvasId, categories, scores) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: categories,
            datasets: [{
                label: 'Score',
                data: scores,
                backgroundColor: colorSchemes.gradient,
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Score Breakdown by Category',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    padding: 20
                },
                legend: {
                    display: false
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
};

// 7. INITIALIZE DEFAULT CHARTS ON PAGE LOAD
document.addEventListener('DOMContentLoaded', function() {
    // Example: Create a demo chart if element exists
    if (document.getElementById('skillsChart')) {
        createSkillsChart('skillsChart', [
            { name: 'JavaScript', level: 85 },
            { name: 'Python', level: 90 },
            { name: 'React', level: 75 },
            { name: 'Node.js', level: 80 },
            { name: 'SQL', level: 70 }
        ]);
    }
    
    console.log('📊 Chart.js visualizations loaded successfully!');
});

// Helper function to generate random data for demos
window.generateRandomData = function(count, min = 0, max = 100) {
    return Array.from({ length: count }, () => 
        Math.floor(Math.random() * (max - min + 1)) + min
    );
};
