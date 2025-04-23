import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";
import ThemeToggle from "@/components/ThemeToggle";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatedBackground />
      <ThemeToggle />
      
      <div className="glass p-8 rounded-xl text-center max-w-md animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 text-primary">404</h1>
        <div className="story-ring inline-block p-4 mb-6">
          <div className="text-3xl">😢</div>
        </div>
        <p className="text-xl text-foreground mb-6">
          Oops! This page doesn't exist or the story has disappeared.
        </p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Return to Viewer
        </a>
      </div>
    </div>
  );
};

export default NotFound;
