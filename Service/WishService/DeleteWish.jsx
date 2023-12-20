import axios from "axios";

const DeleteWish = async ({ productId, encodedToken }) => {
  return axios.delete(`/api/user/wishlist/${productId}`, {
    headers: { authorization: encodedToken },
  });
};

export default DeleteWish;
