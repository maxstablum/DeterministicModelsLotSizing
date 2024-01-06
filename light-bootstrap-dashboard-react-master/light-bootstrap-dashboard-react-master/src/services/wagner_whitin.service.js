import axios from "axios";

const API_URL = 'http://localhost:8080/wagner_whitin/calculation';

class WagnerWhitinService {
    
    calculateWagnerWhitin(demands, holdingCostPerUnitPerPeriod, orderCost) {
        console.log("WagnerWhitinService.calculateWagnerWhitin() called");
        //Print the exact body of the request
        console.log("demands: " + demands);
        console.log("holdingCostPerUnitPerPeriod: " + holdingCostPerUnitPerPeriod);
        console.log("orderCost: " + orderCost);
        console.log({
            demands: demands,
            holdingCostPerUnitPerPeriod: holdingCostPerUnitPerPeriod,
            orderCost: orderCost
        })
        return axios.post(API_URL, {
            demands: demands,
            holdingCostPerUnitPerPeriod: holdingCostPerUnitPerPeriod,
            orderCost: orderCost
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'  
            }
        });
    }
}

export default new WagnerWhitinService;
