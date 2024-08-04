import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export const RankingPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [hoveredCountry, setHoveredCountry] = useState(null);

    const sdgColors = [
        '#e5243b', '#dda73a', '#4c9f38', '#c5192d', '#ff3a21', '#26bde2', '#fcc30b',
        '#a21942', '#fd6925', '#dd1367', '#fd9d24', '#bf8b2e', '#3f7e44', '#0a97d9',
        '#56c02b', '#00689d', '#19486a'
    ];

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
                setData(result.features); // Assuming the data structure is correct
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setSelectedCountry(null); // Clear selected country when search term changes
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCountryClick = (countryName) => {
        const country = data.find(feature => feature.attributes.Name === countryName);
        setSelectedCountry(country ? country.attributes : null);
    };

    const handleMouseEnter = (countryName) => {
        setHoveredCountry(countryName);
    };

    const handleMouseLeave = () => {
        setHoveredCountry(null);
    };

    // Sort all countries by overall score to determine the rank
    const sortedData = data.sort((a, b) => b.attributes.Overall_Score - a.attributes.Overall_Score);

    const filteredData = sortedData
        .filter((feature) =>
            feature.attributes.Name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <main className="ranking-page" style={{ backgroundColor: '#f8f9fa', padding: '20px 0' }}>
            <div className="container my-5">
                <div className="text-center mb-4">
                    <h1 style={{ color: '#007bff' }}>Rankings</h1>
                    <p className="lead">The overall performance of all 193 UN Member States</p>
                </div>
                <div className="search-section mb-4">
                    <form>
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search Country"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    style={{ position: 'relative', zIndex: '1' }}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                {selectedCountry ? (
                    <div className="country-details mt-5" style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <h2 style={{ color: '#007bff' }}>
                            {selectedCountry.Name} (Rank: {sortedData.findIndex(feature => feature.attributes.Name === selectedCountry.Name) + 1})
                        </h2>
                        <table className="table table-bordered table-striped">
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
                                        <td>{selectedCountry[`Goal_${goal}_Score`] !== null ? selectedCountry[`Goal_${goal}_Score`].toFixed(1) : 'N/A'}</td>
                                        <td>{selectedCountry[`Goal_${goal}_Trend`] || 'N/A'}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td><strong>Overall Score</strong></td>
                                    <td colSpan="2">{selectedCountry.Overall_Score !== null ? selectedCountry.Overall_Score.toFixed(1) : 'N/A'}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="table-responsive mt-5">
                        <table className="table table-bordered table-striped text-center">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">Rank</th>
                                    <th className="bg-dark text-light">Country</th>
                                    <th className="bg-dark text-light">Overall Score</th>
                                    <th className="bg-dark text-light">Performance By SDG</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr>
                                        <td colSpan="4">Loading...</td>
                                    </tr>
                                )}
                                {error && (
                                    <tr>
                                        <td colSpan="4">{error.message}</td>
                                    </tr>
                                )}
                                {!loading && !error && filteredData.map((feature, index) => {
                                    const countryAttributes = feature.attributes;
                                    const overallScore = countryAttributes.Overall_Score || 0;
                                    const totalScorePercentage = overallScore; // Assuming the overall score is out of 100
                                    const isHovered = hoveredCountry === countryAttributes.Name;
                                    const rank = sortedData.findIndex(f => f.attributes.Name === countryAttributes.Name) + 1;

                                    return (
                                        <tr 
                                            key={index}
                                            onClick={() => handleCountryClick(countryAttributes.Name)}
                                            onMouseEnter={() => handleMouseEnter(countryAttributes.Name)}
                                            onMouseLeave={handleMouseLeave}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: isHovered ? '#f1f1f1' : 'white',
                                                transform: isHovered ? 'scale(1.05)' : 'scale(1)', // Enlarge the row on hover
                                                transition: 'transform 0.2s ease-in-out' // Smooth transition effect
                                            }}
                                        >
                                            <td>{rank}</td>
                                            <td>{countryAttributes.Name}</td>
                                            <td>{overallScore !== null ? overallScore.toFixed(1) : 'N/A'}</td>
                                            <td>
                                                <div style={{ display: 'flex', width: '100%', background: '#e0e0e0', height: '20px', position: 'relative' }}>
                                                    <div style={{ display: 'flex', width: `${totalScorePercentage}%`, height: '100%' }}>
                                                        {Array.from({ length: 17 }, (_, i) => {
                                                            const score = countryAttributes[`Goal_${i + 1}_Score`] || 0;
                                                            const color = sdgColors[i];
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    style={{
                                                                        width: `${score}%`,
                                                                        backgroundColor: color,
                                                                        height: '100%'
                                                                    }}
                                                                ></div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
};
