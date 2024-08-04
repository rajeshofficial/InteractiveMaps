import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import '../App.css';

import sdg1 from '../assets/1.png';
import sdg2 from '../assets/2.png';
import sdg3 from '../assets/3.png';
import sdg4 from '../assets/4.png';
import sdg5 from '../assets/5.png';
import sdg6 from '../assets/6.png';
import sdg7 from '../assets/7.png';
import sdg8 from '../assets/8.png';
import sdg9 from '../assets/9.png';
import sdg10 from '../assets/10.png';
import sdg11 from '../assets/11.png';
import sdg12 from '../assets/12.png';
import sdg13 from '../assets/13.png';
import sdg14 from '../assets/14.png';
import sdg15 from '../assets/15.png';
import sdg16 from '../assets/16.png';
import sdg17 from '../assets/17.png';
import Map from '../assets/map.js';

// Utility function to escape special characters for CSS selectors
const escapeCssSelector = (str) => {
    return str.replace(/([ #;&,.+*~\':"!^$[\]()=>|/@])/g, '\\$1');
};

export const MapPage = () => {
    const handleScreenshot = () => {
        const mapElement = document.getElementById('screenshotarea');

        html2canvas(mapElement).then(canvas => {
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'map_screenshot.png';
                a.click();
                URL.revokeObjectURL(url);
            });
        });
    };

    const handleSendEmail = () => {
        const userConfirmed = window.confirm("First save screenshot. Did you save the screenshot?");
        if (userConfirmed) {
            window.location.href = "mailto:?subject=Map Screenshot&body=Please find the attached screenshot.";
        } else {
            // User chose not to send the email
            return;
        }
    };

    const [tooltip, setTooltip] = useState({ visible: false, name: '', score: '', x: 0, y: 0 });
    const [countryData, setCountryData] = useState({});
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/Sustainable_Development_Report_2023_(with_indicators)/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json');
            const data = await response.json();
            const processedData = data.features.reduce((acc, feature) => {
                const name = feature.attributes.Name; // Correct attribute name for country name
                acc[name] = feature.attributes;
                return acc;
            }, {});
            setCountryData(processedData);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const setCountryStyle = (id, score) => {
            const element = document.getElementById(escapeCssSelector(id));
            if (!element) return;

            if (score === undefined || score === null) {
                element.style.fill = 'grey';
                element.style.opacity = 1; // Full opacity for grey (no information)
            } else {
                let opacity;
                if (score >= 80) {
                    opacity = 1;
                } else if (score >= 70) {
                    opacity = 0.8;
                } else if (score >= 60) {
                    opacity = 0.6;
                } else if (score >= 50) {
                    opacity = 0.4;
                } else {
                    opacity = 0.2;
                }
                element.style.fill = ''; // Reset fill color if previously set to grey
                element.style.opacity = opacity;
            }
        };

        Object.keys(countryData).forEach(id => {
            setCountryStyle(id, countryData[id]?.Overall_Score);
        });

        const handleMouseOver = (e) => {
            const pathElement = e.target;
            const id = pathElement.id;
            const { clientX: x, clientY: y } = e;

            const classes = pathElement.className.baseVal.replace(/ /g, '.');
            document.querySelectorAll(`.${escapeCssSelector(classes)}`).forEach(country => {
                country.dataset.originalStroke = country.style.stroke;
                country.dataset.originalStrokeWidth = country.style.strokeWidth;
                country.style.stroke = 'yellow';  // Ensuring this matches the desired color
                country.style.strokeWidth = '4';
            });

            const score = countryData[id]?.Overall_Score ? countryData[id].Overall_Score.toFixed(1) : 'N/A';
            setTooltip({ 
                visible: true, 
                name: `Country : ${id}`, 
                score: `Overall Score : ${score}`, 
                x: x + 15, 
                y: y + 15 
            });
        };

        const handleMouseLeave = (e) => {
            const pathElement = e.target;
            const classes = pathElement.className.baseVal.replace(/ /g, '.');
            document.querySelectorAll(`.${escapeCssSelector(classes)}`).forEach(country => {
                country.style.stroke = country.dataset.originalStroke || '';  // Reset to original or default
                country.style.strokeWidth = country.dataset.originalStrokeWidth || '';  // Reset to original or default
            });

            setTooltip({ visible: false, name: '', score: '', x: 0, y: 0 });
        };

        const handleClick = (e) => {
            const id = e.target.id;
            setSelectedCountry(countryData[id]);
        };

        const paths = document.querySelectorAll('.allPaths');
        paths.forEach(e => {
            e.setAttribute('class', `allPaths ${e.id}`);
            e.addEventListener('mouseover', handleMouseOver);
            e.addEventListener('mouseleave', handleMouseLeave);
            e.addEventListener('click', handleClick);
        });

        return () => {
            paths.forEach(e => {
                e.removeEventListener('mouseover', handleMouseOver);
                e.removeEventListener('mouseleave', handleMouseLeave);
                e.removeEventListener('click', handleClick);
            });
        };
    }, [countryData]);

    const renderSDGScores = () => {
        if (!selectedCountry) return null;

        const goals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        return (
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>SDG</th>
                            <th>Score</th>
                            <th>Trend</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals.map(goal => (
                            <tr key={goal}>
                                <td>SDG {goal} - </td>
                                <td>{selectedCountry[`Goal_${goal}_Score`] != null ? selectedCountry[`Goal_${goal}_Score`].toFixed(1) : 'N/A'}</td>
                                <td>{selectedCountry[`Goal_${goal}_Trend`] || 'N/A'}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className="overall-score"><strong>Overall Score: {selectedCountry.Overall_Score != null ? selectedCountry.Overall_Score.toFixed(1) : 'N/A'}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div id='screenshotarea' className="mainContainer">
                <div className="detail">
                    {!selectedCountry && (
                        <>
                            <div className="info-section">
                                <h3 className="title">Interactive Maps</h3>
                                <p className="description">Select any country to learn more about their specific Sustainable Development Goals and their details.</p>
                            </div>
                            <div className="info-section">
                                <h4 className="subtitle">Map Color Opacity</h4>
                                <p className="description">The color opacity on the map is based on the overall SDG score, providing a visual representation of each country’s performance.</p>
                            </div>
                            <div className="info-section">
                                <h4 className="subtitle">More Features</h4>
                                <p className="description">Click on an SDG button to learn more about the specific goals.</p>
                                <ul className="legend">
                                    <li><span className="legend-icon arrow"><i className="fas fa-arrow-right green-arrow"></i></span> See Ranking with Sdg bar </li>
                                    <li><span className="legend-icon arrow"><i className="fas fa-arrow-right green-arrow"></i></span> Compare Countries</li>
                                    <li><span className="legend-icon arrow"><i className="fas fa-arrow-right green-arrow"></i></span> Search SDG Reports and Papers</li>
                                    <li><span className="legend-icon arrow"><i className="fas fa-arrow-right green-arrow"></i></span> Take Screenshot of Data</li>
                                    <li><span className="legend-icon arrow"><i className="fas fa-arrow-right green-arrow"></i></span> Know more about SDGs </li>
                                    <li><span className="legend-icon arrow"><i className="fas fa-arrow-right green-arrow"></i></span> Share data with friends  </li>
                                </ul>
                            </div>
                            <div className="info-section">
                                <h4 className="subtitle">Description</h4>
                                <p className="description">This webpage provides an interactive maps to explore Sustainable Development Goals (SDG) performance of different countries. Users can select countries on the map to view their SDG scores and trends, compare countries, and access various features such as viewing rankings, searching for reports, and taking screenshots of data.</p>
                            </div>
                        </>
                    )}
                    {selectedCountry && (
                        <div className="sdg-details">
                            <h4>SDG Scores and Trends for {selectedCountry.Name}</h4>
                            {renderSDGScores()}
                        </div>
                    )}
                </div>
                <div className="map">
                    <div 
                        id="tooltip" 
                        style={{
                            top: tooltip.y,
                            left: tooltip.x,
                            opacity: tooltip.visible ? 1 : 0,
                            position: 'fixed',
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            border: '1px solid rgb(245, 128, 128)',
                            fontSize: '1.2rem'
                        }}
                    >
                        <p>{tooltip.name}</p>
                        <p>{tooltip.score}</p>
                    </div>

                    <div>
                        <div id="main_mainContainer">
                            <Map />
                        </div>
                    </div>

                    <div className="sdg-mainContainer">
                        <button 
                            id='screenshotBtn' 
                            style={{
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                margin: '2px',
                                transition: 'background-color 0.3s'
                            }} 
                            onClick={handleScreenshot}
                        >
                            Take Screenshot
                        </button>
                        <button 
                            id='emailBtn' 
                            style={{
                                backgroundColor: '#007BFF',
                                color: 'white',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '16px',
                                margin: '2px',
                                transition: 'background-color 0.3s'
                            }} 
                            onClick={handleSendEmail}
                        >
                            Send Screenshot as Email
                        </button>

                        <p></p>

                        <div className="sdg-buttons">
                            <img src={sdg1} alt="SDG 1" />
                            <img src={sdg2} alt="SDG 2" />
                            <img src={sdg3} alt="SDG 3" />
                            <img src={sdg4} alt="SDG 4" />
                            <img src={sdg5} alt="SDG 5" />
                            <img src={sdg6} alt="SDG 6" />
                            <img src={sdg7} alt="SDG 7" />
                            <img src={sdg8} alt="SDG 8" />
                            <img src={sdg9} alt="SDG 9" />
                            <img src={sdg10} alt="SDG 10" />
                            <img src={sdg11} alt="SDG 11" />
                            <img src={sdg12} alt="SDG 12" />
                            <img src={sdg13} alt="SDG 13" />
                            <img src={sdg14} alt="SDG 14" />
                            <img src={sdg15} alt="SDG 15" />
                            <img src={sdg16} alt="SDG 16" />
                            <img src={sdg17} alt="SDG 17" />
                        </div>
                    </div>
                </div>
            </div>
            {/* Include the GoogleCSE component */}
        </div>
    );
};
