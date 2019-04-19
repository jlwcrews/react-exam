import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Menu} from './menu'

export class EditMenu extends Component{

    constructor(props){
        super(props)
        this.state = {
            day: null,
            dishes: []
        }
        this.id = new URLSearchParams(window.location.search).get("menu");
    }

    async componentDidMount(){
        const response = await fetch("/menu/" + this.id)
        const body = await response.json()
        this.setState(
            {day: body.day,
             dishes: body.dishes
            })
    }

    submitMenuChanges = async (day) => {

        const id = this.id
        const payload = {id, day, dishes}
        const response = await fetch("/menu/" + id, {
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
                <Menu 
                    day={this.state.day}
                    dishes={this.state.dishes} 
                    callback={this.submitMenuChanges}/>
            </div>
        )
    }
}