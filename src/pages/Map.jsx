import { useEffect, useState, useCallback } from "react";
import { Navbar } from "../components";
import { Menu } from "../components/Menu";
import { Search } from "../components/Search";
import { CadastroProblemaCard } from "../components/CadastroProblemaCard";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { getPoints, postPoint } from '../services/mapService';
import { useAuth } from "../contexts/AuthContext";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px", 
};

// Posição padrão (São Paulo)
const center = {
  lat: -23.55052,
  lng: -46.633308,
};

export const Map = () => {
  const { token } = useAuth();
  const [markers, setMarkers] = useState([]);
  // currentPosition e mapCenter iniciam em São Paulo, mas serão atualizados pelo useEffect
  const [currentPosition, setCurrentPosition] = useState(center);
  const [mapCenter, setMapCenter] = useState(center); 
  const [mapInstance, setMapInstance] = useState(null)

  // ESTADOS DE CADASTRO
  const [newPointData, setNewPointData] = useState(null); // {latitude: X, longitude: Y}
  const [addressData, setAddressData] = useState(null); // { city: '...', fullAddress: '...' }

  // Carregamento da API do Google Maps e Geocoding
  const { isLoaded } = useJsApiLoader({ 
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

// ----------------------------------------------------------------------
// FUNÇÕES DE GEOCÓDIGO
// ----------------------------------------------------------------------

  // Função Reverse Geocoding: Converte Lat/Lng em endereço legível
  const reverseGeocode = useCallback(async (lat, lng) => {
    if (!isLoaded || !window.google || !window.google.maps) {
      console.error("A API do Google Maps não está carregada para reverse geocoding.");
      return { city: "Erro", fullAddress: "API indisponível" };
    }

    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat: parseFloat(lat), lng: parseFloat(lng) };

    return new Promise((resolve) => {
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const fullAddress = results[0].formatted_address;
          
          // Tenta encontrar a cidade nos components de endereço
          const cityComponent = results[0].address_components.find(
            comp => comp.types.includes('locality') || comp.types.includes('administrative_area_level_2')
          );
          
          const city = cityComponent ? cityComponent.long_name : 'Cidade Desconhecida';
          
          resolve({ city, fullAddress });
        } else {
          console.error("Reverse Geocoding falhou. Status: " + status);
          resolve({ city: 'Não encontrado', fullAddress: 'Endereço não encontrado' });
        }
      });
    });
  }, [isLoaded]);

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


// ----------------------------------------------------------------------
// FUNÇÕES DE EVENTOS E EFEITOS
// ----------------------------------------------------------------------

  // Efeito para buscar a Posição Atual do Usuário e centralizar o mapa
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };
          setCurrentPosition(userLocation);
          setMapCenter(userLocation); // ESTA LINHA CENTRALIZA O MAPA NO USUÁRIO
        },
        (error) => {
          console.error("Erro ao obter a localização:", error);
          // Se der erro, mantém a posição padrão (São Paulo)
        }
      );
    } else {
      console.log("Geolocalização não é suportada.");
    }
  }, []); // Roda apenas na montagem

  // Efeito para buscar os Marcadores Salvos (mantido)
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

  // Função de callback passada para o componente Search (mantida)
  const handleSearchSubmit = useCallback((searchTerm) => {
    geocodeAddress(searchTerm);
  }, [geocodeAddress]);


// ----------------------------------------------------------------------
// FUNÇÃO DE CLIQUE DO MAPA (REVISADA)
// ----------------------------------------------------------------------

  // FUNÇÃO REVISADA: Captura o clique, busca o endereço, e abre o formulário
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log("Mapa clicado! Evento recebido.");

    // 1. Define a posição inicial no estado
    setNewPointData({
      latitude: lat,
      longitude: lng,
    });
    
    // 2. Define o endereço como 'Carregando' para feedback imediato
    setAddressData({ city: 'Carregando...', fullAddress: 'Aguarde...' });

    // 3. Executa o Reverse Geocoding
    const address = await reverseGeocode(lat, lng);
    
    // 4. Salva os dados de endereço
    setAddressData(address);
  };

  const handleCenterClick = () => {
    if (!isLoaded || !mapCenter) {
      console.log("Mapa ainda não carregado.");
      return;
    }
    
    // Simula o evento de clique, usando o centro atual (mapCenter)
    // O async/await é omitido aqui, pois chamaremos a função de clique
    
    // Se você não usou a variável mapInstance, chame o handleMapClick diretamente:
    const mockEvent = {
        latLng: {
            lat: () => mapCenter.lat,
            lng: () => mapCenter.lng,
        }
    };
    handleMapClick(mockEvent); 
    
  };

  // NOVA FUNÇÃO: Recebe os dados do formulário e faz o POST (mantida)
  const handleCadastroSubmit = async (title, description, category, fileName) => {
    if (!newPointData) return;

    const newPoint = {
      latitude: newPointData.latitude,
      longitude: newPointData.longitude,
      title: title, 
      description: description, 
      category: category,
      // ...
    };

    try {
      const savedPoint = await postPoint(token, newPoint);
      
      const savedMarker = {
        id: savedPoint.id,
        title: savedPoint.title || savedPoint.descricao || "Novo Ponto", 
        position: {
          lat: savedPoint.latitude,
          lng: savedPoint.longitude,
        },
      };
      
      setMarkers((prev) => [...prev, savedMarker]);
      setNewPointData(null); // Fecha o formulário ao concluir
      setAddressData(null); // Limpa os dados de endereço
    } catch (error) {
      alert(error.message);
    }
  };

  // NOVA FUNÇÃO: Fecha o formulário sem salvar
  const handleCloseCard = () => {
    setNewPointData(null);
    setAddressData(null); // Limpa os dados de endereço
  };

// ----------------------------------------------------------------------
// RENDERIZAÇÃO
// ----------------------------------------------------------------------
  return (
    <>
      <Navbar />
      <Search onSearchSubmit={handleSearchSubmit} /> 
      <div style={{ 
            width: "100%", 
            height: "100%", 
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
      <Menu handleCenterClick={handleCenterClick}/>

      {/* RENDERIZA QUANDO newPointData ESTIVER PRESENTE */}
      {newPointData && (
        <CadastroProblemaCard
          onSubmit={handleCadastroSubmit}
          onClose={handleCloseCard}
          
          // PASSANDO OS DADOS DE COORDENADA (usa a estrutura de objeto que o Card espera)
          position={{ lat: newPointData.latitude, lng: newPointData.longitude }}
          
          // PASSANDO OS DADOS DE ENDEREÇO (addressData pode ser 'Carregando' ou o endereço final)
          addressData={addressData}
        />
      )}
    </>
  );
};
export default Map;