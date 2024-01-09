import http from "../http-common";
import axios from "axios";

// Service to send the parameters to the backend
class EOQDataService {
  /*create(data) {
    return axios.post("http://localhost:8080/eoq/calculation", data);
  }*/

  // Function to calculate the EOQ with the given parameters
  create(data) {
    return http.post("eoq/calculation", data);
  }

  /*upload(data) {
    return http.post("/photo/pictureUpload", data);
  }*/

  // Function to get all the EOQs
  getAll() {
    return http.get("/eoqGetAll");
  }
  /*
    get(id) {
        return http.get(`/eoq/${id}`);
    }
    */

  /*create(data) {
    return http.post("/eoqPost", data);
  }*/

  /*update(id, data) {
        return http.put(`/eoq/${id}`, data);
    }
    
    delete(id) {
        return http.delete(`/eoq/${id}`);
    }
    
    deleteAll() {
        return http.delete(`/eoq`);
    }
    
    findByTitle(title) {
        return http.get(`/eoq?title=${title}`);
    }*/
}

export default new EOQDataService();
