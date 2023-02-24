
const fetchPrompts = () => {
    return [{
        name: "Prompt 1"
    }]
}


// Always lowercase!
let html = async () => {
    const data = useState("setData", fetchPrompts());

    return `<div class="home">
        Hello world from home <a href="login.html"> take me to login</a>
        ${data.map(p => `<li>${p.name}</li>`)}
        <button onClick="setData(['hola'])">Add new prompt</button>
    </div>`;
}

window.onload = render();