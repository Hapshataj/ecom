import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { ToastContainer, toast } from "react-toastify";
import SearchForm from "../Form/SearchFrom";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import "./Header.css"; // Import custom CSS for header styles

const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const categories = useCategory();

    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: "",
        });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"> 
                    <i className="fab fa-shopify me-2"></i>
                       <strong>V</strong>shop
                    </Link>
                    <button
                        className="navbar-toggler me-3"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">

                        <div className="search-form-container ms-lg-auto ps-lg-1 ps-md-0">
                            <SearchForm className="search-form" />
                        </div>

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link">
                                   Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to={"/categories"}
                                    role="button"
                                    data-bs-toggle="dropdown"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"/categories"}>
                                          All Products
                                        </Link>
                                    </li>
                                    {categories?.map((c) => (
                                        <li key={c.slug}>
                                            <Link
                                                className="dropdown-item"
                                                to={`/category/${c.slug}`}
                                            >
                                                {c.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            {!auth?.user ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link">
                                            Register
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">
                                            Login
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    {auth?.user?.role === 1 ? (
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                            >

                                               {auth?.user?.name}
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/dashboard/admin`}
                                                        className="header-drop dropdown-item"
                                                    >
                                                    Admin Dashboard
                                                       
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handleLogout}
                                                        to="/login"
                                                        className="header-drop dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                            >
                                                        <i className="fas fa-user me-1"></i>{auth?.user?.name}
                                               
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink
                                                        to={`/dashboard/user`}
                                                        className=" header-drop dropdown-item"
                                                    >
                                                    Profile
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to={`/dashboard/user/orders`}
                                                        className="header-drop dropdown-item"
                                                    >
                                                     Orders
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handleLogout}
                                                        to="/login"
                                                        className="header-drop dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    )}
                                </>
                            )}
                             <li className="nav-item cart-icon">
                                    <NavLink to="/cart" className="nav-link d-flex align-items-center">
                                        <i className="fas fa-shopping-bag me-1 fs-5"></i>
                            {auth?.user && (
                                        <span className="badge bg-primary ms-3 translate-middle badge rounded-pill bg-danger">{cart?.length}</span>
                                   
                               
                            )}
                             </NavLink>
                             </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
