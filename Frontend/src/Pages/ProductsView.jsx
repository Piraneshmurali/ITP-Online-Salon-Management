import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../Components/ProductCard";
import "./ProductsView.css";

export default function ProductsView() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/Product/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      Object.entries(product).some(
        ([key, value]) =>
          typeof value === "string" &&
          key !== "id" &&
          (key === "name" || key === "type" || key === "totalPrice") &&
          value.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    ).filter((product) => product.category !== "Equipment")
    .filter((product) => {
      if (categoryFilter === "All") {
        return true; // Show all products if category filter is "All"
      } else {
        return product.type === categoryFilter; // Filter products by category
      }
    })
    .filter((product) => {
      if (priceFilter === "All") {
        return true; // Show all products if price filter is "All"
      } else if (priceFilter === "200to500") {
        return product.totalPrice >= 200 && product.totalPrice <= 500;
      } else if (priceFilter === "500to1000") {
        return product.totalPrice > 500 && product.totalPrice <= 1000;
      } else if (priceFilter === "1000to2000") {
        return product.totalPrice > 1000 && product.totalPrice <= 2000;
      } else if (priceFilter === "above2000") {
        return product.totalPrice > 2000;
      }
    });

  return (
    <>
      <Navbar />
      <div className="products-view">
        <div className="search--bar">
          <input
            type="text"
            placeholder="Search Products Through Prices, Category And Names"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <FaSearch className="search--icon" />
        </div>
        
        <div className="filters">
          <div className="category-filter">
            <label>Filter by Category:</label>
            <select value={categoryFilter} onChange={handleCategoryChange}>
              <option value="All">All</option>
              <option value="Mens">Men</option>
              <option value="Womens">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="category-filter">
            <label>Filter by Price:</label>
            <select value={priceFilter} onChange={handlePriceFilterChange}>
              <option value="All">All</option>
              <option value="200to500">Rs.200 - Rs.500</option>
              <option value="500to1000">Rs.500 - Rs.1000</option>
              <option value="1000to2000">Rs.1000 - Rs.2000</option>
              <option value="above2000">Above Rs.2000</option>
            </select>
          </div>
        </div>
        
        <div className="products-grid">
          {filteredProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
