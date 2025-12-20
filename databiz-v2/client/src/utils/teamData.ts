// teamData.ts (or teamData.tsx if you plan to include components)

export interface SocialLinks {
    linkedin: string;
    github: string;
    twitter?: string; // Optional field
}

export interface TeamMember {
    id: number;
    name: string;
    role: string;
    year: string; // e.g., "2025-26"
    image: string;
    bio: string;
    socials: SocialLinks;
}

export const teamData: TeamMember[] = [
    {
        id: 1,
        name: "Ankita Tyagi",
        role: "Student Coordinator",
        year: "2025-26",
        image: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80",
        bio: "Passionate about building communities and leveraging data for social good.",
        socials: {
            linkedin: "#",
            github: "#",
            twitter: "#"
        }
    },
    {
        id: 2,
        name: "Khusi Pal",
        role: "Student Coordinator",
        year: "2025-26",
        image: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80",
        bio: "Data analyst with a focus on machine learning and predictive modeling.",
        socials: {
            linkedin: "#",
            github: "#",
            twitter: "#"
        }
    },
    {
        id: 3,
        name: "Chaitanya",
        role: "Technical Head",
        year: "2025-26",
        image: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80",
        bio: "Full-stack developer who loves exploring new ETL pipelines.",
        socials: {
            linkedin: "#",
            github: "#",
            twitter: "#"
        }
    },
    {
        id: 4,
        name: "Akarshan Pathak",
        role: "Web Developer",
        year: "2025-26",
        image: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80",
        bio: "Ensuring smooth event execution and logistics for the club.",
        socials: {
            linkedin: "#",
            github: "#",
            twitter: "#"
        }
    },
    {
        id: 5,
        name: "Debashish ",
        role: "Web Developer",
        year: "2025-26",
        image: "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?semt=ais_hybrid&w=740&q=80",
        bio: "Connecting our data insights with the student body through stories.",
        socials: {
            linkedin: "#",
            github: "#",
            twitter: "#"
        }
    },
];

/**
 * Filter team members by academic year
 * @param year - The string representing the batch (e.g., "2025-26")
 */
export const getTeamByYear = (year: string): TeamMember[] => {
    return teamData.filter(member => member.year === year);
};

/**
 * Helper to get all unique years available in the team data
 * Useful for building a filter dropdown/tabs in the UI
 */
export const getAvailableYears = (): string[] => {
    const years = teamData.map(member => member.year);
    return Array.from(new Set(years)).sort().reverse();
};