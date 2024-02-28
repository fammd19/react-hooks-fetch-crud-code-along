import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => fetch("http://localhost:4000/items")
    .then((res)=> res.json())
    .then((json)=>setItems(json)), []
  )

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  function onAddItem (newItem) {
    let newItemList = [...items,newItem]
    setItems(newItemList)
  }

  function onUpdateItem (updatedItem) {
    const updatedItems = items.map((item) => {
      if(item.id===updatedItem.id) {
        return updatedItem 
      } else {
        return item
      }
    })
    setItems(updatedItems);
  }

  function onDeleteItem (deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  return (
    <div className="ShoppingList">
      <ItemForm items={items} onAddItem={onAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onUpdateItem={onUpdateItem}  onDeleteItem={onDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
