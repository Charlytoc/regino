object = {
    somethins: "description",
    variableTwo: "description 2"
}

const returnInputs = (obj) => {
    for (let variable in obj) {
        console.log(variable, obj[variable])
        `<input type="text" placeholder="${obj[variable]}"/>`
    }
}

returnInputs(object)