import React, { useEffect, useState } from "react";
import "./AuthPages.css";

export function AuthCarousel() {
  const slides = [
    {
      title: "Seja bem-vindo novamente",
      text: "Nosso site/aplicativo foi pensado para você acessar a todo momento e em qualquer lugar!",
    },
    {
      title: "Acompanhe tudo em tempo real",
      text: "Tenha acesso instantâneo às informações e mantenha-se conectado com os problemas da sua cidade.",
    },
    {
      title: "Reporte os problemas da sua cidade",
      text: "Com apenas alguns cliques, você pode informar sobre problemas urbanos e contribuir para uma cidade melhor.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
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
