// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const [error, setError] = useState('Error')
    const [websiteName, setWebsiteName] = useState('')
    
    const [websiteLink, setWebsiteLink] = useState('')
    
    const loginObject = {}
    
    actions.handleName = (e) => {
        loginObject.websiteName = e.target.value
    }
    actions.handleLink = (e) => {
        loginObject.link = e.target.value
    }
    // actions.handleSecondPasswordChange = (e) => {
    //     loginObject.secondPassword = e.target.value
    // }

    actions.login = (e) => {
        fetch(API_URL+'/v1/finetuning/bookmark/website/?token='+`${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: loginObject.email,
                link: loginObject.password,
                purposes: [1]
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
            console.log(data)
          } ).
          catch((error) => {
            if (error.message.startsWith('400')) {
                setError(`Pkease provide both, email and password`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            if (error.message.startsWith('401')) {
                setError(`You are an active user, but your password didn't match`);
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
    <header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>
        <div><h2>Fill the website info</h2>
    <input  id="website-name" placeholder="Website name" type="text" />
    <input  id="website-link" placeholder="Website URL" type="text" />
    <button id="login-button">Bookmark website</button>
    <div><svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="error">${error}</div>
    <a class="backwards right lighter" href="train.html">Back</a></div>

    </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#website-name").addEventListener('keyup', actions.handleName);
    document.querySelector("#website-link").addEventListener('change', actions.handleLink);
    // document.querySelector("#second-password-input").addEventListener('change', actions.handleSecondPasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);

})