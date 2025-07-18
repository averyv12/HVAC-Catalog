// ModelList.js - Displays models for a selected product line
// Handles model selection, PDF manual display, and 'No manual available' logic

import React, { useState } from "react";

const ModelList = ({ models, onBack, seriesName, searchQuery, brand }) => {
  const [selectedModel, setSelectedModel] = useState(null);
  // List of available manuals (update as needed). This way we can display 'No manual available' when appropriate
  const availableManuals = new Set([
    "575C", "577E", "605C", "605E", "607E", "675E", "675C", "677E", "705C", "707E", "PH4Z", "PH5Z"
  ]);
  // Filter models based on search query and model details. Can search on any of the details provided for each model
  const filteredModels = models.filter((model) => {
    const q = searchQuery ? searchQuery.toLowerCase() : "";
    return (
      model.model.toLowerCase().includes(q) ||
      (model.phases &&
        model.phases.some(
          (phase) =>
            (phase.voltage && phase.voltage.toLowerCase().includes(q)) ||
            (phase.type && phase.type.toLowerCase().includes(q)) ||
            (phase.capacity && phase.capacity.toLowerCase().includes(q))
        ))
    );
  });
  // Helper to get PDF path if available
  const getManualPdf = (model) => {
    if (model && model.model && availableManuals.has(model.model)) {
      return `/manuals/${model.model}.pdf`;
    }
    return null;
  };
  const manualPdf = getManualPdf(selectedModel);

  // This is all of the display information for the model page
  // There are two separate div statements here:
  // The first is similar to what we have been doing with the brand and product pages.
  // It establishes clickable boxes for each model, including its name, details, 
  // and an arrow on the right side of the box
  // There is also the back arrow and search bar

  // The second div handles the right side of the screen, where manual pdfs are displayed, if available
  // It displays an iframe containing the pdf if there is a pdf for that specific model.
  // If there is not a pdf for that model, there is not iframe display, and instead 'No manual available' is displayed
  return (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%' }}>
      <div style={{ flex: 1, minWidth: 0, maxWidth: '50vw', overflowY: 'auto', boxSizing: 'border-box', paddingLeft: '40px' }}>
        <span onClick={onBack} style={{ cursor: 'pointer', color: '#333', fontSize: '1.1em', display: 'inline-flex', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '1.5em', marginRight: '6px', lineHeight: 1 }}>←</span>Back to {brand} product lines
        </span>
        <h2 style={{ marginTop: 0, padding: '8px 0 16px 0' }}>Models in {seriesName}</h2>
        <ul>
          {filteredModels.map((model, idx) => (
            <li
              key={idx}
              style={{
                margin: "5px",
                padding: "10px",
                listStyleType: "none",
                alignItems: "center",
                marginLeft: "-40px",
                display: "flex",
                justifyContent: "space-between",
                cursor: 'pointer',
                background: selectedModel && selectedModel.model === model.model ? '#f0f0f0' : 'transparent',
                maxWidth: '480px',
                width: '100%',
                wordBreak: 'break-word',
              }}
              onClick={() => setSelectedModel(model)}
            >
              <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <strong style={{ fontSize: '1em' }}>{model.model}</strong>
                <div style={{ display: 'inline-block', verticalAlign: 'top', marginLeft: 6, fontSize: '0.95em' }}>
                  {(model.phases || [])
                    .sort((a, b) => (a.type === "1-phase" ? -1 : 1)) // 1-phase first
                    .map((phase, pIdx) => (
                      <div key={pIdx} style={{ marginTop: pIdx === 0 ? 0 : 2 }}>
                        <span style={{ fontWeight: 500 }}>{phase.type}, </span> {phase.voltage}, {phase.capacity}
                      </div>
                    ))}
                </div>
              </div>
              <span style={{ color: '#888', fontSize: '1.5em', marginLeft: '16px' }}>&#8250;</span>
            </li>
          ))}
        </ul>
      </div>
      {selectedModel && (
        <div style={{ flex: 1, minWidth: 0, maxWidth: '50vw', padding: '20px', boxSizing: 'border-box', paddingRight: '60px' }}>
          <h3>Manual for {selectedModel.model}</h3>
          {manualPdf ? (
            <iframe
              src={manualPdf}
              title={`Manual for ${selectedModel.model}`}
              width="100%"
              height="600px"
              style={{ border: '1px solid #ccc', borderRadius: '8px' }}
            />
          ) : (
            <div style={{ color: '#b00', fontWeight: 'bold', padding: '32px', textAlign: 'center' }}>
              No manual available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModelList;
