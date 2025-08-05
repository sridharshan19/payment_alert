import React from "react";
import { Link } from "react-router-dom";

function DashboardPage() {
  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="p-5 mb-4 bg-light rounded shadow-lg border border-primary">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold text-primary">
            Welcome to Your Subscription Dashboard
          </h1>
          <p className="fs-5 text-secondary">
            Stay ahead of your recurring bills. Track, manage, and get notified about your upcoming payments.
          </p>
          <Link to="/subscriptions" className="btn btn-primary btn-lg mt-3">
            Add or View Subscriptions
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="row text-center">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 border-start border-4 border-success">
            <div className="card-body">
              <h5 className="card-title text-success">✅ Track Payments</h5>
              <p className="card-text">
                Monitor all your upcoming and past subscription payments in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 border-start border-4 border-primary">
            <div className="card-body">
              <h5 className="card-title text-primary">🔔 Get Alerts</h5>
              <p className="card-text">
                Receive timely reminders via email before your payment due dates.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100 border-start border-4 border-warning">
            <div className="card-body">
              <h5 className="card-title text-warning">⚙️ Easy Management</h5>
              <p className="card-text">
                Add, edit, or delete subscriptions effortlessly from the interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
