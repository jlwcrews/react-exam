import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export class Dish extends Component{

    constructor(props){
        super(props)
        this.state = {
                name: "",
                type: ""
            }
    }

    componentWillReceiveProps(newProps){
        this.setState({
            name: newProps.name,
            type: newProps.type
        })
    }

    onFormSubmit = async (event) => {
        event.preventDefault();

        const ok = await this.props.callback(
            this.state.name,
            this.state.type
        )
    }

    updateName = (event) => {
        this.setState({name: event.target.value});
    }

    updateType = (event) => {
        this.setState({type: event.target.value});     
    }

    render(){
         return(
            <div>
                <form onSubmit={this.onFormSubmit}>
                Name
                <input type="text" value={this.state.name} id="name" onChange={this.updateName}/>
                Type
                <input type="text" value={this.state.type} id="type" onChange={this.updateType}/>
                <button className="btn">Ok</button>
                </form>
            </div>
        )
    }

}