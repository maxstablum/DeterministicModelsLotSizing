import React, { Component } from 'react';
import MaxImage from '../assets/img/Max.png'; 
import TaminoImage from '../assets/img/Tamino.png'; 

//Component for the team page
class TeamComponent extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {/* Teammember 1 */}
        <div style={{ display: 'inline-block', margin: '40px' }}>
            <img src={MaxImage} alt="Max" style={{ width: '250px', height: '250px' }} />
            <p><strong>Max Stablum</strong><br></br>
            Leopold-Franzens Universität Innsbruck <br></br>
            Department of Business Informatics, Production Management and Logistics</p>
        </div>
        {/* Teammember 2 */}
        <div style={{ display: 'inline-block', margin: '40px' }}>
            <img src={TaminoImage} alt="Tamino" style={{ width: '250px', height: '250px' }} />
            <p><strong>Tamino Gaub</strong><br></br>
            Leopold-Franzens Universität Innsbruck <br></br>
            Department of Business Informatics, Production Management and Logistics</p>
        </div>
        <hr style={{ borderColor: 'brown', borderWidth: '1px', width: '80%', margin: '0px auto 20px' }} />
        {/* Team description */}
        <div style={{ width: '60%', margin: '0 auto' }}>
          <p>We are a team of students from the University of Innsbruck, 
            and we've dedicated ourselves to improving production and inventory 
            processes with our project "Deterministic Models for Lot Sizing". 
            Our goal is to facilitate planning in these areas through easily applicable solutions</p>
        <div>
        </div>
      </div>
    );
  }
}

export default TeamComponent;
