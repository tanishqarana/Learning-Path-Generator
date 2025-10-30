// API Configuration
const API_BASE_URL = 'http://localhost:8000';
let currentStudent = null;
let currentAssessment = null;

// API Service Layer - UPDATED TO MATCH YOUR BACKEND
const api = {
    async generateLearningPath(studentData) {
        try {
            console.log('🚀 Sending student data to backend:', studentData);

            const response = await fetch(`${API_BASE_URL}/generate-path`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: studentData.name,
                    target_score: studentData.target_score,
                    available_time_week: studentData.available_time_week,
                    known_concepts: studentData.known_concepts || {},
                    preferred_difficulty_pace: studentData.preferred_difficulty_pace || 'medium',
                    learning_style: studentData.learning_style || 'balanced',
                    goal: studentData.goal || 'gre_quantitative'
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }

            const result = await response.json();
            console.log('✅ Learning path generated:', result);
            return result;

        } catch (error) {
            console.error('API Error - generateLearningPath:', error);
            throw error;
        }
        
    },

    async getAllModules() {
        try {
            const response = await fetch(`${API_BASE_URL}/modules/all`);
            if (!response.ok) throw new Error('Failed to load all modules');
            return await response.json();
        } catch (error) {
            console.error('API Error - getAllModules:', error);
            throw error;
        }
    },

    async getStudentProfile(name, targetScore) {
        try {
            const response = await fetch(
                `${API_BASE_URL}/student/profile?name=${encodeURIComponent(name)}&target_score=${targetScore}`
            );

            if (!response.ok) throw new Error('Failed to get student profile');
            return await response.json();

        } catch (error) {
            console.error('API Error - getStudentProfile:', error);
            // Return demo data if backend fails
            return {
                name: name,
                target_score: targetScore,
                overall_proficiency: 65,
                strong_areas: ['arithmetic', 'integers'],
                weak_areas: ['algebra', 'geometry'],
                recommended_study_approach: 'Focus on weak areas first',
                estimated_preparation_time: '12-16 weeks'
            };
        }
    },

    async listAllModules() {
        try {
            const response = await fetch(`${API_BASE_URL}/modules/list`);
            if (!response.ok) throw new Error('Failed to load modules');
            return await response.json();

        } catch (error) {
            console.error('API Error - listAllModules:', error);
            // Return demo modules
            return {
                total_modules: 55,
                modules: [
                    {
                        id: 1,
                        name: "Integer Properties and Types",
                        difficulty: 1,
                        time_estimate: 25,
                        concepts: ["integers"],
                        prerequisites: []
                    },
                    {
                        id: 2,
                        name: "Even and Odd Numbers",
                        difficulty: 1,
                        time_estimate: 20,
                        concepts: ["even_odd"],
                        prerequisites: ["integers"]
                    }
                ]
            };
        }
    },

    async assessStudentKnowledge(knownConcepts) {
        try {
            console.log('📊 Sending assessment data:', knownConcepts);

            const response = await fetch(`${API_BASE_URL}/student/assess`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(knownConcepts)
            });

            if (!response.ok) throw new Error('Failed to assess student');
            const result = await response.json();
            console.log('✅ Assessment results:', result);
            return result;

        } catch (error) {
            console.error('API Error - assessStudentKnowledge:', error);
            // Calculate demo results based on concept scores
            const overallProficiency = Object.values(knownConcepts).reduce((a, b) => a + b, 0) / Object.values(knownConcepts).length;

            const strong_areas = Object.entries(knownConcepts)
                .filter(([_, score]) => score >= 70)
                .map(([concept, _]) => concept);

            const weak_areas = Object.entries(knownConcepts)
                .filter(([_, score]) => score < 50)
                .map(([concept, _]) => concept);

            return {
                strong_areas: strong_areas,
                weak_areas: weak_areas,
                overall_proficiency: Math.round(overallProficiency),
                recommendations: `Focus on ${weak_areas.length} weak areas while maintaining ${strong_areas.length} strong areas`
            };
        }
    },

    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return response.ok;
        } catch (error) {
            console.error('API Health Check Failed:', error);
            return false;
        }
    }
};

// Student Management
const studentManager = {
    getCurrentStudent() {
        const saved = localStorage.getItem('currentStudent');
        if (saved) {
            currentStudent = JSON.parse(saved);
            return currentStudent;
        }

        // Default student for demo
        currentStudent = {
            student_id: 'demo-001',
            name: 'Demo Student',
            goal: 'gre_quantitative',
            target_score: 160,
            known_concepts: {},
            available_time_week: 300,
            preferred_difficulty_pace: 'medium',
            learning_style: 'balanced',
            completed_modules: [],
            created_at: new Date().toISOString()
        };

        this.saveCurrentStudent();
        return currentStudent;
    },

    saveCurrentStudent() {
        if (currentStudent) {
            localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
        }
    },

    // In studentManager object - UPDATE KNOWLEDGE UPDATE
// In studentManager object - UPDATE TO CLEAR LEARNING PATH
updateStudentKnowledge(assessmentResults) {
    if (!currentStudent) {
        console.error('❌ No current student to update');
        return;
    }
    
    console.log('🔄 Updating student knowledge and clearing old learning path...');
    
    // CLEAR THE OLD LEARNING PATH when new assessment comes in
    currentStudent.learning_path = null;
    currentStudent.learning_path_generated = false;
    
    // Update known concepts with new assessment results
    if (assessmentResults.concept_scores) {
        currentStudent.known_concepts = assessmentResults.concept_scores;
    } else if (assessmentResults.overall_proficiency) {
        // If no concept scores, create them from the assessment
        const defaultConcepts = {
            'percentages': assessmentResults.overall_proficiency,
            'linear_equations': assessmentResults.overall_proficiency,
            'circles': assessmentResults.overall_proficiency
        };
        currentStudent.known_concepts = defaultConcepts;
    }
    
    // Update proficiency and areas
    currentStudent.overall_proficiency = assessmentResults.overall_proficiency || 0;
    currentStudent.strong_areas = assessmentResults.strong_areas || [];
    currentStudent.weak_areas = assessmentResults.weak_areas || [];
    
    // Mark that assessment is completed
    currentStudent.assessment_completed = true;
    currentStudent.assessment_date = new Date().toISOString();
    
    console.log('✅ Updated student and cleared old learning path:', currentStudent);
    this.saveCurrentStudent();
    
    // Refresh dashboard to show updated data
    if (navigation.getCurrentPage() === 'dashboard') {
        navigation.initDashboard();
    }
},

    getProgressStats() {
        if (!currentStudent) return {};

        const knownConcepts = currentStudent.known_concepts || {};
        const concepts = Object.keys(knownConcepts);

        if (concepts.length === 0) {
            return { overall: 0, strong: 0, weak: 0, total: 0 };
        }

        const proficiencies = Object.values(knownConcepts);
        const overall = proficiencies.reduce((a, b) => a + b, 0) / proficiencies.length;
        const strong = proficiencies.filter(p => p >= 70).length;
        const weak = proficiencies.filter(p => p < 50).length;

        return {
            overall: Math.round(overall),
            strong,
            weak,
            total: concepts.length
        };
    }
};

// Multi-Page Navigation System
const navigation = {
    // Navigate to different HTML pages
    navigate(page) {
        const pages = {
            'login': 'login.html',
            'dashboard': 'dashboard.html',
            'assessment': 'assessment.html',
            'learning-path': 'learning-path.html',
            'profile': 'profile.html',
            'assessment-questions': 'assessment-questions.html'
        };

        if (pages[page]) {
            window.location.href = pages[page];
        } else {
            console.warn('Page not found:', page);
            window.location.href = 'dashboard.html';
        }
    },

    // Initialize page-specific functionality
    initPage() {
        const currentPage = this.getCurrentPage();
        console.log('📄 Initializing page:', currentPage);

        studentManager.getCurrentStudent();
        this.updateUI();

        switch (currentPage) {
            case 'dashboard':
                this.initDashboard();
                break;
            case 'learning-path':
                this.initLearningPath();
                break;
            case 'assessment':
                this.initAssessment();
                break;
            case 'assessment-questions':
                console.log('🎯 Initializing assessment questions page...');
                // Initialize assessment system with a small delay to ensure DOM is ready
                setTimeout(() => {
                    if (window.assessmentSystem) {
                        assessmentSystem.init();
                    } else {
                        console.error('❌ Assessment system not found!');
                    }
                }, 100);
                break;
            case 'profile':
                this.initProfile();
                break;
            case 'login':
                this.initLogin();
                break;
        }
    },

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '');
        return page || 'dashboard';
    },

    updateUI() {
        const userName = document.getElementById('user-name');
        const userAvatar = document.getElementById('user-avatar');

        if (userName && currentStudent) {
            userName.textContent = currentStudent.name;
        }

        if (userAvatar && currentStudent) {
            const initials = currentStudent.name.split(' ').map(n => n[0]).join('').toUpperCase();
            userAvatar.textContent = initials || 'US';
        }
    },

    // Page-specific initializers
    // In navigation.initDashboard() - UPDATE DASHBOARD DISPLAY
// In navigation object - FIX THE REDIRECTION
initDashboard() {
    if (!currentStudent) return;
    
    console.log('📊 Initializing dashboard with student:', currentStudent);
    
    // Update basic info
    document.getElementById('target-score').textContent = currentStudent.target_score;
    document.getElementById('study-time').textContent = `${Math.round(currentStudent.available_time_week / 60)}h`;
    
    // Get progress stats
    const stats = studentManager.getProgressStats();
    
    // Update current score
    const currentScoreElement = document.getElementById('current-score');
    if (currentScoreElement) {
        if (currentStudent.overall_proficiency > 0) {
            currentScoreElement.textContent = `${currentStudent.overall_proficiency}%`;
        } else {
            currentScoreElement.textContent = `${stats.overall}%`;
        }
    }
    
    document.getElementById('completed-modules').textContent = 
        currentStudent.completed_modules?.length || 0;
    
    // Update progress bar
    const progress = document.getElementById('overall-progress');
    const progressText = document.getElementById('progress-text');
    if (progress && progressText) {
        const progressValue = currentStudent.overall_proficiency || stats.overall;
        progress.style.width = `${progressValue}%`;
        progressText.textContent = `${progressValue}%`;
    }
    
    // Update knowledge profile section
    this.updateKnowledgeProfile();
    
    // FIX: Add event listeners for dashboard buttons
    this.setupDashboardActions();
},

setupDashboardActions() {
    // Fix the "View Learning Path" button
    const viewPathBtn = document.querySelector('[onclick*="learning-path"]');
    if (viewPathBtn) {
        viewPathBtn.onclick = () => this.navigate('learning-path');
    }
    
    // Fix the "Take Assessment" button
    const takeAssessmentBtn = document.querySelector('[onclick*="startInitialAssessment"]');
    if (takeAssessmentBtn) {
        takeAssessmentBtn.onclick = () => startInitialAssessment();
    }
    
    // Fix the "Mock Exam" button
    const mockExamBtn = document.querySelector('[onclick*="startMockExam"]');
    if (mockExamBtn) {
        mockExamBtn.onclick = () => startMockExam();
    }
},

updateAssessmentStatus() {
    const knowledgeProfile = document.getElementById('knowledge-profile');
    const recommendedActions = document.getElementById('recommended-actions');
    
    if (!knowledgeProfile || !recommendedActions) return;
    
    if (currentStudent.assessment_completed) {
        // Assessment completed - show results and next steps
        const stats = studentManager.getProgressStats();
        
        knowledgeProfile.innerHTML = `
            <div class="knowledge-stats">
                <div class="stat-row">
                    <span class="stat-label">Overall Proficiency:</span>
                    <span class="stat-value">${currentStudent.overall_proficiency}%</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Strong Areas:</span>
                    <span class="stat-value">${currentStudent.strong_areas?.length || 0} concepts</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">Areas Needing Improvement:</span>
                    <span class="stat-value">${currentStudent.weak_areas?.length || 0} concepts</span>
                </div>
            </div>
            <div class="action-buttons">
                <button class="primary-button" onclick="navigation.navigate('learning-path')">
                    Generate Learning Path
                </button>
                <button class="secondary-button" onclick="navigation.navigate('assessment')">
                    Retake Assessment
                </button>
            </div>
        `;
        
        recommendedActions.innerHTML = `
            <h4>🎯 Next Steps</h4>
            <div class="action-item" onclick="navigation.navigate('learning-path')">
                <div class="action-icon">🗺️</div>
                <div class="action-text">
                    <strong>Generate Learning Path</strong>
                    <p>Get your AI-powered study roadmap</p>
                </div>
            </div>
            <div class="action-item" onclick="startMockExam()">
                <div class="action-icon">📝</div>
                <div class="action-text">
                    <strong>Take Mock Exam</strong>
                    <p>Full GRE practice test (40 questions)</p>
                </div>
            </div>
            <div class="action-item" onclick="navigation.navigate('profile')">
                <div class="action-icon">📊</div>
                <div class="action-text">
                    <strong>View Detailed Analytics</strong>
                    <p>See your progress and statistics</p>
                </div>
            </div>
        `;
        
    } else {
        // Assessment not completed
        knowledgeProfile.innerHTML = `
            <div class="assessment-prompt">
                <h4>📊 Complete Your Assessment</h4>
                <p>Take the initial assessment to get personalized learning recommendations.</p>
                <button class="primary-button" onclick="startInitialAssessment()">
                    Start Assessment
                </button>
            </div>
        `;
    }
},

    // In navigation object - UPDATE LEARNING PATH INITIALIZATION
// In navigation object - IMPROVE LEARNING PATH DETECTION
initLearningPath() {
    if (!currentStudent) {
        console.log('❌ No student found, redirecting to login');
        this.navigate('login');
        return;
    }
    
    console.log('🗺️ Initializing learning path page');
    console.log('📊 Student assessment status:', {
        hasAssessment: currentStudent.assessment_completed,
        conceptsKnown: Object.keys(currentStudent.known_concepts || {}).length,
        hasLearningPath: !!currentStudent.learning_path,
        assessmentDate: currentStudent.assessment_date
    });
    
    // Check if student has completed assessment
    if (!currentStudent.assessment_completed || !currentStudent.known_concepts || Object.keys(currentStudent.known_concepts).length === 0) {
        console.log('❌ Student needs to complete assessment first');
        this.showAssessmentRequired();
        return;
    }
    
    // Check if student already has a learning path
    if (currentStudent.learning_path) {
        console.log('✅ Student has existing learning path, displaying it');
        
        // Check if the learning path is stale (older than assessment)
        const assessmentDate = new Date(currentStudent.assessment_date);
        const pathGeneratedTime = currentStudent.learning_path.generated_at ? new Date(currentStudent.learning_path.generated_at) : null;
        
        if (pathGeneratedTime && pathGeneratedTime < assessmentDate) {
            console.log('🔄 Learning path is older than assessment, suggesting regeneration');
            this.showStaleLearningPath(currentStudent.learning_path);
        } else {
            this.displayLearningPath(currentStudent.learning_path);
            
            // Hide initial card, show generated path
            const initialCard = document.getElementById('path-initial');
            const pathContainer = document.getElementById('path-container');
            const pathStats = document.getElementById('path-stats');
            const pathVisualization = document.getElementById('path-visualization');
            
            if (initialCard) initialCard.style.display = 'none';
            if (pathContainer) pathContainer.style.display = 'block';
            if (pathStats) pathStats.style.display = 'grid';
            if (pathVisualization) pathVisualization.style.display = 'block';
        }
    } else {
        console.log('ℹ️ No learning path exists yet, showing generate button');
        this.showGenerateButton();
    }
},

showAssessmentRequired() {
    const initialCard = document.getElementById('path-initial');
    if (initialCard) {
        initialCard.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <div style="font-size: 4rem; margin-bottom: 20px;">📊</div>
                <h2>Assessment Required</h2>
                <p>Complete the comprehensive assessment to generate your personalized learning path.</p>
                <p style="color: #6b7280; margin-bottom: 30px;">Your learning path will be optimized based on your assessment results.</p>
                
                <a href="assessment-questions.html" class="primary-button large">
                    Take Assessment
                </a>
                
                <div style="margin-top: 20px;">
                    <a href="dashboard.html" class="secondary-button">Back to Dashboard</a>
                </div>
            </div>
        `;
    }
},

showStaleLearningPath(learningPath) {
    // Show the existing path but with a warning and regenerate option
    this.displayLearningPath(learningPath);
    
    const pathContainer = document.getElementById('path-container');
    if (pathContainer) {
        const warningHtml = `
            <div class="stale-path-warning">
                <div class="warning-header">
                    <span class="warning-icon">⚠️</span>
                    <h4>Learning Path May Be Outdated</h4>
                </div>
                <p>This learning path was generated before your latest assessment. For the most personalized experience, regenerate your path.</p>
                <button class="primary-button" onclick="learningPathGenerator.generateLearningPath()">
                    🔄 Regenerate with New Assessment Data
                </button>
            </div>
        `;
        pathContainer.innerHTML = warningHtml + (pathContainer.innerHTML || '');
    }
    
    // Hide initial card, show generated path
    const initialCard = document.getElementById('path-initial');
    const pathStats = document.getElementById('path-stats');
    const pathVisualization = document.getElementById('path-visualization');
    
    if (initialCard) initialCard.style.display = 'none';
    if (pathStats) pathStats.style.display = 'grid';
    if (pathVisualization) pathVisualization.style.display = 'block';
},

showGenerateButton() {
    // This is the default state - show the generate button
    const initialCard = document.getElementById('path-initial');
    if (initialCard) {
        initialCard.style.display = 'block';
    }
    
    // Hide other sections
    const pathContainer = document.getElementById('path-container');
    const pathStats = document.getElementById('path-stats');
    const pathVisualization = document.getElementById('path-visualization');
    
    if (pathContainer) pathContainer.style.display = 'none';
    if (pathStats) pathStats.style.display = 'none';
    if (pathVisualization) pathVisualization.style.display = 'none';
},

    initAssessment() {
        console.log('Assessment page ready');
    },

    initProfile() {
        if (!currentStudent) return;

        document.getElementById('profile-name').textContent = currentStudent.name;
        document.getElementById('profile-id').textContent = currentStudent.student_id;
        document.getElementById('target-score-profile').textContent = currentStudent.target_score;
        document.getElementById('study-time-profile').textContent = `${Math.round(currentStudent.available_time_week / 60)} hours/week`;

        document.getElementById('learning-pace').textContent =
            this.formatLearningPace(currentStudent.preferred_difficulty_pace);
        document.getElementById('learning-style').textContent =
            this.formatLearningStyle(currentStudent.learning_style);

        const joinedDate = new Date(currentStudent.created_at).toLocaleDateString();
        document.getElementById('profile-joined').textContent = joinedDate;

        const stats = studentManager.getProgressStats();
        document.getElementById('strong-count').textContent = stats.strong;
        document.getElementById('weak-count').textContent = stats.weak;
        document.getElementById('overall-proficiency').textContent = `${stats.overall}%`;
        document.getElementById('completed-count').textContent = currentStudent.completed_modules?.length || 0;

        const currentLevel = this.calculateCurrentLevel(stats.overall);
        document.getElementById('current-level').textContent = currentLevel;
    },

    initLogin() {
        const existingStudents = this.getExistingStudents();
        const profilesList = document.getElementById('profiles-list');

        if (existingStudents.length > 0) {
            profilesList.innerHTML = existingStudents.map(student => `
                <div class="profile-item" onclick="navigation.selectProfile('${student.student_id}')">
                    <div class="profile-avatar">${student.name.split(' ').map(n => n[0]).join('').toUpperCase()}</div>
                    <div class="profile-info">
                        <h4>${student.name}</h4>
                        <p>Target: GRE Quantitative ${student.target_score}</p>
                    </div>
                </div>
            `).join('');
        } else {
            profilesList.innerHTML = `
                <div class="no-profiles">
                    <p>No profiles found. Create your first profile to start learning!</p>
                </div>
            `;
        }

        this.checkBackendConnection();
    },

    // Helper methods
    formatLearningPace(pace) {
        const paces = {
            'slow': 'Slow & Steady',
            'medium': 'Medium Pace',
            'fast': 'Fast Pace'
        };
        return paces[pace] || pace;
    },

    formatLearningStyle(style) {
        const styles = {
            'visual': 'Visual Learner',
            'reading_writing': 'Reading/Writing',
            'balanced': 'Balanced',
            'kinesthetic': 'Kinesthetic'
        };
        return styles[style] || style;
    },

    calculateCurrentLevel(proficiency) {
        if (proficiency >= 80) return 'Advanced';
        if (proficiency >= 60) return 'Intermediate';
        if (proficiency >= 40) return 'Beginner';
        return 'Starting Out';
    },

    getExistingStudents() {
        const students = [];
        const saved = localStorage.getItem('currentStudent');
        if (saved) {
            students.push(JSON.parse(saved));
        }
        return students;
    },

    selectProfile(studentId) {
        this.navigate('dashboard');
    },

    checkBackendConnection() {
        api.healthCheck().then(connected => {
            const statusElement = document.getElementById('backend-status');
            if (statusElement) {
                statusElement.textContent = connected ? '✅ Connected' : '⚠️ Demo Mode';
                statusElement.style.color = connected ? '#10b981' : '#f59e0b';
            }
        });
    },

    updateKnowledgeProfile() {
        const container = document.getElementById('knowledge-profile');
        if (!container) return;

        const stats = studentManager.getProgressStats();

        if (stats.total === 0) {
            container.innerHTML = `
                <p>Complete assessment to see your knowledge profile</p>
                <button class="primary-button" onclick="navigation.navigate('assessment')">
                    Start Assessment
                </button>
            `;
        } else {
            container.innerHTML = `
                <div class="knowledge-stats">
                    <div class="stat-row">
                        <span class="stat-label">Overall Proficiency:</span>
                        <span class="stat-value">${stats.overall}%</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Strong Areas:</span>
                        <span class="stat-value">${stats.strong} concepts</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">Areas Needing Improvement:</span>
                        <span class="stat-value">${stats.weak} concepts</span>
                    </div>
                </div>
                <button class="secondary-button" onclick="navigation.navigate('assessment')">
                    Update Assessment
                </button>
            `;
        }
    },

    // In navigation object - UPDATE LEARNING PATH DISPLAY
// In navigation object - UPDATE LEARNING PATH DISPLAY
displayLearningPath(learningPath) {
    const container = document.getElementById('path-container');
    const stats = document.getElementById('path-stats');
    const visualization = document.getElementById('path-visualization');
    const moduleSequence = document.getElementById('module-sequence');
    const loadingCard = document.getElementById('path-loading');
    const errorContainer = document.getElementById('path-error');
    
    // Hide loading and error states
    if (loadingCard) loadingCard.style.display = 'none';
    if (errorContainer) errorContainer.style.display = 'none';
    
    if (!learningPath || !learningPath.modules) {
        console.error('❌ No learning path data to display');
        return;
    }
    
    console.log('📊 Displaying enhanced learning path:', learningPath);
    
    // Update comprehensive path statistics
    document.getElementById('total-modules').textContent = learningPath.total_modules || learningPath.modules.length;
    document.getElementById('total-time').textContent = `${Math.round((learningPath.total_time || 0) / 60)}h`;
    document.getElementById('path-fitness').textContent = `${Math.round((learningPath.fitness_score || 0) * 100)}%`;
    document.getElementById('weak-covered').textContent = learningPath.weak_areas_covered || '0';
    
    // Show stats and visualization
    if (stats) stats.style.display = 'grid';
    if (visualization) visualization.style.display = 'block';
    
    // Display enhanced module sequence
    if (moduleSequence) {
        moduleSequence.innerHTML = learningPath.modules.map((module, index) => {
            const readiness = module.readiness || 0;
            const isCurrent = index === 0;
            const isCompleted = currentStudent.completed_modules?.includes(module.id) || false;
            
            // Check if module addresses weak areas
            const weakAreas = currentStudent.weak_areas || [];
            const addressesWeakAreas = module.concepts.some(concept => 
                weakAreas.includes(concept)
            );
            
            return `
                <div class="path-module ${isCurrent ? 'current' : ''} ${isCompleted ? 'completed' : ''} ${addressesWeakAreas ? 'weak-area-focus' : ''}">
                    <div class="module-number">${index + 1}</div>
                    <div class="module-content">
                        <h4>${module.name}</h4>
                        <p>${module.description || 'Master key concepts and techniques'}</p>
                        <div class="module-meta">
                            <span class="meta-tag difficulty-${module.difficulty}">
                                Difficulty: ${module.difficulty}/5
                            </span>
                            <span class="meta-tag">⏱️ ${module.time_estimate}min</span>
                            <span class="meta-tag">📊 Ready: ${Math.round(readiness)}%</span>
                            ${addressesWeakAreas ? '<span class="meta-tag weak-area-tag">🎯 Weak Area</span>' : ''}
                            ${module.concepts && module.concepts.length > 0 ? 
                                `<span class="meta-tag">📖 ${module.concepts.join(', ')}</span>` : ''
                            }
                        </div>
                    </div>
                    <div class="module-actions">
                        ${isCompleted ? 
                            `<span class="completed-badge">✅ Completed</span>` :
                            isCurrent ? 
                                `<button class="primary-button small" onclick="startModule(${module.id})">Start</button>` :
                                `<span class="meta-tag">🔒 Locked</span>`
                        }
                    </div>
                </div>
            `;
        }).join('');
    }
    
    // Show comprehensive path overview
    if (container) {
        const weakAreasCount = currentStudent.weak_areas?.length || 0;
        const strongAreasCount = currentStudent.strong_areas?.length || 0;
        
        container.innerHTML = `
            <div class="path-overview">
                <h3>🎯 Your AI-Optimized Learning Journey</h3>
                <p>Based on your comprehensive assessment (${learningPath.total_modules} modules, ${Math.round(learningPath.total_time / 60)} hours)</p>
                
                <div class="assessment-summary">
                    <div class="summary-item">
                        <strong>Overall Proficiency</strong>
                        <span>${currentStudent.overall_proficiency || 0}%</span>
                    </div>
                    <div class="summary-item">
                        <strong>Weak Areas Identified</strong>
                        <span>${weakAreasCount} concepts</span>
                    </div>
                    <div class="summary-item">
                        <strong>Strong Areas</strong>
                        <span>${strongAreasCount} concepts</span>
                    </div>
                    <div class="summary-item">
                        <strong>Path Efficiency</strong>
                        <span>${Math.round((learningPath.fitness_score || 0) * 100)}%</span>
                    </div>
                </div>
                
                <div class="path-highlights">
                    <div class="highlight">
                        <span class="highlight-icon">🎯</span>
                        <div>
                            <strong>Weak Area Focus</strong>
                            <p>Prioritizes your ${weakAreasCount} identified weak areas</p>
                        </div>
                    </div>
                    <div class="highlight">
                        <span class="highlight-icon">📊</span>
                        <div>
                            <strong>Comprehensive Coverage</strong>
                            <p>Covers all GRE quantitative concepts</p>
                        </div>
                    </div>
                    <div class="highlight">
                        <span class="highlight-icon">⚡</span>
                        <div>
                            <strong>Time Optimized</strong>
                            <p>Respects your weekly study time</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
},
};

// Assessment System
// In script.js - UPDATE FOR 20 QUESTIONS
const assessmentSystem = {
    currentQuestionIndex: 0,
    answers: {},
    questions: [],
    timeLimit: 40,
    startTime: null,
    timerInterval: null,

    async init() {
        console.log('🎯 Initializing comprehensive assessment...');
        
        try {
            // Load questions from backend API
            await this.loadQuestionsFromBackend();
            console.log(`📚 Successfully loaded ${this.questions.length} questions from backend`);
            
        } catch (error) {
            console.error('❌ Failed to load questions from backend:', error);
            // Use minimal fallback just to keep the page working
            this.questions = this.getMinimalFallbackQuestions();
        }
        
        // Initialize assessment state
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.startTimer();
        this.updateQuestion();
        this.updateConceptsCovered();
    },

    async loadQuestionsFromBackend() {
        console.log('🔄 Fetching questions from backend...');
        
        const response = await fetch(`${API_BASE_URL}/assessment/questions`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Failed to load questions`);
        }
        
        const data = await response.json();
        console.log('✅ Backend response:', data);
        
        if (data.questions && Array.isArray(data.questions)) {
            this.questions = data.questions;
            console.log(`📝 Loaded ${this.questions.length} questions from backend`);
            
            // Debug: Check the first question structure
            if (this.questions.length > 0) {
                console.log('🔍 First question structure:', this.questions[0]);
                console.log('🔍 First question options:', this.questions[0].options);
            }
        } else {
            throw new Error('Invalid questions data from backend');
        }
    },

    getMinimalFallbackQuestions() {
        // Minimal fallback - just 3 questions to keep the page working
        return [
            {
                id: 1,
                question: "What is 15% of 200?",
                options: ["15", "30", "25", "20"],
                correct_answer: "30",
                concept: "percentages",
                difficulty: 1
            },
            {
                id: 2,
                question: "Solve for x: 2x + 5 = 15",
                options: ["10", "5", "7.5", "8"],
                correct_answer: "5",
                concept: "linear_equations",
                difficulty: 2
            },
            {
                id: 3,
                question: "What is the area of a circle with radius 7?",
                options: ["49π", "14π", "28π", "7π"],
                correct_answer: "49π",
                concept: "circles",
                difficulty: 3
            }
        ];
    },

    updateQuestion() {
        console.log('🔄 Updating question display...');
        
        if (this.questions.length === 0) {
            console.error('❌ No questions available');
            this.showErrorState();
            return;
        }

        if (this.currentQuestionIndex >= this.questions.length) {
            this.showSubmitButton();
            return;
        }

        const question = this.questions[this.currentQuestionIndex];
        console.log('📝 Displaying question:', question);
        console.log('🔍 Question options:', question.options);
        
        // Update question number and text
        const questionNumber = document.getElementById('question-number');
        const questionText = document.getElementById('question-text');
        
        if (questionNumber) {
            questionNumber.textContent = `Question ${this.currentQuestionIndex + 1}`;
        }
        
        if (questionText) {
            questionText.textContent = question.question;
        }
        
        // Update concept and difficulty tags
        const conceptTag = document.getElementById('concept-tag');
        const difficultyTag = document.getElementById('difficulty-tag');
        
        if (conceptTag) {
            conceptTag.textContent = this.formatConcept(question.concept);
        }
        
        if (difficultyTag) {
            difficultyTag.textContent = this.formatDifficulty(question.difficulty);
        }
        
        // Update options - THIS IS THE KEY PART
        this.updateOptions(question);
        
        // Update progress and navigation
        this.updateProgress();
        this.updateNavigationButtons();
        this.updateConceptsCovered();
    },

    updateOptions(question) {
        const optionsContainer = document.getElementById('options-container');
        if (!optionsContainer) {
            console.error('❌ Options container not found!');
            return;
        }

        console.log('📋 Creating options for question:', question.id);
        console.log('Options data:', question.options);
        
        // Clear previous options
        optionsContainer.innerHTML = '';
        
        // Check if options exist and are valid
        if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
            console.error('❌ No valid options for question:', question.id);
            optionsContainer.innerHTML = `
                <div class="error-message">
                    <p>No options available for this question</p>
                    <button class="secondary-button" onclick="assessmentSystem.nextQuestion()">
                        Skip Question
                    </button>
                </div>
            `;
            return;
        }
        
        // Create option elements
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            const isSelected = this.answers[question.id] === option;
            
            optionElement.className = `option-item ${isSelected ? 'selected' : ''}`;
            optionElement.onclick = () => {
                console.log('🖱️ Option clicked:', option);
                this.selectOption(question.id, option);
            };
            
            optionElement.innerHTML = `
                <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                <div class="option-text">${option}</div>
            `;
            
            optionsContainer.appendChild(optionElement);
        });
        
        console.log(`✅ Created ${question.options.length} options for question ${question.id}`);
    },

    selectOption(questionId, option) {
        console.log('✅ Selected option:', option, 'for question:', questionId);
        this.answers[questionId] = option;
        
        // Update visual selection for current question
        if (this.currentQuestionIndex < this.questions.length) {
            const currentQuestion = this.questions[this.currentQuestionIndex];
            if (currentQuestion.id === questionId) {
                this.updateOptions(currentQuestion);
            }
        }
        
        // Update progress
        this.updateProgress();
    },

    // ... rest of the methods remain the same as before
    updateProgress() {
        const progress = document.getElementById('assessment-progress');
        const progressText = document.getElementById('progress-text');
        const answeredCount = document.getElementById('answered-count');
        
        const progressPercent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        const answered = Object.keys(this.answers).length;
        
        if (progress) progress.style.width = `${progressPercent}%`;
        if (progressText) progressText.textContent = `Question ${this.currentQuestionIndex + 1} of ${this.questions.length}`;
        if (answeredCount) answeredCount.textContent = `${answered}/${this.questions.length}`;
        
        this.updateTimeRemaining();
    },

    updateConceptsCovered() {
        const conceptsContainer = document.getElementById('concepts-covered');
        if (!conceptsContainer) return;

        const uniqueConcepts = [...new Set(this.questions.map(q => q.concept))];
        
        const conceptProgress = uniqueConcepts.map(concept => {
            const conceptQuestions = this.questions.filter(q => q.concept === concept);
            const answeredQuestions = conceptQuestions.filter(q => this.answers[q.id]);
            const progress = conceptQuestions.length > 0 ? (answeredQuestions.length / conceptQuestions.length) * 100 : 0;
            
            return {
                concept,
                progress: Math.round(progress),
                answered: answeredQuestions.length,
                total: conceptQuestions.length
            };
        });

        conceptsContainer.innerHTML = conceptProgress.map(item => `
            <div class="concept-progress">
                <div class="concept-name">${this.formatConcept(item.concept)}</div>
                <div class="concept-stats">
                    <span>${item.answered}/${item.total}</span>
                    <div class="mini-progress-bar">
                        <div class="mini-progress-fill" style="width: ${item.progress}%"></div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentQuestionIndex === 0;
            prevBtn.style.display = this.currentQuestionIndex > 0 ? 'block' : 'none';
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.currentQuestionIndex < this.questions.length - 1 ? 'block' : 'none';
        }
        
        if (submitBtn) {
            submitBtn.style.display = this.currentQuestionIndex === this.questions.length - 1 ? 'block' : 'none';
        }
    },

    nextQuestion() {
        console.log('➡️ Next question clicked');
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.updateQuestion();
        } else {
            this.showSubmitButton();
        }
    },

    previousQuestion() {
        console.log('⬅️ Previous question clicked');
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.updateQuestion();
        }
    },

    showSubmitButton() {
        const nextBtn = document.getElementById('next-btn');
        const submitBtn = document.getElementById('submit-btn');
        
        if (nextBtn) nextBtn.style.display = 'none';
        if (submitBtn) submitBtn.style.display = 'block';
    },

    startTimer() {
        this.startTime = new Date();
        this.timerInterval = setInterval(() => {
            this.updateTimeRemaining();
        }, 1000);
    },

    updateTimeRemaining() {
        const timeSpentElement = document.getElementById('time-spent');
        if (!timeSpentElement || !this.startTime) return;
        
        const elapsed = Math.floor((new Date() - this.startTime) / 1000);
        const remaining = this.timeLimit * 60 - elapsed;
        
        if (remaining <= 0) {
            this.autoSubmit();
            return;
        }
        
        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;
        timeSpentElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    },

    autoSubmit() {
        console.log('⏰ Time is up! Auto-submitting assessment...');
        clearInterval(this.timerInterval);
        alert('⏰ Time is up! Your assessment is being submitted...');
        this.submitAssessment();
    },

    async submitAssessment() {
        console.log('📤 Submitting comprehensive assessment...');
        
        try {
            const conceptScores = this.calculateConceptScores();
            console.log('📊 Calculated concept scores:', conceptScores);
            
            if (!currentStudent) {
                currentStudent = studentManager.getCurrentStudent();
            }
            
            const results = await api.assessStudentKnowledge(conceptScores);
            console.log('✅ Backend assessment results:', results);
            
            studentManager.updateStudentKnowledge(results);
            
            this.showResultsSummary(results);
            
        } catch (error) {
            console.error('Error submitting assessment:', error);
            this.showFallbackResults();
        }
    },

    showResultsSummary(results) {
        const strongAreas = results.strong_areas?.length || 0;
        const weakAreas = results.weak_areas?.length || 0;
        
        const message = `🎉 Assessment Completed!\n\n📊 Overall Proficiency: ${results.overall_proficiency}%\n✅ Strong Areas: ${strongAreas} concepts\n🔴 Areas to Improve: ${weakAreas} concepts`;
        
        alert(message);
        navigation.navigate('dashboard');
    },

    showFallbackResults() {
        const conceptScores = this.calculateConceptScores();
        const overallProficiency = Object.values(conceptScores).reduce((a, b) => a + b, 0) / Object.values(conceptScores).length;
        
        const strong_areas = Object.entries(conceptScores)
            .filter(([_, score]) => score >= 70)
            .map(([concept, _]) => concept);
            
        const weak_areas = Object.entries(conceptScores)
            .filter(([_, score]) => score < 50)
            .map(([concept, _]) => concept);
        
        const fallbackResults = {
            strong_areas: strong_areas,
            weak_areas: weak_areas,
            overall_proficiency: Math.round(overallProficiency),
            concept_scores: conceptScores
        };
        
        studentManager.updateStudentKnowledge(fallbackResults);
        
        alert(`✅ Assessment completed!\n\nOverall: ${fallbackResults.overall_proficiency}%`);
        navigation.navigate('dashboard');
    },

    calculateConceptScores() {
        const conceptPerformance = {};
        
        this.questions.forEach(question => {
            const concept = question.concept;
            if (!conceptPerformance[concept]) {
                conceptPerformance[concept] = { correct: 0, total: 0, total_difficulty: 0 };
            }
            
            conceptPerformance[concept].total++;
            conceptPerformance[concept].total_difficulty += question.difficulty;
            
            if (this.answers[question.id] === question.correct_answer) {
                conceptPerformance[concept].correct++;
            }
        });
        
        const conceptScores = {};
        Object.keys(conceptPerformance).forEach(concept => {
            const performance = conceptPerformance[concept];
            const accuracy = (performance.correct / performance.total) * 100;
            
            const avg_difficulty = performance.total_difficulty / performance.total;
            const difficulty_bonus = (avg_difficulty - 2) * 10;
            
            conceptScores[concept] = Math.round(Math.min(100, Math.max(0, accuracy + difficulty_bonus)));
        });
        
        return conceptScores;
    },

    formatConcept(concept) {
        const conceptMap = {
            'percentages': 'Percentages',
            'primes': 'Prime Numbers',
            'divisibility': 'Divisibility',
            'absolute_value': 'Absolute Value',
            'order_of_operations': 'Order of Operations',
            'signed_numbers': 'Signed Numbers',
            'zero_one_properties': 'Number Properties',
            'fractions': 'Fractions',
            'decimals': 'Decimals',
            'linear_equations': 'Algebra',
            'algebraic_expressions': 'Algebra',
            'quadratic_equations': 'Algebra',
            'functions': 'Functions',
            'circles': 'Geometry',
            'pythagorean_theorem': 'Geometry',
            'polygons': 'Geometry',
            'mean_median_mode': 'Statistics',
            'probability': 'Probability',
            'range': 'Statistics'
        };
        return conceptMap[concept] || concept.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    },

    formatDifficulty(difficulty) {
        const levels = {
            1: 'Easy',
            2: 'Medium', 
            3: 'Hard',
            4: 'Very Hard',
            5: 'Expert'
        };
        return levels[difficulty] || 'Medium';
    },

    showErrorState() {
        const optionsContainer = document.getElementById('options-container');
        const questionText = document.getElementById('question-text');
        
        if (questionText) {
            questionText.textContent = "Unable to load assessment questions. Please try refreshing the page.";
        }
        
        if (optionsContainer) {
            optionsContainer.innerHTML = `
                <div class="error-state">
                    <p>❌ Failed to load questions from server</p>
                    <button class="primary-button" onclick="assessmentSystem.init()">
                        Retry Loading Questions
                    </button>
                </div>
            `;
        }
    }
};

// Learning Path Generation
// Learning Path Generation - UPDATED VERSION
// UPDATED learningPathGenerator with real modules
// Learning Path Generation - COMPLETE VERSION
// Learning Path Generation - COMPLETE VERSION
// Learning Path Generator - COMPLETE WORKING VERSION
const learningPathGenerator = {
    async generateLearningPath() {
        console.log('🧬 Generate Learning Path button clicked');
        
        if (!currentStudent) {
            alert('Please complete your assessment first');
            navigation.navigate('assessment');
            return;
        }
        
        // Check if student has assessment data
        if (!currentStudent.known_concepts || Object.keys(currentStudent.known_concepts).length === 0) {
            alert('Please complete the comprehensive assessment first to generate a personalized learning path');
            navigation.navigate('assessment');
            return;
        }
        
        console.log('🚀 Generating learning path for:', currentStudent.name);
        
        const generateBtn = document.getElementById('generate-btn');
        const loadingCard = document.getElementById('path-loading');
        const initialCard = document.getElementById('path-initial');
        const pathContainer = document.getElementById('path-container');
        const errorContainer = document.getElementById('path-error');
        
        // Show loading state, hide other states
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.textContent = 'Generating...';
        }
        if (loadingCard) loadingCard.style.display = 'block';
        if (initialCard) initialCard.style.display = 'none';
        if (pathContainer) pathContainer.style.display = 'none';
        if (errorContainer) errorContainer.style.display = 'none';
        
        try {
            // Prepare student data for backend
            const studentData = {
                name: currentStudent.name,
                target_score: currentStudent.target_score,
                available_time_week: currentStudent.available_time_week,
                known_concepts: currentStudent.known_concepts,
                preferred_difficulty_pace: currentStudent.preferred_difficulty_pace,
                learning_style: currentStudent.learning_style,
                goal: currentStudent.goal
            };
            
            console.log('📤 Sending to backend:', studentData);
            
            // Call backend to generate learning path
            const learningPath = await api.generateLearningPath(studentData);
            console.log('✅ Learning path received:', learningPath);
            
            // Save learning path to student profile
            currentStudent.learning_path = learningPath;
            studentManager.saveCurrentStudent();
            
            // Display the generated path
            this.showGeneratedPath(learningPath);
            
        } catch (error) {
            console.error('❌ Error generating learning path:', error);
            this.useDemoPath();
        } finally {
            if (loadingCard) loadingCard.style.display = 'none';
            if (generateBtn) {
                generateBtn.disabled = false;
                generateBtn.textContent = '🧬 Generate Learning Path';
            }
        }
    },

    showGeneratedPath(learningPath) {
        const initialCard = document.getElementById('path-initial');
        const pathContainer = document.getElementById('path-container');
        const pathStats = document.getElementById('path-stats');
        const pathVisualization = document.getElementById('path-visualization');
        
        if (initialCard) initialCard.style.display = 'none';
        if (pathContainer) pathContainer.style.display = 'block';
        if (pathStats) pathStats.style.display = 'grid';
        if (pathVisualization) pathVisualization.style.display = 'block';
        
        navigation.displayLearningPath(learningPath);
    },

    useDemoPath() {
        console.log('🔄 Using demo learning path');
        const demoPath = this.createDemoPath();
        currentStudent.learning_path = demoPath;
        studentManager.saveCurrentStudent();
        this.showGeneratedPath(demoPath);
    },

    createDemoPath() {
        return {
            student_name: currentStudent.name,
            target_score: currentStudent.target_score,
            total_modules: 6,
            total_time: 240,
            fitness_score: 0.82,
            weak_areas_covered: "3/5",
            estimated_weeks: 4,
            modules: [
                {
                    id: 1,
                    name: "Algebra Basics",
                    difficulty: 2,
                    time_estimate: 45,
                    concepts: ["algebra"],
                    prerequisites: [],
                    readiness: 85
                },
                {
                    id: 2,
                    name: "Linear Equations", 
                    difficulty: 2,
                    time_estimate: 40,
                    concepts: ["linear_equations"],
                    prerequisites: ["algebra"],
                    readiness: 90
                },
                {
                    id: 3,
                    name: "Geometry Fundamentals",
                    difficulty: 3,
                    time_estimate: 50,
                    concepts: ["geometry"],
                    prerequisites: [],
                    readiness: 60
                },
                {
                    id: 4,
                    name: "Percentage Calculations",
                    difficulty: 2,
                    time_estimate: 35,
                    concepts: ["percentages"],
                    prerequisites: [],
                    readiness: 95
                },
                {
                    id: 5,
                    name: "Word Problems",
                    difficulty: 3,
                    time_estimate: 55,
                    concepts: ["word_problems"],
                    prerequisites: ["algebra", "linear_equations"],
                    readiness: 75
                },
                {
                    id: 6,
                    name: "GRE Strategies",
                    difficulty: 3,
                    time_estimate: 30,
                    concepts: ["test_strategies"],
                    prerequisites: [],
                    readiness: 100
                }
            ]
        };
    },

    forceRegenerateLearningPath() {
        console.log('🔄 Force regenerating learning path...');
        currentStudent.learning_path = null;
        studentManager.saveCurrentStudent();
        this.generateLearningPath();
    }
};

// Global function for the button
function generateLearningPath() {
    learningPathGenerator.generateLearningPath();
}

// Global Functions
function startInitialAssessment() {
    navigation.navigate('assessment-questions');
}

function startMockExam() {
    alert('Mock exam feature would launch here. This would be the full 40-question GRE test.');
}

function generateLearningPath() {
    learningPathGenerator.generateLearningPath();
}

function createNewProfile() {
    const name = prompt('Enter your name:') || 'New Student';
    const targetScore = parseInt(prompt('Target GRE Quantitative score (130-170):') || '160');

    currentStudent = {
        student_id: 'student-' + Date.now(),
        name: name,
        goal: 'gre_quantitative',
        target_score: Math.max(130, Math.min(170, targetScore)),
        known_concepts: {},
        available_time_week: 300,
        preferred_difficulty_pace: 'medium',
        learning_style: 'balanced',
        completed_modules: [],
        created_at: new Date().toISOString()
    };

    studentManager.saveCurrentStudent();
    navigation.navigate('dashboard');
}

function quickDemo() {
    currentStudent = {
        student_id: 'demo-001',
        name: 'Demo Student',
        goal: 'gre_quantitative',
        target_score: 160,
        known_concepts: {
            'integers': 85,
            'arithmetic_operations': 90,
            'fractions': 75,
            'algebra': 60,
            'geometry': 45
        },
        available_time_week: 300,
        preferred_difficulty_pace: 'medium',
        learning_style: 'balanced',
        completed_modules: [1, 2],
        created_at: new Date().toISOString()
    };

    studentManager.saveCurrentStudent();
    navigation.navigate('dashboard');
}

function startModule(moduleId) {
    alert(`Starting module ${moduleId}. In a full implementation, this would open the module content.`);
    if (!currentStudent.completed_modules) currentStudent.completed_modules = [];
    if (!currentStudent.completed_modules.includes(moduleId)) {
        currentStudent.completed_modules.push(moduleId);
        studentManager.saveCurrentStudent();
    }
}

// Make functions globally available
window.navigation = navigation;
window.assessmentSystem = assessmentSystem;
window.startInitialAssessment = startInitialAssessment;
window.startMockExam = startMockExam;
window.generateLearningPath = generateLearningPath;
window.createNewProfile = createNewProfile;
window.quickDemo = quickDemo;
window.startModule = startModule;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    api.healthCheck().then(connected => {
        if (!connected) {
            console.warn('Backend not connected. Using demo mode.');
        }
    });

    navigation.initPage();
});

// Add this to your script.js for testing
async function testBackendConnection() {
    console.log('🔍 Testing backend connection...');
    
    try {
        // Test health endpoint
        const health = await api.healthCheck();
        console.log('✅ Health check:', health ? 'Connected' : 'Failed');
        
        // Test modules endpoint
        const modules = await api.listAllModules();
        console.log('✅ Modules loaded:', modules.total_modules);
        
        // Test assessment with sample data
        const sampleConcepts = {
            'percentages': 80,
            'linear_equations': 70, 
            'circles': 50
        };
        const assessment = await api.assessStudentKnowledge(sampleConcepts);
        console.log('✅ Assessment test:', assessment);
        
        return true;
    } catch (error) {
        console.error('❌ Backend connection failed:', error);
        return false;
    }
}

// Call this when your app loads
document.addEventListener('DOMContentLoaded', function() {
    testBackendConnection().then(connected => {
        if (connected) {
            console.log('🎉 Backend connected successfully!');
        } else {
            console.log('⚠️  Using demo mode - backend not connected');
        }
    });
    
    navigation.initPage();
});

// Add to your script.js
async function checkBackendStatus() {
    try {
        const isConnected = await api.healthCheck();
        console.log('🔗 Backend connection:', isConnected ? '✅ Connected' : '❌ Disconnected');
        
        if (isConnected) {
            // Test a simple API call
            const modules = await api.listAllModules();
            console.log('📚 Backend modules loaded:', modules.total_modules);
            return true;
        }
        return false;
    } catch (error) {
        console.error('🔗 Backend check failed:', error);
        return false;
    }
}

// Call this when app loads
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🚀 LearnPath Frontend Loading...');
    
    const backendConnected = await checkBackendStatus();
    
    if (!backendConnected) {
        console.warn('⚠️  Backend not connected - using demo mode');
        // Show a subtle indicator in the UI
        const statusIndicator = document.createElement('div');
        statusIndicator.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #f59e0b; color: white; padding: 5px 10px; border-radius: 5px; font-size: 12px; z-index: 1000;';
        statusIndicator.textContent = 'Demo Mode - Backend Offline';
        document.body.appendChild(statusIndicator);
    }
    
    navigation.initPage();
});

// In script.js - ADD NAVIGATION HELPER
function navigateTo(page) {
    const pages = {
        'dashboard': 'dashboard.html',
        'learning-path': 'learning-path.html',
        'assessment': 'assessment.html',
        'profile': 'profile.html',
        'assessment-questions': 'assessment-questions.html'
    };
    
    if (pages[page]) {
        window.location.href = pages[page];
    } else {
        console.warn('Page not found:', page);
        window.location.href = 'dashboard.html';
    }
}

// Update your global functions to use this
function startInitialAssessment() {
    navigateTo('assessment-questions');
}
// Add this temporary debug function
function debugLearningPathPage() {
    console.log('🔍 DEBUG Learning Path Page:');
    console.log('Current Student:', currentStudent);
    console.log('Has learning_path:', !!currentStudent?.learning_path);
    console.log('Assessment completed:', currentStudent?.assessment_completed);
    
    // Check if HTML elements exist
    const elements = [
        'path-initial', 'path-loading', 'path-container', 
        'path-stats', 'path-visualization', 'generate-btn'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        console.log(`Element ${id}:`, element ? 'EXISTS' : 'MISSING');
    });
}

// Call it when learning path page loads
if (navigation.getCurrentPage() === 'learning-path') {
    setTimeout(debugLearningPathPage, 1000);
}

function generateLearningPath() {
    learningPathGenerator.generateLearningPath();
}
debugLearningPathPage();
