import React, { useState } from 'react';
import { addSubscription } from '../services/subscriptionService';
import { useNavigate } from 'react-router-dom';

function SubscriptionForm() {
  const [form, setForm] = useState({
    serviceName: '',
    amount: '',
    frequency: 'MONTHLY',
    nextPaymentDate: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSubscription(form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h4 className="mb-3">Add New Subscription</h4>
      <div className="mb-3">
        <input name="serviceName" className="form-control" placeholder="Service Name" required onChange={handleChange} />
      </div>
      <div className="mb-3">
        <input name="amount" type="number" className="form-control" placeholder="Amount (₹)" required onChange={handleChange} />
      </div>
      <div className="mb-3">
        <select name="frequency" className="form-select" onChange={handleChange}>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      </div>
      <div className="mb-3">
        <input name="nextPaymentDate" type="date" className="form-control" required onChange={handleChange} />
      </div>
      <button className="btn btn-primary w-100">Add</button>
    </form>
  );
}

export default SubscriptionForm;
