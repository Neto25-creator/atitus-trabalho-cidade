import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiMoreVertical } from "react-icons/fi";
import { MdWaterDrop, MdWarning, MdInfoOutline, MdDangerous } from "react-icons/md";
import { Menu } from "../components/Menu";
import "./Relatos.css";
import { useAuth } from "../contexts/AuthContext";
// 1. Importar a função de serviço
import { getPoints, getReverseGeocodeAddress } from "../services/mapService"; // Ajuste o caminho conforme a localização do seu mapservice.js
import { useState, useEffect } from 'react'; // Importar os hooks do React

// ⚠️ ATENÇÃO: Substitua pelo seu método de obter o token real (ex: contexto, localStorage)

// Função auxiliar para retornar o ícone baseado no título ou descrição
const getIconByTitle = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("água") || lowerTitle.includes("vazamento") || lowerTitle.includes("saneamento")) {
        return <MdWaterDrop size={28} />;
    }
    if (lowerTitle.includes("buraco") || lowerTitle.includes("infraestrutura")) {
        return <MdWarning size={28} />;
    }
    if (lowerTitle.includes("segurança")) {
        return <MdDangerous size={28} />;
    }
    return <MdInfoOutline size={28} />;
};

export default function Relatos() {
    const { token } = useAuth();
    // 2. Definir o estado para armazenar os relatos
    const [relatos, setRelatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 3. Usar useEffect para buscar os dados quando o componente montar
    useEffect(() => {
        async function fetchRelatos() {
            try {
                setLoading(true);
                const data = await getPoints(token);
                
                // 🚀 Novo passo: Adicionar o endereço a cada relato
                const relatosComEndereco = await Promise.all(
                    data.map(async (relato) => {
                        // ⚠️ Cuidado com limites de requisição de API
                        const address = await getReverseGeocodeAddress(
                            relato.position.lat, 
                            relato.position.lng
                        );
                        return { 
                            ...relato, 
                            address: address // Adiciona o campo 'address' ao objeto
                        };
                    })
                );

                setRelatos(relatosComEndereco);
                setError(null);
            } catch (err) {
                console.error("Erro ao carregar relatos:", err);
                setError(err.message || 'Falha ao conectar com o servidor.');
            } finally {
                setLoading(false);
            }
        }

        // Garante que a busca só ocorra se o token estiver disponível
        if (token) {
            fetchRelatos();
        }
    }, [token]);

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
                <span className="flex items-center gap-2">📍 Total <b>{relatos.length} Relatos</b></span>
            </div>

            {/* Lista */}
            <div className="p-4 flex flex-col gap-4 pb-24">
                {loading && <p className="text-center text-gray-500">Carregando relatos...</p>}
                
                {error && <p className="text-center text-red-500 font-bold">Erro: {error}</p>}
                
                {!loading && relatos.length === 0 && !error && (
                    <p className="text-center text-gray-500">Nenhum relato encontrado.</p>
                )}
                
                {/* 4. Mapear os dados para renderizar os cards */}
                {!loading && !error && relatos.map((relato) => (
                    <div className="card" key={relato.id}>
                        {/* O campo 'title' é usado como título e 'description' como descrição detalhada */}
                        <div className="card-icon">{getIconByTitle(relato.title || relato.description)}</div>
                        <div className="card-info">
                            <h4>{relato.title || 'Sem Título'}</h4>
                            <p>{relato.description || `Lat: ${relato.position.lat}, Lng: ${relato.position.lng}`}</p>
                            <p className="text-gray-500 text-xs mt-1">Endereço: <b> {relato.address || 'Buscando endereço...'}</b></p>
                        </div>
                        <div className="card-details"><FiMoreVertical size={20} /></div>
                    </div>
                ))}

            </div>

            <Menu />
        </div>
    );
}