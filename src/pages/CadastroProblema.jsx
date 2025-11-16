import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { Menu } from "../components/Menu";

export default function CadastroProblema() {
  const [fileName, setFileName] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-[#f5f7fb] py-10">
      <div className="w-[1680px] bg-white p-10 rounded-2xl shadow-lg"> {/* deixado mais horizontal */}
        {/* NAV */}
        <nav className="flex items-center gap-3 mb-8">
          <Link to={"/map"}>
            <IoIosArrowBack size={22} />
          </Link>
          <span className="text-lg font-semibold">Novo Relato</span>
        </nav>

        {/* UPLOAD DE FOTO */}
        <div className="flex justify-center mb-8 flex-col items-center">
          <label className="w-60 h-16 bg-[#6fa8ff] text-white rounded-xl flex items-center justify-center cursor-pointer text-sm font-medium">
            Escolher Foto
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>

          {fileName && (
            <p className="mt-3 text-sm text-gray-600">Arquivo selecionado: <span className="font-medium">{fileName}</span></p>
          )}
        </div>

        {/* GRID ORGANIZADO */}
        <div className="grid grid-cols-2 gap-6">

          {/* TÍTULO */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Título do Problema</label>
            <input className="w-full bg-[#eef3fa] rounded-xl p-4 text-sm outline-none" placeholder="Ex: Vazamento de água" />
          </div>

          {/* CATEGORIA */}
          <div>
            <label className="block text-sm font-semibold mb-1">Categoria</label>
            <div className="flex gap-2 flex-wrap">
              {["Buracos", "Vazamentos", "Iluminação", "Saneamento", "Outros"].map((c, i) => (
                <button key={i} className="px-4 py-2 rounded-xl bg-[#eef3fa] text-sm hover:bg-[#6fa8ff] hover:text-white transition-all">{c}</button>
              ))}
            </div>
          </div>

          {/* CIDADE */}
          <div>
            <label className="block text-sm font-semibold mb-1">Cidade</label>
            <div className="flex items-center bg-[#eef3fa] rounded-xl p-3 gap-3">
              <FiMapPin size={18} />
              <input className="w-full bg-transparent outline-none text-sm" placeholder="Passo Fundo" />
            </div>
          </div>

          {/* ENDEREÇO */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Endereço</label>
            <div className="flex items-center bg-[#eef3fa] rounded-xl p-3 gap-3">
              <FiMapPin size={18} />
              <input className="w-full bg-transparent outline-none text-sm" placeholder="Rua Dom Pedro II, Petrópolis" />
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="col-span-2">
            <label className="block text-sm font-semibold mb-1">Descrição</label>
            <textarea className="w-full bg-[#eef3fa] rounded-xl p-4 text-sm outline-none" rows={5} placeholder="Descreva o problema encontrado..." />
          </div>
        </div>

        {/* BOTÃO */}
        <button className="w-full mt-8 bg-[#6fa8ff] text-white py-4 rounded-xl font-semibold text-base cursor-pointer">
          Criar Relato
        </button>
      </div>

      <Menu />
    </div>
  );
}
