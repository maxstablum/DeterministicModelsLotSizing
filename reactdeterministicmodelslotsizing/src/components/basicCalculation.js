import React from 'react';
import calculationService from '../services/calculation.service';

class BasicCalculation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value1: 0,
        value2: 0,
        sum: null,  
      };
    }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'number' ? parseFloat(target.value) || 0 : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleConfirmClick = () => {
    calculationService.basicCalculation(this.state.value1, this.state.value2)
      .then(response => {
        this.setState({
          sum: response.data
        });
        console.log("Servussss1");
        console.log(response.data);
      })
      .catch(error => {
        console.error("Es gab einen Fehler bei der Berechnung: ", error);
      });
  }

  render() {
    return (
      <div>
        <input
          type="number"
          name="value1"
          value={this.state.value1}
          onChange={this.handleInputChange}
        />
        <input
          type="number"
          name="value2"
          value={this.state.value2}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleConfirmClick}>Bestätigen</button>
        <p>Sum: {this.state.sum !== null ? this.state.sum : 'Bitte Werte bestätigen'}</p>
      </div>
    );
  }
}

export default BasicCalculation;
