# HVAC Catalog App

## Data Sources & Structure

### Data Sources
- The data for this project was primarily gathered from manufacturer websites. While only Bryant data was used, here are some other brand websites that would have been used to gather information
  - [Bryant](https://www.bryant.com/en/us/before-you-buy/system-types/)
  - [Carrier](https://www.carrier.com/residential/en/us/products/)
  - [Goodman](https://www.goodmanmfg.com/products)
  - [Lennox](https://www.lennox.com/products/)
  - [Trane](https://www.trane.com/residential/en/products.html)
  - [Rheem](https://www.rheem.com/products/residential/)
  - [Daikin](https://www.daikin.com/products/ac/)
  - [York](https://www.york.com/residential-equipment)
  - And others as available
- Product manuals (PDFs) for Bryant were sourced from their official product pages. The overall hub for these pages can be found here: https://www.bryant.com/en/us/before-you-buy/system-types/. To get to a specific manual, click on a certain type of hvac, then on the product, and scroll to the bottom where you will see a documents section.

### Data Structure
- All data is stored in `src/data/hvacData.json`.
- The structure is hierarchical:
  - **Brand** (e.g., "Bryant")
    - **Product Line/Series** (e.g., "Preferred Series Packaged")
      - **Model** (e.g., "577E")
        - Each model includes an array of phase/voltage/capacity details. Since some models have two phases, the details for the model are stored as in a 'phases' array, where each entry in the array stores the information for the specific model and phase.
- Example:
  ```json
  {
    "Bryant": {
      "Preferred Series Packaged": [
        {
          "model": "577E",
          "phases": [
            { "type": "1-phase", "voltage": "208/230V", "capacity": "2-5 tons" },
            { "type": "3-phase", "voltage": "208/230V or 460V", "capacity": "2-5 tons" }
          ]
        },
        ...
      ]
    },
    ...
  }
  ```
- Manuals are stored in `public/manuals/` and are named after the model number (e.g., `577E.pdf`).
- Brand logos and product images are in `src/logos/`.
- All data was manually gathered and entered.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- npm (comes with Node.js)
- you can check if you have these installed and the versions using node -v and npm -v commands

### Installation & Running
1. Clone the repository:
   ```bash
   git clone https://github.com/averyv12/HVAC-Catalog.git
   cd hvac-catalog
   ```
   Altneratively, you can simply download all of the files to your local machine and then run cd hvac-catalog
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser to [http://localhost:3000](http://localhost:3000). If this does not work, look in your terminal for a different address next to 'On Your Network', and use that address instead.

## Usage and Features

- **Navigation:**
  - The app opens with a searchable list of all brands. This list is in alphabetical order.
  - Click a brand to view its product lines.
  - Click a product line to view all models in that line, as well as each model's details.
  - Click a model to view the PDF manual on the right side, if available.
- **Search:**
  - The search bar at the top filters brands, product lines, or models depending on the current view.
  - Search is case-insensitive and filters results as you type.
  - If you are in a brand's product line view, you can search up a specific model, and it will filter the product line that the model is under.
- **Manuals:**
  - If a PDF manual exists for a model, it is displayed in an iframe on the right.
  - The iframe display allows a user to scroll, zoom, download, and print the document. Additionally, it supports the cmd + f search functionality.
  - If no manual is available, a message is shown instead.
- **Recently Viewed Brands:**
  - Brands you click are added to a "Recently Viewed Brands" section for quick access.

## Challenges & Solutions

- **Data Collection:**
  - Challenge: Manufacturer data is often spread across different pages and formats, while some data is also incomplete or missing. 
  - Solution: This required manual aggregation, cleaning, and looking over multiple sites to get the correct information. After that, data was manually compiled into a consistent JSON structure for easy use in the app.
- **Manual Availability:**
  - Challenge: Not all models have manuals available online, and some manuals are hard to find.
  - Solution: The app checks for the existence of a manual and displays a clear message if not found. Ideally, there would be manuals for all models, but since that is not the case, error handling is needed.
- **Dynamic Search:**
  - Challenge: Implementing a search that works across brands, product lines, and models with different data shapes.
  - Solution: Search logic is context-aware and case-insensitive, filtering the relevant list at each navigation level. Includes ability to search for certain models when viewing the product line.
- **PDF Display:**
  - Challenge: Ensuring PDFs display correctly in the browser and handling missing files gracefully.
  - Solution: PDFs are placed in the `public/manuals/` folder and matched by model number, and missing files show a user-friendly message. Files with a manual are indicated in a list.

## Notes
- [Bryant System Types Reference](https://www.bryant.com/en/us/before-you-buy/system-types/)
