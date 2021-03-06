const users = new Map();

populateUsers();

function populateUsers() {
    createUser("jlwcrews", "password");
    createUser("test", "password");
}

function resetUsers() {
    users.clear();
}

function getUser(id){

    return users.get(id);
}

function verifyUser(id, password){

    const user = getUser(id);

    if(user === undefined){
        return false;
    }

    return user.password === password;
}

function createUser(id, password){

    if(getUser(id) !== undefined ){
        return false;
    }

    const user = {
        id: id,
        password: password
    };

    users.set(id, user);
    return true;
}

module.exports = {
    createUser,
    verifyUser,
    getUser,
    resetUsers
}