import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Layout from "../../components/Layout/Layout";
import "../styles/Categories.css"; // Import CSS for custom styling
import { toast } from "react-toastify";
import { BASE_URL } from "../../config";
import axios from "axios";
import { useCart } from "../../context/cart";

const Categories = () => {
  const categories = useCategory();
  const [products, setProducts] = useState([]);
  const[cart,setCart]=useCart();
  const[addedToCart,setAddedToCart]=useState({})

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);


  //cart button fuctions
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
    <Layout title={"All Categories & All Products"}>
      <h1 className="card-title mb-5  mt-3 text-center">All Products</h1>
      
     
        <div className="category"> 
          {categories.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}> 
              <div className="card category-card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="container d-flex justify-content-center align-item-center">
     
        <div className="col-md-12">

          <div className="d-flex flex-wrap justify-content-center align-item-center ">
            {products?.map((p) => (
                <div className="card m-2 allproduct-card shadow-lg" >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">Price: ${p.price}</p>
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
             
            ))}
          </div>
        </div>
      </div>
      
      </Layout>
      
      
 
  );
};

export default Categories;
