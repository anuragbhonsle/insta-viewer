
import { useState, FormEvent } from 'react';
import { Search, Loader } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
  className?: string;
}

const SearchBar = ({ onSearch, isLoading, className }: SearchBarProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-md glass rounded-full overflow-hidden flex items-center p-1",
        className
      )}
    >
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter Instagram username..."
        className="flex-1 bg-transparent p-3 outline-none text-foreground placeholder:text-muted-foreground"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !username.trim()}
        className="rounded-full bg-primary p-2.5 text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Search for Instagram user"
      >
        {isLoading ? (
          <Loader className="h-5 w-5 animate-spin" />
        ) : (
          <Search className="h-5 w-5" />
        )}
      </button>
    </form>
  );
};

export default SearchBar;
