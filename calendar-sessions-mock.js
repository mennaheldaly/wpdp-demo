// Mock calendar sessions data for demo
// Exposes a single global object: CALENDAR_SESSIONS

window.CALENDAR_SESSIONS = [
    // Completed sessions (grey style, checkmark icon)
    {
        id: 'session-1',
        date: '2026-02-09',
        time: '17:00',
        title: 'Session 1 — Grip & Ready Position',
        status: 'completed',
        route: null,
        stage: 'fundamentals',
        group: 'Monday 5pm Group',
        players: ['Emma', 'Lucas', 'Noah']
    },
    {
        id: 'session-2',
        date: '2026-02-11',
        time: '17:00',
        title: 'Session 2 — Contact Point Introduction',
        status: 'completed',
        route: null,
        stage: 'fundamentals',
        group: 'Wednesday 5pm Group',
        players: ['Sofia', 'Liam']
    },
    {
        id: 'session-3',
        date: '2026-02-16',
        time: '17:00',
        title: 'Session 3 — Rally Rhythm Basics',
        status: 'completed',
        route: null,
        stage: 'fundamentals',
        group: 'Monday 5pm Group',
        players: ['Emma', 'Lucas', 'Noah']
    },
    {
        id: 'session-4',
        date: '2026-02-18',
        time: '17:00',
        title: 'Session 4 — Movement Foundations',
        status: 'completed',
        route: null,
        stage: 'fundamentals',
        group: 'Wednesday 5pm Group',
        players: ['Sofia', 'Liam']
    },
    // Planned session (white background, red border)
    {
        id: 'session-5',
        date: '2026-02-23',
        time: '17:00',
        title: 'Session 5 — Contact Point Reinforcement',
        status: 'planned',
        route: null,
        stage: 'fundamentals',
        group: 'Monday 5pm Group',
        players: ['Emma', 'Lucas', 'Noah']
    },
    // Active session (red primary - this is the existing Week 3 Session 2)
    {
        id: 'session-6',
        date: '2026-02-25',
        time: '17:00',
        title: 'Session 2 — Contact Point Consistency',
        status: 'active',
        route: 'fundamentals-annual-week-3-session-2.html',
        stage: 'fundamentals',
        group: 'Wednesday 5pm Group',
        players: ['Sofia', 'Liam']
    },
    // Locked future sessions (greyed, lock icon)
    {
        id: 'session-7',
        date: '2026-03-02',
        time: '17:00',
        title: 'Session 7 — Rally Direction Control',
        status: 'locked',
        route: null,
        stage: 'stage3',
        group: 'Monday 5pm Group',
        players: ['Emma', 'Lucas']
    },
    {
        id: 'session-8',
        date: '2026-03-04',
        time: '17:00',
        title: 'Session 8 — Intro to Tactical Intentions',
        status: 'locked',
        route: null,
        stage: 'stage4',
        group: 'Wednesday 5pm Group',
        players: ['Noah', 'Sofia']
    },
    // Stage 3 placeholder sessions
    {
        id: 'session-stage3-1',
        date: '2026-02-12',
        time: '17:00',
        title: 'Stage 3 — Advanced Rally Patterns',
        status: 'completed',
        route: null,
        stage: 'stage3',
        group: 'Monday 5pm Group',
        players: ['Emma', 'Lucas']
    },
    {
        id: 'session-stage3-2',
        date: '2026-02-19',
        time: '17:00',
        title: 'Stage 3 — Tactical Decision Making',
        status: 'planned',
        route: null,
        stage: 'stage3',
        group: 'Wednesday 5pm Group',
        players: ['Noah', 'Sofia']
    },
    {
        id: 'session-stage3-3',
        date: '2026-02-26',
        time: '17:00',
        title: 'Stage 3 — Match Play Preparation',
        status: 'active',
        route: null,
        stage: 'stage3',
        group: 'Monday 5pm Group',
        players: ['Emma', 'Lucas', 'Noah']
    },
    {
        id: 'session-stage3-4',
        date: '2026-03-05',
        time: '17:00',
        title: 'Stage 3 — Advanced Tactical Play',
        status: 'locked',
        route: null,
        stage: 'stage3',
        group: 'Wednesday 5pm Group',
        players: ['Sofia', 'Liam']
    },
    // Stage 4 placeholder sessions
    {
        id: 'session-stage4-1',
        date: '2026-02-13',
        time: '17:00',
        title: 'Stage 4 — Competitive Strategy',
        status: 'completed',
        route: null,
        stage: 'stage4',
        group: 'Monday 5pm Group',
        players: ['Noah', 'Sofia']
    },
    {
        id: 'session-stage4-2',
        date: '2026-02-20',
        time: '17:00',
        title: 'Stage 4 — Performance Optimization',
        status: 'planned',
        route: null,
        stage: 'stage4',
        group: 'Wednesday 5pm Group',
        players: ['Emma', 'Lucas']
    },
    {
        id: 'session-stage4-3',
        date: '2026-02-27',
        time: '17:00',
        title: 'Stage 4 — Tournament Preparation',
        status: 'active',
        route: null,
        stage: 'stage4',
        group: 'Monday 5pm Group',
        players: ['Noah', 'Sofia', 'Liam']
    },
    {
        id: 'session-stage4-4',
        date: '2026-03-06',
        time: '17:00',
        title: 'Stage 4 — Elite Performance',
        status: 'locked',
        route: null,
        stage: 'stage4',
        group: 'Wednesday 5pm Group',
        players: ['Emma', 'Lucas', 'Noah']
    }
];
