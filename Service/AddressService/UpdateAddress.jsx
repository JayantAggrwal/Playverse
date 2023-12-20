import axios from "axios";

const UpdateAddress = async ({ address, addressId, encodedToken }) => {
  return axios.post(
    `/api/user/address/${addressId}`,
    { address },
    { headers: { authorization: encodedToken } }
  );
};

export default UpdateAddress;