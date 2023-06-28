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
    <main>
    <div>
    <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg><a class="backwards right lighter" href="train.html">Back</a>
    </div>
    <h2>Bookmark websites</h2>
    <p>As team expert, you can bookmark websites and Rigo will read and learn from them. As Rigo gets smarter it will be a better companion for your team.</p>
    <input  id="website-name" placeholder="Website name" type="text" />
    <input  id="website-link" placeholder="Website URL" type="text"/>
    <span>Select the purposes you want to add the website</span>
    <section id="inputs-pairs">
    ${purposes.map((item, index) => `<div><span>${item.name}</span><input class="purpose-input" type="checkbox" value=${item.id} /></div>`).join(" ")}
    </section>
    <button id="login-button">Bookmark website</button>
    
    <div class="error">${error}</div>

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