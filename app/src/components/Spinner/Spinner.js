import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import { DotLoader } from "react-spinners";

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => prevValue - 1);
        }, 1000);
        if (count === 0) {
            navigate(`/${path}`, {
                state: location.pathname,
            });
        }
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);

    const override = css`
    display: block;
    margin: 0 auto;
  `;

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>

            <DotLoader color={"black"} loading={true} css={override} size={70} />
        </div>
    );
};

export default Spinner;
