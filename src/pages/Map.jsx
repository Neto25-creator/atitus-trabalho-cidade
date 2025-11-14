import { useEffect, useContext, useState } from "react";
import { Navbar } from "../components";
import { Menu } from "../components/Menu";
import { Search } from "../components/Search";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";

const containerStyle = {
  width: "100%",
  height: "100%"
};

// Como pegar a posição atual do usuário?
// Dica: use Geolocation API do navegador
const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(center)

  // Substitua pela sua chave da API do Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    // Verifica se a API está disponível no navegador
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Sucesso: atualiza a posição e o centro do mapa
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          // Erro (ex: usuário negou a permissão)
          console.error("Erro ao obter a localização:", error);
          // O mapa permanecerá no defaultCenter
        }
      );
    } else {
      console.log("Geolocalização não é suportada por este navegador.");
    }
  }, []);

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
      descricao: "Descrição do ponto", // Você pode personalizar isso
    };
    try {
      const savedPoint = await postPoint(token, newPoint);
      
      // savedPoint vem com os campos id, la  titude, longitude e descricao
      // Precisamos transformar em um objeto com os campos id, title, position
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
      <Search />
      <div style={{ width: "100%", height: "92.5%", display: "flex", justifyContent: "center", borderRadius: "10px" }}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentPosition}
            zoom={15}
            onClick={handleMapClick}
          >
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
