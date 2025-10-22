import './bootstrap';
import Alpine from 'alpinejs';

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.start();

// Chart.js for analytics
import Chart from 'chart.js/auto';
window.Chart = Chart;

// Survey functionality
document.addEventListener('DOMContentLoaded', function() {
    // Survey progress tracking
    const surveyForm = document.getElementById('survey-form');
    if (surveyForm) {
        const progressBar = document.getElementById('progress-bar');
        const questions = surveyForm.querySelectorAll('.question');
        const totalQuestions = questions.length;
        
        function updateProgress() {
            const answeredQuestions = Array.from(questions).filter(q => {
                const inputs = q.querySelectorAll('input, textarea, select');
                return Array.from(inputs).some(input => {
                    if (input.type === 'checkbox' || input.type === 'radio') {
                        return input.checked;
                    }
                    return input.value.trim() !== '';
                });
            }).length;
            
            const progress = (answeredQuestions / totalQuestions) * 100;
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
                progressBar.setAttribute('aria-valuenow', progress);
            }
        }
        
        // Update progress on input change
        surveyForm.addEventListener('input', updateProgress);
        surveyForm.addEventListener('change', updateProgress);
        
        // Initial progress update
        updateProgress();
    }
    
    // Auto-save survey responses
    const autoSaveInterval = setInterval(() => {
        if (surveyForm) {
            const formData = new FormData(surveyForm);
            const data = Object.fromEntries(formData);
            
            fetch('/api/survey/auto-save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(data)
            }).catch(error => {
                console.log('Auto-save failed:', error);
            });
        }
    }, 30000); // Auto-save every 30 seconds
    
    // Clean up interval on page unload
    window.addEventListener('beforeunload', () => {
        clearInterval(autoSaveInterval);
    });
});

// Notification system
window.showNotification = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        type === 'warning' ? 'bg-yellow-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
};

// Survey filtering
window.filterSurveys = function(category = null, status = 'available') {
    const surveys = document.querySelectorAll('.survey-card');
    
    surveys.forEach(survey => {
        const surveyCategory = survey.dataset.category;
        const surveyStatus = survey.dataset.status;
        
        let show = true;
        
        if (category && surveyCategory !== category) {
            show = false;
        }
        
        if (status && surveyStatus !== status) {
            show = false;
        }
        
        survey.style.display = show ? 'block' : 'none';
    });
};

