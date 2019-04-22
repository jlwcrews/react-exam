const app = require('../../src/server/app');
import {mount} from "enzyme/build";
import {ShowMenus} from "../../src/client/showmenus";
import React from "react";
const menuRepo = require('../../src/server/menuRepo');
import { MemoryRouter } from 'react-router';

const {overrideFetch, asyncCheckCondition, overrideWebSocket} = require('../mytest-utils');

test("Test that menus display", async () => {

    const testMenu = '{"id":0,"dishes":{"day":"Monday","dishes":[{"id":4,"name":"Churro","type":"Dessert"},{"id":5,"name":"Sopapilla","type":"Dessert"},{"id":1,"name":"Tortilla soup","type":"Appetizer"}]}}'
    menuRepo.populateMenus();
    menuRepo.updateMenu(0, JSON.parse(testMenu))
    overrideFetch(app);

    const driver = mount(
        <MemoryRouter>
            <ShowMenus/>
        </MemoryRouter>
    );

    const predicate = () => {
        driver.update();
        const tableSearch = driver.find('#tdName');
        const tableIsDisplayed = (tableSearch.length >= 1);
        return tableIsDisplayed;
    };

    const displayedTable = await asyncCheckCondition(predicate, 3000, 200);
    expect(displayedTable).toBe(true);
    const menu= menuRepo.getMenu(0);
    const html = driver.html();

    for(let i=0; i<menu.dishes; i++){
        expect(html).toContain(menu.dishes[i].name)
    }
});