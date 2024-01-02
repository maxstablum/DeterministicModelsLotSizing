import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/admin/eoq",
  headers: {
    "Access-Control-Allow-Origin": "*",
    //"Access-Control-Request-Method": "*",
    //"Access-Control-Request-Headers": "*"

    //'content-type': 'multipart/form-data',
    //"type": "formData",
  },

  "Content-type": "application/json",
});
