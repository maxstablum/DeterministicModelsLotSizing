import React, { Component } from "react";
import eoqService from "./eoq.service";

export default class EOQ extends Component {
  constructor(props) {
    super(props);
    this.onChangeDemand = this.onChangeDemand.bind(this);
    this.upload = this.upload.bind(this);

    var data = {
      demand: 1,
    };

    /*
    <div className="format-input">
        <label htmlFor="forename">*Vorname: </label>
            <input
            type="text"
            id="forename"
            name="forename"
            placeholder="Max"
            required
            value={this.state.forename}
            onChange={this.onChangeForename}
            ></input><br />
    </div>
    */

    this.state = {
      id: null,
      demand: "",
      eoq: "111",
      submitted: false,
    };
  }

  /**
   * On Change handlers:
   */
  onChangeDemand(e) {
    this.setState({
      demand: e.target.value,
    });
  }

  upload() {
    try {
      const uploader = eoqService.create(data);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <header className="headline">Test</header>
        <div className="container">
          <div className="containerCenterMember">
            {this.state.submitted ? (
              <div>
                <h4>Das Mitglied wurde erfolgreich angelegt</h4>
                <a className="button" href="/">
                  Zur Übersicht
                </a>
                <button className="button" onClick={this.upload}>
                  Upload
                </button>
              </div>
            ) : (
              <div>
                {this.state.demand}
                <div className="container-form">
                  <div className="format-input">
                    <label htmlFor="forename">Demand: </label>
                    <input
                      type="text"
                      id="demand"
                      name="demand"
                      placeholder="Enter the demand"
                      required
                      value={this.state.demand}
                      onChange={this.onChangeDemand}
                    ></input>
                    <br />
                  </div>
                </div>
                <button className="button" onClick={this.upload}>
                  Post
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
