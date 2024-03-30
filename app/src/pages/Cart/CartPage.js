import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantityMap, setQuantityMap] = useState({});
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(false); // New state for error handling
  const navigate = useNavigate();
  const [showPaymentSection, setShowPaymentSection] = useState(false); 

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/braintree/token");
        setClientToken(data?.clientToken);
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, [auth?.token]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { data } = await axios.get("/api/v1/user/address");
        setAddress(data.address);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAddress();
  }, []);

  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * (quantityMap[item._id] || 1);
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productId]: (prevQuantityMap[productId] || 1) + 1,
    }));
  };

  const decreaseQuantity = (productId) => {
    setQuantityMap((prevQuantityMap) => ({
      ...prevQuantityMap,
      [productId]: Math.max((prevQuantityMap[productId] || 1) - 1, 1),
    }));
  };

  const totalItems = cart.reduce((total, item) => total + (quantityMap[item._id] || 1), 0);

  const clearCart = () => {
    setCart([]);
    setQuantityMap({});
    localStorage.removeItem("cart");
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true); // Set error state to true if payment fails
      toast.error("Payment failed. Please try again.");
    }
  };

  const handleRetry = () => {
    setError(false); // Reset error state before retrying payment
    handlePayment();
  };

  return (
    <Layout>
      <div className="container-fluid py-5">
        <h1 className="text-center mb-5">Your Shopping Cart</h1>
        {cart.length === 0 && <p className="text-center">Your cart is empty</p>}
        <div className="row">
          <div className="col-md-8">
            {cart.length > 0 ? (
              <div className="card">
                <div className="card-body">
                  {cart.map((item) => (
                    <div className="row mb-3" key={item._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${item._id}`}
                          alt={item.name}
                          className="img-fluid rounded cart-img"
                        />
                      </div>
                      <div className="col-md-8">
                        <h5>{item.name}</h5>
                        <p className="text-muted">{item.description}</p>
                        <p className="me-2">
                          {(item.price * (quantityMap[item._id] || 1)).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-secondary me-2"
                            onClick={() => decreaseQuantity(item._id)}
                          >
                            -
                          </button>
                          <span className="me-2">{quantityMap[item._id] || 1}</span>
                          <button
                            className="btn btn-sm btn-secondary me-2"
                            onClick={() => increaseQuantity(item._id)}
                          >
                            +
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => removeCartItem(item._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
            ''
            )}
            
          </div>
          <div className="col-md-4">
            {auth.user ? (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title mb-4">Cart Summary</h5>
                  <p>Total Items: {totalItems}</p>
                  <p>Total Price: {totalPrice()}</p>
                  {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <p>Current Address:</p>
                    <p>{auth?.user?.address}</p>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
                  <button
                    className="btn btn-danger "
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                  {clientToken && showPaymentSection && (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="btn btn-dark mt-4 "
                    onClick={handlePayment}
                    disabled={!instance || loading}
                  >
                    {loading ? "Processing..." : "Proceed to Payment"}
                  </button>
                  {error && (
                    <div>
                      <p>Payment failed due to an error. Please try again.</p>
                      <button className="btn btn-dark" onClick={handleRetry}>
                        Retry Payment
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Button to show payment section */}
              {!showPaymentSection && (
                <button
                  className="btn btn-dark ms-2"
                  onClick={() => setShowPaymentSection(true)}
                >
                  Make Payment
                </button>
              )}
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body">
                  <p className="text-center mb-3">Please login to proceed with your purchase.</p>
                  <button className="btn btn-dark w-100" onClick={() => navigate("/login")}>
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    
    </Layout>
  );
};

export default CartPage;
