# DataBiz - Learning Management Platform

A comprehensive full-stack learning management platform built with Node.js, Express, MongoDB, React, and TypeScript. DataBiz provides structured learning paths for Data Science, AI/ML, and Data Analytics with features for content management, user progress tracking, and community engagement.

## 🚀 Features

### Core Functionality
- **Learning Pathways**: Structured learning paths for DS (Data Science), AIML (AI/ML), and DA (Data Analytics)
- **Resource Management**: Curated collection of videos, courses, and articles
- **Blog System**: Community-driven content with visibility controls
- **Event Management**: Workshops, seminars, and networking events
- **Progress Tracking**: User progress monitoring and analytics
- **User Management**: Role-based access control (Admin, Junior, Public)

### Technical Features
- **Authentication**: JWT-based authentication with role-based permissions
- **Responsive Design**: Mobile-first design with TailwindCSS
- **Modern UI**: Clean, professional interface with smooth animations
- **Type Safety**: Full TypeScript implementation
- **API Documentation**: RESTful API with comprehensive endpoints
- **Error Handling**: Robust error handling and validation

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Morgan

### Frontend
- **Framework**: React 19+ with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS 4.x
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
databiz-v2/
├── server/                 # Backend application
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Custom middlewares
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── seed/          # Database seeding
│   │   ├── app.js         # Express app setup
│   │   └── server.js      # Server entry point
│   └── package.json
├── client/                # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # React entry point
│   └── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd databiz-v2
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**
   
   Create `.env` file in the server directory:
   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/databiz
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=development
   ```

5. **Start the Applications**
   
   **Backend** (Terminal 1):
   ```bash
   cd server
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - Health Check: http://localhost:4000/api/health

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)

### Pathways
- `GET /api/pathways` - Get all pathways
- `GET /api/pathways/:id` - Get pathway by ID
- `POST /api/pathways` - Create pathway (Admin only)
- `PUT /api/pathways/:id` - Update pathway (Admin only)
- `DELETE /api/pathways/:id` - Delete pathway (Admin only)

### Resources
- `GET /api/resources` - Get all resources
- `GET /api/resources/:id` - Get resource by ID
- `POST /api/resources` - Create resource (Admin only)
- `PUT /api/resources/:id` - Update resource (Admin only)
- `DELETE /api/resources/:id` - Delete resource (Admin only)

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:id` - Get blog by ID
- `POST /api/blogs` - Create blog (Admin/Junior only)
- `PUT /api/blogs/:id` - Update blog (Author/Admin only)
- `DELETE /api/blogs/:id` - Delete blog (Author/Admin only)

### Events
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create event (Admin only)
- `PUT /api/events/:id` - Update event (Admin only)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Progress
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Update progress
- `GET /api/progress/:userId` - Get progress for specific user

## 🎨 UI Components

### Core Components
- **Button**: Reusable button with variants
- **Input**: Form input with validation
- **Card**: Content display card
- **Modal**: Overlay modal component
- **Loader**: Loading spinner
- **Navbar**: Navigation component

### Page Components
- **Home**: Landing page with feature overview
- **PathwayList**: Learning pathways with category filtering
- **BlogList**: Blog posts with tag filtering
- **EventList**: Events with time-based filtering
- **ResourceList**: Learning resources with type filtering
- **Login/Register**: Authentication pages

## 🔐 User Roles

### Public Users
- View pathways, blogs, events, and resources
- Register and login
- Track personal progress

### Junior Users
- All public user permissions
- Create and manage blog posts
- Access to junior-only content

### Admin Users
- All system permissions
- Create and manage all content types
- User management
- System administration

## 🎯 Key Features Explained

### Learning Pathways
- **Categories**: DS (Data Science), AIML (AI/ML), DA (Data Analytics)
- **Structure**: Ordered collection of resources
- **Progress Tracking**: Track completion status
- **Filtering**: Filter by category

### Resource Management
- **Types**: Videos, Courses, Articles
- **External Links**: Direct links to learning materials
- **Tagging System**: Organize resources with tags
- **Type Filtering**: Filter by resource type

### Blog System
- **Visibility Controls**: Public, Junior, Admin levels
- **Tag System**: Organize posts with tags
- **Author Attribution**: Track post authors
- **Rich Content**: Support for formatted content

### Event Management
- **Time-based Filtering**: Upcoming, Past, All events
- **Location Support**: Physical and online events
- **Status Indicators**: Visual status badges
- **Detailed Information**: Comprehensive event details

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application
3. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for scalability and maintainability
- Focused on user experience and accessibility

---

**DataBiz** - Empowering learners in Data Science, AI/ML, and Data Analytics through structured learning paths and community engagement.
