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
            selectedAlgorithm: props.category[0],
            completed: localStorage.getItem(props.category[0].path) == 'true' ? true : false
        }

        this.setSelectedAlgorithm = this.setSelectedAlgorithm.bind(this)
	}

    setSelectedAlgorithm(algorithm) {
        console.log("selected", localStorage.getItem(algorithm.path) == 'true')
        this.setState({
            selectedAlgorithm: algorithm,
            completed: localStorage.getItem(algorithm.path) == 'true' ? true : false
        })
    }

    renderButton(algorithm) {
        console.log(this.state.completed)
        if (algorithm.name === this.state.selectedAlgorithm.name) {
            return (
                <Button variant='outlined' id={algorithm.name} className="btn selected" onClick={()=>{this.setSelectedAlgorithm(algorithm)}}>{algorithm.name} {this.renderIcon(algorithm)}</Button>
            )
        } else {
            return (
                <Button className="btn" id={algorithm.name} onClick={()=>{this.setSelectedAlgorithm(algorithm)}}>{algorithm.name} {this.renderIcon(algorithm)}</Button>
            )
        }
        
    }

    renderIcon(algorithm) {
        if (localStorage.getItem(algorithm.path) == 'true' ? true : false) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--accentColor)" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
            )
        }
    }
    

    render() {
        return (
            <Tilt className='category' options={{ max: 10, perspective: 900, reverse: true, max: 1.65, scale: 1.05 }}>
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