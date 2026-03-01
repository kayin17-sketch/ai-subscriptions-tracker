import axios from 'axios';

export async function fetchGoogleUsage(apiKey) {
  if (!apiKey) return null;
  
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    return {
      name: 'Google Gemini',
      spent: 0,
      models: response.data.models?.length || 0,
      resetDate: getResetDate(),
      note: 'Google no expone uso via API. Configura límite manual.'
    };
  } catch (error) {
    return {
      name: 'Google Gemini',
      error: error.response?.data?.error?.message || 'Error fetching data',
      spent: 0
    };
  }
}

function getResetDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
