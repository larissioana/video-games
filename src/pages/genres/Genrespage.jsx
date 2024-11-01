import useFetchGenres from '../../hooks/useFetchGenres';
import './genrespage.css';
import Loader from '../../components/loader/Loader';
import Card from '../../components/card/Card';
import { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import { parseHTMLDescription } from '../../utils/htmlDescription';
import { smallImage } from '../../utils/media-resize';

const Genrespage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameDetails, setGameDetails] = useState({});
    const storedGenreDetails = JSON.parse(localStorage.getItem("genreDetails")) || {}
    const [genre, setGenre] = useState(storedGenreDetails);
    // Set default genre to 'action'
    const storedGenre = localStorage.getItem('selectedGenre') || 'action';
    const [selectedGenre, setSelectedGenre] = useState(storedGenre);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Fetch games based on selected genre
    const { games, genres, loading, error } = useFetchGenres(selectedGenre === 'action' ? '' : selectedGenre);
    useEffect(() => {
        // Store selected genre and genre details in localStorage
        localStorage.setItem('selectedGenre', selectedGenre);
        if (Object.keys(genre).length > 0) {
            localStorage.setItem('genreDetails', JSON.stringify(genre));
        }
    }, [selectedGenre, genre]);

    const fetchGenreDetails = async (genreId) => {
        const API_KEY = import.meta.env.VITE_API_KEY;
        try {
            const response = await fetch(`https://api.rawg.io/api/genres/${genreId}?key=${API_KEY}`);
            const data = await response.json();
            setGenre(data);
        } catch (error) {
            console.log("Error fetching genre details", error);
        }
    };


    const handleGenreSelect = (genre, id) => {
        setSelectedGenre(genre);
        setCurrentIndex(genres.findIndex(g => g.slug === genre));
        fetchGenreDetails(id);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight') {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;
                if (nextIndex >= genres.length) return prevIndex;
                // Pass both slug and id to handleGenreSelect
                handleGenreSelect(genres[nextIndex].slug, genres[nextIndex].id);
                return nextIndex;
            });
        } else if (e.key === 'ArrowLeft') {
            setCurrentIndex((prevIndex) => {
                const prevIndexValue = prevIndex - 1;
                if (prevIndexValue < 0) return prevIndex;
                // Pass both slug and id to handleGenreSelect
                handleGenreSelect(genres[prevIndexValue].slug, genres[prevIndexValue].id);
                return prevIndexValue;
            });
        }
    };


    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [genres, currentIndex]);

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
            };
            setGameDetails(gameData);
            setIsModalOpen(true);
        } catch (error) {
            console.log("Error fetching game details", error);
        }
    };

    return (
        <div>
            {
                loading ? (
                    <div className="loading"><Loader /></div>
                ) : (
                    <div className="genres-container">
                        <div className="genres-buttons">
                            {
                                genres.map((genre) => {
                                    return <button
                                        key={genre.id}
                                        className={`genre-button ${selectedGenre === genre.slug ? 'active' : ''}`}
                                        onClick={() => handleGenreSelect(genre.slug, genre.id)}
                                    >
                                        {genre.name}
                                    </button>
                                }).slice(0, 10)
                            }
                        </div>
                        <div className="genres-details">
                            <div className="genres-description">
                                <h3>{genre.name}</h3>
                                <p>{parseHTMLDescription(genre.description)}</p>
                            </div>
                        </div>
                        <div className="genres-games">
                            {
                                games && games.length > 0 ? (
                                    games.map((game) => (
                                        <Card key={game.id} game={game} handleModal={handleModal} genre={true} />
                                    ))
                                ) : (
                                    <p>No games available for this genre</p>
                                )
                            }
                        </div>
                        {
                            isModalOpen &&
                            <Modal gameDetails={gameDetails} setIsModalOpen={setIsModalOpen} />
                        }
                    </div>
                )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default Genrespage;
