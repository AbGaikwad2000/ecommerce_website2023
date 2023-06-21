import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{width: "600px",marginRight:"8px",marginTop:"0px",height:"34px"}}>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          width="100px"
          placeholder="Search items you love to purchase"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button class="btn btn-warning" style={{width:"120px",height:"34px",marginTop:"2px",fontSize:"12px",marginRight:"10px",marginRight:"5px",}} type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;