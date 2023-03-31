// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const [error, setError] = useState('Error')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    actions.handleEmailChange = (e) => {
        loginObject.email = e.target.value
    }
    if (token && name) {
        window.location.href = 'organizations.html'
    }
    actions.handlePasswordChange = (e) => {
        loginObject.password = e.target.value

    }
    const loginObject = {}

    actions.login = (e) => {
        console.log(loginObject)
        fetch(API_URL+'/v1/auth/signup/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                extension: true,
                username: loginObject.email,
                password: loginObject.password
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
            localStorage.setItem('organization', data.organization.id)
            localStorage.setItem('organizationName', data.organization.name)
            window.location.href = 'templates.html'
          } ).
          catch((error) => {
            if (error.message.startsWith('400')) {
                setError(`Password did not match`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            if (error.message.startsWith('401')) {
                setError(`You are a Breathecode user, but your password didn't match`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            else {
                setError(`An unexpected error occured, status code: ${error}`)
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
          })
    }


        
    return `<div class="signup">
    <img src="src/assets/rigobot-logo.png" />
    <div><h2>Fill your basic information to create an account</h2>
    <input  id="email-input" placeholder="Email" type="email" />
    <input  id="password-input" placeholder="Password" type="password" />
    <input  id="password-input-match" placeholder="Repat password" type="password" />
    <button id="login-button">Login</button>
    <div><svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="error">${error}</div>
    <a class="backwards right lighter" href="home.html">Back to login</a></div>

    </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#email-input").addEventListener('keyup', actions.handleEmailChange);
    document.querySelector("#password-input").addEventListener('change', actions.handlePasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);

})