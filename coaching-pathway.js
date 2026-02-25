// Module click handlers
document.querySelectorAll('.module-item').forEach(module => {
    module.addEventListener('click', function() {
        const moduleTitle = this.querySelector('.module-title').textContent.trim();
        const moduleNumber = this.querySelector('.module-number').textContent;
        console.log(`Module ${moduleNumber} clicked: ${moduleTitle}`);
        
        // Navigate to specific module pages (case-insensitive comparison)
        const titleUpper = moduleTitle.toUpperCase();
        if (titleUpper.includes('TECHNICAL FUNDAMENTALS') || titleUpper.includes('FH/BH')) {
            window.location.href = 'technical-fundamentals.html';
        } else {
            // TODO: Navigate to other module detail pages
            alert(`Opening ${moduleTitle}...`);
        }
    });
});

