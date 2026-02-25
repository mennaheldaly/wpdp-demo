// Video view page - dynamic based on videoId query param
document.addEventListener('DOMContentLoaded', function() {
    const videos = window.WPDP_VIDEOS;
    
    // Get video ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('videoId') || 'forehand-swing-path';
    const returnUrl = urlParams.get('return') || 'technical-fundamentals.html';
    
    // Set back link
    document.getElementById('backLink').href = returnUrl;
    
    // Default video data (fallback)
    const defaultVideo = {
        id: 'forehand-swing-path',
        title: 'BUILDING THE FOREHAND SWING PATH (A–B PATTERN)',
        tag: 'FH',
        summary: 'This progression teaches players to move the racquet from the starting position (A) to a clean, high finish (B), helping them understand a smooth and repeatable forehand swing path.',
        checklist: [
            'Racquet starts in the "A" position (prepared behind hand)',
            'Contact is made in front of the body',
            'Swing shape moves low → medium → high',
            'Follow-through finishes above the shoulder ("B" position)',
            'Player can repeat the A-to-B pattern 5 times with a slow feed'
        ],
        recommendedFixVideoTitle: 'Fixing the Push/Chopped Forehand'
    };
    
    const video = videos[videoId] || defaultVideo;
    
    // Update page content
    document.getElementById('videoTitle').textContent = video.title;
    document.getElementById('videoTag').textContent = video.tag;
    document.getElementById('videoSummary').textContent = video.summary || defaultVideo.summary;
    
    // Render checklist
    const checklistContainer = document.getElementById('checklistContainer');
    checklistContainer.innerHTML = '';
    
    const checklistItems = video.checklist || defaultVideo.checklist;
    checklistItems.forEach((item, index) => {
        const checklistItem = document.createElement('div');
        checklistItem.className = 'checklist-item';
        checklistItem.innerHTML = `
            <input type="checkbox" id="check${index + 1}" class="checklist-checkbox">
            <label for="check${index + 1}" class="checklist-label">${item}</label>
        `;
        checklistContainer.appendChild(checklistItem);
    });
    
    // Update fix video card
    if (video.recommendedFixVideoTitle) {
        document.getElementById('fixVideoTitle').textContent = video.recommendedFixVideoTitle;
    }
    
// Checklist functionality
    const doneButton = document.getElementById('doneButton');
const fixVideoCard = document.getElementById('fixVideoCard');

// Hide fix video card initially
fixVideoCard.style.display = 'none';

doneButton.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
    
    if (allChecked) {
        // Hide fix video card if all checked
        fixVideoCard.style.display = 'none';
        alert('Great job! You\'ve completed all checklist items.');
    } else {
        // Show fix video card only when Done is clicked and not all checked
        fixVideoCard.style.display = 'block';
    }
    });
});

