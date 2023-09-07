window.stateValues = []
let currentRefCount = 0;
window.actions = {};

const API_URL = 'https://rigobot.herokuapp.com'
// const API_URL = 'https://8000-charlytoc-rigobot-5stxd4jad0l.ws-us104.gitpod.io'



const RENDER_EVENT = new Event('render')
const LOAD_CACHE = new Event('loadCache')
const render = () => {

    document.querySelector('#root').innerHTML = html();
    currentRefCount = 0;
    document.dispatchEvent(RENDER_EVENT);
}


const fabricateModifier = (internalIndex) => {
    // console.log("fabricating hook state for variable with ref: "+internalIndex)
    const setter = (value, renderize=true) => {
        window.stateValues[internalIndex] = value;
        // console.log("updating value for ref "+internalIndex+" with ", value, window.stateValues )
        if (renderize) {
            render()
        }
        
        
    };
    return setter;
}

const useState = (defaultValue) => {
    if(!window.stateValues[currentRefCount]) window.stateValues.push(defaultValue);
    currentRefCount++;
    return [ window.stateValues[currentRefCount-1], fabricateModifier(currentRefCount-1) ];
}


// const logInputValues = (inputIds) => {
//     // Loop through each input id
//     for (let i = 0; i < inputIds.length; i++) {
//         const inputId = inputIds[i];
//         const inputElement = document.getElementById(inputId); // Get the input element using the id
//         if (inputElement) {
//             const inputValue = inputElement.value; // Get the current value of the input element
//             console.log(`Input ${inputId} value: ${inputValue}`); // Log the current value
//         } else {
//             console.log(`Input ${inputId} not found`); // Log an error message if the input element is not found
//         }
//     }
// }

function storeValue(cacheKey = "cache", keyId, value) {
    // Retrieve the information currently saved in the localStorage in the cacheKey
    const cache = JSON.parse(localStorage.getItem(cacheKey)) || {};
    // Add or update the given key with the given value
    cache[keyId] = value;
    // Store the updated cache object in the localStorage
    localStorage.setItem(cacheKey, JSON.stringify(cache));
}


function retrieveValue(cacheKey = "cache", keyId) {
    // Retrieve the cache object from localStorage and parse it as JSON
    const cache = JSON.parse(localStorage.getItem(cacheKey)) || {};
    // Retrieve the value stored in the given key from the cache object
    const value = cache[keyId];

    if (value === undefined) {
        return ''
    }
    // Return the retrieved value
    return value;
}


function saveLastPage(pageName) {
    storeValue('LAST_PAGE_VISITED', 'page', pageName)
}

function redirectToLastPage() {
    let lastPage = retrieveValue('LAST_PAGE_VISITED', 'page'); 
    if (lastPage) {
        window.location.href = lastPage
    }

}


function redirectAndCleanCache (redirectTo) {
    storeValue('LAST_PAGE_VISITED', 'page', '')
    window.location.href = redirectTo
}

window.onload = render();