import axios from "axios";

const API_URL = 'http://localhost:8080/wagner_whitin/calculation';

class WagnerWhitinService {
    
    calculateWagnerWhitin(demands, holdingCostPerUnitPerPeriod, orderCost) {
        return axios.post(API_URL, {
            demands: demands,
            holdingCostPerUnitPerPeriod: holdingCostPerUnitPerPeriod,
            orderCost: orderCost
        });
    }
}

export default new WagnerWhitinService;
