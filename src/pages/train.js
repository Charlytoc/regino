// Must be called html
let html = () => {
    const name = localStorage.getItem('name')
    const organizationName = localStorage.getItem('organizationName')

    return `<div class="train">
        <header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>
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
        <div><p>${name}</p><div><p>${organizationName}</p><button id="switch-organization">
        <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 9L4 18L14 27" stroke="#2F80ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M26 9L16 18L26 27" stroke="#2F80ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        switch</button></div></div>
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