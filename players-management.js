// Players Management page - renders player list and handles add/view
document.addEventListener('DOMContentLoaded', function() {
    const overview = window.PLAYERS_OVERVIEW;
    
    if (!overview) {
        console.error('PLAYERS_OVERVIEW data not found');
        return;
    }

    // Local state for players (demo only)
    let playersData = JSON.parse(JSON.stringify(overview)); // Deep copy for local modifications

    // Status display mapping
    const statusDisplay = {
        'on_track': 'On track',
        'ahead': 'Ahead',
        'needs_support': 'Needs support',
        'behind': 'Behind'
    };

    // Render players by stage
    function renderPlayersByStage() {
        const container = document.getElementById('playersByStageSection');
        container.innerHTML = '';

        playersData.stages.forEach(stage => {
            const stageGroup = document.createElement('div');
            stageGroup.className = 'players-stage-group';

            const stageHeader = document.createElement('div');
            stageHeader.className = 'players-stage-group-header';
            stageHeader.innerHTML = `
                <h2 class="players-stage-group-title">${stage.name.toUpperCase()}</h2>
                <span class="players-stage-group-count">${stage.players.length} players</span>
            `;
            stageGroup.appendChild(stageHeader);

            const playersList = document.createElement('div');
            playersList.className = 'players-list-rows';

            stage.players.forEach(player => {
                const row = document.createElement('div');
                row.className = `players-list-row status-${player.status}`;
                row.setAttribute('data-player-id', player.id);

                row.innerHTML = `
                    <div class="players-list-row-name">${player.name}</div>
                    <div class="players-list-row-week">Week ${player.currentWeek}</div>
                    <div class="players-list-row-status">
                        <span class="players-status-badge status-${player.status}">${statusDisplay[player.status] || player.status}</span>
                    </div>
                    <div class="players-list-row-focus">${player.blockerTag || '—'}</div>
                `;

                row.addEventListener('click', function() {
                    openPlayerOverview(player);
                });

                playersList.appendChild(row);
            });

            stageGroup.appendChild(playersList);
            container.appendChild(stageGroup);
        });
    }

    // Get week session data for tooltips
    function getWeekSessionData(week) {
        const sessionData = {
            1: { focus: 'Grip & Contact Foundations' },
            2: { focus: 'Basic Rally Rhythm' },
            3: { focus: 'Contact Point Consistency' },
            4: { focus: 'Movement Foundations' },
            5: { focus: 'Contact Point Reinforcement' },
            6: { focus: 'Rally Direction Control' },
            7: { focus: 'Advanced Rally Patterns' },
            8: { focus: 'Intro to Tactical Intentions' },
            9: { focus: 'Tactical Decision Making' },
            10: { focus: 'Match Play Preparation' },
            11: { focus: 'Advanced Tactical Play' },
            12: { focus: 'Stage Completion Review' }
        };
        return sessionData[week] || { focus: 'Session Focus' };
    }

    // Get week status display text
    function getWeekStatusText(state, week, player) {
        if (state === 'completed') {
            return 'Completed';
        } else if (state === 'needs_reinforcement') {
            return 'Needs support';
        } else if (week === player.currentWeek && state === 'not_started') {
            return 'On track';
        } else if (week < player.currentWeek && state === 'not_started') {
            return 'Behind';
        } else {
            return 'Not started';
        }
    }

    // Get week blocker (if exists)
    function getWeekBlocker(week, player) {
        // If this is the current week and player has a blocker tag, show it
        if (week === player.currentWeek && player.blockerTag) {
            return player.blockerTag;
        }
        // For weeks needing reinforcement, show blocker if it matches
        const weekProgress = player.weekProgress || {};
        if (weekProgress[week] === 'needs_reinforcement' && player.blockerTag) {
            return player.blockerTag;
        }
        return null;
    }

    // Generate week progress tracker HTML
    function renderWeekProgressTracker(player) {
        const weekProgress = player.weekProgress || {};
        let html = '<div class="player-week-tracker">';
        
        for (let week = 1; week <= 12; week++) {
            const state = weekProgress[week] || 'not_started';
            let icon = '';
            let stateClass = '';
            let isClickable = false;
            
            if (state === 'completed') {
                icon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 4L6 11.3333L2.66667 8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                stateClass = 'week-completed';
                isClickable = true;
            } else if (state === 'needs_reinforcement') {
                icon = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.66667V8M8 13.3333V8M8 8H2.66667M8 8H13.3333" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>';
                stateClass = 'week-needs-reinforcement';
                isClickable = true; // Current week is clickable
            } else if (week === player.currentWeek) {
                stateClass = 'week-current';
                isClickable = true; // Current week is clickable
            } else {
                icon = '';
                stateClass = 'week-not-started';
            }

            // Get tooltip data
            const sessionData = getWeekSessionData(week);
            const statusText = getWeekStatusText(state, week, player);
            const blocker = getWeekBlocker(week, player);

            // Build tooltip content
            let tooltipContent = `<div class="week-tooltip-line week-tooltip-week">Week ${week}</div>`;
            tooltipContent += `<div class="week-tooltip-line week-tooltip-focus">${sessionData.focus}</div>`;
            // Use state for status class, but handle current week specially
            const statusClass = (week === player.currentWeek && state === 'not_started') ? 'current' : state;
            tooltipContent += `<div class="week-tooltip-line week-tooltip-status status-${statusClass}">${statusText}</div>`;
            if (blocker) {
                tooltipContent += `<div class="week-tooltip-line week-tooltip-blocker">${blocker}</div>`;
            }

            const clickHandler = isClickable 
                ? `onclick="window.location.href='fundamentals-annual-week-${week}-session-2.html'"` 
                : '';
            const cursorClass = isClickable ? 'week-clickable' : '';
            
            html += `
                <div class="player-week-item ${stateClass} ${cursorClass}" ${clickHandler}>
                    <div class="player-week-number">${week}</div>
                    <div class="player-week-icon">${icon}</div>
                    <div class="week-tooltip">${tooltipContent}</div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    }

    // Get recommended next session (mock data)
    function getRecommendedSession(player) {
        const sessionTitles = {
            1: 'Session 1 — Grip & Ready Position',
            2: 'Session 2 — Contact Point Introduction',
            3: 'Session 3 — Rally Rhythm Basics',
            4: 'Session 4 — Movement Foundations',
            5: 'Session 5 — Contact Point Reinforcement',
            6: 'Session 6 — Contact Point Consistency',
            7: 'Session 7 — Rally Direction Control',
            8: 'Session 8 — Intro to Tactical Intentions',
            9: 'Session 9 — Advanced Rally Patterns',
            10: 'Session 10 — Tactical Decision Making',
            11: 'Session 11 — Match Play Preparation',
            12: 'Session 12 — Stage Completion Review'
        };
        
        // If current week needs reinforcement, recommend that week's session
        // Otherwise recommend next week's session
        const weekProgress = player.weekProgress || {};
        const currentWeekState = weekProgress[player.currentWeek];
        const recommendedWeek = (currentWeekState === 'needs_reinforcement') 
            ? player.currentWeek 
            : Math.min(player.currentWeek + 1, 12);
        
        return {
            week: recommendedWeek,
            title: sessionTitles[recommendedWeek] || `Session ${recommendedWeek}`
        };
    }

    // Open player overview drawer
    function openPlayerOverview(player) {
        const drawer = document.getElementById('playerOverviewDrawer');
        const overlay = document.getElementById('playerOverviewDrawerOverlay');
        const drawerContent = document.getElementById('playerOverviewDrawerContent');
        const drawerTitle = document.getElementById('playerOverviewDrawerTitle');

        // Find stage for player
        const stage = playersData.stages.find(s => s.id === player.stageId);
        const stageName = stage ? stage.name : 'Unknown';

        // Get recommended session
        const recommendedSession = getRecommendedSession(player);

        // Update header with player name, stage/week, and status
        drawerTitle.innerHTML = `
            <div class="player-snapshot-header-main">
                <div class="player-snapshot-name">${player.name}</div>
                <div class="player-snapshot-header-meta">
                    <div class="player-snapshot-stage-week">
                        <span class="player-snapshot-stage">${stageName}</span>
                        <span class="player-snapshot-separator">•</span>
                        <span class="player-snapshot-week">Week ${player.currentWeek}</span>
                    </div>
                    <div class="player-snapshot-status-badge">
                        <span class="players-status-badge status-${player.status}">${statusDisplay[player.status] || player.status}</span>
                    </div>
                </div>
            </div>
        `;

        drawerContent.innerHTML = `

            <!-- Current Focus Section -->
            <div class="player-snapshot-section">
                <h3 class="player-snapshot-section-title">Current focus</h3>
                <div class="player-snapshot-focus-content">
                    ${player.blockerTag ? `<span class="player-snapshot-focus-tag">${player.blockerTag}</span>` : '<span class="player-snapshot-focus-empty">No focus identified</span>'}
                </div>
            </div>

            <!-- Level Progress Tracker -->
            <div class="player-snapshot-section">
                <h3 class="player-snapshot-section-title">Fundamentals progress</h3>
                ${renderWeekProgressTracker(player)}
            </div>

            <!-- Recommended Next Step -->
            <div class="player-snapshot-section">
                <h3 class="player-snapshot-section-title">Recommended next step</h3>
                <div class="player-snapshot-recommended-content">
                    <p class="player-snapshot-recommended-session">${recommendedSession.title}</p>
                    <button class="player-overview-action-btn" onclick="window.location.href='fundamentals-annual-week-${recommendedSession.week}-session-2.html'">
                        Open Session Plan
                    </button>
                </div>
            </div>
        `;

        overlay.style.display = 'flex';
        setTimeout(() => {
            drawer.classList.add('open');
        }, 10);
    }

    // Close player overview drawer
    function closePlayerOverview() {
        const drawer = document.getElementById('playerOverviewDrawer');
        const overlay = document.getElementById('playerOverviewDrawerOverlay');

        drawer.classList.remove('open');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 300);
    }

    // Open add player modal
    function openAddPlayerModal() {
        const modal = document.getElementById('addPlayerModalOverlay');
        modal.style.display = 'flex';
        setTimeout(() => {
            document.getElementById('addPlayerModal').classList.add('open');
        }, 10);
    }

    // Close add player modal
    function closeAddPlayerModal() {
        const modal = document.getElementById('addPlayerModalOverlay');
        const modalContent = document.getElementById('addPlayerModal');
        
        modalContent.classList.remove('open');
        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('addPlayerForm').reset();
        }, 300);
    }

    // Add new player
    function addNewPlayer(playerData) {
        const stage = playersData.stages.find(s => s.id === playerData.stageId);
        if (!stage) return;

        const newPlayer = {
            id: `player-${Date.now()}`,
            name: playerData.name,
            stageId: playerData.stageId,
            currentWeek: parseInt(playerData.currentWeek),
            status: 'on_track', // Default status
            blockerTag: null
        };

        stage.players.push(newPlayer);
        renderPlayersByStage();
    }

    // Populate week dropdown
    const weekSelect = document.getElementById('playerWeekSelect');
    for (let i = 1; i <= 12; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Week ${i}`;
        weekSelect.appendChild(option);
    }

    // Event handlers
    document.getElementById('addPlayerBtn').addEventListener('click', openAddPlayerModal);
    document.getElementById('addPlayerModalClose').addEventListener('click', closeAddPlayerModal);
    document.getElementById('addPlayerCancelBtn').addEventListener('click', closeAddPlayerModal);
    
    document.getElementById('addPlayerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('playerNameInput').value.trim();
        const stageId = document.getElementById('playerStageSelect').value;
        const currentWeek = document.getElementById('playerWeekSelect').value;

        if (name) {
            addNewPlayer({ name, stageId, currentWeek });
            closeAddPlayerModal();
        }
    });

    document.getElementById('playerOverviewDrawerOverlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closePlayerOverview();
        }
    });

    document.getElementById('playerOverviewDrawerClose').addEventListener('click', closePlayerOverview);

    // Initial render
    renderPlayersByStage();
});
