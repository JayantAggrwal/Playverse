import axios from "axios";

const PostAddress = async ({ address, encodedToken }) => {
  return axios.post(
    "/api/user/address",
    { address },
    {
      headers: { authorization: encodedToken },
    }
  );
};

export default PostAddress;
