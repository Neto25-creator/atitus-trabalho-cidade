import { IoMdClose } from "react-icons/io";

import "./modalRelato.css"

export function ModalRelato({ relato, onClose }) {
    if (!relato) return null;

    return (
     
        <div className="modal-backdrop">
        
            <div className="modal-content">
                
         
                <div className="modal-header">
                    <h2 className="modal-title">Detalhes do Relato</h2>
                    <button onClick={onClose} className="modal-close-button">
                        <IoMdClose size={24} />
                    </button>
                </div>

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
                        className="relato-image"
                    />
                )}
            </div>
        </div>
    );
}