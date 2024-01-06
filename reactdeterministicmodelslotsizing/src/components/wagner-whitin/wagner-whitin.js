import React, { useState } from 'react';

class WagnerWhitin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            demand: '',
            setupCost: '',
            holdingCost: '',
            result: ''
        };
    }

    calculateOptimalOrderQuantity = () => {
        // Perform Wagner-Whitin algorithm calculations here
        // using the input values (demand, setupCost, holdingCost)
        // and update the 'result' state variable
    };

    render() {
        const { demand, setupCost, holdingCost, result } = this.state;

        return (
            <div>
                <h1>Wagner-Whitin Algorithm</h1>
                <label>
                    Demand:
                    <input
                        type="number"
                        value={demand}
                        onChange={(e) => this.setState({ demand: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Setup Cost:
                    <input
                        type="number"
                        value={setupCost}
                        onChange={(e) => this.setState({ setupCost: e.target.value })}
                    />
                </label>
                <br />
                <label>
                    Holding Cost:
                    <input
                        type="number"
                        value={holdingCost}
                        onChange={(e) => this.setState({ holdingCost: e.target.value })}
                    />
                </label>
                <br />
                <button onClick={this.calculateOptimalOrderQuantity}>Calculate</button>
                <br />
                <div>Result: {result}</div>
            </div>
        );
    }
}

export default WagnerWhitin;
