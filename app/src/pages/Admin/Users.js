import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/v1/auth/all-users");
        setUsers(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = async () => {
    if (!searchEmail) return;
    setSearching(true);
    try {
      const response = await axios.get(`/api/v1/auth/user/${searchEmail}`);
      if (response.data.success) {
        setSearchResult(response.data.user);
      } else {
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error searching user:", error);
      setSearchResult(null);
    }
    setSearching(false);
  };

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid">
        <div className="row dashboard">
          <AdminMenu />
          <div className="col-md-12 justify-content-center align-item-center">
            <h1 className="card-title text-center mb-4">All Users</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
              <button
                className="btn btn-dark"
                type="button"
                onClick={handleSearch}
                disabled={searching}
              >
                {searching ? "Searching..." : "Search"}
              </button>
            </div>
            {searchResult ? (
              <div className="table-responsive w-100">
                <table className="table table-striped table-bordered">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>User Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr key={searchResult._id}>
                    <td>{searchResult._id}</td>
                      <td>{searchResult.name}</td>
                      <td>{searchResult.email}</td>
                      <td>{searchResult.phone}</td>
                      <td>{searchResult.address}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="table-responsive w-100">
                <table className="table table-striped table-bordered">
                  <thead className="bg-secondary text-white">
                    <tr>
                      <th>User Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          Loading users...
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td>{user._id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone}</td>
                          <td>{user.address}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
