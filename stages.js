// Stage click handlers with lock state management
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.stage-item').forEach(stage => {
        const stageId = stage.getAttribute('data-stage');
        const isUnlocked = window.isStageUnlocked && window.isStageUnlocked(stageId);
        
        // Apply locked state styling and attributes
        if (!isUnlocked) {
            stage.classList.add('locked');
            stage.setAttribute('aria-disabled', 'true');
            stage.setAttribute('tabindex', '-1');
            
            // Add lock icon badge
            const lockBadge = document.createElement('div');
            lockBadge.className = 'lock-badge';
            lockBadge.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            stage.appendChild(lockBadge);
            
            // Add tooltip
            stage.setAttribute('title', 'Locked in this demo');
        }
        
        // Click handler with lock check
        stage.addEventListener('click', function(e) {
            if (!isUnlocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            const stageName = this.getAttribute('data-stage');
            console.log('Stage clicked:', stageName);
            
            // Navigate to stage detail pages
            const stageRoutes = {
                'active-start': 'active-start.html',
                'fundamentals': 'fundamentals.html',
                'development': 'development.html',
                'consolidation': 'consolidation.html',
                'performance': 'performance.html',
                'transition-to-pro': 'transition-to-pro.html',
                'life-as-pro': 'life-as-pro.html'
            };
            
            const route = stageRoutes[stageName];
            if (route) {
                window.location.href = route;
            } else {
                alert(`Opening ${this.querySelector('.stage-title').textContent} stage...`);
            }
        });
        
        // Prevent keyboard activation for locked items
        if (!isUnlocked) {
            stage.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }
    });
});

