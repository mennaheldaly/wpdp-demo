// Mock data for Fundamentals Annual Plan (demo-only)
// Exposes a single global object: FUNDAMENTALS_ANNUAL_PLAN

window.FUNDAMENTALS_ANNUAL_PLAN = {
    stageId: 'fundamentals',
    stageName: 'Fundamentals',
    annualSummary: 'A structured year-long plan to help coaches progress players through core technical fundamentals.',
    endOfYearGoals: {
        description: 'By the end of this plan, players can rally consistently, control direction/height, and start points with a simple serve + return routine.',
        bullets: [
            'Rally 6–10+ balls with appropriate equipment and basic consistency',
            'Use a repeatable contact point with early preparation on both sides',
            'Understand basic positioning + recovery (ready position, spacing, move-hit-recover)'
        ]
    },
    blocks: [
        {
            id: 'block-1',
            title: 'Block 1',
            subtitle: 'Weeks 1–12',
            name: 'Building Basic Control',
            enabled: true,
            description: 'Introduce core rally skills, contact point awareness, and basic movement habits.',
            blockGoals: {
                description: 'Build a reliable contact point and rally rhythm, while introducing simple movement habits.',
                priorities: [
                    'Contact point in front + early preparation',
                    'Rally rhythm (send/receive consistently)',
                    'Move-hit-recover basics (ready position, spacing)'
                ]
            },
            weeks: [
                {
                    id: 'week-1',
                    label: 'Week 1',
                    enabled: false,
                    focus: 'Getting organized on court',
                    objectives: [
                        'Players experience fun, safe first contacts with the ball.',
                        'Coach tests basic movement and grip comfort.'
                    ]
                },
                {
                    id: 'week-2',
                    label: 'Week 2',
                    enabled: false,
                    focus: 'Basic rally rhythm',
                    objectives: [
                        'Players begin to send and receive with consistency.',
                        'Coach introduces simple self-rally challenges.'
                    ]
                },
                {
                    id: 'week-3',
                    label: 'Week 3',
                    enabled: true,
                    highlight: true,
                    focus: 'Contact Point Foundations',
                    objectives: [
                        'Help players feel meeting the ball in front of the body.',
                        'Connect early racquet preparation to clean contact.'
                    ],
                    route: 'fundamentals-annual-week-3.html'
                },
                // Placeholder weeks 4–12 (disabled)
                ...Array.from({ length: 9 }).map((_, index) => {
                    const weekNumber = index + 4;
                    return {
                        id: `week-${weekNumber}`,
                        label: `Week ${weekNumber}`,
                        enabled: false,
                        focus: 'Coming soon',
                        objectives: [
                            'Future content placeholder for full-season build-out.'
                        ]
                    };
                })
            ]
        },
        {
            id: 'block-2',
            title: 'Block 2',
            subtitle: 'Weeks 13–24',
            name: 'Developing Consistent Contact',
            enabled: false
        },
        {
            id: 'block-3',
            title: 'Block 3',
            subtitle: 'Weeks 25–36',
            name: 'Sustaining Rally and Movement',
            enabled: false
        },
        {
            id: 'block-4',
            title: 'Block 4',
            subtitle: 'Weeks 37–48',
            name: 'Applying Control in Game Situations',
            enabled: false
        }
    ],
    week3: {
        id: 'week-3',
        title: 'Week 3 — Contact Point Foundations',
        blockLabel: 'Block 1 • Weeks 1–12',
        stageLabel: 'Fundamentals',
        overview: {
            objective: 'Give players a clear, repeatable feeling of meeting the ball in front, with simple cues they can repeat in every rally.',
            coachingCues: [
                '“See the ball on the strings in front of your hip.”',
                '“Prepare early, then wait and meet the ball — don’t chase it into your body.”',
                '“Finish balanced and ready for the next shot.”'
            ],
            equipment: [
                'Red/orange balls',
                '2–3 mini nets or half court',
                'Flat markers/cones for contact zones'
            ]
        },
        sessions: [
            {
                id: 'session-1',
                label: 'Session 1',
                enabled: false,
                durationMinutes: 60,
                theme: 'Intro to clean contact'
            },
            {
                id: 'session-2',
                label: 'Session 2',
                enabled: true,
                highlight: true,
                durationMinutes: 60,
                theme: 'Meet the ball in front',
                route: 'fundamentals-annual-week-3-session-2.html'
            },
            {
                id: 'session-3',
                label: 'Session 3',
                enabled: false,
                durationMinutes: 60,
                theme: 'Applying contact skills in points'
            }
        ]
    },
    session2: {
        id: 'session-2',
        title: 'Session 2 — Contact Point Consistency',
        durationMinutes: 60,
        theme: 'Meet the ball in front',
        sections: [
            {
                id: 'warm-up',
                title: 'Warm-up',
                timeMinutes: 10,
                drills: [
                    {
                        id: 'warmup-1',
                        name: 'Dynamic movement & shadow swings',
                        demonstrationVideo: {
                            thumbnailUrl: 'video-thumbnail-1.jpg',
                            videoUrl: 'videos/building-forehand-swing-path.m4v',
                            duration: '1:45',
                            title: 'Dynamic Movement & Shadow Swings — Demonstration'
                        },
                        setup: 'Players in pairs on service boxes, moving through split-step and shadow swings.',
                        cues: [
                            'Soft split-step before every imaginary ball.',
                            'Freeze the "contact point" in front of the body.'
                        ],
                        commonMistake: 'Players let the imaginary ball drift too far in, finishing crowded.',
                        fixVideos: ['early-prep', 'contact-point']
                    }
                ]
            },
            {
                id: 'technical-focus',
                title: 'Technical focus',
                timeMinutes: 20,
                drills: [
                    {
                        id: 'tech-1',
                        name: 'Drop-feed contact point ladder',
                        demonstrationVideo: {
                            thumbnailUrl: 'video-thumbnail-2.jpg',
                            videoUrl: 'videos/building-forehand-swing-path.m4v',
                            duration: '1:12',
                            title: 'Drop-Feed Contact Point Ladder — Demonstration'
                        },
                        setup: 'Coach (or partner) drop-feeds from the net; players aim to contact on markers in front.',
                        cues: [
                            '"Turn, prepare, then wait."',
                            '"See the strings meet the ball in front of the hip."'
                        ],
                        commonMistake: 'Player swings early with the ball still beside or behind them.',
                        fixVideos: ['contact-point', 'right-grip']
                    }
                ]
            },
            {
                id: 'rally-exercise',
                title: 'Rally exercise',
                timeMinutes: 20,
                drills: [
                    {
                        id: 'rally-1',
                        name: 'Short-court contact rallies',
                        demonstrationVideo: {
                            thumbnailUrl: 'video-thumbnail-3.jpg',
                            videoUrl: 'videos/building-forehand-swing-path.m4v',
                            duration: '2:05',
                            title: 'Short-Court Contact Rallies — Demonstration'
                        },
                        setup: 'Pairs rally in the service boxes, counting only contacts that happen in front of the body.',
                        cues: [
                            'Call out "front" when the contact feels clean.',
                            'Hold finish for a second to check balance.'
                        ],
                        commonMistake: 'Player moves backwards while hitting instead of adjusting with small steps.',
                        fixVideos: ['early-prep']
                    }
                ]
            },
            {
                id: 'game-apply',
                title: 'Game / Apply',
                timeMinutes: 10,
                drills: [
                    {
                        id: 'game-1',
                        name: 'First to five "clean contacts"',
                        demonstrationVideo: {
                            thumbnailUrl: 'video-thumbnail-4.jpg',
                            videoUrl: 'videos/building-forehand-swing-path.m4v',
                            duration: '1:30',
                            title: 'First to Five "Clean Contacts" — Demonstration'
                        },
                        setup: 'Mini game: point only counts if player calls "front" and finishes balanced.',
                        cues: [
                            'Reward brave swings that finish balanced in front.',
                            'Encourage players to self-assess contact quality.'
                        ],
                        commonMistake: 'Players rush serves/returns and abandon contact point focus to "just win points".',
                        fixVideos: ['contact-point']
                    }
                ]
            }
        ]
    }
};

