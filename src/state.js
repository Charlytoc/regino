window.stateValues = {}

const render = async () => {
    console.log("Calling render, state values are ", stateValues)
    document.querySelector('#root').innerHTML = await html();
}

const fabricateModifier = (internalId) => {
    console.log("fabricating hook state for variable with ref: "+internalId)
    return (value) => {
        console.log("updating value for ref "+internalId+" with "+value)
        window.stateValues[internalId] = value;
        render()
    };
}

const useState = (modifierName, defaultValue) => {
    console.log("call use sate again")
    window.stateValues[modifierName] = defaultValue;
    window[modifierName] = fabricateModifier(modifierName)
    return window.stateValues[modifierName];
}