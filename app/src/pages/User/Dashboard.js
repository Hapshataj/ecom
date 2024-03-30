import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-9z p-5">
            <div className="d-flex justify-content-center">
              <div className="card shadow">
                <div className="card-body ">
                  <div className="text-center mb-4">
                    <i className="fas fa-user-circle fa-6x text-primary rounded-circle"></i>
                  </div>
                  <h3 className="card-title mb-3 text-center">Welcome, {auth?.user?.name}</h3>
                  <div className="bg-light p-3 rounded">
                    <h5>Name:</h5>
                    <p>{auth?.user?.name}</p>
                    <h5>Email:</h5>
                    <p>{auth?.user?.email}</p>
                    <h5>Phone:</h5>
                    <p>{auth?.user?.phone}</p>
                    <h5>Address:</h5>
                    <p>{auth?.user?.address}</p>
                  </div>
                  <div className="mt-4 d-flex justify-content-between">
                    <Link to="/dashboard/user/profile" className="btn btn-primary">
                      <i className="fas fa-user-edit mr-2"></i> Update User
                    </Link>
                    <Link to="/dashboard/user/orders" className="btn btn-success">
                      <i className="fas fa-list-alt mr-2"></i> See Orders
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
