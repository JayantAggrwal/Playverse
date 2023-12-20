import axios from "axios";

const DeleteAddress = async ({ addressId, encodedToken }) => {
  return axios.delete(`/api/user/address/${addressId}`, {
    headers: { authorization: encodedToken },
  });
};

export default DeleteAddress;
