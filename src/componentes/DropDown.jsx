import React, { useState } from 'react'
import '../App.css'






const DropDown = ({categorias,mensaje}) => {

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    return (
      <div>
        <select value={selectedCategory} className='sel' id='sele' onChange={handleChange}>
          <option value="" disabled>{mensaje}</option>
          {categorias?.map((categoria, index) => (
            <option key={index} value={categoria}>{categoria}</option>
          ))}
        </select>
        {selectedCategory && <p className='titulo'>Has seleccionado: {selectedCategory}</p>}
      </div>
    );


};

export default DropDown





/* 

import React, { useState } from 'react';

const categorias = [
  'Perfumería',
  'Higiene',
  // Agrega aquí tus 300 categorías...
];

const CategoriaDropdown = () => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(categorias);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(
      categorias.filter((categoria) =>
        categoria.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Selecciona una categoría"
      />
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index}>{option}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriaDropdown;









*/