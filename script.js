// Configuration - Update these with your GitHub username and details
const GITHUB_USERNAME = 'Burhanmustafa'; // Replace with your GitHub username
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

// Project Media Mapping - Add screenshots and demo videos for your projects
const PROJECT_MEDIA = {
    'visual-globe': {
        screenshot: 'screenshots/GlobeDark1.png',
        youtubeId: 'MlvU9fGwL4U',
        description: 'Interactive 3D Globe Visualization built with Three.js, WebGL, and JavaScript. Features real-time data mapping, dynamic country highlighting, and smooth orbital controls with performance-optimized rendering.'
    },
    'india-pak-news': {
        screenshot: 'screenshots/IndoPakNewsSS1.png',
        youtubeId: 'M4Zq5vU7XXc',
        description: 'AI-Powered News Analysis Dashboard using Python, NLP libraries (NLTK, spaCy), web scraping with BeautifulSoup, and data visualization with Plotly. Analyzes sentiment and trends in India-Pakistan news coverage.'
    },
    'UniGuard-AI': {
        screenshot: 'screenshots/UniGuard1.png',
        description: 'Full-Stack AI Student Burnout Risk Predictor built with React frontend, Flask backend, Python ML models (scikit-learn, pandas), and MongoDB. Features predictive analytics, real-time risk assessment, and interactive dashboards for university mental health support.'
    },
    'UniGuard': {
        screenshot: 'screenshots/UniGuard1.png',
        description: 'Comprehensive University Security Mobile App built with React Native, Firebase, Node.js backend, and MongoDB. Features real-time incident reporting, emergency alerts, campus safety mapping, and admin dashboard.'
    },
    'uniguard': {
        screenshot: 'screenshots/UniGuard1.png',
        description: 'Comprehensive University Security Mobile App built with React Native, Firebase, Node.js backend, and MongoDB. Features real-time incident reporting, emergency alerts, campus safety mapping, and admin dashboard.'
    }
    // Add more projects here as needed:
    // 'project-name': {
    //     screenshot: 'screenshots/project-name.png',
    //     youtubeId: 'YOUTUBE_VIDEO_ID', // Optional
    //     description: 'Project description with tech stack' // Optional override
    // }
};

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// GitHub API Functions
async function fetchGitHubData() {
    try {
        // Fetch user data
        const userResponse = await fetch(GITHUB_API_URL);
        const userData = await userResponse.json();
        
        // Fetch repositories
        const reposResponse = await fetch(`${GITHUB_API_URL}/repos?sort=updated&per_page=50`);
        const reposData = await reposResponse.json();
        
        // Update user stats
        updateUserStats(userData);
        
        // Display projects
        displayProjects(reposData);
        
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        showErrorMessage();
    }
}

function updateUserStats(userData) {
    document.getElementById('repoCount').textContent = userData.public_repos || 0;
    document.getElementById('followers').textContent = userData.followers || 0;
    document.getElementById('following').textContent = userData.following || 0;
}

function displayProjects(repos) {
    const projectsGrid = document.getElementById('projectsGrid');
    
    // Filter out forks and sort by stars and last updated
    const filteredRepos = repos
        .filter(repo => !repo.fork && repo.description) // Remove forks and repos without description
        .sort((a, b) => {
            // Sort by stars first, then by updated date
            if (b.stargazers_count !== a.stargazers_count) {
                return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at) - new Date(a.updated_at);
        })
        .slice(0, 12); // Show top 12 projects

    if (filteredRepos.length === 0) {
        projectsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-circle"></i>
                <p>No projects found. Update the GITHUB_USERNAME in script.js</p>
            </div>
        `;
        return;
    }

    // Generate project cards
    const projectCards = filteredRepos.map(repo => createProjectCard(repo)).join('');
    projectsGrid.innerHTML = projectCards;

    // Initialize project filtering
    initializeProjectFilters();
}

function createProjectCard(repo) {
    const languages = getMainLanguages(repo.language);
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    const projectMedia = PROJECT_MEDIA[repo.name];
    
    // Use custom description if available, otherwise use repo description
    const description = projectMedia?.description || repo.description || 'No description available';
    
    // Create media section HTML
    let mediaSection = '';
    if (projectMedia) {
        if (projectMedia.youtubeId && projectMedia.youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID') {
            // YouTube video embed
            mediaSection = `
                <div class="project-media">
                    <div class="video-container">
                        <iframe 
                            src="https://www.youtube.com/embed/${projectMedia.youtubeId}" 
                            frameborder="0" 
                            allowfullscreen
                            title="${repo.name} Demo Video">
                        </iframe>
                    </div>
                </div>
            `;
        } else if (projectMedia.screenshot) {
            // Screenshot image
            mediaSection = `
                <div class="project-media">
                    <img src="${projectMedia.screenshot}" 
                         alt="${repo.name} Screenshot" 
                         class="project-screenshot" 
                         onload="console.log('Image loaded: ${projectMedia.screenshot}')"
                         onerror="console.log('Image failed to load: ${projectMedia.screenshot}'); this.parentElement.style.display='none'">
                </div>
            `;
        }
    }
    
    return `
        <div class="project-card" data-languages="${languages.join(' ').toLowerCase()}">
            ${mediaSection}
            <div class="project-header">
                <h3 class="project-title">${repo.name}</h3>
                <p class="project-description">${description}</p>
            </div>
            <div class="project-stats">
                <div class="project-stat">
                    <i class="fas fa-star"></i>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-code-branch"></i>
                    <span>${repo.forks_count}</span>
                </div>
                <div class="project-stat">
                    <i class="fas fa-clock"></i>
                    <span>${updatedDate}</span>
                </div>
            </div>
            ${languages.length > 0 ? `
                <div class="project-languages">
                    ${languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                </div>
            ` : ''}
            <div class="project-links">
                <a href="${repo.html_url}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i>
                    <span>View Code</span>
                </a>
                ${repo.homepage ? `
                    <a href="${repo.homepage}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                ` : ''}
                ${projectMedia?.youtubeId && projectMedia.youtubeId !== 'YOUR_YOUTUBE_VIDEO_ID' ? `
                    <a href="https://www.youtube.com/watch?v=${projectMedia.youtubeId}" class="project-link" target="_blank">
                        <i class="fab fa-youtube"></i>
                        <span>Demo Video</span>
                    </a>
                ` : ''}
            </div>
        </div>
    `;
}

function getMainLanguages(primaryLanguage) {
    const languages = [];
    if (primaryLanguage) {
        languages.push(primaryLanguage);
    }
    return languages;
}

function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const cardLanguages = card.getAttribute('data-languages');
                    if (cardLanguages.includes(filter.toLowerCase())) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
}

function showErrorMessage() {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = `
        <div class="loading">
            <i class="fas fa-exclamation-triangle"></i>
            <p>Unable to load projects. Please check the GitHub username in script.js</p>
        </div>
    `;
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Here you would typically send the form data to a server
    // For now, we'll show a success message
    alert(`Thank you ${name}! Your message has been received. I'll get back to you soon!`);
    
    // Reset form
    this.reset();
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .stat, .skill-tag');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initial setup for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.project-card, .stat, .skill-tag');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

window.addEventListener('scroll', animateOnScroll);

// Typing animation for hero subtitle
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Start typing animation
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const originalText = subtitle.textContent;
        typeWriter(subtitle, originalText, 80);
    }
    
    // Fetch GitHub data
    fetchGitHubData();
    
    // Initial animation check
    setTimeout(animateOnScroll, 100);
});

// Add some interactive features
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Update copyright year
document.querySelector('.footer p').innerHTML = `&copy; ${new Date().getFullYear()} Burhan Mustafa. Built with ❤️ and GitHub API.`;

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(animateOnScroll, 100)); 