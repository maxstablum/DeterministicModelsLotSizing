import axios from "axios";

const API_URL = 'http://localhost:8080';


class CalculationService {
  basicCalculation(num1, num2){
    return axios.get(`${API_URL}/calculation/${num1}/${num2}`);
    //return axios.get(`http://localhost:8080/calculation/${num1}/${num2}`);

  }
 
}

export default new CalculationService();