import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="teaxt-center">
            <AdminMenu />
            <div className="d-flex justify-content-center">
              <div className="card shadow">
                <div className="card-body">
                  <div className="text-center mb-4">
                    <i className="fas fa-user-circle fa-6x text-primary rounded-circle"></i>
                  </div>
                  <h3 className="card-title mb-3 text-center">
                    Welcome, Admin {auth?.user?.name}
                  </h3>
                  <div className="bg-light p-3 rounded">
                    <h5>Admin Name:</h5>
                    <p>{auth?.user?.name}</p>
                    <h5>Admin Email:</h5>
                    <p>{auth?.user?.email}</p>
                    <h5>Admin Phone:</h5>
                    <p>{auth?.user?.phone}</p>
                    <h5>Admin Address:</h5>
                    <p>{auth?.user?.address}</p>
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

export default AdminDashboard;
