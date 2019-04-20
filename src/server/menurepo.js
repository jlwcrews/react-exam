const menus = new Map()

let indexMenu = 0

populateMenus()

function populateMenus(){
    addMenu({day:"Monday",dishes:[]})
    addMenu({day:"Tuesday",dishes:[]})
    addMenu({day:"Wednesday",dishes:[]})
    addMenu({day:"Thursday",dishes:[]})
    addMenu({day:"Friday",ddishes:[]})
    addMenu({day:"Saturday",dishes:[]})
    addMenu({day:"Sunday",dishes:[]})
}

function addMenu(dishes){
    const id = indexMenu
    const menu = {
        id: id,
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
