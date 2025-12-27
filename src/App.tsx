import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LayoutSelectionPage } from './pages/LayoutSelectionPage';
import { BoothPage } from './pages/BoothPage';
import { CustomizePage } from './pages/CustomizePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/layout" element={<LayoutSelectionPage />} />
        <Route path="/booth" element={<BoothPage />} />
        <Route path="/customize" element={<CustomizePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
