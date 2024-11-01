import './App.css'
import Navbar from './components/navbar/Navbar'
import Genrespage from './pages/genres/Genrespage';
import Homepage from './pages/home/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/searchPage/SearchPage';

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/genres" element={<Genrespage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
