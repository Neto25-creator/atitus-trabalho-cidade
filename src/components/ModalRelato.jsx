import { IoMdClose } from "react-icons/io";

export function ModalRelato({ relato, onClose }) {
    if (!relato) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-11/12 max-w-md p-6 rounded-xl shadow-xl">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Detalhes do Relato</h2>
                    <button onClick={onClose}>
                        <IoMdClose size={24} />
                    </button>
                </div>

                {/* Conteúdo */}
                <p><b>Título:</b> {relato.title || "Sem título"}</p>
                <p><b>Descrição:</b> {relato.description || "Sem descrição"}</p>
                <p><b>Endereço:</b> {relato.address}</p>
                <p><b>Latitude:</b> {relato.position.lat}</p>
                <p><b>Longitude:</b> {relato.position.lng}</p>

                {relato.imageUrl && (
                    <img
                        src={relato.imageUrl}
                        alt="foto do relato"
                        className="w-full rounded-lg mt-4"
                    />
                )}
            </div>
        </div>
    );
}
