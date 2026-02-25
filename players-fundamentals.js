// Fundamentals players page - renders week cluster bar and players table
document.addEventListener('DOMContentLoaded', function() {
    const overview = window.PLAYERS_OVERVIEW;
    
    if (!overview) {
        console.error('PLAYERS_OVERVIEW data not found');
        return;
    }

    const stage = overview.stages.find(s => s.id === 'fundamentals');
    if (!stage) {
        console.error('Fundamentals stage not found');
        return;
    }

    // Render week cluster bar
    renderWeekClusterBar(stage.players);
    
    // Render players table
    renderPlayersTable(stage.players);
});

function renderWeekClusterBar(players) {
    const container = document.getElementById('weekClusterBar');
    container.innerHTML = '';
    
    // Create week labels container
    const weekLabels = document.createElement('div');
    weekLabels.className = 'week-cluster-labels';
    
    // Create timeline container
    const timeline = document.createElement('div');
    timeline.className = 'week-cluster-timeline';
    
    // Create player dots container
    const playerDots = document.createElement('div');
    playerDots.className = 'week-cluster-dots';
    
    // Generate weeks 1-12
    for (let week = 1; week <= 12; week++) {
        const weekLabel = document.createElement('div');
        weekLabel.className = 'week-cluster-label';
        weekLabel.textContent = `Week ${week}`;
        weekLabels.appendChild(weekLabel);
        
        const weekSegment = document.createElement('div');
        weekSegment.className = 'week-cluster-segment';
        if (week < 12) {
            weekSegment.style.borderRight = '1px solid #e0e0e0';
        }
        timeline.appendChild(weekSegment);
    }
    
    // Position player dots
    players.forEach(player => {
        const dot = document.createElement('div');
        dot.className = `week-cluster-dot status-${player.status}`;
        dot.setAttribute('data-player-name', player.name);
        dot.setAttribute('title', `${player.name} - Week ${player.currentWeek}`);
        
        // Calculate position (week 1 = center of first segment, week 12 = center of last segment)
        // Each segment is 1/12 of the width, so center of segment n is at (n - 0.5) / 12 * 100%
        const position = ((player.currentWeek - 0.5) / 12) * 100;
        dot.style.left = `${position}%`;
        
        playerDots.appendChild(dot);
    });
    
    container.appendChild(weekLabels);
    container.appendChild(timeline);
    container.appendChild(playerDots);
}

function renderPlayersTable(players) {
    const tbody = document.querySelector('#playersTable tbody');
    tbody.innerHTML = '';
    
    // Status display mapping
    const statusDisplay = {
        'on_track': 'On track',
        'ahead': 'Ahead',
        'needs_support': 'Needs support',
        'behind': 'Behind'
    };
    
    players.forEach(player => {
        const row = document.createElement('tr');
        row.className = `players-table-row status-${player.status}`;
        row.setAttribute('data-player-id', player.id);
        
        row.innerHTML = `
            <td class="players-table-name">${player.name}</td>
            <td class="players-table-week">Week ${player.currentWeek}</td>
            <td class="players-table-status">
                <span class="players-status-badge status-${player.status}">${statusDisplay[player.status] || player.status}</span>
            </td>
            <td class="players-table-focus">${player.blockerTag || '—'}</td>
        `;
        
        // Add click handler to navigate to player's current session
        row.addEventListener('click', function() {
            window.location.href = `fundamentals-annual-week-${player.currentWeek}-session-2.html`;
        });
        
        tbody.appendChild(row);
    });
}
