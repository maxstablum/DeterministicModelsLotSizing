import http from "../http-common";

// The URL of the backend for the WagnerWhitin calculation
const API_URL = '/wagner_whitin/calculation';

// Service to send the parameters to the backend
class WagnerWhitinService {
    
    calculateWagnerWhitin(demands, holdingCostPerUnitPerPeriod, orderCost) {
        console.log("WagnerWhitinService.calculateWagnerWhitin() called");
        console.log({
            demands: demands,
            holdingCostPerUnitPerPeriod: holdingCostPerUnitPerPeriod,
            orderCost: orderCost
        })
        // Send the parameters to the backend
        return http.post(API_URL, {
            demands: demands,
            holdingCostPerUnitPerPeriod: holdingCostPerUnitPerPeriod,
            orderCost: orderCost
        }, {
            // Set the headers to avoid misformatted data
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'  
            }
        });
    }
}

export default new WagnerWhitinService;
