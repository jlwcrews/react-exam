import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Dish} from './dish.jsx'

export class AddDish extends Component {

    constructor(props){
        super(props)
    }

    addDish = async (name, type) => {

        const payload = {name, type}
        const response = await fetch("/dish", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        this.props.history.push('/')
    }

    render(){
        return(
            <div>
                <Dish callback={this.addDish}/>
            </div>
        )
    }
}