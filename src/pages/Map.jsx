// Map.jsx

import React, { useEffect, useState, useCallback } from "react";
import { Navbar } from "../components";
import { Menu } from "../components/Menu"; // Importe Menu
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


// ----------------------------------------------------
// Componente Principal
// ----------------------------------------------------

export const Map = () => {
    const { token } = useAuth();
    const [markers, setMarkers] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(center);
    const [mapCenter, setMapCenter] = useState(center);
    const [addressData, setAddressData] = useState({ city: '', fullAddress: '' }); 
    const [clickedLocation, setClickedLocation] = useState(null); 
    const [profileVisible, setProfileVisible] = useState(false);

    // Carregamento da API do Google Maps e Geocoding
    const { isLoaded } = useJsApiLoader({ 
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
    });

    const reverseGeocodeLocation = useCallback((lat, lng) => {
        if (!isLoaded || !window.google || !window.google.maps) return;

        const geocoder = new window.google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === 'OK' && results && results[0]) {
                const result = results[0];
                const fullAddress = result.formatted_address;
                let city = '';

                // Lógica para encontrar o nome da cidade (locality/administrative_area_level_2)
                const cityComponent = result.address_components.find(component => 
                    component.types.includes('locality') || component.types.includes('administrative_area_level_2')
                );

                if (cityComponent) {
                    city = cityComponent.long_name;
                }

                setAddressData({ 
                    city: city || 'Cidade Não Encontrada', 
                    fullAddress: fullAddress || 'Endereço Não Encontrado'
                });

            } else {
                console.error("Geocoding Reverso falhou. Status: " + status);
                setAddressData({ city: 'Erro', fullAddress: 'Erro ao buscar endereço' });
            }
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
                setClickedLocation(null); 
            } else {
                alert(`Não foi possível encontrar a localização para "${address}". Status: ${status}`);
                console.error("Geocoding falhou. Status: " + status);
            }
        });
    }, [isLoaded]);

    const handleSearchSubmit = useCallback((searchTerm) => {
        geocodeAddress(searchTerm);
    }, [geocodeAddress]);

    // 📌 FUNÇÃO PARA O BOTÃO DO MENU
    const handleMenuCenterClick = useCallback(() => {
        const targetPosition = currentPosition || mapCenter;

        // 1. Abre o card usando a posição atual (ou o centro como fallback)
        setClickedLocation(targetPosition); 
        
        // 2. Geocodifica para preencher os campos Cidade/Endereço
        reverseGeocodeLocation(targetPosition.lat, targetPosition.lng);
    }, [currentPosition, mapCenter, reverseGeocodeLocation]);
    // FIM DA FUNÇÃO PARA O BOTÃO DO MENU


    // Efeito para buscar a Posição Atual do Usuário
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

    const handleMapClick = useCallback((event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        // 1. Atualiza o estado com a localização clicada
        setClickedLocation({ lat, lng });

        // 2. Chama a Geocodificação Reversa imediatamente
        reverseGeocodeLocation(lat, lng);

    }, [reverseGeocodeLocation]);

    const handleCloseCard = useCallback(() => {
        setClickedLocation(null);
        setAddressData({ city: '', fullAddress: '' }); // Limpa o endereço ao fechar
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
            <Navbar />
            <Search onSearchSubmit={handleSearchSubmit} /> 
            
                        <CadastroProblemaCard
                                position={clickedLocation} 
                                onClose={handleCloseCard} 
                                addressData={addressData}
                        />

                        {/* Profile card overlay */}
                        {/* dynamic import to avoid circular issues */}
                        {profileVisible && (
                            <ProfileCard visible={profileVisible} onClose={() => setProfileVisible(false)} />
                        )}

            <div style={{ 
                width: "100%", 
                height: "calc(100% - 60px)", 
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
                        
                        {/* Marcador temporário para o local clicado (Opcional) */}
                        {clickedLocation && (
                            <Marker 
                                position={clickedLocation} 
                                title="Local Clicado" 
                                icon={{ 
                                    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" 
                                }}
                            />
                        )}

                    </GoogleMap>
                ) : (
                    <div>Carregando mapa...</div>
                )}
            </div>
            {/* 📌 NOVO: Passa a função handleMenuCenterClick como prop */}
            <Menu onCenterClick={handleMenuCenterClick} onProfileClick={() => setProfileVisible(true)} /> 
        </div>
    );
};