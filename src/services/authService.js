import axios from 'axios';

const API_URL = 'https://grand-aloysia-urubus-ad728437.koyeb.app/auth';

// Função para validar senha
function isValidPassword(password) {
  const minLength = /.{8,}/;
  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const number = /[0-9]/;

  return (
    minLength.test(password) &&
    upper.test(password) &&
    lower.test(password) &&
    number.test(password)
  );
}

export async function signIn(email, password) {
  try {
    // Validação local da senha
    if (!isValidPassword(password)) {
      throw new Error(
        'Erro ao autenticar. Sua senha deve conter no mínimo 8 caracteres, contendo ao menos uma letra maiúscula, uma letra minúscula e um número.'
      );
    }

    const response = await axios.post(`${API_URL}/signin`, { email, password });
    return response.data;

  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Requisição inválida.');
      }
      if (error.response.status === 401) {
        throw new Error('Usuário ou senha incorretos.');
      }
    }
    throw error;
  }
}

export async function signUp(name, email, password) {
  try {
    // Validação local da senha
    if (!isValidPassword(password)) {
      throw new Error(
        'Erro ao autenticar. Sua senha deve conter no mínimo 8 caracteres, contendo ao menos uma letra maiúscula, uma letra minúscula e um número.'
      );
    }

    const response = await axios.post(`${API_URL}/signup`, { name, email, password });
    return response.data;

  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        throw new Error('Requisição inválida.');
      }
      if (error.response.status === 409) {
        throw new Error('Usuário já cadastrado.');
      }
    }
    throw error;
  }
}
