// Players overview page - renders stage cards
document.addEventListener('DOMContentLoaded', function() {
    const overview = window.PLAYERS_OVERVIEW;
    const getStageSummary = window.getStageSummary;
    
    if (!overview) {
        console.error('PLAYERS_OVERVIEW data not found');
        return;
    }

    const container = document.getElementById('playersStageCards');
    
    overview.stages.forEach(stage => {
        const summary = getStageSummary(stage.id);
        if (!summary) return;
        
        const card = document.createElement('div');
        card.className = 'players-stage-card';
        
        card.innerHTML = `
            <div class="players-stage-card-header">
                <h2 class="players-stage-card-title">${stage.name}</h2>
                <div class="players-stage-card-count">${summary.total} players</div>
            </div>
            <div class="players-stage-card-summary">
                <div class="players-stage-summary-item">
                    <span class="players-stage-summary-label">On track:</span>
                    <span class="players-stage-summary-value">${summary.on_track}</span>
                </div>
                <div class="players-stage-summary-item">
                    <span class="players-stage-summary-label">Ahead:</span>
                    <span class="players-stage-summary-value">${summary.ahead}</span>
                </div>
                <div class="players-stage-summary-item">
                    <span class="players-stage-summary-label">Needs support:</span>
                    <span class="players-stage-summary-value">${summary.needs_support}</span>
                </div>
            </div>
            <button class="players-stage-card-btn" data-stage-id="${stage.id}">View players</button>
        `;
        
        // Add click handler for button
        card.querySelector('.players-stage-card-btn').addEventListener('click', function() {
            window.location.href = `players-${stage.id}.html`;
        });
        
        container.appendChild(card);
    });
});
