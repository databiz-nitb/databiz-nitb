import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

// Optional: import a global layout
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="min-h-[calc(100vh-100px)]">
        <AppRoutes />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
