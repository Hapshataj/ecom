import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner/Spinner.js";
import { BASE_URL } from "../../config";

export default function PrivateRoute() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                if (!auth?.token) {
                    setIsLoading(false);
                    return;
                }

                const res = await axios.get(`${BASE_URL}/api/v1/auth/user-auth`);

                if (res.data.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setError("An error occurred while checking authentication.");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthentication();
    }, [auth?.token]);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return isAuthenticated ? <Outlet /> : <div>You are not authenticated.</div>;
}
