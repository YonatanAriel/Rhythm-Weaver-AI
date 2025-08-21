
import React, { useState, useEffect, useCallback } from 'react';
import { SparklesIcon } from './icons';

interface VariationSuggestionsProps {
  songSummary: string;
  onGenerateVariation: (variation: string) => void;
  getSuggestions: (summary: string) => Promise<string[]>;
}

const VariationSuggestions: React.FC<VariationSuggestionsProps> = ({ songSummary, onGenerateVariation, getSuggestions }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSuggestions = useCallback(async () => {
    setIsLoading(true);
    const fetchedSuggestions = await getSuggestions(songSummary);
    setSuggestions(fetchedSuggestions);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songSummary, getSuggestions]);

  useEffect(() => {
    fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songSummary]);

  const handleSuggestionClick = (suggestion: string) => {
    onGenerateVariation(suggestion);
  };
  
  return (
    <div>
      <h4 className="font-bold text-lg text-cyan-400 mb-3 flex items-center gap-2">
        <SparklesIcon className="w-5 h-5"/>
        AI Suggestions
      </h4>
      {isLoading ? (
         <div className="flex gap-2">
           {[...Array(3)].map((_, i) => (
             <div key={i} className="flex-1 h-10 bg-white/10 rounded-lg animate-pulse"></div>
           ))}
         </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-left text-sm p-2.5 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              "{suggestion}"
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VariationSuggestions;
