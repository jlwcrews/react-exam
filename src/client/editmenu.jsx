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

    componentDidMount = async () => {
        const response = await fetch("/menu/" + this.id)
        const body = await response.json()
        console.log("componentDidMount in EditMenu: " + JSON.parse(body))
        this.setState({
            id: body.id, 
            menu: body.dishes
            })
    }

    render(){

        const {menu, id} = this.state
        return(
            <div>
                <Menu
                    id={id} 
                    menu={menu}/> 
            </div>
        )
    }
}