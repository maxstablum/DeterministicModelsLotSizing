import React, { Component } from 'react';
import MaxImage from '../assets/img/Max.png'; 
import TaminoImage from '../assets/img/Tamino.png'; 


class TeamComponent extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'inline-block', margin: '40px' }}>
            <img src={MaxImage} alt="Max" style={{ width: '250px', height: '250px' }} />
            <p><strong>Max Stablum</strong><br></br>
            Leopold-Franzens Universität Innsbruck <br></br>
            Department of Business Informatics, Production Management and Logistics</p>
        </div>

        <div style={{ display: 'inline-block', margin: '40px' }}>
            <img src={TaminoImage} alt="Tamino" style={{ width: '250px', height: '250px' }} />
            <p><strong>Tamino Gaub</strong><br></br>
            Leopold-Franzens Universität Innsbruck <br></br>
            Department of Business Informatics, Production Management and Logistics</p>
        </div>
        <hr style={{ borderColor: 'brown', borderWidth: '1px', width: '80%', margin: '0px auto 20px' }} />
        <div>
          <p></p>
        </div>
      </div>
    );
  }
}

export default TeamComponent;
