import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

import { useLocation } from "react-router-dom";

// Optional: import a global layout
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const AppContent: React.FC = () => {
console.log(import.meta.env.REACT_APP_API_URL);
  
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register"].some(path => location.pathname.toLowerCase().startsWith(path));

  return (
    <>
      <Toaster position="top-right" />
      {!hideHeaderFooter && <Header />}
      <main className={!hideHeaderFooter ? "min-h-[calc(100vh-100px)]" : ""}>
        <AppRoutes />
      </main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
