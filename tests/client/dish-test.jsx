const app = require('../../src/server/app');
import {mount} from "enzyme/build";
import {Dish} from "../../src/client/dish";
import React from "react";

const {overrideFetch, asyncCheckCondition, overrideWebSocket} = require('../mytest-utils');

test("Test Dish", async() =>{

    const driver = mount(
        <Dish/>
    );

    const html = driver.html();

    const name = driver.find("#name").at(0);
    const type = driver.find("#type").at(0);
    const button = driver.find("#dishSubmitButton").at(0);

    name.simulate('change', {target: {value: "Pineapple"}});
    type.simulate('change', {target: {value: "Dessert"}});

    expect(driver.state().name).toEqual("Pineapple")
    expect(driver.state().type).toEqual("Dessert")

});