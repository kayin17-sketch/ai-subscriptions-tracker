export function fetchOtherUsage(config) {
  const services = [];
  
  if (config.midjourney?.monthlyLimit) {
    services.push({
      name: 'Midjourney',
      spent: config.midjourney.spent || 0,
      monthlyLimit: config.midjourney.monthlyLimit,
      resetDate: getResetDate()
    });
  }
  
  if (config.perplexity?.apiKey) {
    services.push({
      name: 'Perplexity',
      spent: config.perplexity.spent || 0,
      resetDate: getResetDate()
    });
  }
  
  return services;
}

function getResetDate() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}
