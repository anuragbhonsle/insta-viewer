
import { useState, useEffect } from 'react';
import { getRecentSearches } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface RecentSearchesProps {
  onSelect: (username: string) => void;
  className?: string;
}

const RecentSearches = ({ onSelect, className }: RecentSearchesProps) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
    
    // Update recent searches when localStorage changes
    const handleStorageChange = () => {
      setRecentSearches(getRecentSearches());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (recentSearches.length === 0) return null;

  return (
    <div className={cn("glass p-4 rounded-xl animate-fade-in", className)}>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h3>
      <div className="flex flex-wrap gap-2">
        {recentSearches.map((username) => (
          <button
            key={username}
            onClick={() => onSelect(username)}
            className="px-3 py-1.5 text-sm rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {username}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
