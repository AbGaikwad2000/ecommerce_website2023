import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
import "../styles/mycss.css";


import { useSearch } from "../context/search";
const Search = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} to you search wish`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                  <button style={{border:"none"}}onClick={() => navigate(`/product/${p.slug}`)}><img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                /></button>
                <div className="card-body">
                  
                    <div className="card-name-price"><h5 className="card-title">{p.name}</h5>
                   <p style={{fontWeight:"bold"}}> ${p.price}</p></div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <button style={{borderRadius:"16px",borderTopLeftRadius:"5px",borderBottomRightRadius:"5px",fontSize:"14px",width:"50%",color:"orange",borderRadius:"20px",backgroundColor:"white",borderColor:" 2px solid black"}}
                      onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button style={{borderRadius:"16px",borderTopLeftRadius:"5px",borderBottomRightRadius:"5px",fontSize:"14px",width:"50%",color:"orange",borderRadius:"20px",backgroundColor:"white",borderColor:" 2px solid black"}}
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
      </div>
    </Layout>
  );
};

export default Search;