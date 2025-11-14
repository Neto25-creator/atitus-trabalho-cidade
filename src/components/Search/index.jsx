import "./search.css"
import { FaSearch } from "react-icons/fa";
import { useState } from "react"; 

export function Search({ onSearchSubmit }){ 
    const [searchTerm, setSearchTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o refresh da página (CRÍTICO)

        if (searchTerm.trim() && onSearchSubmit) {
            onSearchSubmit(searchTerm.trim()); // Chama a função de busca do Map.jsx
            // Opcional: setSearchTerm(''); // Descomente para limpar o campo após a busca
        }
    };

    return(
        <form className="search-container" onSubmit={handleSubmit}> 
            <input 
                className="search" 
                type="text" 
                placeholder="Digite sua localização aqui"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* O ícone/botão deve ter o type="submit" para funcionar no formulário */}
            <button type="submit" className="search-icon-button">
                <FaSearch size={20}/> 
            </button>
        </form>
    )
}