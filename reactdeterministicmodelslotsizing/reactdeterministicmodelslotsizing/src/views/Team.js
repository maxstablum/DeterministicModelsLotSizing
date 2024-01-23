import React, { Component } from "react";
import MaxImage from "../assets/img/Max.png";
import TaminoImage from "../assets/img/Tamino.png";

//Component for the team page
class TeamComponent extends Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {/* Teammember 1 */}
        <div style={{ display: "inline-block", margin: "40px" }}>
          <img
            src={MaxImage}
            alt="Max"
            style={{ width: "250px", height: "250px" }}
          />
          <p>
            <strong>Max Stablum</strong>
            <br></br>
            <a href="mailto:maximilian.stablum@student.uibk.ac.at">
              maximilian.stablum@student.uibk.ac.at
            </a>
            <br></br>
            Leopold-Franzens Universität Innsbruck <br></br>
            Department of Business Informatics, Production Management and
            Logistics
          </p>
          <a
            href="https://www.linkedin.com/in/maximilian-stablum"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
              alt="LinkedIn"
              style={{ width: "50px", height: "50px" }}
            />
          </a>
        </div>
        {/* Teammember 2 */}
        <div style={{ display: "inline-block", margin: "40px" }}>
          <img
            src={TaminoImage}
            alt="Tamino"
            style={{ width: "250px", height: "250px" }}
          />
          <p>
            <strong>Tamino Gaub</strong>
            <br></br>
            <a href="mailto:tamino.gaub@student.uibk.ac.at">
              tamino.gaub@student.uibk.ac.at
            </a>
            <br></br>
            Leopold-Franzens Universität Innsbruck <br></br>
            Department of Business Informatics, Production Management and
            Logistics
          </p>
          <a
            href="https://www.linkedin.com/in/tamino-gaub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png"
              alt="LinkedIn"
              style={{ width: "50px", height: "50px" }}
            />
          </a>
        </div>
        <hr
          style={{
            borderColor: "brown",
            borderWidth: "1px",
            width: "80%",
            margin: "0px auto 20px",
          }}
        />
        {/* Team description */}
        <div style={{ width: "60%", margin: "0 auto" }}>
          <p>
            We are a team of students from the University of Innsbruck, and
            we've dedicated ourselves to improving production and inventory
            processes with our project "Deterministic Models for Lot Sizing".
            Our goal is to facilitate planning in these areas through easily
            applicable solutions
          </p>
        </div>
        <hr
          style={{
            borderColor: "brown",
            borderWidth: "1px",
            width: "80%",
            margin: "0px auto 20px",
          }}
        />
        <b>Team's Favorite Song:</b> <br />
        <br />
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/track/0VqQgswQHZBpV0emkPoGYL?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }
}

export default TeamComponent;
