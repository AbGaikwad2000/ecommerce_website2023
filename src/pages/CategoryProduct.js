import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/CategoryProductStyles.css";
import "../styles/mycss.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-5"
                  style={{ width: "18rem" }}
                  key={p._id}
                >
                   <button style={{border:"none"}}onClick={() => navigate(`/product/${p.slug}`)}><img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    style={{maxHeight:"300px ! important"}}
                    className="card-img-top"
                    alt={p.name}
                  /></button>
                  <div className="card-body">
                    <h5 style={{fontWeight:"bold"}}>{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p style={{fontWeight:"bold"}}> $ {p.price}</p>
                    <button style={{borderRadius:"16px",borderTopLeftRadius:"5px",borderBottomRightRadius:"5px",fontSize:"14px",width:"50%",color:"orange",borderRadius:"20px",backgroundColor:"white",borderColor:" 2px solid black"}}
                      className="b"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button style={{borderRadius:"16px",borderTopLeftRadius:"5px",borderBottomRightRadius:"5px",fontSize:"14px",width:"50%",color:"orange",borderRadius:"20px",backgroundColor:"white",borderColor:" 2px solid black"}}
                   className="addtocart"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}>ADD TO CART</button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;