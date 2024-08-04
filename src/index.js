
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
const mainContainer = document.getElementById('root');

const root = createRoot(mainContainer);
root.render(
    <>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </>
);