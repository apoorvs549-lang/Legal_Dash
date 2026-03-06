// Status steps — ordered progression of case lifecycle
export const STATUS_STEPS = [
    'Submitted',
    'Assigned',
    'Action Taken',
    'Final Review',
    'Closed',
];

// Map each status to its colour palette
export const STATUS_CONFIG = {
    Submitted: {
        progressPercent: 0,
        barColor: 'bg-slate-400',
        textColor: 'text-slate-500',
        badgeBg: 'bg-slate-100',
    },
    Assigned: {
        progressPercent: 25,
        barColor: 'bg-orange-400',
        textColor: 'text-orange-500',
        badgeBg: 'bg-orange-50',
    },
    'Action Taken': {
        progressPercent: 50,
        barColor: 'bg-amber-400',
        textColor: 'text-amber-500',
        badgeBg: 'bg-amber-50',
    },
    'Final Review': {
        progressPercent: 75,
        barColor: 'bg-blue-400',
        textColor: 'text-blue-500',
        badgeBg: 'bg-blue-50',
    },
    Closed: {
        progressPercent: 100,
        barColor: 'bg-emerald-500',
        textColor: 'text-emerald-600',
        badgeBg: 'bg-emerald-50',
    },
};

// Initial mock clients
export const INITIAL_CLIENTS = [
    {
        id: 'LC-2026-001',
        name: 'Sarah Mitchell',
        caseType: 'Civil',
        status: 'Action Taken',
        avatar: `https://ui-avatars.com/api/?name=Sarah+Mitchell&background=6366f1&color=fff&size=80`,
    },
    {
        id: 'LC-2026-002',
        name: 'Robert Chen',
        caseType: 'Criminal',
        status: 'Assigned',
        avatar: `https://ui-avatars.com/api/?name=Robert+Chen&background=f97316&color=fff&size=80`,
    },
    {
        id: 'LC-2026-003',
        name: 'TechCorp Industries',
        caseType: 'Corporate',
        status: 'Final Review',
        avatar: `https://ui-avatars.com/api/?name=TechCorp+Industries&background=10b981&color=fff&size=80`,
    },
    {
        id: 'LC-2026-004',
        name: 'Amara Osei',
        caseType: 'Family',
        status: 'Submitted',
        avatar: `https://ui-avatars.com/api/?name=Amara+Osei&background=ec4899&color=fff&size=80`,
    },
    {
        id: 'LC-2026-005',
        name: 'Marcus Reeves',
        caseType: 'Immigration',
        status: 'Closed',
        avatar: `https://ui-avatars.com/api/?name=Marcus+Reeves&background=14b8a6&color=fff&size=80`,
    },
];
