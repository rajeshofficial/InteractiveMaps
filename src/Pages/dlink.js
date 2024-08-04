import React, { useState } from 'react';
import sdg1 from './assets/1.png';
import sdg2 from './assets/2.png';
import sdg3 from './assets/3.png';
import sdg4 from './assets/4.png';
import sdg5 from './assets/5.png';
import sdg6 from './assets/6.png';
import sdg7 from './assets/7.png';
import sdg8 from './assets/8.png';
import sdg9 from './assets/9.png';
import sdg10 from './assets/10.png';
import sdg11 from './assets/11.png';
import sdg12 from './assets/12.png';
import sdg13 from './assets/13.png';
import sdg14 from './assets/14.png';
import sdg15 from './assets/15.png';
import sdg16 from './assets/16.png';
import sdg17 from './assets/17.png';
import data from '../SeconData/dlink.json'; 

const sdgImages = [sdg1, sdg2, sdg3, sdg4, sdg5, sdg6, sdg7, sdg8, sdg9, sdg10, sdg11, sdg12, sdg13, sdg14, sdg15, sdg16, sdg17];

const SDGPage = () => {
  const [selectedSDG, setSelectedSDG] = useState(null);

  const handleSDGClick = (sdgNumber) => {
    const sdgDetails = data[sdgNumber];
    setSelectedSDG(sdgDetails);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Sustainable Development Goals</h1>
      <div className="row text-center">
        {sdgImages.map((image, index) => (
          <div key={index} className="col-md-3 mb-4">
            <img
              src={image}
              alt={`SDG ${index + 1}`}
              style={{ cursor: 'pointer', width: '100px', height: '100px' }}
              onClick={() => handleSDGClick(index + 1)}
            />
          </div>
        ))}
      </div>
      {selectedSDG && (
        <div className="sdg-details mt-5">
          <h2 className="text-center">SDG {selectedSDG.SDG} Details</h2>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Indicator</th>
                <th>Description</th>
                <th>Source</th>
                <th>Download Link</th>
              </tr>
            </thead>
            <tbody>
              {selectedSDG.Indicators.map((item, index) => (
                <tr key={index}>
                  <td>{item.Indicator}</td>
                  <td>{item.Description}</td>
                  <td>{item.Source}</td>
                  <td><a href={item.Dwldlink} target="_blank" rel="noopener noreferrer">Download</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SDGPage;
