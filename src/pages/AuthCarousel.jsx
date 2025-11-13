import React, { useEffect, useState } from "react";
import "./AuthPages.css";

export function AuthCarousel() {
  const slides = [
    {
      title: "Seja bem-vindo novamente",
      text: "o Cidade conectada foi pensado para você acessar a todo momento e em qualquer lugar!",
    },
    {
      title: "Acompanhe tudo em tempo real",
      text: "Tenha acesso instantâneo às informações e mantenha-se conectado com os problemas da sua cidade.",
    },
    {
      title: "Segurança e praticidade",
      text: "Seus dados são protegidos e o acesso é simples, rápido e eficiente.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // muda a cada 5 segundos
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="carousel">
      <div className="carousel-content">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].text}</p>
      </div>
      <div className="carousel-dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
}
