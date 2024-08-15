import React from 'react';

interface StyleSelectorProps {
  selectedStyle: string;
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ selectedStyle, setSelectedStyle }) => {
  const styles = ['warm', 'cool', 'style3']; // 예시 스타일들

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Style
      </label>
      <select
        value={selectedStyle}
        onChange={(e) => setSelectedStyle(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        {styles.map((style) => (
          <option key={style} value={style}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StyleSelector;