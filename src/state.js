window.stateValues = []
let currentRefCount = 0;
window.actions = {};

const render = () => {
    console.log("Calling render, state values are ", window.stateValues)
    document.querySelector('#root').innerHTML = html();
    currentRefCount = 0;
}

const fabricateModifier = (internalIndex) => {
    console.log("fabricating hook state for variable with ref: "+internalIndex)
    const setter = (value) => {
        window.stateValues[internalIndex] = value;
        console.log("updating value for ref "+internalIndex+" with ", value, window.stateValues )
        render()
    };
    return setter;
}

const useState = (defaultValue) => {
    if(!window.stateValues[currentRefCount]) window.stateValues.push(defaultValue);
    currentRefCount++;
    return [ window.stateValues[currentRefCount-1], fabricateModifier(currentRefCount-1) ];
}

window.onload = render();