import { useEffect, useState, useCallback } from "react";
import { Navbar } from "../components";
import { Menu } from "../components/Menu";
import { Search } from "../components/Search";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px", // Borda arredondada
};

// Posição padrão (São Paulo)
const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center); 

  // Carregamento da API do Google Maps e Geocoding
  const { isLoaded } = useJsApiLoader({ 
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // Adicionado 'places' para busca
  });

  // Função Geocoding: Converte endereço de texto em Lat/Lng
  const geocodeAddress = useCallback((address) => {
    if (!isLoaded || !window.google || !window.google.maps) {
      console.error("A API do Google Maps ainda não está carregada.");
      return;
    }
    
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({
          lat: lat(),
          lng: lng(),
        });
      } else {
        alert(`Não foi possível encontrar a localização para "${address}". Status: ${status}`);
        console.error("Geocoding falhou. Status: " + status);
      }
    });
  }, [isLoaded]);

  // Função de callback passada para o componente Search
  const handleSearchSubmit = useCallback((searchTerm) => {
    geocodeAddress(searchTerm);
  }, [geocodeAddress]);

  // Efeito para buscar a Posição Atual do Usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCurrentPosition(userLocation);
          setMapCenter(userLocation); // Centraliza no usuário ao carregar
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
        }
      );
    } else {
      console.log("Geolocalização não é suportada.");
    }
  }, []);

  // Efeito para buscar os Marcadores Salvos
  useEffect(() => {
    async function fetchMarkers() {
      try {
        const data = await getPoints(token);
        setMarkers(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchMarkers();
  }, [token]);

  // Função para adicionar ponto ao clicar no mapa
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newPoint = {
      latitude: lat,
      longitude: lng,
      descricao: "Descrição do ponto", 
    };
    try {
      const savedPoint = await postPoint(token, newPoint);
      
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.descricao || "Novo Ponto",
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
      };
      setMarkers((prev) => [...prev, savedMarker]);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <Search onSearchSubmit={handleSearchSubmit} /> 
      {/* Container que define a largura de 70% e centraliza o mapa */}
      <div style={{ 
            width: "100%", 
            height: "90.5%", 
        }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={15}
            onClick={handleMapClick}
          >
            {/* Marcador da Posição Atual */}
            <Marker position={currentPosition} title="Sua Posição Atual" /> 

            {/* Marcadores Salvos */}
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                title={marker.title}
              />
            ))}
          </GoogleMap>
        ) : (
          <div>Carregando mapa...</div>
        )}
      </div>
      <Menu />
    </>
  );
};