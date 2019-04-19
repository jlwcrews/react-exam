const menus = new Map()

let indexMenu = 0

populateMenus()

function populateMenus(){
    addMenu("Monday", [1, 2, 5])
    addMenu("Tuesday", [1, 5])
    addMenu("Wednesday", [2, 3])
    addMenu("Thursday", [3, 4, 5])
    addMenu("Friday", [1, 2, 3, 5])
    addMenu("Saturday", [2, 3, 4, 5])
    addMenu("Sunday", [1, 2, 5])
}

function addMenu(day, dishes){
    const id = indexMenu
    const menu = {
        id: id,
        day: day,
        dishes: dishes
    }
    menus.set(id, menu)
    indexMenu++

    return id
}

function deleteMenu(id){
    return menus.delete(parseInt(id))
} 

function updateMenu(id, menu){
    id = parseInt(id)
    menus.set(id, menu)
    return true
}

function getMenu(id){
    return menus.get(parseInt(id))
}

function getMenus(){
    return Array.from(menus.values());
}

module.exports = {
    getMenus,
    getMenu,
    addMenu,
    deleteMenu,
    updateMenu
}
