import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetailStyles.css";
import "../styles/mycss.css";




const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div style={{marginTop:"88px"}}className="row container mt-3">
        <div style={{marginTop:"88px"}} className="col-md-7">
          <img
            
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height={"300px"}
            width={"350px"}
          />
        </div>
        <div style={{marginLeft:"50px",marginTop:"50px"}}className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6 >Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6 >Price : {product.price}</h6> 
          <h6>Category : {product?.category?.name}</h6>
          <button style={{borderRadius:"16px",borderTopLeftRadius:"5px",borderBottomRightRadius:"5px",fontSize:"14px",width:"50%",color:"orange",marginTop:"30px",borderRadius:"20px",backgroundColor:"white",borderColor:" 2px solid black"}}
            className="addtocarts"
                    onClick={() => {
                      setCart([...cart,product]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart,product])
                      );
                      toast.success("Item Added to cart");
                    }} >ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>   Similar Products 👇</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem",borderColor:"2px solid black" }}>
               <button style={{border:"none"}}onClick={() => navigate(`/product/${p.slug}`)}><img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                /></button>
                  
              <div className="card-body">
                     <div className="card-name-price"><h5 style={{fontWeight:"bold"}}>{p.name}</h5>
                 <p style={{fontWeight:"bold"}}> ${p.price}</p></div>
                 <p className="c">{p.description.substring(0, 60)}...</p>
                <button style={{borderRadius:"16px",borderTopLeftRadius:"5px",borderBottomRightRadius:"5px",fontSize:"14px",width:"50%",color:"orange",borderRadius:"20px",backgroundColor:"white",borderColor:" 2px solid black"}}
                  className="moredetail"
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
      </div>
    </Layout>
  );
};

export default ProductDetails;