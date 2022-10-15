import React from 'react';
import Form from 'react-bootstrap/Form';

class SpeedSlider extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
      console.log(this.props.waitTimeMultiplier)
    }

    render() {
        return (
            <div style={{display: "grid"}}>
                <Form.Text style={{margin: 'auto', color: 'white'}}>{this.props.waitTimeMultiplier}x</Form.Text>
                <Form.Range
                    step={0.25} min={0.25} max={5}
                    value={this.props.waitTimeMultiplier}
                    onChange={this.props.handleSpeedUpdate}
                    style={{width: '200px', margin: 'auto'}}
                    tipProps={{visible:true}}
                ></Form.Range>
            </div>
        )
    }
}

export default SpeedSlider;

// <SpeedSlider waitTimeMultiplier={this.props.waitTimeMultiplier} handleSpeedUpdate={this.props.handleSpeedUpdate}/>
// replace this.state.waitTime with this.props.waitTime