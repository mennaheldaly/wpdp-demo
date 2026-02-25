// Filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.textContent.trim().toLowerCase();
        const videoTiles = document.querySelectorAll('.video-tile');
        
        videoTiles.forEach(tile => {
            if (filterValue === 'all') {
                tile.style.display = 'flex';
            } else {
                const tileTag = tile.getAttribute('data-tag');
                if (tileTag === filterValue) {
                    tile.style.display = 'flex';
                } else {
                    tile.style.display = 'none';
                }
            }
        });
    });
});

// Video tile click handlers
document.querySelectorAll('.video-tile').forEach(tile => {
    tile.addEventListener('click', function() {
        const videoTitle = this.querySelector('.video-title').textContent;
        console.log('Video clicked:', videoTitle);
        
        // Navigate to specific video pages
        if (videoTitle.includes('BUILDING THE FOREHAND SWING PATH') || videoTitle.includes('FOREHAND SWING')) {
            window.location.href = 'video-view.html';
        } else {
            // TODO: Navigate to other video detail pages
            alert(`Opening ${videoTitle}...`);
        }
    });
});


