// Must be called html
let html = () => {
    const name = localStorage.getItem('name')
    const organizationName = localStorage.getItem('organizationName')

    return `<div class="train">
        <header class="header train-header"><a href="templates.html">Generate</a><a>Train</a></header>
        <main>
        <h1><img src="rigo-icon.png" />Coming soon!</h1>
        <h2>Bookmark websites</h2>
        <p>When you are reading a website you think Rigo should know about, bookmark it and Rigo will read it to increase its knowledge, this information will help it generate better answers.</p>
        <h2>Bookmark PDF abd other documents</h2>
        <p>Let Rigo scan one or more websites to train it and increase its knowledge, this information will help it generate better answers.</p>
        </main>
        <footer>
        <div>
        <img src="rigo-icon.png"/>
        <div><p>${name}</p><div><p>${organizationName}</p><button id="switch-organization">switch</button></div></div>
        </div>
        <div>
        <button id="logout-button">Logout</button></div>
        </footer>
    </div>`;
}
document.addEventListener("render", ()=>{
    document.querySelector("#switch-organization").addEventListener('click', ()=>{
        actions.switchToOrganization()
    })
    document.querySelector("#logout-button").addEventListener('click', ()=>{
        actions.logout()
    })
})