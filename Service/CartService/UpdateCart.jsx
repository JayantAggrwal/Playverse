import axios from "axios";

const UpdateCart = async ({ productId, encodedToken, type }) => {
  return axios.post(
    `api/user/cart/${productId}`,
    { action: { type } },
    { headers: { authorization: encodedToken } }
  );
};

export default UpdateCart;
