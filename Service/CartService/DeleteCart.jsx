import axios from "axios";

const DeleteCart = async ({ productId, encodedToken }) => {
  return axios.delete(`/api/user/cart/${productId}`, {
    headers: {
      authorization: encodedToken,
    },
  });
};

export default DeleteCart;