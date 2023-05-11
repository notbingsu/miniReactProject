import React, { useState } from 'react';
import './App.css';
const PRODUCTS = [
    { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
    { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
    { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
    { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
    { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
    { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
  ];

function FilterableProductTable({Products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  return (
    <>
      <SearchBar
      filterText = {filterText}
      inStockOnly={inStockOnly}
      onFilterTextChange={setFilterText}
      onInStockChange={setInStockOnly}
      />
      <ProductTable Products = {Products} filterText={filterText} inStockOnly={inStockOnly} />
    </>
  );
}
function SearchBar({filterText, inStockOnly, onFilterTextChange, onInStockChange}){
  return (
    <form>
      <input type="text"  value={filterText} placeholder="Search..."
      onChange = {(e) => onFilterTextChange(e.target.value)}/>
      <p>
        <input type="checkbox" checked={inStockOnly} onChange={(e) => onInStockChange(e.target.checked)}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

function ProductTable({Products, filterText, inStockOnly}){
  const rows = [];
  let lastCategory = null;

  Products.forEach((product) => {
    if (product.name.toLowerCase().includes(filterText.toLowerCase())){
      if (inStockOnly && !product.stocked) {
        return;
      }
    if (product.category !== lastCategory) {
      rows.push(
      <ProductCategoryRow 
      category={product.category}
      key={product.category} 
      />);
    }
      rows.push(
      <ProductRow 
      product={product}
      key={product.name} />);
      lastCategory = product.category;
    }
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr> 
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function ProductCategoryRow({category}){
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}
function ProductRow({product, key}){
  const name = product.stocked ? product.name :
  <span style={{ color: "red" }}>{product.name}</span>;
  return (
    <tr key={key}>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

export default function App() {
  return <div className='FilterableProductTable'><FilterableProductTable Products={PRODUCTS}/></div> ;
}