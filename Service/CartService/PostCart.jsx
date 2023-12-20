import axios from "axios";

const PostCart = async ({ product, encodedToken }) => {
  return axios.post(
    "/api/user/cart",
    { product },
    { headers: { authorization: encodedToken } }
  );
};

export default PostCart;
