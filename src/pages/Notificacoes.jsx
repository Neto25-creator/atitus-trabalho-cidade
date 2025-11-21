import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { IoIosWarning } from "react-icons/io";
import { MdWaterDrop, MdWarning } from "react-icons/md";
import { Menu } from "../components/Menu";
import "./Notificacoes.css";


export default function Notificacoes() {
    return (
        <div className="notificacoes-container bg-[#f6f6f6] min-h-screen flex flex-col font-sans">
            {/* NAV */}
            <nav className="bg-white shadow-sm p-4 rounded-b-2xl">
                <div className="flex items-center gap-3 text-[15px] font-semibold">
                    <Link to="/map" className="p-1 rounded-full hover:bg-gray-100">
                        <IoIosArrowBack size={22} />
                    </Link>
                    <span>Notificações</span>
                </div>


                {/* Tabs */}
                <div className="flex justify-around mt-4 text-[14px] text-gray-600">
                    <button className="tab-active">Tudo</button>
                    <button className="tab-default">Resolvidos</button>
                    <button className="tab-default">Em avaliação</button>
                </div>
            </nav>


            {/* Contagem */}
            <div className="px-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">🔔 Você tem <b>X notificações</b></span>
            </div>


            {/* Lista */}
            <div className="p-4 flex flex-col gap-4 pb-24">
                {/* CARD 1 */}
                <div className="card">
                    <div className="card-icon"><MdWaterDrop size={28} /></div>
                    <div className="card-info">
                        <h4>Vazamento de água - Seu relato foi encaminhado ao departamento de obras!</h4>
                        <p>Rompimento na tubulação de abastecimento</p>
                    </div>
                    <div className="card-details"><FiMoreVertical size={20} /></div>
                </div>


                {/* CARD 2 */}
                <div className="card">
                    <div className="card-icon"><MdWarning size={28} /></div>
                    <div className="card-info">
                        <h4>Seu relato sobre "buraco" foi registrado com sucesso! A equipe da prefeitura irá encaminhar para o setor responsável para que as providências sejam tomadas.</h4>
                        <p>Buraco de grande porte dificultando o tráfego</p>
                    </div>
                    <div className="card-details"><FiMoreVertical size={20} /></div>
                </div>
            </div>

            <b className="ilustrativa">PÁGINA ILUSTRATIVA, SEM FUNCIONALIDADE IMPLEMENTADA<IoIosWarning size={30} /></b>
            <Menu />
        </div>
    );
}