import { useEffect, useState, useCallback } from "react";

import { Navbar } from "../components";

import { Menu } from "../components/Menu";

import { Search } from "../components/Search";

import { CadastroProblemaCard } from "../components/CadastroProblemaCard";

import { ModalRelato } from "../components/ModalRelato/ModalRelato";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { getPoints, postPoint } from '../services/mapService';

import { useAuth } from "../contexts/AuthContext";

 
 
 

const containerStyle = {

  width: "100%",

  height: "100%",

  borderRadius: "10px",

};


const center = {

  lat: -23.55052,

  lng: -46.633308,

};

  

export const Map = () => {

  const { token } = useAuth();

  const [markers, setMarkers] = useState([]);

  const [currentPosition, setCurrentPosition] = useState(center);

  const [mapCenter, setMapCenter] = useState(center);

  const [mapInstance, setMapInstance] = useState(null)

  

  // ESTADOS DE CADASTRO

  const [newPointData, setNewPointData] = useState(null); 

  const [addressData, setAddressData] = useState(null); 
  
  const [draftMarker, setDraftMarker] = useState(null); 
  
  const [selectedRelato, setSelectedRelato] = useState(null); 

  


  const { isLoaded } = useJsApiLoader({

    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,

    libraries: ["places"],

  });



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

  


  useEffect(() => {

    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(

        (position) => {

          const userLocation = { lat: position.coords.latitude, lng: position.coords.longitude };

          setCurrentPosition(userLocation);

          setMapCenter(userLocation); 
        },

        (error) => {

          console.error("Erro ao obter a localização:", error);

        }

      );

    } else {

      console.log("Geolocalização não é suportada.");

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

  

  const handleSearchSubmit = useCallback((searchTerm) => {

    geocodeAddress(searchTerm);

  }, [geocodeAddress]);

  


  const handleMapClick = async (event) => {

    const lat = event.latLng.lat();

    const lng = event.latLng.lng();

    console.log("Mapa clicado! Evento recebido.");
  
    const pointCoords = { latitude: lat, longitude: lng };

    setNewPointData(pointCoords);

    setDraftMarker({ lat, lng });

    setAddressData({ city: 'Carregando...', fullAddress: 'Aguarde...' });
  
    const address = await reverseGeocode(lat, lng);

    setAddressData(address);

    setSelectedRelato(null);
  };

  

  const handleCenterClick = () => {

    if (!isLoaded || !mapCenter) {

      console.log("Mapa ainda não carregado.");

      return;

    }



    const mockEvent = {

        latLng: {

            lat: () => mapCenter.lat,

            lng: () => mapCenter.lng,

        }

    };

    handleMapClick(mockEvent);

  };

  



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

        title: savedPoint.title || "Novo Ponto",

        description: savedPoint.description, 

        position: {

          lat: savedPoint.latitude,

          lng: savedPoint.longitude,

        },

        category: savedPoint.category

      };

      setMarkers((prev) => [...prev, savedMarker]);

      
      setNewPointData(null); 

      setAddressData(null); 
      setDraftMarker(null); 

    } catch (error) {

      alert(error.message);

    }

  };

  

  const handleCloseCard = () => {

    setNewPointData(null);

    setAddressData(null); 
    setDraftMarker(null); 

  };

  
 

  const handleMarkerClick = async (markerData) => {
 
    setNewPointData(null); 
    setAddressData(null); 
    setDraftMarker(null); 

 
    setSelectedRelato({
        id: markerData.id,
        title: markerData.title,
        description: markerData.description || 'Sem descrição', 
        address: 'Carregando endereço...', 
        position: markerData.position,
        category: markerData.category,
    });
    
   
    const { lat, lng } = markerData.position;
    const addressResult = await reverseGeocode(lat, lng);


    setSelectedRelato(prevRelato => ({
        ...prevRelato,
        address: addressResult.fullAddress 
    }));
};

  const handleCloseRelatoModal = () => {
    setSelectedRelato(null);
  };



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

       
            {draftMarker && (
                <Marker 
                    position={draftMarker} 
                    title="Novo Relato (Rascunho)"
                   
                />
            )}



            {markers.map(marker => (

              <Marker

                key={marker.id}

                position={marker.position}

                title={marker.title}

                onClick={() => handleMarkerClick(marker)} 
              />

            ))}

          </GoogleMap>

        ) : (

          <div>Carregando mapa...</div>

        )}

      </div>

      <Menu handleCenterClick={handleCenterClick}/>



      {newPointData && (

        <CadastroProblemaCard

          onSubmit={handleCadastroSubmit}

          onClose={handleCloseCard}



          position={{ lat: newPointData.latitude, lng: newPointData.longitude }}


          addressData={addressData}

        />

      )}

      {selectedRelato && (
        <ModalRelato
          relato={selectedRelato}
          onClose={handleCloseRelatoModal}
        />
      )}

    </>

  );

};

export default Map;