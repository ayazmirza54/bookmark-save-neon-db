import { useState, useEffect } from 'react';
import { BookmarkList } from './components/BookmarkList';
import { AddBookmarkForm } from './components/AddBookmarkForm';
import { SearchBar } from './components/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Bookmark } from './types';
import { getBookmarks, addBookmark } from './api/bookmarks';

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data);
      setFilteredBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch bookmarks. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAddBookmark = async (newBookmark: Omit<Bookmark, 'id'>) => {
    try {
      const addedBookmark = await addBookmark(newBookmark);
      setBookmarks([...bookmarks, addedBookmark]);
      setFilteredBookmarks([...filteredBookmarks, addedBookmark]);
      toast({
        title: 'Success',
        description: 'Bookmark added successfully!',
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to add bookmark. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    const filtered = bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBookmarks(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Bookmark Saver</h1>
        <AddBookmarkForm onAddBookmark={handleAddBookmark} />
        <SearchBar onSearch={handleSearch} />
        <BookmarkList bookmarks={filteredBookmarks} />
      </div>
      <Toaster />
    </div>
  );
}

export default App;