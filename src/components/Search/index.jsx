import "./search.css"

import { FaSearch } from "react-icons/fa";

export function Search(){
    return(
        <div className="search-container">
            <input className="search" type="text" placeholder="Digite sua localização aqui"/>
        </div>
    )
}