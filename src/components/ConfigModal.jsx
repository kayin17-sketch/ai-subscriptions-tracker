import React, { useState } from 'react';

function ConfigModal({ config, onSave, onClose }) {
  const [form, setForm] = useState({
    openai: config.openai || '',
    anthropic: config.anthropic || '',
    google: config.google || '',
    midjourney: {
      monthlyLimit: config.midjourney?.monthlyLimit || 30,
      spent: config.midjourney?.spent || 0
    },
    perplexity: {
      apiKey: config.perplexity?.apiKey || '',
      spent: config.perplexity?.spent || 0
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Configuración de APIs</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>OpenAI API Key</label>
            <input
              type="password"
              value={form.openai}
              onChange={e => setForm({...form, openai: e.target.value})}
              placeholder="sk-..."
            />
          </div>
          
          <div className="form-group">
            <label>Anthropic API Key</label>
            <input
              type="password"
              value={form.anthropic}
              onChange={e => setForm({...form, anthropic: e.target.value})}
              placeholder="sk-ant-..."
            />
          </div>
          
          <div className="form-group">
            <label>Google Gemini API Key</label>
            <input
              type="password"
              value={form.google}
              onChange={e => setForm({...form, google: e.target.value})}
              placeholder="AIza..."
            />
          </div>
          
          <div className="form-group">
            <label>Midjourney (límite mensual)</label>
            <input
              type="number"
              value={form.midjourney.monthlyLimit}
              onChange={e => setForm({
                ...form, 
                midjourney: {...form.midjourney, monthlyLimit: parseFloat(e.target.value)}
              })}
            />
          </div>
          
          <div className="actions">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" className="primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfigModal;
