const dishes = new Map()
const menus = new Map()

let indexDish = 0
let indexMenu = 0

populateDishes()

function populateDishes(){
    addDish("Chips and salsa", "Appetizer")
    addDish("Tortilla soup", "Appetizer")
    addDish("Burrito", "Main dish")
    addDish("Enchilada", "Main dish")
    addDish("Churro", "Dessert")
    addDish("Sopapilla", "Dessert")
}

function addDish(name, type){
    const id = indexDish
    const dish = {
        id: id,
        name: name,
        type: type
    }
    dishes.set(id, dish)
    indexDish++

    return id
}

function deleteDish(id){
    return dishes.delete(parseInt(id))
} 

function updateDish(id, dish){
    id = parseInt(id)
    dishes.set(id, dish)
    return true
}

function getDish(id){
    return dishes.get(parseInt(id))
}

function getDishes(){
    return Array.from(dishes.values());
}

module.exports = {
    getDishes,
    getDish,
    addDish,
    deleteDish,
    updateDish,
    populateDishes
}
