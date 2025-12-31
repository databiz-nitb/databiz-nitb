// // blogData.ts

// export interface BlogPost {
//     _id: string; // Changed from id: number
//     title: string;
//     excerpt: string; // UI-only field
//     content: string; // Contains HTML string
//     image: string; // UI-only field (not in backend schema)
//     author: { name: string; _id?: string }; // Changed to object to match backend ref
//     publishedAt: string; // Changed from date
//     tags: string[]; // Changed from category (single string)
//     readTime: string; // UI-only field
// }

// // Mock blog data for demonstration
// export const blogData: BlogPost[] = [
//     {
//         _id: "1",
//         title: "Introduction to Machine Learning: A Beginner's Guide",
//         excerpt: "Dive into the fundamentals of machine learning and discover how algorithms learn from data to make predictions and decisions.",
//         content: `
//             <h2>What is Machine Learning?</h2>
//             <p>Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed.</p>
            
//             <h2>Types of Machine Learning</h2>
            
//             <p>There are three main types of machine learning:</p>
//             <ul>
//                 <li><strong>Supervised Learning:</strong> The algorithm learns from labeled training data</li>
//                 <li><strong>Unsupervised Learning:</strong> The algorithm finds patterns in unlabeled data</li>
//                 <li><strong>Reinforcement Learning:</strong> The algorithm learns through trial and error</li>
//             </ul>
//         `,
//         image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
//         author: { name: "Akarshan Pathak", _id: "author1" },
//         publishedAt: "2025-01-15T00:00:00.000Z",
//         tags: ["Machine Learning", "AI", "Beginner"],
//         readTime: "5 min read"
//     },
//     {
//         _id: "2",
//         title: "Data Visualization Best Practices with Python",
//         excerpt: "Learn how to create compelling and informative visualizations using Python libraries like Matplotlib, Seaborn, and Plotly.",
//         content: `
//             <h2>The Power of Data Visualization</h2>
//             <p>Data visualization is crucial for understanding complex datasets and communicating insights effectively.</p>
            
//             <h2>Popular Python Libraries</h2>
//             <ul>
//                 <li><strong>Matplotlib:</strong> The foundational plotting library</li>
//                 <li><strong>Seaborn:</strong> High-level interface for statistical graphics</li>
//                 <li><strong>Plotly:</strong> Interactive visualizations for web applications</li>
//             </ul>
//         `,
//         image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
//         author: { name: "Ankita Tyagi", _id: "author2" },
//         publishedAt: "2025-01-10T00:00:00.000Z",
//         tags: ["Data Science", "Python", "Visualization"],
//         readTime: "7 min read"
//     },
//     {
//         _id: "3",
//         title: "Building Your First Neural Network",
//         excerpt: "A step-by-step tutorial on creating a neural network from scratch and understanding the mathematics behind deep learning.",
//         content: `
//             <h2>Understanding Neural Networks</h2>
//             <p>Neural networks are computing systems inspired by biological neural networks.</p>
            
//             <h2>Network Architecture</h2>
//             <ul>
//                 <li><strong>Input Layer:</strong> Receives the initial data</li>
//                 <li><strong>Hidden Layers:</strong> Process the information</li>
//                 <li><strong>Output Layer:</strong> Produces the final result</li>
//             </ul>
//         `,
//         image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=400&fit=crop",
//         author: { name: "Debashish", _id: "author3" },
//         publishedAt: "2025-01-05T00:00:00.000Z",
//         tags: ["Deep Learning", "Neural Networks", "AI"],
//         readTime: "10 min read"
//     },
//     {
//         _id: "4",
//         title: "Data Analytics in Business: Real-World Applications",
//         excerpt: "Explore how companies leverage data analytics to make informed decisions and gain competitive advantages.",
//         content: `
//             <h2>Common Use Cases</h2>
//             <ul>
//                 <li><strong>Customer Segmentation:</strong> Understanding groups</li>
//                 <li><strong>Predictive Maintenance:</strong> Preventing failures</li>
//             </ul>
//         `,
//         image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
//         author: { name: "Apoorv", _id: "author4" },
//         publishedAt: "2024-12-28T00:00:00.000Z",
//         tags: ["Business Analytics", "Data Science"],
//         readTime: "6 min read"
//     },
//     {
//         _id: "5",
//         title: "Ethics in AI: Building Responsible Systems",
//         excerpt: "Understanding the ethical implications of AI and how to build systems that are fair, transparent, and accountable.",
//         content: `
//             <h2>Key Ethical Principles</h2>
//             <ul>
//                 <li><strong>Fairness:</strong> Preventing bias</li>
//                 <li><strong>Transparency:</strong> Making systems explainable</li>
//             </ul>
//         `,
//         image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
//         author: { name: "Khusi pal", _id: "author5" },
//         publishedAt: "2024-12-20T00:00:00.000Z",
//         tags: ["AI Ethics", "Responsible AI"],
//         readTime: "8 min read"
//     }
// ];

// /**
//  * Helper function to fetch a single blog by ID
//  * Returns BlogPost or undefined if not found
//  */
// export const getBlogById = (id: string): BlogPost | undefined => {
//     return blogData.find(blog => blog._id === id);
// };