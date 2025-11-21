import { IoMdClose } from "react-icons/io";

import "./modalRelato.css"

export function ModalRelato({ relato, onClose }) {
    if (!relato) return null;

    return (
        // Substituindo fixed inset-0 flex items-center justify-center bg-opacity-50 z-50
        <div className="modal-backdrop">
            {/* Substituindo bg-white w-11/12 max-w-md p-6 rounded-xl shadow-xl */}
            <div className="modal-content">
                
                {/* Header - Substituindo flex justify-between items-center mb-4 */}
                <div className="modal-header">
                    <h2 className="modal-title">Detalhes do Relato</h2>
                    <button onClick={onClose} className="modal-close-button">
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Conteúdo */}
                <div className="modal-body-details">
                    <p><b>Título:</b> {relato.title || "Sem título"}</p>
                    <p><b>Descrição:</b> {relato.description || "Sem descrição"}</p>
                    <p><b>Endereço:</b> {relato.address}</p>
                    <p><b>Latitude:</b> {relato.position.lat}</p>
                    <p><b>Longitude:</b> {relato.position.lng}</p>
                </div>

                {relato.imageUrl && (
                    <img
                        src={relato.imageUrl}
                        alt="foto do relato"
                        // Substituindo w-full rounded-lg mt-4
                        className="relato-image"
                    />
                )}
            </div>
        </div>
    );
}