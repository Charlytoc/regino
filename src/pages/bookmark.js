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


let downArrowSVG = () => {
  return `
  <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V14.1893L14.4697 12.4697C14.7626 12.1768 15.2374 12.1768 15.5303 12.4697C15.8232 12.7626 15.8232 13.2374 15.5303 13.5303L12.5303 16.5303C12.3897 16.671 12.1989 16.75 12 16.75C11.8011 16.75 11.6103 16.671 11.4697 16.5303L8.46967 13.5303C8.17678 13.2374 8.17678 12.7626 8.46967 12.4697C8.76256 12.1768 9.23744 12.1768 9.53033 12.4697L11.25 14.1893V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="gray"/>
</svg>
  `
}

let purposesMenu = (purposes, selectedPurposes) => {
  return `
  <section class="purposes-container">
    ${purposes.map((item, index) => (
      `<div><span>${item.name}</span><input type="checkbox" class="purpose-input" value="${item.id}" /></div>`
    )
      ).join(' ')}
  </section>
  `
}

let html = () => {
    const token = localStorage.getItem('token');
    const [error, setError] = useState('Error')
    const [fetched, setFetched] = useState(false)
    const [purposes, setPurposes] = useState([])
    const [selectedPurposes, setSelectedPurposes] = useState([])
    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');
    const websiteObject = {
        purposes: [],
        link: '',
        url: ''
    }

    // console.log(selectedPurposes);
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

        const url = `${API_URL}/v1/finetuning/purposes?expertise=true`
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' +token
          }
        }
        fetch(`${url}`, config)
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
                const websiteViewUrl = API_URL + `/edit/website/${data.id}`
                chrome.tabs.create({url: websiteViewUrl});
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

    actions.selectPurpose = (e) => {
      // console.log(e.target.value);
      let newPurposes = [...selectedPurposes]
      newPurposes.push(e.target.value);
      setSelectedPurposes(newPurposes);   
  }

  actions.displayDropdown = () => {

    const dropdown = document.querySelector(".purposes-container");
    if (dropdown.style.display == "none") {
      dropdown.style.display = 'flex';
    }
    else {
      dropdown.style.display = 'none';
    }

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
    <div class="w-100 container-flex-column pos-relative">
    <button id="display-dropdown" class="button-svg">Select the purposes ${downArrowSVG()}</button>
    ${purposesMenu(purposes, selectedPurposes)}
    </div>
    <button id="login-button">Bookmark website</button>
    
    <div class="error">${error}</div>

    </main>
    ${footerComponent(name, organizationName)}
    </div>`;
}

document.addEventListener("render", ()=>{
//   document.querySelector("#purpose-selector").addEventListener('change', (e)=>{
//     actions.selectPurpose(e)
// })

    const purposesInputs = document.querySelectorAll(".purpose-input");
    purposesInputs.forEach((input) => {
        input.addEventListener('click', (e)=>{
          actions.addOrRemovePurpose(e)
        });
    });
    document.querySelector("#website-name").addEventListener('keyup', actions.handleName);
    document.querySelector("#website-link").addEventListener('change', actions.handleLink);
    // document.querySelector("#second-password-input").addEventListener('change', actions.handleSecondPasswordChange);
    document.querySelector("#login-button").addEventListener('click', actions.login);
    document.querySelector("#display-dropdown").addEventListener('click', actions.displayDropdown);

}) 