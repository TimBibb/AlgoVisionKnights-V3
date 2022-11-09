import React from 'react';
import Tilt from 'react-tilt';
import {
	Card,
	CardContent,
	// IconButton,
	Typography,
	Button,
} from '@material-ui/core';
import './SelectionCard.css'
import { Link } from 'react-router-dom';

class SelectionCard extends React.Component {
	constructor(props) {
		super(props)
        this.category = props.category;
        this.key = props.categoryName;
        this.state = {
            selectedAlgorithm: props.category[0]
        }

        this.setSelectedAlgorithm = this.setSelectedAlgorithm.bind(this)
	}

    setSelectedAlgorithm(name) {
        this.category.forEach(element => {
            console.log("button pressed")
            console.log(name)
            console.log(element.name)
            if (element.name.trim() == name.trim()) {
                this.selectedAlgorithm = element
                console.log(this.selectedAlgorithm)
            }
        });
    }

    renderButton(algorithm) {
        if (algorithm.name === this.state.selectedAlgorithm.name) {
            return (
                <Button variant='outlined' id={algorithm.name} className="btn selected" onClick={()=>{this.setState({selectedAlgorithm: algorithm})}}>{algorithm.name}</Button>
            )
        } else {
            return (
                <Button className="btn" id={algorithm.name} onClick={()=>{this.setState({selectedAlgorithm: algorithm})}}>{algorithm.name}</Button>
            )
        }
        
    }
    

    render() {
        return (
            <Tilt className='category' options={{ max: 1.5, scale: 1.03 }}>
                <Card id='card'>
                    <CardContent id='card-content'>
                        <div className='CardHeader'>
                            <Typography id='card-title'>{this.key}</Typography>
                        </div>
                        <div className='CardBody'>
                            <div className='list'>
                                {this.category.map(algorithm => {
                                    return (
                                        this.renderButton(algorithm)
                                    )
                                })}
                            </div>
                            <div>
                                <Typography id='card-info'>
                                    {this.state.selectedAlgorithm.description}
                                </Typography>
                            </div>
                            <Link to={this.state.selectedAlgorithm.path}>
                                <Button variant='outlined' className='btn proceed'>Go To Algorithm</Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </Tilt>
        )
    }
}

export default SelectionCard