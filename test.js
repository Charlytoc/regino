object = {
    somethins: "description",
    variableTwo: "description 2"
}

// const returnInputs = (obj) => {
//     for (let variable in obj) {
//         console.log(variable, obj[variable])
//         `<input type="text" placeholder="${obj[variable]}"/>`
//     }
// }

// returnInputs(object)


const R = (n) => `Este es R para ${n} ${20*((n-24)/((n-25)**2 + n-24))}`

// console.log(R(35) , "35", R(10), "10", R(100), "100", R(-6.67), "-6.67", R(20), "20", R(25), "25",)


// console.log("R es 50", )



const WaterTEMPder = (t) => `Esta es la temperatura a t= ${t} :${-0.06426 + 2*(0.0085043)*t - 3*(0.0000679)*(t**2)}`

let waterTemps = [3.963, 0, 79.532, 86, 100]
const V = (t) => 999.87 - 0.06426*(t) + 0.0085043*(t**2) - 0.0000679*(t**3)

waterTemps.forEach((t) =>  console.log( V(t)))


