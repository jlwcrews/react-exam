import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Menu from './menu'

export class EditMenu extends Component{

    constructor(props){
        super(props)
        this.state = {
            id: null,
            menu: null
        }
        this.id = new URLSearchParams(window.location.search).get("menu");
    }

    async componentDidMount(){
        const response = await fetch("/menu/" + this.id)
        const body = await response.json()
        this.setState({
            id: body.id, 
            menu: body.dishes
            })
    }

    render(){
        return(
            <div>
                <Menu
                    id={this.state.id} 
                    menu={this.state.menu}/> 
            </div>
        )
    }
}