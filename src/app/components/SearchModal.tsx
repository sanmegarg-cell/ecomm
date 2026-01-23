import { X, Search as SearchIcon } from 'lucide-react';
import { useState } from 'react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SearchModal({ isOpen, onClose, searchQuery, onSearchChange }: SearchModalProps) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearchChange(localQuery);
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white z-50 rounded-lg shadow-2xl p-6 mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl">Search Products</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search for bed sheets..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              autoFocus
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>

        {searchQuery && (
          <button
            onClick={() => {
              setLocalQuery('');
              onSearchChange('');
              onClose();
            }}
            className="mt-3 text-sm text-gray-600 hover:text-gray-900"
          >
            Clear search
          </button>
        )}
      </div>
    </>
  );
}
