import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { MdWaterDrop, MdWarning, MdInfoOutline, MdDangerous } from "react-icons/md";
import { Menu } from "../components/Menu";
import "./Relatos.css";
import { useAuth } from "../contexts/AuthContext";
import { getPoints, getReverseGeocodeAddress } from "../services/mapService";
import { useState, useEffect } from 'react';
import { ModalRelato } from "../components/ModalRelato/ModalRelato";

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

    const [relatos, setRelatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [relatoSelecionado, setRelatoSelecionado] = useState(null);

    useEffect(() => {
        async function fetchRelatos() {
            try {
                setLoading(true);
                const data = await getPoints(token);

                const relatosComEndereco = await Promise.all(
                    data.map(async (relato) => {
                        const address = await getReverseGeocodeAddress(
                            relato.position.lat,
                            relato.position.lng
                        );
                        return {
                            ...relato,
                            address
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

        if (token) fetchRelatos();
    }, [token]);


    async function handleDelete(id) {
        const confirmar = window.confirm("Tem certeza que deseja excluir este relato?");

        if (!confirmar) return;

        try {
            await fetch(`URL_DA_SUA_API/points/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` }
            });

            setRelatos((prev) => prev.filter((r) => r.id !== id));

        } catch (err) {
            console.error("Erro ao excluir relato:", err);
            alert("Erro ao excluir o relato.");
        }
    }


    return (
        <div className="relatos-container bg-[#f6f6f6] min-h-screen flex flex-col font-sans">

            <nav className="bg-white shadow-sm p-4 rounded-b-2xl">
                <div className="flex items-center gap-3 text-[15px] font-semibold">
                    <Link to="/map" className="p-1 rounded-full hover:bg-gray-100">
                        <IoIosArrowBack size={22} />
                    </Link>
                    <span>Seus relatos Cadastrados</span>
                </div>

                <div className="flex justify-around mt-4 text-[14px] text-gray-600">
                    <button className="tab-active">Tudo</button>
                </div>
            </nav>

            <div className="px-4 mt-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">📍 Total <b>{relatos.length} Relatos</b></span>
            </div>

            <div className="p-4 flex flex-col gap-4 pb-24">
                {loading && <p className="text-center text-gray-500">Carregando relatos...</p>}

                {error && <p className="text-center text-red-500 font-bold">Erro: {error}</p>}

                {!loading && relatos.length === 0 && !error && (
                    <p className="text-center text-gray-500">Nenhum relato encontrado.</p>
                )}

                {!loading && !error && relatos.map((relato) => (
                    <div className="pre-card" key={relato.id}>
                        
                        <div className="card-icon">
                            {getIconByTitle(relato.title || relato.description)}
                        </div>

                        <div className="card-info">
                            <h4>{relato.title || 'Sem Título'}</h4>
                            <p>{relato.description || `Lat: ${relato.position.lat}, Lng: ${relato.position.lng}`}</p>
                            <p className="text-gray-500 text-xs mt-1">
                                Endereço: <b>{relato.address || 'Buscando endereço...'}</b>
                            </p>
                        </div>

                        <div className="buttons-area">
                            <button 
                                className="btn-detalhes"
                                onClick={() => setRelatoSelecionado(relato)}
                            >
                                Detalhes
                            </button>

                            <button 
                                className="btn-excluir"
                                onClick={() => handleDelete(relato.id)}
                            >
                                Excluir
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {relatoSelecionado && (
                <ModalRelato 
                    relato={relatoSelecionado}
                    onClose={() => setRelatoSelecionado(null)}
                />
            )}

            <Menu />
        </div>
    );
}
