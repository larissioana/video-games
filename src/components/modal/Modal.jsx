import { motion } from 'framer-motion'
import './modal.css'
import { Tooltip } from 'react-tooltip'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import starEmpty from '../../assets/star-empty.png'
import starFull from '../../assets/star-full.png'
import { smallImage } from '../../utils/media-resize';

const Modal = ({ gameDetails, setIsModalOpen }) => {

    const getStarsRating = () => {
        const stars = [];
        const rating = Math.floor(gameDetails?.rating);
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<img src={starFull} key={i} alt="star" width="25px" />)
            } else {
                stars.push(<img src={starEmpty} key={i} alt="star" width="25px" />)
            }
        }
        return stars;
    };

    return (
        <motion.div
            className="modal"
            layoutId={gameDetails.id}
        >
            <div className="close-btn" onClick={() => setIsModalOpen(false)} data-tooltip-id="close"
                data-tooltip-content="Close">X</div>
            <Tooltip id="close" />
            <div className="game-info">
                <h1 className="title">{gameDetails?.name}</h1>
                <div className="more-info">
                    <div className="stars-rating">
                        <h3 className="rating">Rating: {gameDetails?.rating}</h3>
                        {getStarsRating()}
                    </div>
                    <div className="platform-container">
                        <h3>Platform</h3>
                        <div className="platforms">
                            {
                                gameDetails?.platforms.map((platform) => {
                                    return <div key={platform.platform.id} className="platform">
                                        <h4>{platform.platform.name}</h4>
                                    </div>
                                }).slice(0, 1)}
                        </div>
                    </div>
                </div>
                <div className="description">
                    <p>{gameDetails?.description_raw}</p>
                </div>
                <div className="media">
                    <LazyLoadImage
                        effect="blur"
                        placeholderSrc={gameDetails?.background_image ? smallImage(gameDetails.background_image, 640) : undefined}
                        src={gameDetails?.background_image}
                        alt={gameDetails?.name}
                    />
                </div>
                {
                    gameDetails?.tags.length > 0 &&
                    <>
                        <h2 className="tags-title">Tags</h2>
                        <div className="tags">
                            {
                                gameDetails?.tags.map((tag) => {
                                    return <div key={tag.id} className="tags-container">
                                        <p>{tag.name}</p>
                                        <LazyLoadImage effect="blur" src={smallImage(tag.image_background, 640)} placeholderSrc={gameDetails?.background_image ? smallImage(gameDetails.background_image, 420) : undefined} alt={tag.name} width="100%" />
                                    </div>
                                }).slice(0, 9)
                            }
                        </div>
                    </>
                }
                <div className="gallery">
                    {
                        gameDetails?.screenshots.map((screenshot) => {
                            return <div key={screenshot.id}>
                                <LazyLoadImage effect="blur" src={screenshot.image} alt="game screenshots" />
                            </div>
                        })
                    }
                </div>
            </div>
        </motion.div >
    )
}

export default Modal
