// Must be called html
let footerComponent = (name, organizationName) => `<footer>
<div>
<img src="rigo-icon.png"/>
<div><p>${name}</p><div><p>${organizationName}</p><button id="switch-organization">
<svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 9L4 18L14 27" stroke="#2F80ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M26 9L16 18L26 27" stroke="#2F80ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
switch</button></div></div>
</div>
<div>
<button id="logout-button">Logout</button></div>
</footer>`
let html = () => {
    const token = localStorage.getItem('token');
    const [error, setError] = useState('Error')
    const [fetched, setFetched] = useState(false)
    const [purposes, setPurposes] = useState([])
    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');

        
    return `<div class="documents">
    <header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>
        <main>
        <h2>Bookmark documents</h2>
        <div>
        <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="error">${error}</div>
        <a class="backwards right lighter" href="train.html">Back</a></div>
        <p>As team expert, you can bookmark or upload documents and Rigo will read and learn from them. As Rigo gets smarter it will be a better companion for your team.</p>

    </main>
    ${footerComponent(name, organizationName)}
    </div>`;
}

document.addEventListener("render", ()=>{
    const purposesInputs = document.querySelectorAll(".purpose-input");
    purposesInputs.forEach((input) => {
        input.addEventListener('change', actions.addOrRemovePurpose);
    });
    document.querySelector("#website-name").addEventListener('keyup', actions.handleName);
    document.querySelector("#website-link").addEventListener('change', actions.handleLink);
    // document.querySelector("#second-password-input").addEventListener('change', actions.handleSecondPasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);

})