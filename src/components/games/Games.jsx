import React, { useState } from 'react';
import useFetchGames from '../../hooks/useFetch';
import Loader from '../loader/Loader';
import './games.css';
import Modal from '../modal/Modal';
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../card/Card';

const Games = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gameDetails, setGameDetails] = useState({});
    const { games, loading, error, upcomingGames, newGames } = useFetchGames();

    if (error) return <p>Error: {error}</p>;

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
        <div>
            {
                loading ? (
                    <div className="loading">
                        <Loader />
                    </div>
                ) : (
                    <motion.div layout type="crossfade">
                        <motion.div
                            className={`video-games-container ${isModalOpen ? 'background-opacity' : ''}`}
                        >
                            <h2 className="video-games-title">Popular Games</h2>
                            <div className="games">
                                {
                                    games.map((game) => (
                                        <Card
                                            key={game.id}
                                            game={game}
                                            handleModal={handleModal}
                                            size="small"
                                        />
                                    )).slice(0, 8)}
                            </div>
                            <h2 className="video-games-title">Upcoming Games</h2>
                            <div className="games">
                                {
                                    upcomingGames.map((game) => (
                                        <Card
                                            key={game.id}
                                            game={game}
                                            handleModal={handleModal}
                                            size="medium"
                                        />
                                    )).slice(0, 8)}
                            </div>
                            <h2 className="video-games-title">New Games</h2>
                            <div className="games">
                                {
                                    newGames.map((game) => (
                                        <Card
                                            key={game.id}
                                            game={game}
                                            handleModal={handleModal}
                                            size="large"
                                        />
                                    )).slice(0, 8)}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            {
                isModalOpen &&
                <AnimatePresence>
                    <Modal gameDetails={gameDetails} setIsModalOpen={setIsModalOpen} />
                </AnimatePresence>
            }
        </div>
    );
};

export default Games;
