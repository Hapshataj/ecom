import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../config";
const Products = () => {
  const [products, setProducts] = useState([]);

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
  return (
    <Layout>
    <div className="container-fluid ">
    <div className="row dashboard d-flex justify-content-center aling-item-center">
        <div className="text-center">
          <AdminMenu />
        </div>
        <h1 className="text-center">All Products List</h1>
        <div className="col-md-12">

          <div className="d-flex flex-wrap justify-content-center align-item-center ">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link text-decoration-none"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">Price: ${p.price}</p>
                    <button className="btn btn-dark"><i className="fas fa-pen me-2"></i>Update Product</button>
                  </div>
                </div>
              
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>    
      </Layout>
  );
};

export default Products;
