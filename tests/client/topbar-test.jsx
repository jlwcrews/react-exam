const app = require('../../src/server/app');
import {TopBar} from "../../src/client/topbar";
import React from "react";
import { shallow, mount } from 'enzyme'

const {overrideFetch, asyncCheckCondition, overrideWebSocket} = require('../mytest-utils');

describe('TopBar component', () =>{
    it('should start with null state', () => {
        const wrapper = shallow(<TopBar/>);
        const userIdState = wrapper.state().userId;
        const passwordState = wrapper.state().password;
        expect(userIdState).toBeNull;
        expect(passwordState).toBeNull;
    });

    it('testing not logged in', () => {
        const wrapper = shallow(<TopBar/>);
        const loginButtonText = wrapper.find('#loginButton').text();
        expect(loginButtonText).toEqual('Login');
    })
});

test("Test valid login", async () =>{

    const userId = "jlwcrews";
    const password = "password";
    overrideFetch(app);

    const fetchAndUpdateUserInfo = () => {};

    const driver = shallow(
        <TopBar callback={fetchAndUpdateUserInfo}/>
    );

    const usernameInput = driver.find("#usernameInput").at(0);
    const passwordInput = driver.find("#passwordInput").at(0);
    const loginButton = driver.find("#loginButton").at(0);

    usernameInput.simulate('change', {target: {value: userId}});
    passwordInput.simulate('change', {target: {value: password}});
    loginButton.simulate('click');

    const predicate = () => {
        driver.update();
        const buttonSearch = driver.find('#logoutButton');
        const buttonIsDisplayed = (buttonSearch.length >= 1);
        return buttonIsDisplayed;
    };

    const displayedButton = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedButton).toBe(true);

    expect(driver.state().userId).toEqual(userId);
    expect(driver.state().password).toEqual(password);

});