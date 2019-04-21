const request = require('supertest');
const app = require('../../src/server/app');
const Users = require('../../src/server/userRepo');
const Menus = require('../../src/server/menuRepo');
const Dishes = require('../../src/server/dishRepo');
const WS = require('ws');
const {asyncCheckCondition, checkConnectedWS} = require('../mytest-utils');

const errorHandler = function(err, req, res, next){
    console.log(err.stack);
    res.send(500);
};
app.use(errorHandler);


beforeEach(() => 
{
    Users.resetUsers();

});

test("Test login", async () =>{

    const userId = "jlwcrews";
    const password = "password";
    const payload = {userId, password};

    let response = await request(app)
        .post('/login')
        .send(payload);
    expect(response.statusCode).toBe(204);

    response = await request(app)
        .post('/login')
        .send({userId, password: "a wrong password"});
    expect(response.statusCode).toBe(401);
});

test("Test getting menus", async () =>{
    let response = await request(app)
        .get('/menus');
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toContain('{"id":0,"dishes":{"day":"Monday","dishes":[]}}')

    response = await request(app)
        .get('/menu/1');
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toContain('{"id":1,"dishes":{"day":"Tuesday","dishes":[]}}')
});

test("Test editing menus", async () =>{
    let payload = '{"id":1,"dishes":{"day":"Tuesday","dishes":[{\"id\":0,\"name\":\"Chips and salsa\",\"type\":\"Appetizer\"}]}}'
    let response = await request(app)
        .put('/menu/1')
        .send(JSON.parse(payload))
    expect(response.statusCode).toBe(200);

    response = await request(app)
        .get('/menu/1');
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toContain('{"id":1,"dishes":{"day":"Tuesday","dishes":[{\"id\":0,\"name\":\"Chips and salsa\",\"type\":\"Appetizer\"}]}}')
});

test("Test getting dishes", async () =>{
    let response = await request(app)
        .get('/dishes');
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toContain('{\"id\":0,\"name\":\"Chips and salsa\",\"type\":\"Appetizer\"}')

    response = await request(app)
        .get('/dish/1');
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toContain('{\"id\":1,\"name\":\"Tortilla soup\",\"type\":\"Appetizer\"}')
});

test("Test editing dishes", async () =>{
    let payload = '{\"id\":1,\"name\":\"Pineapple\",\"type\":\"Dessert\"}'
    let response = await request(app)
        .put('/dish/1')
        .send(JSON.parse(payload))
    expect(response.statusCode).toBe(200);

    response = await request(app)
        .get('/dish/1');
    expect(response.statusCode).toBe(200);
    expect(JSON.stringify(response.body)).toContain('{\"id\":1,\"name\":\"Pineapple\",\"type\":\"Dessert\"}')
});


