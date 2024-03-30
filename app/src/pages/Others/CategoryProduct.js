import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../config";
import { useCart } from "../../context/cart";
import '../styles/CategoryProduct.css'

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [addedToCart,setAddedToCart]=useState({})

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  //cart button functions
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);
  const addToCart = (p) => {
    setCart([...cart, p]);
    localStorage.setItem("cart", JSON.stringify([...cart, p]));
    setAddedToCart(prevState => ({ ...prevState, [p._id]: true }));
    toast.success("Item Added to cart");
  };
  const isAddedToCart = (productId) => {
    return addedToCart[productId];
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const addedToCartMap = {};
    storedCart.forEach(item => {
      addedToCartMap[item._id] = true;
    });
    setAddedToCart(addedToCartMap);
  }, [cart]);

  return (
    <Layout>
          <h4 className="home-title text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result(s) found</h6>

    <div className="product-container container-fuild top-50">
        <div className="row product-grid">
        {products?.map((p) => (
            <div className="col-md-4 col-6 justify-content-between" key={p._id}>
              <div className="card category-card" id="create-category">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body text-center">
                  
                  <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-text card-price">Price:
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  
                  <p className="card-text">{p.description.substring(0, 60)}...</p>
                  <p className="card-text text-muted">Size : S M L XL</p>
                  {isAddedToCart(p._id) ? (
                    <button className="btn btn-dark ms-1" disabled>
                  <i className="fas fa-cart-plus me-1"></i>    Added to Cart
                    </button>
                  ) : (
                    <button className="btn btn-dark ms-1" onClick={() => addToCart(p)}>
                  <i className="fas fa-cart-plus me-1"></i>    Add to Cart

                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
    </Layout>
  );
};

export default CategoryProduct;
