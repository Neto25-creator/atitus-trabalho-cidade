import axios from 'axios';

  

const BASE_URL = 'https://grand-aloysia-urubus-ad728437.koyeb.app/ws/relato';

  
  
  

export async function getPoints(token) {

  try {

    const response = await axios.get(BASE_URL, {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    });

  

    // Mocked response

    /*

    const response = {

      status: 200,

      data: [

      {

        id: 1,

        descricao: 'Avenida Paulista',

        latitude: -23.561684,

        longitude: -46.656139,

      },

      {

        id: 2,

        descricao: 'Parque Ibirapuera',

        latitude: -23.587416,

        longitude: -46.657634,

      },

      {

        id: 3,

        descricao: 'Mercadão Municipal',

        latitude: -23.541212,

        longitude: -46.627684,

      },

      {

        id: 4,

        descricao: 'Estação da Luz',

        latitude: -23.536578,

        longitude: -46.633309,

      },

      ],

    };

    */

  

    // o objeto response.data possui os campos latitude e longitude mas precisamos mudar os nomes para lat lng

    const points = response.data.map(point => ({

      id: point.id,

      title: point.title,

      position: {

        lat: point.latitude,

        lng: point.longitude,

      },

      description: point.description

    }));
    console.log(points)
  

    if (response.status === 200) {

      return points;

    } else {

      throw new Error('Erro ao buscar pontos');

    }

  } catch (error) {

    throw new Error(error.response?.data?.message || 'Erro ao buscar pontos');

  }

}

  

export async function postPoint(token, pointData) {

  try {

    const response = await axios.post(BASE_URL, pointData, {

      headers: {

        Authorization: `Bearer ${token}`,

      },

    });

  

    // Mocked response

    /*

    const response = {

      status: 200,

      data: {

      id: Math.floor(Math.random() * 10000),

      ...pointData,

      },

    };

    */

    if (response.status === 201) {

      return response.data;

    } else {

      throw new Error('Erro ao cadastrar ponto');

    }

  } catch (error) {

    throw new Error(error.response?.data?.message || 'Erro ao cadastrar ponto');

  }

}

export async function getReverseGeocodeAddress(lat, lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'OK' && data.results.length > 0) {
            // Retorna o endereço formatado mais preciso
            return data.results[0].formatted_address;
        } else {
            return `Endereço não encontrado (Status: ${data.status})`;
        }
    } catch (error) {
        console.error("Erro na geocodificação reversa:", error);
        return "Erro ao buscar endereço";
    }
}