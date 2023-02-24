console.log("login has loaded");

// Always lowercase!
let html = async () => {
    
    return `<div class="login">
        Hello world
    </div>`;
}

const render = async () => document.querySelector('#root').innerHTML = await html();
window.onload = render();