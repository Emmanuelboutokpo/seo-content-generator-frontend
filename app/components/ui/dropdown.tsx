import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2, Edit } from 'lucide-react';

export const ContentActionsDropdown = ({ 
  onDelete, 
  onRename 
}: {
  onDelete: () => void;
  onRename: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Three dots button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 rounded-full hover:bg-gray-700 cursor-pointer"
        aria-label="Content actions"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-gray-500 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            {/* Rename option */}
            <button
              onClick={() => {
                onRename();
                setIsOpen(false);
              }}
              className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
            >
              <Edit className="w-4 h-4 mr-2" />
              Rename
            </button>
            
            {/* Delete option */}
            <button
              onClick={() => {
                onDelete();
                setIsOpen(false);
              }}
              className="flex w-full px-4 py-2 text-sm text-red-600 hover:bg-red-300 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};