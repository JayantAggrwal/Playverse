import axios from "axios";

const GetWishList = async ({ encodedToken }) => {
  return axios.get("/api/user/wishlist", {
    headers: { authorization: encodedToken },
  });
};


export default GetWishList