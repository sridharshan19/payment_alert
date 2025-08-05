import React, { useEffect, useState } from 'react';
import { getSubscriptions } from '../services/subscriptionService';

function SubscriptionList() {
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    getSubscriptions().then(res => setSubscriptions(res.data));
  }, []);

  return (
    <div className="card shadow-sm p-4">
      <h4 className="mb-3">Your Subscriptions</h4>
      <ul className="list-group">
        {subscriptions.map((sub, idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{sub.serviceName}</strong><br />
              ₹{sub.amount} | Next: {sub.nextPaymentDate}
            </div>
            <span className="badge bg-info">{sub.frequency}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionList;
