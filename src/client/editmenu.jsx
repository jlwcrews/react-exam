import React, {Component} from 'react'
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
        this.setState({
            id: body.id, 
            menu: body.dishes
            })
    }

    render(){
        const {menu, id} = this.state

        if(menu != null){
           return(         
            <div>
                <Menu
                    id={id} 
                    menu={menu}/> 
            </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}