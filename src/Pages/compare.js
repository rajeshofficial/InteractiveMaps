import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import html2canvas from 'html2canvas';
import { useLocation, useNavigate } from 'react-router-dom';

const ComparePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm1, setSearchTerm1] = useState('');
    const [searchTerm2, setSearchTerm2] = useState('');
    const [selectedCountry1, setSelectedCountry1] = useState(null);
    const [selectedCountry2, setSelectedCountry2] = useState(null);
    const [compare, setCompare] = useState(false);
    const [showSuggestions1, setShowSuggestions1] = useState(false);
    const [showSuggestions2, setShowSuggestions2] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://services7.arcgis.com/IyvyFk20mB7Wpc95/arcgis/rest/services/Sustainable_Development_Report_2023_(with_indicators)/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json'
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.features);

                // If URL has parameters, set search terms and compare countries
                const params = new URLSearchParams(location.search);
                const country1 = params.get('country1');
                const country2 = params.get('country2');
                if (country1 && country2) {
                    setSearchTerm1(country1);
                    setSearchTerm2(country2);
                    handleCompare(country1, country2, result.features);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [location.search]);

    const handleSearch1 = (e) => {
        setSearchTerm1(e.target.value);
        setSelectedCountry1(null);
        setShowSuggestions1(true);
        setCompare(false);
    };

    const handleSearch2 = (e) => {
        setSearchTerm2(e.target.value);
        setSelectedCountry2(null);
        setShowSuggestions2(true);
        setCompare(false);
    };

    const handleCompare = (term1 = searchTerm1, term2 = searchTerm2, features = data) => {
        const country1 = features.find(feature => feature.attributes.Name.toLowerCase() === term1.toLowerCase());
        const country2 = features.find(feature => feature.attributes.Name.toLowerCase() === term2.toLowerCase());
        setSelectedCountry1(country1 ? country1.attributes : null);
        setSelectedCountry2(country2 ? country2.attributes : null);

        if (!country1) {
            alert(`Country "${term1}" not found.`);
        }

        if (!country2) {
            alert(`Country "${term2}" not found.`);
        }

        if (country1 && country2) {
            setCompare(true);
            setShowSuggestions1(false);
            setShowSuggestions2(false);
            navigate(`?country1=${term1}&country2=${term2}`);
        }
    };

    const handleCountryClick = (countryName, setSearchTerm, setSelectedCountry, setShowSuggestions) => {
        const country = data.find(feature => feature.attributes.Name === countryName);
        setSelectedCountry(country ? country.attributes : null);
        setSearchTerm(countryName);
        setShowSuggestions(false);
        setCompare(false);
    };

    const filteredData1 = data
        .filter((feature) =>
            feature.attributes.Name.toLowerCase().includes(searchTerm1.toLowerCase())
        );

    const filteredData2 = data
        .filter((feature) =>
            feature.attributes.Name.toLowerCase().includes(searchTerm2.toLowerCase())
        );

    const handleScreenshot = () => {
        const compareElement = document.getElementById('compareSection');

        html2canvas(compareElement).then(canvas => {
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'compare_screenshot.png';
                a.click();
                URL.revokeObjectURL(url);
            });
        });
    };

    const handleSendEmail = () => {
        const userConfirmed = window.confirm("First save screenshot. Did you save the screenshot?");
        if (userConfirmed) {
            window.location.href = "mailto:?subject=Compare Screenshot&body=Please find the attached screenshot.";
        } else {
            return;
        }
    };

    return (
        <main className="compare-page" style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
            <div className="container my-5">
                <div className="header-section text-center mb-5" style={{ backgroundColor: '#007bff', color: 'white', padding: '30px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h1>Compare Country SDG Report</h1>
                    <p className="lead" style={{ fontSize: '1.2rem', marginBottom: 0 }}>Compare Sustainable Development Goals between two countries</p>
                </div>
                <div className="row mb-4 justify-content-center">
                    <div className="col-md-5 mb-2" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Country 1"
                            value={searchTerm1}
                            onChange={handleSearch1}
                            onBlur={() => setShowSuggestions1(false)}
                            onFocus={() => setShowSuggestions1(true)}
                        />
                        {showSuggestions1 && searchTerm1 && filteredData1.length > 0 && (
                            <ul style={{ listStyleType: 'none', padding: '0', margin: '0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', position: 'absolute', width: '100%', zIndex: '2' }}>
                                {filteredData1.map((feature, index) => (
                                    <li
                                        key={index}
                                        onMouseDown={() => handleCountryClick(feature.attributes.Name, setSearchTerm1, setSelectedCountry1, setShowSuggestions1)}
                                        style={{
                                            padding: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: searchTerm1 === feature.attributes.Name ? '#f1f1f1' : 'white'
                                        }}
                                    >
                                        {feature.attributes.Name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-md-5 mb-2" style={{ position: 'relative' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Country 2"
                            value={searchTerm2}
                            onChange={handleSearch2}
                            onBlur={() => setShowSuggestions2(false)}
                            onFocus={() => setShowSuggestions2(true)}
                        />
                        {showSuggestions2 && searchTerm2 && filteredData2.length > 0 && (
                            <ul style={{ listStyleType: 'none', padding: '0', margin: '0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', maxHeight: '200px', overflowY: 'auto', position: 'absolute', width: '100%', zIndex: '2' }}>
                                {filteredData2.map((feature, index) => (
                                    <li
                                        key={index}
                                        onMouseDown={() => handleCountryClick(feature.attributes.Name, setSearchTerm2, setSelectedCountry2, setShowSuggestions2)}
                                        style={{
                                            padding: '10px',
                                            cursor: 'pointer',
                                            backgroundColor: searchTerm2 === feature.attributes.Name ? '#f1f1f1' : 'white'
                                        }}
                                    >
                                        {feature.attributes.Name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="col-md-2 mb-2 text-center">
                        <button className="btn btn-primary btn-block" onClick={() => handleCompare()} style={{ width: '100%' }}>Compare</button>
                    </div>
                </div>
                {compare && (
                    <>
                        <div id="compareSection" className="row mt-5">
                            {selectedCountry1 && (
                                <div className="col-12 col-md-6">
                                    <div className="country-section" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px', overflowX: 'auto' }}>
                                        <h2 style={{ marginBottom: '20px', color: '#007bff' }}>{selectedCountry1.Name}</h2>
                                        <table className="table table-bordered table-striped table-responsive">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>SDG</th>
                                                    <th>Score</th>
                                                    <th>Trend</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: 17 }, (_, i) => i + 1).map(goal => (
                                                    <tr key={goal}>
                                                        <td>Goal {goal}</td>
                                                        <td>{selectedCountry1[`Goal_${goal}_Score`] !== null ? selectedCountry1[`Goal_${goal}_Score`].toFixed(1) : 'N/A'}</td>
                                                        <td>{selectedCountry1[`Goal_${goal}_Trend`] || 'N/A'}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td><strong>Overall Score</strong></td>
                                                    <td colSpan="2">{selectedCountry1.Overall_Score !== null ? selectedCountry1.Overall_Score.toFixed(1) : 'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            {selectedCountry2 && (
                                <div className="col-12 col-md-6">
                                    <div className="country-section" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px', overflowX: 'auto' }}>
                                        <h2 style={{ marginBottom: '20px', color: '#007bff' }}>{selectedCountry2.Name}</h2>
                                        <table className="table table-bordered table-striped table-responsive">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>SDG</th>
                                                    <th>Score</th>
                                                    <th>Trend</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from({ length: 17 }, (_, i) => i + 1).map(goal => (
                                                    <tr key={goal}>
                                                        <td>Goal {goal}</td>
                                                        <td>{selectedCountry2[`Goal_${goal}_Score`] !== null ? selectedCountry2[`Goal_${goal}_Score`].toFixed(1) : 'N/A'}</td>
                                                        <td>{selectedCountry2[`Goal_${goal}_Trend`] || 'N/A'}</td>
                                                    </tr>
                                                ))}
                                                <tr>
                                                    <td><strong>Overall Score</strong></td>
                                                    <td colSpan="2">{selectedCountry2.Overall_Score !== null ? selectedCountry2.Overall_Score.toFixed(1) : 'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="text-center mr-4">
                            <button className="btn btn-success" style={{ marginRight: '10px' }} onClick={handleScreenshot}>
                                Take Screenshot
                            </button>
                            <button className="btn btn-primary" onClick={handleSendEmail}>
                                Send Screenshot as Email
                            </button>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default ComparePage;
