import React from 'react';

const SearchBar = ({ searchText, suggestions, onSearchChange, onSelectSuggestion }) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    onSelectSuggestion(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // Keep the current search text
      if (suggestions.length > 0) {
        onSelectSuggestion(suggestions[0]);
      }
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        data-testid="autocomplete-input"
        className="search-input"
        placeholder="Search for doctors by name"
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              data-testid="suggestion-item"
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;