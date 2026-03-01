import React from 'react';

function SubscriptionCard({ subscription }) {
  const daysLeft = subscription.resetDate 
    ? Math.ceil((new Date(subscription.resetDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="subscription-card">
      <div className="subscription-header">
        <span className="name">{subscription.name}</span>
        <span className="spent">${(subscription.spent || 0).toFixed(2)}</span>
      </div>
      
      {subscription.error ? (
        <div className="error">{subscription.error}</div>
      ) : (
        <>
          {subscription.monthlyLimit && (
            <div className="progress-bar">
              <div 
                className="progress" 
                style={{ width: `${Math.min((subscription.spent / subscription.monthlyLimit) * 100, 100)}%` }}
              />
            </div>
          )}
          
          <div className="meta">
            {daysLeft !== null && (
              <span className="reset">Reinicio en {daysLeft} días</span>
            )}
            {subscription.tokensUsed && (
              <span className="tokens">{subscription.tokensUsed.toLocaleString()} tokens</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default SubscriptionCard;
