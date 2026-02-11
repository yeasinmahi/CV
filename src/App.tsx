import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const rawBase = import.meta.env.BASE_URL;
const basename = rawBase === '/' ? undefined : rawBase.replace(/\/$/, '');

const App = () => (
  <BrowserRouter basename={basename}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
