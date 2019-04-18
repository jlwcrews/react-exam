import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Dish} from './dish'

export class EditDish extends Component{

    constructor(props){
        super(props)
        this.state = {
            name: "",
            type: ""
        }
        this.id = new URLSearchParams(window.location.search).get("dish");
    }

    async componentDidMount(){
        const response = await fetch("/dish/" + this.id)
        const body = await response.json()
        this.setState({name: body.name})
        this.setState({type: body.type})
    }

    editDish = async (name, type) => {

        const id = this.id
        const payload = {id, name, type}
        const response = await fetch("/dish/" + id, {
            method: "put",
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
                <Dish 
                    name={this.state.name} 
                    type={this.state.type} 
                    callback={this.editDish}/>
            </div>
        )
    }
}
