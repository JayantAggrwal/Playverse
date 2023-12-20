import React from "react";
import axios from "axios";

const GetCategoryList = async () => {
  return axios.get("/api/categories");
};

export default GetCategoryList;
