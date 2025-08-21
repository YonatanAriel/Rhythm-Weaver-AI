
import React from 'react';
import type { Tag } from '../types';

interface TagSelectorProps {
  title: string;
  tags: Tag[];
  selectedTags: Tag[];
  onToggleTag: React.Dispatch<React.SetStateAction<Tag[]>>;
  color: 'fuchsia' | 'cyan' | 'lime';
}

const colorClasses = {
  fuchsia: {
    border: 'border-fuchsia-500',
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-500/20',
    hoverBg: 'hover:bg-fuchsia-500/30',
    selectedBg: 'bg-fuchsia-500',
    selectedText: 'text-gray-900',
  },
  cyan: {
    border: 'border-cyan-500',
    text: 'text-cyan-400',
    bg: 'bg-cyan-500/20',
    hoverBg: 'hover:bg-cyan-500/30',
    selectedBg: 'bg-cyan-400',
    selectedText: 'text-gray-900',
  },
  lime: {
    border: 'border-lime-500',
    text: 'text-lime-400',
    bg: 'bg-lime-500/20',
    hoverBg: 'hover:bg-lime-500/30',
    selectedBg: 'bg-lime-400',
    selectedText: 'text-gray-900',
  },
};

const TagSelector: React.FC<TagSelectorProps> = ({ title, tags, selectedTags, onToggleTag, color }) => {
  
  const handleTagClick = (tag: Tag) => {
    onToggleTag(prev => 
      prev.find(t => t.id === tag.id) 
        ? prev.filter(t => t.id !== tag.id) 
        : [...prev, tag]
    );
  };

  const c = colorClasses[color];

  return (
    <div>
      <h3 className={`text-xl font-bold ${c.text}`}>{title}</h3>
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map(tag => {
          const isSelected = selectedTags.some(t => t.id === tag.id);
          return (
            <button
              key={tag.id}
              onClick={() => handleTagClick(tag)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200 transform hover:scale-105 ${
                isSelected
                  ? `${c.selectedBg} ${c.selectedText} border-transparent`
                  : `${c.bg} ${c.text} ${c.border} ${c.hoverBg}`
              }`}
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TagSelector;
