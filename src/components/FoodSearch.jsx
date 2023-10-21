import React, { useState } from "react";

const FoodSearch = ({ foodData, onFoodSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFoodItemClick = (food) => {
    setSelectedFood(food);
    onFoodSelect(food);
  };

  // Filter the food data based on the search term
  const filteredFood = foodData.filter((food) =>
    food["Food name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Food Search</h1>
      <input
        type="text"
        placeholder="Search for food..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredFood.map((food, index) => (
          <li key={index} onClick={() => handleFoodItemClick(food)}>
            {food["Food name"]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodSearch;
