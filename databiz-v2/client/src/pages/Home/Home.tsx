import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/Button/Button";

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Welcome to <span className="text-blue-600 animate-glow">DataBiz</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Your comprehensive platform for Data Science, AI/ML, and Data Analytics learning. 
            Discover curated pathways, resources, and connect with the community.
          </p>
          
          {!user ? (
            <div className="flex gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <Link to="/register">
                <Button className="btn-interactive hover-lift bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg">
                  <svg className="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button className="btn-interactive hover-lift bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg border-2 border-gray-600 hover:border-gray-500">
                  <svg className="w-6 h-6 mr-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <p className="text-2xl text-gray-800 mb-6 animate-scale-in">
                Welcome back, <span className="font-bold text-blue-600">{user.name}</span>!
              </p>
              
              {/* Admin User Buttons */}
              {user.role === "admin" && (
                <div className="flex gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <Link to="/pathways">
                    <Button className="btn-interactive hover-lift bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Explore Pathways
                    </Button>
                  </Link>
                  <Link to="/admin">
                    <Button className="btn-interactive hover-lift bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Admin Dashboard
                    </Button>
                  </Link>
                </div>
              )}

              {/* Junior User Buttons */}
              {user.role === "junior" && (
                <div className="flex gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <Link to="/pathways">
                    <Button className="btn-interactive hover-lift bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      Explore Pathways
                    </Button>
                  </Link>
                  <Link to="/progress">
                    <Button className="btn-interactive hover-lift bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                      <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      My Progress
                    </Button>
                  </Link>
                </div>
              )}

              {/* Public User Buttons */}
              {user.role === "public" && (
                <div className="text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                  <p className="text-lg text-gray-600 mb-6">
                    Explore our content and discover what DataBiz has to offer
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Link to="/blogs">
                      <Button className="btn-interactive hover-lift bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                        Read Blogs
                      </Button>
                    </Link>
                    <Link to="/events">
                      <Button className="btn-interactive hover-lift bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-lg font-semibold rounded-lg shadow-lg">
                        <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        View Events
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up">
          What We Offer
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Learning Pathways */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover-lift animate-stagger-1">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Learning Pathways</h3>
            <p className="text-gray-600 mb-4">
              Structured learning paths for Data Science, AI/ML, and Data Analytics with curated resources.
            </p>
            {user && (user.role === "junior" || user.role === "admin") ? (
              <Link to="/pathways">
                <Button className="btn-interactive hover-lift text-sm px-3 py-2">Explore Pathways</Button>
              </Link>
            ) : user && user.role === "public" ? (
              <span className="text-gray-500 font-medium text-sm px-3 py-2 bg-gray-100 rounded">
                Junior/Admin Access Required
              </span>
            ) : (
              <Link to="/login">
                <Button className="btn-interactive hover-lift text-sm px-3 py-2">Login to Access</Button>
              </Link>
            )}
          </div>

          {/* Resources */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover-lift animate-stagger-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle" style={{animationDelay: '0.5s'}}>
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Rich Resources</h3>
            <p className="text-gray-600 mb-4">
              Access videos, courses, articles, and other learning materials organized within pathways.
            </p>
            {user && (user.role === "junior" || user.role === "admin") ? (
              <Link to="/pathways">
                <Button className="btn-interactive hover-lift text-sm px-3 py-2">View in Pathways</Button>
              </Link>
            ) : user && user.role === "public" ? (
              <span className="text-gray-500 font-medium text-sm px-3 py-2 bg-gray-100 rounded">
                Junior/Admin Access Required
              </span>
            ) : (
              <Link to="/login">
                <Button className="btn-interactive hover-lift text-sm px-3 py-2">Login to Access</Button>
              </Link>
            )}
          </div>

          {/* Community */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center hover-lift animate-stagger-3">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-subtle" style={{animationDelay: '1s'}}>
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Community & Events</h3>
            <p className="text-gray-600 mb-4">
              Join events, read blogs, and connect with fellow learners and industry experts.
            </p>
            <Link to="/events">
              <Button className="btn-interactive hover-lift text-sm px-3 py-2">View Events</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 animate-fade-in-up">
            Choose Your Learning Path
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-8 text-white text-center hover-lift animate-stagger-1">
              <h3 className="text-2xl font-bold mb-3 animate-fade-in-up">Data Science</h3>
              <p className="mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Master statistical analysis, machine learning, and data visualization</p>
              <div className="text-sm opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>Python • R • Statistics • Visualization</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-8 text-white text-center hover-lift animate-stagger-2">
              <h3 className="text-2xl font-bold mb-3 animate-fade-in-up">AI & ML</h3>
              <p className="mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Deep dive into artificial intelligence and machine learning algorithms</p>
              <div className="text-sm opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>TensorFlow • PyTorch • Deep Learning • NLP</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-8 text-white text-center hover-lift animate-stagger-3">
              <h3 className="text-2xl font-bold mb-3 animate-fade-in-up">Data Analytics</h3>
              <p className="mb-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Learn business intelligence, reporting, and data-driven decision making</p>
              <div className="text-sm opacity-90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>SQL • Tableau • Power BI • Excel</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Join thousands of learners advancing their careers in data science and analytics.
            </p>
            <Link to="/register">
              <Button className="btn-interactive hover-lift animate-scale-in-bounce" style={{animationDelay: '0.4s'}}>Create Your Account</Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
