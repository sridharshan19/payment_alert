import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const AddSubscriptionPage = () => {
  const [serviceName, setServiceName] = useState("");
  const [amount, setAmount] = useState("");
  const [nextPaymentDate, setNextPaymentDate] = useState("");
  const [frequency, setFrequency] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [showSubscriptions, setShowSubscriptions] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8080/api/subscriptions",
        {
          serviceName,
          amount,
          nextPaymentDate,
          frequency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Subscription added successfully!");
      setServiceName("");
      setAmount("");
      setNextPaymentDate("");
      setFrequency("");
      fetchSubscriptions();
    } catch (error) {
      console.error("Add subscription failed:", error);
      alert("Failed to add subscription.");
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/subscriptions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        setSubscriptions(response.data);
        setShowSubscriptions(true);
      } else {
        alert("Unexpected response format.");
      }
    } catch (error) {
      console.error("Failed to fetch subscriptions:", error);
      alert("Could not load subscriptions. You may not be logged in.");
    }
  };

  return (
    <div className="subscription-bg min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="container">
        <div className="card shadow-lg p-4 mb-4 rounded-4 bg-white">
          <h2 className="text-center text-primary mb-4">Add Subscription</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Service Name</label>
              <input
                type="text"
                className="form-control"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                placeholder="e.g. Netflix"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Next Payment Date</label>
              <input
                type="date"
                className="form-control"
                value={nextPaymentDate}
                onChange={(e) => setNextPaymentDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Frequency</label>
              <select
                className="form-select"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                required
              >
                <option value="">Select Frequency</option>
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
                <option value="WEEKLY">Weekly</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success w-100">
              Add Subscription
            </button>
          </form>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-primary" onClick={fetchSubscriptions}>
            View Subscriptions
          </button>
          <button className="btn btn-secondary" onClick={() => setShowSubscriptions(false)}>
            Hide
          </button>
        </div>

        {showSubscriptions && (
          <div className="card p-4 shadow rounded-4">
            <h4 className="mb-3">Your Subscriptions</h4>
            {subscriptions.length === 0 ? (
              <p>No subscriptions found.</p>
            ) : (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Service Name</th>
                    <th>Amount (₹)</th>
                    <th>Frequency</th>
                    <th>Next Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub, index) => (
                    <tr key={sub.id || index}>
                      <td>{index + 1}</td>
                      <td>{sub.serviceName}</td>
                      <td>{sub.amount}</td>
                      <td>{sub.frequency}</td>
                      <td>{sub.nextPaymentDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddSubscriptionPage;
