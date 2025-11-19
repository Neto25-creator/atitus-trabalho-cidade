import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { MdWaterDrop, MdWarning } from "react-icons/md";
import { Menu } from "../components/Menu";
import "./Relatos.css";


export default function Relatos() {
    return (
        <div className="relatos-container bg-[#f6f6f6] min-h-screen flex flex-col font-sans">
            {/* NAV */}
            <nav className="bg-white shadow-sm p-4 rounded-b-2xl">
                <div className="flex items-center gap-3 text-[15px] font-semibold">
                    <Link to="/map" className="p-1 rounded-full hover:bg-gray-100">
                        <IoIosArrowBack size={22} />
                    </Link>
                    <span>Relatos Cadastrados</span>
                </div>


                {/* Tabs */}
                <div className="flex justify-around mt-4 text-[14px] text-gray-600">
                    <button className="tab-active">Tudo</button>
                    <button className="tab-default">Segurança</button>
                    <button className="tab-default">Infraestrutura</button>
                    <button className="tab-default">Saneamento</button>
                     <button className="tab-default">Outros</button>
                </div>
            </nav>


            {/* Contagem */}
            <div className="px-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">📍 Total <b>2 Relatos</b></span>
            </div>


            {/* Lista */}
            <div className="p-4 flex flex-col gap-4 pb-24">
                {/* CARD 1 */}
                <div className="card">
                    <div className="card-icon"><MdWaterDrop size={28} /></div>
                    <div className="card-info">
                        <h4>Vazamento de água</h4>
                        <p>Rompimento na tubulação de abastecimento</p>
                    </div>
                    <div className="card-details"><FiMoreVertical size={20} /></div>
                </div>


                {/* CARD 2 */}
                <div className="card">
                    <div className="card-icon"><MdWarning size={28} /></div>
                    <div className="card-info">
                        <h4>Buraco</h4>
                        <p>Buraco de grande porte dificultando o tráfego</p>
                    </div>
                    <div className="card-details"><FiMoreVertical size={20} /></div>
                </div>
            </div>


            <Menu />
        </div>
    );
}