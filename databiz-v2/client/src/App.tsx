import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { ThemeProvider } from "./context/ThemeContext";

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideHeaderFooter = ["/login", "/register"].some((path) =>
    location.pathname.toLowerCase().startsWith(path)
  );

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
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;