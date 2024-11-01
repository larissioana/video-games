import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { base_url } from '../../utils/dates';
import './searchPage.css';
import Card from '../../components/card/Card';
import Loader from '../../components/loader/Loader';
import Modal from '../../components/modal/Modal';

const SearchPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gameDetails, setGameDetails] = useState({})
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search");

    useEffect(() => {
        const fetchSearchResults = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            try {
                setLoading(true);
                const response = await fetch(`${base_url}/games?search=${searchQuery}&key=${API_KEY}`);
                const data = await response.json();
                setResults(data.results || []);
                setLoading(false)
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery]);

    const handleModal = async (gameId) => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        try {
            const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=${API_KEY}`);
            const data = await response.json();

            const screenshotsResponse = await fetch(`https://api.rawg.io/api/games/${gameId}/screenshots?key=${API_KEY}`);
            const screenshotsData = await screenshotsResponse.json();
            const gameData = {
                ...data,
                screenshots: screenshotsData.results
            }
            setGameDetails(gameData);
            setIsModalOpen(true);
        } catch (error) {
            console.log("Error fetching game details", error);
        }
    }

    return (
        <>
            {
                loading ?
                    <div className="loading">
                        <Loader />
                    </div>
                    :
                    <div className="search-results-container">
                        {
                            results.map((result) => {
                                return <Card key={result.id} game={result} handleModal={handleModal} />
                            })
                        }
                        {
                            isModalOpen &&
                            <Modal gameDetails={gameDetails} setIsModalOpen={setIsModalOpen} />
                        }
                    </div>
            }
            {
                error &&
                <p>{error}</p>
            }
        </>
    )
}

export default SearchPage
