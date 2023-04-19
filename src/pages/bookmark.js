// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const [error, setError] = useState('Error')
    const [fetched, setFetched] = useState(false)
    const [purposes, setPurposes] = useState([])

    const websiteObject = {
        purposes: []
    }
    
    actions.handleName = (e) => {
        websiteObject.name = e.target.value
    }
    actions.handleLink = (e) => {
        websiteObject.link = e.target.value
    }

    actions.addOrRemovePurpose = (e) => {
        const value = Number(e.target.value);
        const index = websiteObject.purposes.indexOf(value);
        if (index === -1) {
          websiteObject.purposes.push(value);
        } else {
          websiteObject.purposes.splice(index, 1);
        }
        console.log(websiteObject);
      };
    if (!fetched) {
        fetch(`${API_URL}/v1/finetuning/get/purposes/?token=${token}`)
        .then(resp => resp.json())
        .then(data => {
            setPurposes(data, renderize=false);setFetched(true)})
    }

    actions.login = (e) => {
        fetch(`${API_URL}/v1/finetuning/bookmark/website/?token=${token}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(websiteObject)
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
            setError(`Congratulations, you've added a website for finetuning!`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
          } ).
          catch((error) => {
            if (error.message.startsWith('400')) {
                setError(`Please provide both, email and password`);
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


        
    return `<div class="bookmark">
    <header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>
        <div><h2>Fill the website info</h2>
    <input  id="website-name" placeholder="Website name" type="text" />
    <input  id="website-link" placeholder="Website URL" type="text" />
    <section id="inputs-pairs">
    ${purposes.map((item, index) => `<div><span>${item.name}</span><input class="purpose-input" type="checkbox" value=${item.id} /></div>`).join(" ")}
    </section>
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
    const purposesInputs = document.querySelectorAll(".purpose-input");
    purposesInputs.forEach((input) => {
        input.addEventListener('change', actions.addOrRemovePurpose);
    });
    document.querySelector("#website-name").addEventListener('keyup', actions.handleName);
    document.querySelector("#website-link").addEventListener('change', actions.handleLink);
    // document.querySelector("#second-password-input").addEventListener('change', actions.handleSecondPasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);

})