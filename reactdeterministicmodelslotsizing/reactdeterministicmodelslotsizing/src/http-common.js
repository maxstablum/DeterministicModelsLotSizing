import axios from "axios";

// Set the default URL of the backend
export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Access-Control-Allow-Origin": "*", // Allow CORS
  },
  // Set the headers to avoid misformatted data
  "Content-type": "application/json",
});
