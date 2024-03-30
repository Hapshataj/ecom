import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import { BASE_URL } from "../../config.js";
import "./HomePage.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "../../context/cart.js";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [addedToCart, setAddedToCart] = useState({});

  // Load cart items from local storage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);

  useEffect(() => {
    // Fetch Featured Products
    axios.get(`${BASE_URL}/api/v1/product/featured-products`)
      .then(response => setFeaturedProducts(response.data.products))
      .catch(error => console.error('Error fetching featured products:', error));

    // Fetch Best Sellers
    axios.get(`${BASE_URL}/api/v1/product/best-sellers`)
      .then(response => setBestSellers(response.data.products))
      .catch(error => console.error('Error fetching best sellers:', error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    spacing: 20,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      setCart(storedCart);
    }
  }, [setCart]);
  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    setAddedToCart(prevState => ({ ...prevState, [product._id]: true }));
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
  const bannersettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000
  };
 
  return (
    <Layout title={"Welcome to Vshop"}>
      {/*Home page banner carousel */}
      <Slider {...bannersettings} style={{marginTop:"-20px"}}>
  <div className="container-fuild carousel-item col-6">
    <div className="carousel-background position-relative"
      style={{
        backgroundImage:`url("https://img.freepik.com/free-photo/fashionable-wedding-dress-collection-hanging-boutique-generated-by-ai_188544-37180.jpg?t=st=1711438732~exp=1711442332~hmac=7244cfc482c09c417999949a72c7d97e0101d859b285682ef215a6a48d1c3099&w=1060")`
      }}
    />
    <div className="card bg-none banner-card position-absolute bottom-0">
      <h1 className="card-title">START YOUR DAY</h1>
      <p className="card-text">....WIITH OUR STORE....</p>
      <Link to="/categories" className="btn btn-outline-dark">Shop now</Link>
    </div>
  </div>
  <div className="carousel-item col-6">
    <div className="carousel-background"
      style={{
        backgroundImage: `url("https://img.freepik.com/premium-photo/close-up-athlete-runner-legs-running-tournament-competition-running-shoes-concept-generative-ai_90099-9359.jpg?w=1380")`
      }}
    />
    <div className="card bg-none banner-card position-absolute bottom-0">
      <h1 className="card-title">START YOUR DAY</h1>
      <p className="card-text">....WIITH OUR STORE....</p>
      <Link to="/categories" className="btn btn-outline-dark">Shop now</Link>
    </div>
  </div>
   <div className="carousel-item col-6">
    <div className="carousel-background " 
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/fast-fashion-concept-with-woman-shopping_23-2150871364.jpg?t=st=1711439567~exp=1711443167~hmac=c1ab79d2ae720f4ddc711c3a0a79a9596c5128a8ef6a45287e5b659b4c088131&w=900")`
      }}
    />
    <div className=" bg-none  banner-card position-absolute bottom-0">
      <h1 className="card-title">START YOUR DAY</h1>
      <p className="card-text">....WIITH OUR STORE....</p>
      <Link to="/categories" className="btn btn-outline-dark">Shop now</Link>
    </div>
  </div>
</Slider>


      <div className="best-sellers-container contiainer-fuild text-center">
        <h2 className="home-title text-center">Best Sellers</h2>
        <div className="best-seller-grid row">
          {bestSellers.map((product) => (
            <div key={product._id} className="col-md-4 col-6"> 
              <div className="best-seller-card card">
               <div className="card-img-container">
               <img src={`${BASE_URL}/api/v1/product/product-photo/${product._id}`} alt={product.name} className="best-seller-img " />
               </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text text-muted">Size : S M L XL</p>
                  {isAddedToCart(product._id) ? (
                    <button className="btn btn-dark ms-1" disabled>
                  <i className="fas fa-cart-plus me-1"></i>    Added to Cart
                    </button>
                  ) : (
                    <button className="btn btn-dark ms-1" onClick={() => addToCart(product)}>
                  <i className="fas fa-cart-plus me-1"></i>    Add to Cart

                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="featured-products-container text-center">
      <h2 className="home-title">Featured Products</h2>
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          <div key={product._id} className="featured-item">
            <div className="featured-card card " style={{ backgroundImage: `url(${BASE_URL}/api/v1/product/product-photo/${product._id})` }}>
              <div className="product-details">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price :${product.price}</p>
                {isAddedToCart(product._id) ? (
                    <button className="btn btn-dark ms-1" disabled>
                      Added to Cart
                    </button>
                  ) : (
                    <button className="btn btn-dark ms-1" onClick={() => addToCart(product)}>
                      Add to Cart
                    </button>
                  )}
                    
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
    </Layout>
  );}
   export default HomePage;