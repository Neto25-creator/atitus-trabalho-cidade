import "./search.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

export function Search({ onSearchSubmit }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() && onSearchSubmit) {
            onSearchSubmit(searchTerm.trim());
        }
    };

    return (
        <form className="search-container" onSubmit={handleSubmit}>
            <div className="search-wrapper">
                <FaSearch className="search-icon" size={18} />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Digite sua localização aqui..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </form>
    );
}