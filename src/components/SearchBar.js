import React, { useState } from 'react';
import axios from 'axios';

const API_KEY = 'AIzaSyBCNobjziF3o1TesXo2hpuMC5t25qyTKE4';
const CX = '17bab3bbde9ee4117';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
                params: {
                    key: API_KEY,
                    cx: CX,
                    q: query
                }
            });
            setResults(response.data.items);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setResults([]);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSearch} style={styles.searchForm}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    style={styles.searchInput}
                />
                <button type="submit" style={styles.searchButton}>Search</button>
            </form>
            {showModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button onClick={closeModal} style={styles.closeButton}>Close</button>
                        <div style={styles.resultsContainer}>
                            {results.map((result, index) => (
                                <div key={index} style={styles.resultItem}>
                                    <a href={result.link} target="_blank" rel="noopener noreferrer" style={styles.resultLink}>
                                        <h3>{result.title}</h3>
                                    </a>
                                    <p>{result.snippet}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        margin: '20px 0',
    },
    searchForm: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        width: '300px',
        marginRight: '10px',
    },
    searchButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        position: 'relative',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '80%',
        maxHeight: '80%',
        overflowY: 'auto',
    },
    closeButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        cursor: 'pointer',
        position: 'fixed',
        top: '10px',
        right: '10px',
    },
    resultsContainer: {
        marginTop: '20px',
    },
    resultItem: {
        marginBottom: '20px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: 'white',
    },
    resultLink: {
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default SearchBar;
