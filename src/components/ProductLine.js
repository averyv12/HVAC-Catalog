// ProductLine.js - Displays product lines for a selected brand
// Handles filtering by search query and selection of a product line (series)

// These imports get the product images from out image folder
import React from "react";
import ModelList from "./ModelList";
import lightCommercialDuctless from '../logos/light_commercial_ductless.png';
import legacyLineDuctless from '../logos/legacy_line_ductless.png';
import preferredSeriesDuctless from '../logos/preferred_series_ductless.png';
import evolutionDuctlessMiniSplit from '../logos/evolution_ductless_mini_split.png';
import baseLinePackaged from '../logos/base_line_packaged.png';
import legacyLinePackaged from '../logos/legacy_line_packaged.png';
import preferredSeriesPackaged from '../logos/preferred_series_packaged.png';

// Map a product image to the correct product
const productLineImageMap = {
  'Light Commercial Ductless': lightCommercialDuctless,
  'Legacy Line Ductless': legacyLineDuctless,
  'Preferred Series Ductless': preferredSeriesDuctless,
  'Evolution Ductless Mini Split': evolutionDuctlessMiniSplit,
  'Base Line Packaged': baseLinePackaged,
  'Legacy Line Packaged': legacyLinePackaged,
  'Preferred Series Packaged': preferredSeriesPackaged
};

const ProductLine = ({
  brand,
  data,
  searchQuery,
  onBack,
  onSelectSeries,
  selectedSeries,
}) => {
  // Filter product lines (series) based on search query or model name
  const filteredSeries = Object.keys(data).filter(
    (series) =>
      series.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data[series].some((model) =>
        model.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // If there is not specific line selected, show the entire product line for the brand
  // Include a back arrow that takes users back to brands
  // Again, include a clickable box for each product, which includes an image of the product to the left,
  // with the name of the line to the right of the image, and then an arrow on the right side of the box
  return (
    !selectedSeries ? (
      <div style={{ paddingLeft: '40px', textAlign: 'left', width: '35%', boxSizing: 'border-box' }}>
        <span onClick={onBack} style={{ cursor: 'pointer', color: '#333', fontSize: '1.1em', display: 'inline-flex', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '1.5em', marginRight: '6px', lineHeight: 1 }}>←</span>Back to brands
        </span>
        <h2 style={{ marginTop: 0 }}>{brand} Product Lines</h2>
        {filteredSeries.map((series) => (
          <div
            key={series}
            onClick={() => onSelectSeries(series)}
            style={{
              padding: "10px",
              margin: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <span style={{ display: "inline-block", width: 44, minWidth: 44, marginRight: 20 }}>
              {productLineImageMap[series] && (
                <img
                  src={productLineImageMap[series]}
                  alt={`${series} logo`}
                  style={{ height: "32px", width: "40px", objectFit: "contain", verticalAlign: "middle" }}
                />
              )}
            </span>
            <span style={{ fontWeight: "bold", fontSize: "1.1em", flex: 1 }}>{series}</span>
            <span style={{ color: '#888', fontSize: '1.5em', marginLeft: '16px' }}>&#8250;</span>
          </div>
        ))}
      </div>
    ) : (
      // If a series is selected, show the ModelList for that series
      <ModelList
        models={data[selectedSeries]}
        onBack={() => onSelectSeries(null)}
        seriesName={selectedSeries}
        searchQuery={searchQuery}
        brand={brand}
      />
    )
  );
};

export default ProductLine;
