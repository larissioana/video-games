import './card.css'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Tooltip } from 'react-tooltip'
import { smallImage } from '../../utils/media-resize';
import { formatReleaseDate } from '../../utils/formatDate';

const Card = ({ game, handleModal, genre }) => {
    return (
        <motion.div
            layoutId={game.id}
            className="games-image"
            data-tooltip-id="game"
            data-tooltip-content={game.name}
        >
            <LazyLoadImage
                effect="blur"
                src={!genre ? smallImage(game.background_image, 640) : game.background_image}
                alt={game.name}
                onClick={() => handleModal(game.id)}
            />
            <h3 className="title">{game.name}</h3>
            <h4 className="release-date">Release date: {formatReleaseDate(game.released)}</h4>
            <div className="genres-card">
                <p className="genre-name">
                    Genres: {game.genres.map((genre) => genre.name).join(', ')}
                </p>
            </div>
            <Tooltip id="game" />
        </motion.div>
    )
}

export default Card
