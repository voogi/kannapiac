import React, { useState } from 'react';
import { categories } from '@/data/categories';

type SidebarProps = {
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string | null;
};

const Sidebar: React.FC<SidebarProps> = ({ 
  onSelectCategory,
  selectedCategory
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Kategóriák szűrése a keresési kifejezés alapján
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keresési kifejezés változásának kezelése
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full h-full bg-white overflow-y-auto shadow-md">
      <div className="p-4 bg-blue-600 text-white">
        <h1 className="text-xl font-bold">Kategóriák</h1>
      </div>
      <div className="p-2">
        <input
          type="text"
          placeholder="Keresés..."
          className="w-full p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="divide-y divide-gray-200">
        {filteredCategories.map((category) => (
          <li 
            key={category.id}
            className={`p-4 hover:bg-gray-100 cursor-pointer ${
              selectedCategory === category.id ? 'bg-blue-100' : ''
            }`}
            onClick={() => onSelectCategory(category.id)}
          >
            <div className="flex items-center">
              {category.icon && (
                <span className="mr-3 text-blue-500">
                  <i className={category.icon}></i>
                </span>
              )}
              <div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-500">{category.description}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar; 