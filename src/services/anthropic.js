import axios from 'axios';

export async function fetchAnthropicUsage(apiKey) {
  if (!apiKey) return null;
  
  try {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startDate = firstDayOfMonth.toISOString().split('T')[0];
    
    const response = await axios.get('https://api.anthropic.com/v1/usage', {
      headers: { 
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      params: { start_date: startDate }
    });
    
    const costPerToken = 0.003 / 1000;
    const estimatedCost = response.data.totals?.total_tokens * costPerToken;
    
    return {
      name: 'Claude (Anthropic)',
      spent: estimatedCost || 0,
      tokensUsed: response.data.totals?.total_tokens || 0,
      resetDate: getResetDate()
    };
  } catch (error) {
    return {
      name: 'Claude (Anthropic)',
      error: error.response?.data?.error?.message || 'Error fetching data',
      spent: 0
    };
  }
}

function getResetDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
