import axios from "axios";

const GetCartList = async ({ encodedToken }) => {
  return axios.get("/api/user/cart", {
    headers: { authorization: encodedToken },
  });
};

export default GetCartList;