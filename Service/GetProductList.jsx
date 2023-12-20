import React from "react";
import axios from "axios";

const GetProductList = async () => {
  return axios.get("/api/products");
};

export default GetProductList;
