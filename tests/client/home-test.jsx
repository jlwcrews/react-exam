const { app } = require('../../src/server/app')
import React from 'react'
import { Home } from '../../src/client/home'
import { TopBar } from '../../src/client/topbar'
import { ShowMenus } from '../../src/client/showmenus'
import Menu from '../../src/client/menu'
import { shallow, mount,  } from 'enzyme'
import { MemoryRouter } from 'react-router';
const {stubFetch, flushPromises, overrideFetch, asyncCheckCondition, overrideWebSocket} = require('../mytest-utils');

const menuRepo = require('../../src/server/menuRepo')

describe('TopBar component', () =>{
    it('should start with null state', () => {
        const wrapper = shallow(<TopBar/>)
        const userIdState = wrapper.state().userId
        const passwordState = wrapper.state().password
        expect(userIdState).toBeNull
        expect(passwordState).toBeNull
    })

    it('testing not logged in', () => {
        const wrapper = shallow(<TopBar/>)
        const loginButtonText = wrapper.find('#loginButton').text()
        expect(loginButtonText).toEqual('Login')
    })
})

describe('Home component', () =>{
    overrideFetch(app)
    it('testing display', () => {
        const wrapper = mount(<Home/>)
        const loginButtonText = wrapper.find('#loginButton').text()
        expect(loginButtonText).toEqual('Login')
    })
})

test("Test that dishes displays", async () => {

    menuRepo.populateMenus();
    overrideFetch(app);

    const driver = mount(
        <MemoryRouter>
            <ShowMenus/>
        </MemoryRouter>
    );

    const predicate = () => {
        driver.update();
        const tableSearch = driver.find('#menuTable');
        const tableIsDisplayed =  (tableSearch.length >= 1);
        return tableIsDisplayed;
    };

    const displayedTable = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedTable).toBe(true);
    const menus = menuRepo.getMenus();
    const html = driver.html();

    for(let i=0; i<menus.length; i++){
        expect(html).toContain(menus[i].dishes.day);
    }
});




