const app = require('../../src/server/app');
import React from 'react'
import { Home } from '../../src/client/home'
import { mount } from 'enzyme'
const {overrideFetch, asyncCheckCondition, overrideWebSocket} = require('../mytest-utils');



describe('Home component', () =>{
    overrideFetch(app)
    overrideWebSocket()
    it('should start with null state', () => {
        const wrapper = mount(<Home/>);
        const userIdState = wrapper.state().userId;
        const passwordState = wrapper.state().password;
        expect(userIdState).toBeNull;
        expect(passwordState).toBeNull;
    });

    it('testing not logged in', () => {
        const wrapper = mount(<Home/>);
        const loginButtonText = wrapper.find('#loginButton').text();
        expect(loginButtonText).toEqual('Login');
    })
});












