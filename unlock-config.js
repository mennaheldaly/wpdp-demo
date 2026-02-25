// Centralized allowlist configuration for unlocked items in demo
// Only items in these arrays are clickable; all others are locked

window.UNLOCK_CONFIG = {
    // Unlocked stage IDs (only Fundamentals is unlocked)
    unlockedStageIds: ['fundamentals'],
    
    // Unlocked action card IDs (only View Annual Plan is unlocked)
    unlockedCardIds: ['viewAnnualPlanTile'],
    
    // Unlocked calendar session IDs (only Session 2 — Contact Point Consistency is unlocked)
    unlockedEventIds: ['session-6']
};

// Helper function to check if a stage is unlocked
window.isStageUnlocked = function(stageId) {
    return window.UNLOCK_CONFIG.unlockedStageIds.includes(stageId);
};

// Helper function to check if a card is unlocked
window.isCardUnlocked = function(cardId) {
    return window.UNLOCK_CONFIG.unlockedCardIds.includes(cardId);
};

// Helper function to check if an event is unlocked
window.isEventUnlocked = function(eventId) {
    return window.UNLOCK_CONFIG.unlockedEventIds.includes(eventId);
};
