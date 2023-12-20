import axios from "axios";

const SignUpService = async ({ email, password, firstName, lastName }) => {
  return axios.post("/api/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });
};

export default SignUpService;
