// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    actions.handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    if (token && name) {
        window.location.href = 'organizations.html'
    }
    actions.handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const url = 'https://8000-charlytoc-rigobot-zs3y5cs1199.ws-us88.gitpod.io/v1/prompting/auth/'

    actions.login = (e) => {
        console.log(email, password)
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: email,
                password: password,
                extension: true
            })
          })
          .then(response => response.json())
          .then((data) =>{
            console.log(data.name.token)
            localStorage.setItem('name', data.name)
            localStorage.setItem('token', data.token)
            window.location.href = 'organizations.html'
          } )
    }


        



    return `<div class="home">
    <img src="src/assets/rigobot-logo.png" />
    <div><h1>Please log in</h1>
    <input value="${email}" id="email-input" placeholder="Email" type="email" />
    <input value="${password}" id="password-input" placeholder="Password" type="password" />
    <button id="login-button">Login</button>
    </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#email-input").addEventListener('change', actions.handleEmailChange)
    document.querySelector("#password-input").addEventListener('change', actions.handlePasswordChange)
    document.querySelector("#login-button").addEventListener('click', actions.login)

})