import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Home} from './home'
import {AddDish} from './adddish'
import {EditDish} from './editdish'

const App = () =>{

   
    return( 
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/editDish' component={EditDish}/>
                    <Route path='/addDish' component={AddDish}/>
                </Switch>
            </div>
        </BrowserRouter>  
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))



