// Fundamentals Stage Overview page handlers with lock state management
document.addEventListener('DOMContentLoaded', function() {
    const viewAnnualPlanTile = document.getElementById('viewAnnualPlanTile');
    const fixProblemTile = document.getElementById('fixProblemTile');
    const browseVideosTile = document.getElementById('browseVideosTile');
    
    const tiles = [
        { element: viewAnnualPlanTile, id: 'viewAnnualPlanTile' },
        { element: fixProblemTile, id: 'fixProblemTile' },
        { element: browseVideosTile, id: 'browseVideosTile' }
    ];
    
    tiles.forEach(tile => {
        const isUnlocked = window.isCardUnlocked && window.isCardUnlocked(tile.id);
        
        // Apply locked state styling and attributes
        if (!isUnlocked) {
            tile.element.classList.add('locked');
            tile.element.setAttribute('aria-disabled', 'true');
            tile.element.setAttribute('tabindex', '-1');
            
            // Add lock badge overlay
            const lockBadge = document.createElement('div');
            lockBadge.className = 'lock-badge-overlay';
            lockBadge.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
            tile.element.appendChild(lockBadge);
            
            // Add tooltip
            tile.element.setAttribute('title', 'Locked in this demo');
        }
        
        // Click handler with lock check
        tile.element.addEventListener('click', function(e) {
            if (!isUnlocked) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            
            if (tile.id === 'viewAnnualPlanTile') {
                window.location.href = 'fundamentals-annual.html';
            } else if (tile.id === 'fixProblemTile') {
                console.log('Fix a Specific Problem clicked');
                // TODO: Navigate to problem-solving content
                alert('Fix a Specific Problem functionality coming soon!');
            } else if (tile.id === 'browseVideosTile') {
                window.location.href = 'technical-fundamentals.html';
            }
        });
        
        // Prevent keyboard activation for locked items
        if (!isUnlocked) {
            tile.element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        }
    });
});
