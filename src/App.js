// App.js - Main entry point for the HVAC Catalog React app
// Handles top-level state and routing between brand, product line, and model views

import React, { useState } from "react";
import hvacData from "./data/hvacData.json";
import BrandList from "./components/BrandList.js";
import ProductLine from "./components/ProductLine.js";
import SearchBar from "./components/SearchBar.js";

function App() {
  // State for selected brand, product line, search query, and recently viewed brands
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandViews, setBrandViews] = useState({});

  // Handler for selecting a brand from the list
  const handleSelectBrand = (brand) => {
    setSelectedBrand(brand);
    setBrandViews((prev) => ({
      ...prev,
      [brand]: (prev[brand] || 0) + 1,
    }));
  };

  // If a brand is selected, show the product line view for that brand
  // Include the search bar at the top of the page
  // Product Line component displays the product lines for the selected brand
  if (selectedBrand) {
    return (
      <div className="App">
        <SearchBar query={searchQuery} setQuery={setSearchQuery} />
        <ProductLine
          brand={selectedBrand}
          data={hvacData[selectedBrand]}
          searchQuery={searchQuery}
          onBack={() => {
            setSelectedBrand(null);
            setSelectedSeries(null);
          }}
          onSelectSeries={setSelectedSeries}
          selectedSeries={selectedSeries}
        />
      </div>
    );
  }

  // Prepare brand lists for display. Sort alphabetically
  const allBrands = Object.keys(hvacData).sort((a, b) => a.localeCompare(b));
  const mostViewedBrands = Object.entries(brandViews)
    .filter(([brand, count]) => count > 0)
    .map(([brand]) => brand)
    .sort((a, b) => a.localeCompare(b));
  

  // The main display, with all the brands displayed, and adding viewed brands to the list
  // Includes a search bar at the top
  // First div sets up the recently viewed brands section
  // Second div sets up the sections displaying all of the brands
  return (
    <div className="App">
      <SearchBar query={searchQuery} setQuery={setSearchQuery} />
      <div style={{ paddingLeft: '40px', textAlign: 'left' }}>      
        {mostViewedBrands.length > 0 && (
          <div>
            <h2>Recently Viewed Brands</h2>
            <BrandList
              data={mostViewedBrands.reduce((obj, brand) => {
                obj[brand] = hvacData[brand];
                return obj;
              }, {})}
              searchQuery={searchQuery}
              onSelectBrand={handleSelectBrand}
            />
          </div>
        )}
        <div>
          <h2>All Brands</h2>
          <BrandList
            data={allBrands.reduce((obj, brand) => {
              obj[brand] = hvacData[brand];
              return obj;
            }, {})}
            searchQuery={searchQuery}
            onSelectBrand={handleSelectBrand}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
