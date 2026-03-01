import axios from 'axios';

export async function fetchOpenAIUsage(apiKey) {
  if (!apiKey) return null;
  
  try {
    const response = await axios.get('https://api.openai.com/v1/usage', {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });
    
    return {
      name: 'OpenAI',
      spent: response.data.total_usage / 100,
      resetDate: getResetDate(),
      data: response.data
    };
  } catch (error) {
    return {
      name: 'OpenAI',
      error: error.response?.data?.error?.message || 'Error fetching data',
      spent: 0
    };
  }
}

function getResetDate() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth;
}

export function getDaysUntilReset(resetDate) {
  const now = new Date();
  const diff = resetDate - now;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
