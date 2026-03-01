import React, { useState, useEffect } from 'react';
import SubscriptionCard from './components/SubscriptionCard';
import ConfigModal from './components/ConfigModal';
import { fetchOpenAIUsage, getDaysUntilReset } from './services/openai';
import { fetchAnthropicUsage } from './services/anthropic';
import { fetchGoogleUsage } from './services/google';
import { fetchOtherUsage } from './services/others';

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [config, setConfig] = useState({});
  const [showConfig, setShowConfig] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConfig();
    
    if (window.electron?.onRefreshData) {
      window.electron.onRefreshData(() => fetchData());
    }
  }, []);

  useEffect(() => {
    if (Object.keys(config).length > 0) {
      fetchData();
    }
  }, [config]);

  const loadConfig = async () => {
    if (window.electron?.getConfig) {
      const savedConfig = await window.electron.getConfig();
      setConfig(savedConfig || {});
      if (Object.keys(savedConfig || {}).length === 0) {
        setShowConfig(true);
      }
    }
    setLoading(false);
  };

  const fetchData = async () => {
    const results = [];
    
    const [openai, anthropic, google] = await Promise.all([
      fetchOpenAIUsage(config.openai),
      fetchAnthropicUsage(config.anthropic),
      fetchGoogleUsage(config.google)
    ]);
    
    if (openai) results.push(openai);
    if (anthropic) results.push(anthropic);
    if (google) results.push(google);
    
    const others = fetchOtherUsage(config);
    results.push(...others);
    
    setSubscriptions(results);
    
    if (window.electron?.updateSubscriptions) {
      window.electron.updateSubscriptions(results);
    }
  };

  const saveConfig = (newConfig) => {
    setConfig(newConfig);
    if (window.electron?.saveConfig) {
      window.electron.saveConfig(newConfig);
    }
    setShowConfig(false);
  };

  const totalSpent = subscriptions.reduce((sum, s) => sum + (s.spent || 0), 0);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="app">
      <div className="header">
        <h2>AI Subscriptions</h2>
        <button className="settings-btn" onClick={() => setShowConfig(true)}>
          ⚙️
        </button>
      </div>
      
      <div className="total">
        <span>Total gastado</span>
        <span className="amount">${totalSpent.toFixed(2)}</span>
      </div>
      
      <div className="subscriptions">
        {subscriptions.map((sub, i) => (
          <SubscriptionCard key={i} subscription={sub} />
        ))}
      </div>
      
      <button className="refresh-btn" onClick={fetchData}>
        Actualizar
      </button>
      
      {showConfig && (
        <ConfigModal 
          config={config} 
          onSave={saveConfig} 
          onClose={() => setShowConfig(false)} 
        />
      )}
    </div>
  );
}

export default App;
