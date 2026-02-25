// Mock players overview data for demo
// Exposes a single global object: PLAYERS_OVERVIEW

window.PLAYERS_OVERVIEW = {
    stages: [
        {
            id: 'fundamentals',
            name: 'Fundamentals',
            players: [
                {
                    id: 'emma',
                    name: 'Emma',
                    stageId: 'fundamentals',
                    currentWeek: 3,
                    status: 'needs_support', // 'on_track', 'ahead', 'needs_support', 'behind'
                    blockerTag: 'Contact point late',
                    weekProgress: {
                        1: 'completed',
                        2: 'completed',
                        3: 'needs_reinforcement', // current week needing reinforcement
                        4: 'not_started',
                        5: 'not_started',
                        6: 'not_started',
                        7: 'not_started',
                        8: 'not_started',
                        9: 'not_started',
                        10: 'not_started',
                        11: 'not_started',
                        12: 'not_started'
                    }
                },
                {
                    id: 'lucas',
                    name: 'Lucas',
                    stageId: 'fundamentals',
                    currentWeek: 3,
                    status: 'on_track',
                    blockerTag: null,
                    weekProgress: {
                        1: 'completed',
                        2: 'completed',
                        3: 'completed',
                        4: 'not_started',
                        5: 'not_started',
                        6: 'not_started',
                        7: 'not_started',
                        8: 'not_started',
                        9: 'not_started',
                        10: 'not_started',
                        11: 'not_started',
                        12: 'not_started'
                    }
                },
                {
                    id: 'noah',
                    name: 'Noah',
                    stageId: 'fundamentals',
                    currentWeek: 4,
                    status: 'ahead',
                    blockerTag: null,
                    weekProgress: {
                        1: 'completed',
                        2: 'completed',
                        3: 'completed',
                        4: 'completed',
                        5: 'not_started',
                        6: 'not_started',
                        7: 'not_started',
                        8: 'not_started',
                        9: 'not_started',
                        10: 'not_started',
                        11: 'not_started',
                        12: 'not_started'
                    }
                },
                {
                    id: 'sofia',
                    name: 'Sofia',
                    stageId: 'fundamentals',
                    currentWeek: 3,
                    status: 'needs_support',
                    blockerTag: 'Late preparation',
                    weekProgress: {
                        1: 'completed',
                        2: 'needs_reinforcement',
                        3: 'needs_reinforcement',
                        4: 'not_started',
                        5: 'not_started',
                        6: 'not_started',
                        7: 'not_started',
                        8: 'not_started',
                        9: 'not_started',
                        10: 'not_started',
                        11: 'not_started',
                        12: 'not_started'
                    }
                },
                {
                    id: 'liam',
                    name: 'Liam',
                    stageId: 'fundamentals',
                    currentWeek: 2,
                    status: 'behind',
                    blockerTag: 'Grip stability',
                    weekProgress: {
                        1: 'needs_reinforcement',
                        2: 'needs_reinforcement',
                        3: 'not_started',
                        4: 'not_started',
                        5: 'not_started',
                        6: 'not_started',
                        7: 'not_started',
                        8: 'not_started',
                        9: 'not_started',
                        10: 'not_started',
                        11: 'not_started',
                        12: 'not_started'
                    }
                }
            ]
        }
    ]
};

// Helper function to get stage summary
window.getStageSummary = function(stageId) {
    const stage = window.PLAYERS_OVERVIEW.stages.find(s => s.id === stageId);
    if (!stage) return null;
    
    const summary = {
        total: stage.players.length,
        on_track: 0,
        ahead: 0,
        needs_support: 0,
        behind: 0
    };
    
    stage.players.forEach(player => {
        summary[player.status] = (summary[player.status] || 0) + 1;
    });
    
    return summary;
};
