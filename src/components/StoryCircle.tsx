
import { Story } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface StoryCircleProps {
  story: Story;
  onClick: () => void;
  isActive?: boolean;
}

const StoryCircle = ({ story, onClick, isActive = false }: StoryCircleProps) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "story-ring cursor-pointer transition-transform hover:scale-105 animate-pulse-slow",
        story.viewed ? "opacity-60" : "opacity-100",
        isActive ? "scale-110" : ""
      )}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
        <img 
          src={story.url} 
          alt="Story thumbnail" 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default StoryCircle;
