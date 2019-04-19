import React, {Component} from 'react'

export class Menu extends Component{

    constructor(props){
        super(props)
        this.state = {
                day: "",
                dishes: [],
                allDishes: []
            }
    }

    componentDidMount = async () => {
        const response = await fetch('/dishes')
        const body = await response.json()
        this.setState({
            allDishes: body
        })
    }

    componentWillReceiveProps(newProps){
        let currentDishes = []
        this.state.allDishes.map( d => {
            if (d.id in allDishes.id) {     
                currentDishes.add(allDishes[d])
        }})
        
        this.setState({
            day: newProps.day,
            dishes: newProps.dishes,
            callback: newProps.callback
        })
    }


    onFormSubmit = async (event) => {
        event.preventDefault();

        const ok = await this.props.callback(
            this.state.day
        )
    }

    render(){

        const {dishes, day, allDishes} = this.state

        let menuTable = <table>
            <thead>
                <tr>
                    <th>Dishes</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {dishes.map(d =>
                    <tr key={"key_" + d}>
                        <td>
                            {d}
                        </td>
                    </tr>
                
                )}
            </tbody>
        </table>;

        let availableDishesTable = <table>
        <thead>
            <tr>
                <th>Dish</th>
                <th>Type</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {allDishes.map(d =>
                <tr key={"key_" + d.id}>
                    <td>
                        {d.id}
                    </td>
                    <td>
                        {d.name}
                    </td>
                    <td>
                        {d.type}
                    </td>
                </tr>
            
            )}
        </tbody>
    </table>;

         return(
            <div>
                <div id="titleDiv">
                    {day}
                </div>
                {menuTable}
                <br/>
                {availableDishesTable}
            </div>
        )
    }

}