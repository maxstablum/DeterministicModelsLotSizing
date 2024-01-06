import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*",
    //"Access-Control-Request-Method": "*",
    //"Access-Control-Request-Headers": "*"

    //'content-type': 'multipart/form-data',
    //"type": "formData",
  },

  "Content-type": "application/json",
});
