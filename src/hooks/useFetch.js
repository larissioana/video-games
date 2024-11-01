import { useState, useEffect } from 'react';
import { base_url, currentDate, lastYear, nextYear } from '../utils/dates';

const useFetchGames = () => {
    const [games, setGames] = useState([]);
    const [upcomingGames, setUpcomingGames] = useState([]);
    const [newGames, setNewGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = import.meta.env.VITE_API_KEY;
    const CACHE_KEY_POPULAR = 'cachedGames';
    const CACHE_KEY_UPCOMING = 'cachedUpcomingGames';
    const CACHE_KEY_NEW = 'cachedNewGames';

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);

            // Check for cached data
            const cachedDataPopular = localStorage.getItem(CACHE_KEY_POPULAR);
            const cachedDataUpcoming = localStorage.getItem(CACHE_KEY_UPCOMING);
            const cachedDataNew = localStorage.getItem(CACHE_KEY_NEW);

            if (cachedDataPopular && cachedDataUpcoming && cachedDataNew) {
                setGames(JSON.parse(cachedDataPopular));
                setUpcomingGames(JSON.parse(cachedDataUpcoming));
                setNewGames(JSON.parse(cachedDataNew));
                setLoading(false);
                return;
            }

            try {
                // Fetch popular games
                const responsePopular = await fetch(
                    `${base_url}/games?dates=${lastYear},${currentDate}&ordering=-rating&page=1&key=${API_KEY}`
                );
                if (!responsePopular.ok) throw new Error("Failed to fetch popular games");
                const popularData = await responsePopular.json();

                // Fetch upcoming games
                const responseUpcoming = await fetch(
                    `${base_url}/games?dates=${currentDate},${nextYear}&ordering=-added&page=1&key=${API_KEY}`
                );
                if (!responseUpcoming.ok) throw new Error("Failed to fetch upcoming games");
                const upcomingData = await responseUpcoming.json();

                //Fetch new games
                const responseNew = await fetch(
                    `${base_url}/games?dates=${lastYear},${currentDate}&ordering=-added&page=1&key=${API_KEY}`
                );
                if (!responseNew.ok) throw new Error("Failed to fetch upcoming games");
                const newData = await responseNew.json();

                // Set data in state and cache it
                setGames(popularData.results);
                setUpcomingGames(upcomingData.results);
                setNewGames(newData.results);

                localStorage.setItem(CACHE_KEY_POPULAR, JSON.stringify(popularData.results));
                localStorage.setItem(CACHE_KEY_UPCOMING, JSON.stringify(upcomingData.results));
                localStorage.setItem(CACHE_KEY_NEW, JSON.stringify(newData.results));

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, []);

    return { games, upcomingGames, loading, error, newGames };
};

export default useFetchGames;
