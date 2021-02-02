import React, { Component } from 'react';
import './UserForm.css';

class UserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            startTime: '',
            endTime: '',
            weight: '',
            errorObject: {},
        }
    }

    fieldChange = (e) => {
        let errorObject={...this.state.errorObject};
        if (e.target.value) {
            errorObject[e.target.id] = '';
        }
        this.setState({ [e.target.id]: e.target.value, errorObject });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { name, startTime, endTime, weight } = this.state;
        let errorObject = {};
        let validated = true;

        if (name === '') {
            errorObject.name = 'Please enter your name.';
            validated = false;
        }

        if (startTime === '') {
            errorObject.startTime = 'Please enter work start time.';
            validated = false;
        }

        if (endTime === '') {
            errorObject.endTime = 'Please enter work end time.';
            validated = false;
        }

        if (weight === '') {
            errorObject.weight = 'Please enter weight.';
            validated = false;
        }

        if (validated) {
            let userDetails = {
                name,
                startTime,
                endTime,
                weight
            };

            this.props.checkUser(userDetails);
            
        } else {
            this.setState({ errorObject });
        }
    }

    render() {
        return (
			<div>
				<div className="row">
					<h3 className="indigo-text text-darken-4">Enter User Details</h3>
				</div>
				<div className="row center">
					<form onSubmit={this.onSubmit}>
						<div className="input-field">
							<input type="text" id="name" value={this.state.name} onChange={this.fieldChange} />
							<label htmlFor="name">Your Name</label>
							<span className="errorMessage">{this.state.errorObject['name']}</span>
						</div>
						<div className="input-field">
							<input
								type="time"
								id="startTime"
								value={this.state.startTime}
								onChange={this.fieldChange}
							/>
							<label htmlFor="startTime">Work Start Time</label>
							<span className="errorMessage">{this.state.errorObject['startTime']}</span>
						</div>
						<div className="input-field">
							<input
								type="time"
								id="endTime"
								min={this.state.endTime}
								value={this.state.endTime}
								onChange={this.fieldChange}
							/>
							<label htmlFor="endTime">Work End Time</label>
							<span className="errorMessage">{this.state.errorObject['endTime']}</span>
						</div>
						<div className="input-field">
							<input
								type="text"
								id="weight"
								min={this.state.weight}
								value={this.state.weight}
								onChange={this.fieldChange}
							/>
							<label htmlFor="weight">Weight</label>
							<span className="errorMessage">{this.state.errorObject['weight']}</span>
						</div>
						<button className="waves-effect waves-light btn">Submit</button>
					</form>
				</div>
				{this.props.history ? <div className="row">
					<button className="waves-effect waves-dark btn" onClick={this.props.updateHistoryClick}>History</button>
				</div> : <div />}
			</div>
		);
    }
};

export default UserForm;
