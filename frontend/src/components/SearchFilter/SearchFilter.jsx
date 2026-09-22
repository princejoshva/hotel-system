import React from "react";
import "./SearchFilter.css";

function SearchFilter({
  search,
  minPrice,
  maxPrice,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClear
}) {
  return (
    <div className="search-filter">

      <div className="filter-group">
        <label htmlFor="hotel-search">Search Hotel</label>

        <input
          id="hotel-search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Hotel title..."
        />
      </div>

      <div className="filter-group">
        <label htmlFor="min-price">Minimum Price</label>

        <input
          id="min-price"
          type="number"
          min="0"
          value={minPrice}
          onChange={(e) => onMinPriceChange(e.target.value)}
          placeholder="Min price"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="max-price">Maximum Price</label>

        <input
          id="max-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(e.target.value)}
          placeholder="Max price"
        />
      </div>

      <button
        type="button"
        className="clear-filter-btn"
        onClick={onClear}
      >
        Clear Filters
      </button>

    </div>
  );
}

export default SearchFilter;