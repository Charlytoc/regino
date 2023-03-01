// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const [error, setError] = useState('Error')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    actions.handleEmailChange = (e) => {
        setEmail(e.target.value, renderize=false)
    }
    if (token && name) {
        window.location.href = 'organizations.html'
    }
    actions.handlePasswordChange = (e) => {
        setPassword(e.target.value)

    }

    actions.login = (e) => {
        fetch(API_URL+'/v1/prompting/auth/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                extension: true,
                username: email,
                password: password
            })
          })
          .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error(response.status)
            }
          })
          .then((data) =>{
            localStorage.setItem('name', data.name)
            localStorage.setItem('token', data.token)
            window.location.href = 'organizations.html'
          } ).
          catch((error) => {
            if (error.message.startsWith('4')) {
                setError(`Please verify your email and password`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            else {
                setError(`An unexpected error ocurred, status code: ${error}`)
            }
          })
    }


        
    return `<div class="home">
    <img src="src/assets/rigobot-logo.png" />
    <div><h1>Please log in</h1>
    <input value="${email}" id="email-input" placeholder="Email" type="email" />
    <input value="${password}"  id="password-input" placeholder="Password" type="password" />
    <button id="login-button">Login</button>
    <div class="error">${error}</div>
    </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#email-input").addEventListener('keyup', actions.handleEmailChange);
    document.querySelector("#password-input").addEventListener('change', actions.handlePasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);

})