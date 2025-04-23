
import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ProfileCard from '@/components/ProfileCard';
import StoryViewer from '@/components/StoryViewer';
import ThemeToggle from '@/components/ThemeToggle';
import RecentSearches from '@/components/RecentSearches';
import AnimatedBackground from '@/components/AnimatedBackground';
import { User, searchUserByUsername, saveSearch } from '@/lib/mockData';

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeStoryId, setActiveStoryId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (username: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      const foundUser = searchUserByUsername(username);
      
      if (foundUser) {
        setUser(foundUser);
        saveSearch(username);
      } else {
        setError(`User "${username}" not found. Try "travel_photography", "tech_enthusiast", or "cat_lover"`);
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleStoryClick = (storyId: string) => {
    if (user) {
      const story = user.stories.find(s => s.id === storyId);
      if (story) {
        setActiveStoryId(storyId);
      }
    }
  };

  const handleCloseStory = () => {
    setActiveStoryId(null);
  };

  const handleNextStory = () => {
    if (!user || !activeStoryId) return;
    
    const currentIndex = user.stories.findIndex(s => s.id === activeStoryId);
    const nextIndex = currentIndex + 1;
    
    if (nextIndex < user.stories.length) {
      setActiveStoryId(user.stories[nextIndex].id);
    } else {
      setActiveStoryId(null); // Close story viewer if no more stories
    }
  };

  const handlePreviousStory = () => {
    if (!user || !activeStoryId) return;
    
    const currentIndex = user.stories.findIndex(s => s.id === activeStoryId);
    const prevIndex = currentIndex - 1;
    
    if (prevIndex >= 0) {
      setActiveStoryId(user.stories[prevIndex].id);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative p-4">
      <AnimatedBackground />
      <ThemeToggle />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Insta Secret Viewer
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-md mx-auto">
            Watch Instagram Stories Without Anyone Knowing
          </p>
        </div>

        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          className="mb-6" 
        />

        <RecentSearches 
          onSelect={handleSearch} 
          className="mb-6 w-full max-w-md" 
        />

        {error && (
          <div className="glass p-4 rounded-xl text-destructive mb-6 animate-fade-in">
            {error}
          </div>
        )}

        {user && (
          <ProfileCard 
            user={user} 
            onStoryClick={handleStoryClick} 
            activeStoryId={activeStoryId || undefined} 
          />
        )}

        {user && activeStoryId && (
          <StoryViewer 
            user={user} 
            activeStoryId={activeStoryId} 
            onClose={handleCloseStory}
            onNext={handleNextStory}
            onPrevious={handlePreviousStory}
          />
        )}
      </div>

      <footer className="mt-auto pt-8 pb-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Insta Secret Viewer. Not affiliated with Instagram.</p>
      </footer>
    </div>
  );
};

export default HomePage;
