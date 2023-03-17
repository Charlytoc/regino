// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const organization = localStorage.getItem('organization')
    const organizationName = localStorage.getItem('organizationName')
    const topic = localStorage.getItem('topic')
    const template_id = localStorage.getItem('template')
    const pendingCompletions = localStorage.getItem('pendingCompletions')
    const [fetched, setFetched] = useState(false)
    const [template, setTemplate] = useState([])


    if (!fetched) {
        fetch(API_URL+'/extension/complete/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                organization: organization,
                topic: topic,
                template: template_id
            })
          })
          .then(response => response.json())
          .then((data) =>{
            setTemplate(data.template, renderize=false);
            setFetched(true);
          } )
    }

    actions.goToTemplates = (e) => {
        e.preventDefault();
        localStorage.removeItem('template');
        window.location.href = "templates.html"
    }
    actions.generate = (e) => {
        const buttonThinking = e.target
        buttonThinking.innerHTML = "Rigo is thinking..."
        buttonThinking.disabled = true;
        buttonThinking.classList.add('rigo-thinking');
        fetch(`${API_URL}/v1/prompting/complete/?template_id=${template_id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: inputsObject,
                extension: true
            })
          })
          .then(response => response.json())
          .then((data) =>{
            chrome.tabs.create({url: `${API_URL}/view/complete/?completion=${data.completion}`});
          } )
    }
    const inputsObject = {}
    actions.handleInput = (e) => {
        inputsObject[e.target.name] = e.target.value
    }
    const returnInputs = (obj) => {
        let inputs = ""
        for (let variable in obj) {
            let description = variable.replace(/_/g, " ");
            description = description.charAt(0).toUpperCase() + description.slice(1)
            inputs += `<input class="variable-input" name="${variable}" type="text" placeholder="${description}"/>
            <span class="small">${obj[variable]}</span>
            `
        }
        return inputs
    }

     return `<div class="generate">
        <header class="header"><a>Get help from Rigo</a><a href="train.html">Teach Rigo <span class="completions-toggle">${pendingCompletions}</span></a></header>
        <main>
        <a class="backwards" id="go-to-templates">
        <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Ask for help in something else</a>
        <h2>${template.name}:</h2>
        ${returnInputs(template.variables)}
        <button id="generate-button">Generate</button>
        <div class="modal-copied">Answer copied to clipboard!</div>
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
        <button id="logout-button">Logout</button>
        </div>
        </footer>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#go-to-templates").addEventListener('click', actions.goToTemplates)
    document.querySelector("#generate-button").addEventListener('click', actions.generate)
    const variableInputs = document.querySelectorAll(".variable-input")
    variableInputs.forEach((input) => input.addEventListener('keyup', actions.handleInput))
    document.querySelector("#switch-organization").addEventListener('click', actions.switchToOrganization)
    document.querySelector("#logout-button").addEventListener('click', actions.logout)
})