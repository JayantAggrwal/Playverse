import axios from "axios";

const PostWish = async ({ product, encodedToken }) => {
  return axios.post(
    "/api/user/wishlist",
    { product },
    { headers: { authorization: encodedToken } }
  );
};

export default PostWish;
