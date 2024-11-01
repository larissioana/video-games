import { useState, useEffect } from 'react';
import { base_url, currentDate, lastYear, nextYear } from '../utils/dates';

const useFetchGames = (selectedGenre) => {
    const [games, setGames] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`${base_url}/genres?key=${API_KEY}`);
                const data = await response.json();
                setGenres(data.results);
            } catch (error) {
                setError("Failed to fetch genres");
            }
        };

        const fetchGames = async () => {
            setLoading(true);
            try {
                const genreParam = selectedGenre ? `&genres=${selectedGenre}` : '';
                const response = await fetch(`${base_url}/games?dates=${lastYear},${currentDate}&ordering=-rating&page=1${genreParam}&key=${API_KEY}`);
                const data = await response.json();
                setGames(data.results);
            } catch (error) {
                setError("Failed to fetch games");
            } finally {
                setLoading(false);
            }
        };

        fetchGenres();
        fetchGames();
    }, [selectedGenre]);

    return { games, genres, loading, error };
};

export default useFetchGames;
