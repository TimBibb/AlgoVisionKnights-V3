import './UserInput.css';
import React from 'react';

export default class UserInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputType: props.inputType};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        console.log(event.target.inputString);
        this.props.handleChange(event.target.inputString);
    }

    render() {
        const inputString = this.props.inputString;
        if (this.state.inputType === "graphs") {
            return (
                <form>
                    <label>graph input</label>
                    <input type="text" inputString={this.state.inputString} onChange={this.handleChange} />
                </form>
            );
        } else if (this.state.inputType === "lists") {
            return (
                <form>
                    <label>list of numbers input</label>
                    <input type="text" inputString={this.state.inputString} onChange={this.handleChange} />
                </form>
            );
        } else {
            return (
                <form>
                    <input type="text" inputString={this.state.inputString} onChange={this.handleChange} />
                </form>
            );
        }
    }
}