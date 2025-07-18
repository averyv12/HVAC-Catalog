// BrandList.js - Displays a list of HVAC brands for selection
// Handles filtering by search query and clicking a brand to select it

// All of these imports handle getting the brand logos from our folder of logos
import React from "react";
import bryantLogo from '../logos/bryant.jpg';
import carrierLogo from '../logos/carrier.png';
import traneLogo from '../logos/trane.jpg';
import goodmanLogo from '../logos/goodman.png';
import lennoxLogo from '../logos/lennox.webp';
import yorkLogo from '../logos/york.jpg';
import rheemLogo from '../logos/rheem.jpg';
import daikinLogo from '../logos/daikin.png';
import americanStandardLogo from '../logos/american.png';
import amanaLogo from '../logos/amana.png';
import lgLogo from '../logos/lg.png';
import mitsubishiLogo from '../logos/mitsubishi.png';
import samsungLogo from '../logos/samsung.avif';
import frigidaireLogo from '../logos/frigidaire.png';
import boschLogo from '../logos/bosch.webp';

// Maps logos to a specific brand
const logoMap = {
  Bryant: bryantLogo,
  Carrier: carrierLogo,
  Trane: traneLogo,
  Goodman: goodmanLogo,
  Lennox: lennoxLogo,
  'York UPG': yorkLogo,
  Rheem: rheemLogo,
  Daikin: daikinLogo,
  'American Standard': americanStandardLogo,
  Amana: amanaLogo,
  LG: lgLogo,
  'Mitsubishi Electric': mitsubishiLogo,
  Samsung: samsungLogo,
  Frigidaire: frigidaireLogo,
  'Bosch Thermotechnik': boschLogo
};

const BrandList = ({ data, searchQuery, onSelectBrand }) => {
  // Filter brands based on the search query
  const filteredBrands = Object.keys(data).filter((brand) =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Each brand should be its own clickable box, with the company logo on the left side of the box,
  // the company name to the right of that, and an arrow on the right side of the box
  return (
    <div>
      {filteredBrands.map((brand) => (
        <div
          key={brand}
          onClick={() => onSelectBrand(brand)}
          style={{
            padding: "10px",
            margin: "5px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            textAlign: "left",
            width: "35%",
            boxSizing: "border-box",
            justifyContent: "space-between"
          }}
        >
          <span style={{ display: "inline-block", width: 44, minWidth: 44, marginRight: 40 }}>
            {logoMap[brand] && (
              <img
                src={logoMap[brand]}
                alt={`${brand} logo`}
                style={{ height: "32px", width: "60px", objectFit: "contain", verticalAlign: "middle" }}
              />
            )}
          </span>
          <span style={{ fontWeight: "bold", fontSize: "1.2em", flex: 1 }}>{brand}</span>
          <span style={{ color: '#888', fontSize: '1.5em', marginLeft: '16px' }}>&#8250;</span>
        </div>
      ))}
    </div>
  );
};

export default BrandList;
