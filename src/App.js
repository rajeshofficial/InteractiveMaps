import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MapPage } from './Pages/mapPage';
import { RankingPage } from './Pages/rankingPage';
import ComparePage from './Pages/compare' // Import the ComparePage
import SDGPage from './Pages/sdgPage'; // Import the SDGPage
import Navbar from './components/nav'; // Import the Navbar
import About from './Pages/about'; // Import the Navbar

const App = () => {
    return (
        <div>
            <Navbar /> 
            <main>
                <Routes>
                    <Route path='/' element={<MapPage />} />
                    <Route path='/ranking' element={<RankingPage />} />
                    <Route path='/compare' element={<ComparePage />} />
                    <Route path='/sdgs' element={<SDGPage />} /> {/* Add the route for SDGPage */}
                    <Route path='/about' element={<About />} /> {/* Add the route for SDGPage */}
                </Routes>
            </main>
        </div>
    );
};

export default App;
