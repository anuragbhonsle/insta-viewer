// Mock Instagram user data
export interface Story {
  id: string;
  type: 'image' | 'video';
  url: string;
  timestamp: number;
  duration: number; // in seconds
  viewed: boolean;
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  profilePic: string;
  isVerified: boolean;
  stories: Story[];
}

export const mockUsers: User[] = [
  {
    id: "user1",
    username: "travel_photography",
    fullName: "Travel Photography",
    profilePic: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
    isVerified: true,
    stories: [
      {
        id: "story1",
        type: "image",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
        timestamp: Date.now() - 3600000, // 1 hour ago
        duration: 5,
        viewed: false
      },
      {
        id: "story2",
        type: "image",
        url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600",
        timestamp: Date.now() - 7200000, // 2 hours ago
        duration: 5,
        viewed: false
      }
    ]
  },
  {
    id: "user2",
    username: "tech_enthusiast",
    fullName: "Tech Enthusiast",
    profilePic: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
    isVerified: false,
    stories: [
      {
        id: "story3",
        type: "image",
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600",
        timestamp: Date.now() - 1800000, // 30 mins ago
        duration: 5,
        viewed: false
      }
    ]
  },
  {
    id: "user3",
    username: "cat_lover",
    fullName: "Cat Lover",
    profilePic: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    isVerified: true,
    stories: [
      {
        id: "story4",
        type: "image",
        url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600",
        timestamp: Date.now() - 900000, // 15 mins ago
        duration: 5,
        viewed: false
      }
    ]
  }
];

// Function to search users by username
export const searchUserByUsername = (username: string): User | undefined => {
  const normalizedUsername = username.toLowerCase().trim();
  
  return mockUsers.find(
    user => user.username.toLowerCase().includes(normalizedUsername)
  );
};

// Function to retrieve recent searches from localStorage
export const getRecentSearches = (): string[] => {
  const searches = localStorage.getItem('recentSearches');
  return searches ? JSON.parse(searches) : [];
};

// Function to save a search to localStorage
export const saveSearch = (username: string): void => {
  const searches = getRecentSearches();
  
  // Only add if it's not already in the list
  if (!searches.includes(username)) {
    // Keep only the 5 most recent searches
    const updatedSearches = [username, ...searches].slice(0, 5);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  }
};
