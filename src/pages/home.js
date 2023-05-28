// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const [error, setError] = useState('Error')

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

    actions.forgotPassword = () => {
        chrome.tabs.create({url: `https://breathecode.herokuapp.com/v1/auth/password/reset?url=https://4geeks.com/login`});
    }

    actions.login = (e) => {
        fetch(API_URL+'/v1/auth/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
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
            if (error.message.startsWith('401')) {
                setError(`Please verify your email and password`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            if (error.message.startsWith('400')) {
                setError(`Please create an account first`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            else {
                setError(`Please verify your password. ${error}`)
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
          })
    }


        
    return `<div class="home">
    <img src="src/assets/rigobot-logo.png" />
    <div><h1>Please log in</h1>
    <input  id="email-input" placeholder="Email" type="email" />
    <input  id="password-input" placeholder="Password" type="password" />
    <button id="login-button">Login</button>
    <div class="error">${error}</div>
    <div class="signup">
    <a id="forgot-password" class="backwards">Forgot password?</a>
    <p>Don't have an account? <a class="backwards " href="signup.html"> Sign up here </a></p>
    </div>
    </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#email-input").addEventListener('keyup', actions.handleEmailChange);
    document.querySelector("#password-input").addEventListener('change', actions.handlePasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);
    document.querySelector("#forgot-password").addEventListener('click', actions.forgotPassword);

})