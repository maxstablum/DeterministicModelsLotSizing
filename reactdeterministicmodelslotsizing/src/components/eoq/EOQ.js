import React from 'react';
import Sidebar from '../Sidebar';

class eoq extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            demand: '',
            orderCost: '', 
            holdingCost: '' 
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


    handleSubmit = async (e) => {
        e.preventDefault();
        // Implementieren Sie Ihre Logik zur Verarbeitung des Formulars
    };
    render(){
    return (
        
        <form>
            <div>
            <Sidebar/>
                <div>
                <label htmlFor="demand">Jahresbedarf:</label>
                <input
                    type="number"
                    id="demand"
                    name="demand"
                    value={this.state.demand}
                    onChange={this.handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="orderCost">Bestellkosten pro Bestellung:</label>
                <input
                    type="number"
                    id="orderCost"
                    name="orderCost"
                    value={this.state.orderCost}
                    onChange={this.handleInputChange}
                />
            </div>
            <div>
                <label htmlFor="holdingCost">Lagerhaltungskosten pro Einheit pro Jahr:</label>
                <input
                    type="number"
                    id="holdingCost"
                    name="holdingCost"
                    value={this.state.holdingCost}
                    onChange={this.handleInputChange}
                />
            </div>
            <button type="submit">Berechnen</button>
            </div>
        </form>
        
    );
}}

export default eoq;
