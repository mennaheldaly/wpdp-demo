// Mock players data for demo
// Exposes a single global object: WPDP_PLAYERS

window.WPDP_PLAYERS = [
    {
        id: 'emma',
        name: 'Emma',
        status: 'on_track', // Overall status
        sessionStatus: 'needs_support', // 'not_assessed', 'on_track', 'needs_support', 'struggled'
        stageId: 'fundamentals',
        stage: 'Fundamentals',
        currentWeek: 3,
        blockerTag: 'Contact point too late',
        checklistCompletionPct: 50 // 2/4 = 50%
    },
    {
        id: 'lucas',
        name: 'Lucas',
        status: 'on_track',
        sessionStatus: 'on_track',
        stageId: 'fundamentals',
        stage: 'Fundamentals',
        currentWeek: 3,
        blockerTag: null,
        checklistCompletionPct: 100 // 4/4 = 100%
    },
    {
        id: 'noah',
        name: 'Noah',
        status: 'on_track',
        sessionStatus: 'not_assessed',
        stageId: 'fundamentals',
        stage: 'Fundamentals',
        currentWeek: 3,
        blockerTag: null,
        checklistCompletionPct: 0
    },
    {
        id: 'sofia',
        name: 'Sofia',
        status: 'on_track',
        sessionStatus: 'struggled',
        stageId: 'fundamentals',
        stage: 'Fundamentals',
        currentWeek: 3,
        blockerTag: 'Late preparation',
        checklistCompletionPct: 25 // 1/4 = 25%
    },
    {
        id: 'liam',
        name: 'Liam',
        status: 'on_track',
        sessionStatus: 'on_track',
        stageId: 'fundamentals',
        stage: 'Fundamentals',
        currentWeek: 3,
        blockerTag: null,
        checklistCompletionPct: 75 // 3/4 = 75%
    }
];

// Session checklist items (reused from session data)
window.SESSION_CHECKLIST_ITEMS = [
    'Racquet prepared',
    'Contact in front',
    'Swing low → high',
    'Finish above shoulder'
];

// Primary blocker options
window.PRIMARY_BLOCKER_OPTIONS = [
    'No blocker',
    'Contact point too late',
    'Late preparation',
    'Grip instability',
    'Follow-through inconsistency'
];

// Blocker to video mapping for quick fix recommendations
window.BLOCKER_VIDEO_MAP = {
    'Contact point too late': 'contact-point',
    'Late preparation': 'early-prep',
    'Grip instability': 'right-grip',
    'Follow-through inconsistency': 'forehand-swing-path'
};
