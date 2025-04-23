
import { User } from '@/lib/mockData';
import StoryCircle from './StoryCircle';
import { cn } from '@/lib/utils';

interface ProfileCardProps {
  user: User;
  onStoryClick: (storyId: string) => void;
  activeStoryId?: string;
  className?: string;
}

const ProfileCard = ({ user, onStoryClick, activeStoryId, className }: ProfileCardProps) => {
  if (!user) return null;

  return (
    <div className={cn("glass rounded-xl p-6 max-w-md w-full animate-fade-in", className)}>
      <div className="flex items-center mb-6">
        <div className="story-ring mr-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
            <img 
              src={user.profilePic} 
              alt={user.username} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{user.username}</h2>
            {user.isVerified && (
              <span className="ml-1 flex items-center justify-center h-4 w-4 rounded-full bg-blue-500 text-white text-xs">
                ✓
              </span>
            )}
          </div>
          <p className="text-muted-foreground">{user.fullName}</p>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Stories</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {user.stories.length > 0 ? (
            user.stories.map((story) => (
              <StoryCircle
                key={story.id}
                story={story}
                onClick={() => onStoryClick(story.id)}
                isActive={activeStoryId === story.id}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No stories available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
