// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const [error, setError] = useState('Error')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    actions.handleEmailChange = (e) => {
        // setEmail(e.target.value, renderize=false)
        loginObject.email = e.target.value
    }
    if (token && name) {
        window.location.href = 'organizations.html'
    }
    actions.handlePasswordChange = (e) => {
        // setPassword(e.target.value)
        loginObject.password = e.target.value

    }
    const loginObject = {}

    actions.reset = (e) => {
        // fetch(API_URL+'/v1/prompting/auth/', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         extension: true,
        //         username: loginObject.email,
        //         password: loginObject.password
        //     })
        //   })
        //   .then(response => {
        //     if (response.ok) {
        //         return response.json()
        //     }
        //     else {
        //         throw new Error(response.status)
        //     }
        //   })
        //   .then((data) =>{
        //     localStorage.setItem('name', data.name)
        //     localStorage.setItem('token', data.token)
        //     window.location.href = 'organizations.html'
        //   } ).
        //   catch((error) => {
        //     if (error.message.startsWith('4')) {
        //         setError(`Please verify your email and password`);
        //         const errorModal = document.querySelector(".error")
        //         errorModal.style.animationPlayState = 'running';
        //     }
        //     else {
        //         setError(`An unexpected error ocurred, status code: ${error}`)
        //     }
        //   })
        window.location.href ="thanks.html"
    }


        
    return `<div class="thanks">
    <img src="src/assets/rigobot-logo.png" />
    <div>
    <div>Check your email inbox! If we are able to find your email, we will be sending a password reset link you can click</div>
    <div><svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <a class="backwards lighter" href="home.html">Back to login</a></div>

    </div>
</div>

    </div>
    </div>`;
}

document.addEventListener("render", ()=>{

})