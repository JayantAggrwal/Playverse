import React from "react";
import axios from "axios";

const LogInService = async ({ email, password }) => {
  return axios.post("/api/auth/login", { email, password });
};

export default LogInService;
