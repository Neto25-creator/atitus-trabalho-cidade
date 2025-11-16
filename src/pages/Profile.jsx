import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Menu } from "../components/Menu";
import perfilFoto from "../assets/foto-perfil-jorge.webp";

export function Profile() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between bg-[#f5f7fb] pb-6">
      {/* NAV */}
      <nav className="px-5 py-4 bg-white shadow-sm flex items-center gap-3">
        <Link to="/map">
          <IoIosArrowBack size={22} />
        </Link>
        <span className="text-lg font-semibold">Informação Pessoal</span>
      </nav>

      {/* INFO CENTRAL */}
      <div className="flex flex-col items-center mt-10 px-6">
        {/* FOTO */}
        <div className="w-36 h-36 rounded-full shadow-md overflow-hidden border-4 border-white">
          <img src={perfilFoto} alt="foto-de-perfil" className="w-full h-full object-cover" />
        </div>
        <h2 className="text-2xl font-bold mt-4">Jorge</h2>

        {/* CARD DE INFORMAÇÕES */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Dados da Conta</h3>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">jorge@email.com</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="text-base font-medium">(54) 99999-9999</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Cidade</p>
              <p className="text-base font-medium">Passo Fundo</p>
            </div>
          </div>
        </div>

        {/* AÇÕES DO PERFIL */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 mt-6 mb-10">
          <h3 className="text-lg font-semibold mb-4">Configurações</h3>

          <div className="flex flex-col gap-4">
            <button className="w-full text-left px-4 py-3 bg-[#eef3fa] rounded-xl hover:bg-[#dbe4f3] transition">Editar Informações</button>
            <button className="w-full text-left px-4 py-3 bg-[#eef3fa] rounded-xl hover:bg-[#dbe4f3] transition">Alterar Foto de Perfil</button>
            <button className="w-full text-left px-4 py-3 bg-[#eef3fa] rounded-xl hover:bg-[#dbe4f3] transition">Alterar Senha</button>
            <button className="w-full text-left px-4 py-3 bg-[#eef3fa] rounded-xl hover:bg-[#dbe4f3] transition">Preferências de Notificação</button>
            <button className="w-full text-left px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition">Excluir Conta</button>
          </div>
        </div>
      </div>

      {/* MENU INFERIOR */}
      <Menu />
    </div>
  );
}

export default Profile;