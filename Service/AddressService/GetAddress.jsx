import axios from "axios";

const GetAddress = async ({ encodedToken }) => {
  return axios.get("/api/user/addresses", {
    headers: { authorization: encodedToken },
  });
};

export default GetAddress;
