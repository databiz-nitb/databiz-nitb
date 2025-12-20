// eventData.ts

export interface ClubEvent {
    _id: string; // Changed from id: number
    title: string;
    description: string;
    longDescription: string; // Contains HTML string
    startsAt: string; // Changed from date/time
    endsAt?: string;
    location: string;
    category: 'Conference' | 'Hackathon' | 'Workshop' | 'Industry Talk' | 'Competition';
    ImageUrl: string; // Changed from image
    createdBy: string; // Changed from organizer
    capacity: string;
    registrationLink: string;
    status: 'Open' | 'Filling Fast' | 'Closed';
}

export const eventData: ClubEvent[] = [
    {
        _id: "1",
        title: "Data Science Summit 2025",
        description: "Join us for a day of insightful talks from industry leaders, hands-on workshops, and networking opportunities.",
        longDescription: `
            <h2>About the Summit</h2>
            <p>The Data Science Summit 2025 is our flagship annual event bringing together data scientists, analysts, and industry leaders.</p>
            <h2>Schedule Highlights</h2>
            <ul>
                <li>10:00 AM - Opening Keynote: "The Future of AI"</li>
                <li>11:30 AM - Workshop Session 1: Machine Learning Fundamentals</li>
            </ul>
        `,
        startsAt: "2025-03-15T10:00:00.000Z",
        endsAt: "2025-03-15T16:00:00.000Z",
        location: "Main Auditorium, Tech Campus",
        category: "Conference",
        ImageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
        createdBy: "Data Science Club",
        capacity: "200 seats",
        registrationLink: "#register",
        status: "Open"
    },
    {
        _id: "2",
        title: "Hackathon: AI for Good",
        description: "Build solutions that matter. Collaborate with peers to solve real-world challenges using AI and Machine Learning.",
        longDescription: `
            <h2>Event Overview</h2>
            <p>Join us for an intensive 48-hour hackathon where you'll work with a team to build AI-powered solutions.</p>
            <h2>Themes</h2>
            <ul>
                <li><strong>Healthcare:</strong> AI solutions for patient care</li>
                <li><strong>Environment:</strong> Climate change prediction</li>
            </ul>
        `,
        startsAt: "2025-04-05T18:00:00.000Z",
        endsAt: "2025-04-07T18:00:00.000Z",
        location: "Hybrid (Online & Campus)",
        category: "Hackathon",
        ImageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
        createdBy: "Tech Innovation Lab",
        capacity: "50 teams (3-4 members each)",
        registrationLink: "#register",
        status: "Filling Fast"
    },
    {
        _id: "3",
        title: "Python Workshop: From Basics to Advanced",
        description: "Master Python programming through hands-on exercises, real-world projects, and expert guidance.",
        longDescription: `
            <h2>Workshop Description</h2>
            <p>This comprehensive 2-day workshop will take you from Python basics to advanced concepts.</p>
            <h2>Day 1: Foundations</h2>
            <ul>
                <li>Python syntax and data types</li>
                <li>Control flow and functions</li>
            </ul>
        `,
        startsAt: "2025-03-20T09:00:00.000Z",
        endsAt: "2025-03-20T17:00:00.000Z",
        location: "Computer Lab, Building C",
        category: "Workshop",
        ImageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=400&fit=crop",
        createdBy: "Data Science Club",
        capacity: "30 participants",
        registrationLink: "#register",
        status: "Open"
    },
    {
        _id: "4",
        title: "Industry Talk: Career Paths in Data Science",
        description: "Hear from data science professionals about their career journeys and industry insights.",
        longDescription: `
            <h2>Featured Speakers</h2>
            <ul>
                <li><strong>Sarah Johnson</strong> - Senior Data Scientist at Google</li>
                <li><strong>Michael Chen</strong> - ML Engineer at Amazon</li>
            </ul>
        `,
        startsAt: "2025-04-12T18:00:00.000Z",
        endsAt: "2025-04-12T20:00:00.000Z",
        location: "Auditorium Hall",
        category: "Industry Talk",
        ImageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=400&fit=crop",
        createdBy: "Career Development Center",
        capacity: "150 seats",
        registrationLink: "#register",
        status: "Open"
    },
    {
        _id: "5",
        title: "Data Visualization Competition",
        description: "Showcase your creativity! Create stunning visualizations from provided datasets and compete for prizes.",
        longDescription: `
            <h2>Judging Criteria</h2>
            <ul>
                <li>Clarity and insight (40%)</li>
                <li>Aesthetic appeal (30%)</li>
            </ul>
        `,
        startsAt: "2025-04-25T16:00:00.000Z",
        location: "Virtual Event (Online)",
        category: "Competition",
        ImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
        createdBy: "Data Science Club",
        capacity: "Unlimited",
        registrationLink: "#register",
        status: "Open"
    }
];

/**
 * Helper to fetch event by ID
 */
export const getEventById = (id: string): ClubEvent | undefined => {
    return eventData.find(event => event._id === id);
};

/**
 * Get upcoming events sorted by date
 */
export const getUpcomingEvents = (limit: number | null = null): ClubEvent[] => {
    const sorted = [...eventData].sort((a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );
    return limit ? sorted.slice(0, limit) : sorted;
};