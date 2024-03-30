import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css"

const AdminMenu = () => {
  return (
    <nav className="navbar navbar-primary" id="admin-nav">
      <div className="container-fluid">
          <ul className="navbar-nav ">
            <li className="nav-item">
              <NavLink
                exact
                to="/dashboard/admin/create-category"
                className="nav-link"
                activeClassName="nav-active"
              >
                <i className="fas fa-plus"></i> Create Category
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/dashboard/admin/create-product"
                className="nav-link"
                activeClassName="nav-active"
              >
                <i className="fas fa-plus"></i> Create Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/dashboard/admin/products"
                className="nav-link"
                activeClassName="nav-active"
              >
                <i className="fas fa-box"></i> Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/dashboard/admin/orders"
                className="nav-link"
                activeClassName="nav-active"
              >
                <i className="fas fa-clipboard-list"></i> Orders
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/dashboard/admin/users"
                className="nav-link"
                activeClassName="nav-active"
              >
                <i className="fas fa-users"></i> Users
              </NavLink>
            </li>
          </ul>
        </div>
    
    </nav>
  );
};

export default AdminMenu;
