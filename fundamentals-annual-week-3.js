// Week 3 page - renders week overview and sessions
document.addEventListener('DOMContentLoaded', function() {
    const plan = window.FUNDAMENTALS_ANNUAL_PLAN;
    
    if (!plan || !plan.week3) {
        console.error('Week 3 data not found');
        return;
    }

    const week = plan.week3;

    // Set header
    document.getElementById('weekTitle').textContent = week.title;
    document.getElementById('stageChip').textContent = `Stage: ${week.stageLabel}`;
    document.getElementById('blockChip').textContent = `Block: ${week.blockLabel}`;

    // Render overview
    const overviewContent = document.getElementById('weekOverviewContent');
    
    const objectiveDiv = document.createElement('div');
    objectiveDiv.className = 'week-overview-item';
    const objectiveLabel = document.createElement('h3');
    objectiveLabel.className = 'week-overview-label';
    objectiveLabel.textContent = 'Objective';
    const objectiveText = document.createElement('p');
    objectiveText.className = 'week-overview-text';
    objectiveText.textContent = week.overview.objective;
    objectiveDiv.appendChild(objectiveLabel);
    objectiveDiv.appendChild(objectiveText);
    overviewContent.appendChild(objectiveDiv);

    const cuesDiv = document.createElement('div');
    cuesDiv.className = 'week-overview-item';
    const cuesLabel = document.createElement('h3');
    cuesLabel.className = 'week-overview-label';
    cuesLabel.textContent = 'Coaching Cues';
    const cuesList = document.createElement('ul');
    cuesList.className = 'week-overview-list';
    week.overview.coachingCues.forEach(cue => {
        const li = document.createElement('li');
        li.textContent = cue;
        cuesList.appendChild(li);
    });
    cuesDiv.appendChild(cuesLabel);
    cuesDiv.appendChild(cuesList);
    overviewContent.appendChild(cuesDiv);

    const equipmentDiv = document.createElement('div');
    equipmentDiv.className = 'week-overview-item';
    const equipmentLabel = document.createElement('h3');
    equipmentLabel.className = 'week-overview-label';
    equipmentLabel.textContent = 'Equipment';
    const equipmentList = document.createElement('ul');
    equipmentList.className = 'week-overview-list';
    week.overview.equipment.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        equipmentList.appendChild(li);
    });
    equipmentDiv.appendChild(equipmentLabel);
    equipmentDiv.appendChild(equipmentList);
    overviewContent.appendChild(equipmentDiv);

    // Render sessions
    const sessionsList = document.getElementById('weekSessionsList');
    
    week.sessions.forEach(session => {
        const sessionCard = document.createElement('div');
        sessionCard.className = `week-session-card ${session.enabled ? 'enabled' : 'disabled'}`;
        if (session.highlight) {
            sessionCard.classList.add('highlighted');
        }

        const sessionLabel = document.createElement('div');
        sessionLabel.className = 'week-session-label';
        sessionLabel.textContent = session.label;

        const sessionDuration = document.createElement('div');
        sessionDuration.className = 'week-session-duration';
        sessionDuration.textContent = `${session.durationMinutes} min`;

        const sessionTheme = document.createElement('h3');
        sessionTheme.className = 'week-session-theme';
        sessionTheme.textContent = session.theme;

        if (session.enabled) {
            const openButton = document.createElement('button');
            openButton.className = 'week-session-open-btn';
            openButton.textContent = 'Open Session';
            openButton.addEventListener('click', function(e) {
                e.stopPropagation();
                if (session.route) {
                    window.location.href = session.route;
                }
            });
            sessionCard.appendChild(openButton);
        } else {
            const lockIcon = document.createElement('div');
            lockIcon.className = 'week-session-lock';
            lockIcon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 10V8C6 5.79086 7.79086 4 10 4H14C16.2091 4 18 5.79086 18 8V10M6 10H4C2.89543 10 2 10.8954 2 12V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V12C22 10.8954 21.1046 10 20 10H18M6 10H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
            sessionCard.appendChild(lockIcon);
        }

        sessionCard.appendChild(sessionLabel);
        sessionCard.appendChild(sessionDuration);
        sessionCard.appendChild(sessionTheme);
        
        sessionsList.appendChild(sessionCard);
    });
});
