
import { useState, useEffect } from 'react';
import { Story, User } from '@/lib/mockData';
import { X, ArrowLeft, ArrowRight, Loader, Image, Video } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StoryViewerProps {
  user: User;
  activeStoryId: string;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

const StoryViewer = ({ user, activeStoryId, onClose, onNext, onPrevious }: StoryViewerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeStory, setActiveStory] = useState<Story | null>(null);

  useEffect(() => {
    const story = user.stories.find(s => s.id === activeStoryId);
    setActiveStory(story || null);
    setIsLoading(true);
    setProgress(0);
  }, [activeStoryId, user.stories]);

  useEffect(() => {
    if (!activeStory) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [activeStory]);

  useEffect(() => {
    if (isLoading || !activeStory) return;

    const duration = activeStory.duration * 1000;
    const interval = 100;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        onNext();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isLoading, activeStory, onNext]);

  if (!activeStory) return null;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="absolute top-0 left-0 right-0 flex p-2 space-x-1">
        {user.stories.map((story, index) => (
          <div key={story.id} className="h-1 bg-muted flex-1 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full bg-white transition-all",
                activeStoryId === story.id ? "transition-all duration-100" : "",
                activeStoryId === story.id && !isLoading ? "w-full" : "",
                story.id === activeStoryId ? "w-[" + progress + "%]" : "",
                story.viewed && story.id !== activeStoryId ? "w-full" : "",
                !story.viewed && story.id !== activeStoryId ? "w-0" : ""
              )}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 rounded-full glass text-foreground z-50"
        aria-label="Close story viewer"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="absolute top-12 left-4 flex items-center p-2 rounded-full glass text-foreground">
        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
          <img 
            src={user.profilePic} 
            alt={user.username} 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-medium">{user.username}</span>
      </div>

      <div className="relative max-w-2xl w-full h-[80vh] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <Loader className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-foreground">Loading story...</p>
          </div>
        ) : activeStory.type === 'image' ? (
          <img 
            src={activeStory.url} 
            alt="Story content" 
            className="max-h-full max-w-full object-contain rounded-lg"
            onLoad={handleImageLoad}
          />
        ) : (
          <video 
            src={activeStory.url} 
            className="max-h-full max-w-full object-contain rounded-lg"
            autoPlay 
            muted 
            playsInline
            onLoadedData={handleImageLoad}
          />
        )}

        {!isLoading && (
          <>
            <button 
              onClick={onPrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full glass text-foreground"
              aria-label="Previous story"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={onNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full glass text-foreground"
              aria-label="Next story"
            >
              <ArrowRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glass px-4 py-2 rounded-full">
        <p className="text-sm">Viewing anonymously</p>
      </div>
    </div>
  );
};

export default StoryViewer;
