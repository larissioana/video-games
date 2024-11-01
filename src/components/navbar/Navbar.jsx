import './navbar.css'
import searchIcon from '../../assets/icons8-search-30.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { base_url } from '../../utils/dates';
import { useNavigate } from 'react-router-dom'
import Loader from '../loader/Loader';

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    }
}

const Navbar = () => {
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            navigate(`/search?search=${input}`);
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" className="link">Home</Link>
                <Link className="link" to="/genres">Genres</Link>
            </div>
            <div className="nav-right">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={input}
                        onChange={handleInputChange}
                    />
                    <button type="submit">

                        <img src={searchIcon} alt="search" width="20px" />
                    </button>
                </form>
            </div>
        </nav>
    )
}

export default Navbar
