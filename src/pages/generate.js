// Must be called html
let html = () => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name')
  // const organization = localStorage.getItem('organization')
  const organizationName = localStorage.getItem('organizationName')
  const purpose_id = localStorage.getItem('SELECTED_PURPOSE')
  const template_id = localStorage.getItem('TEMPLATE')
  const pendingCompletions = localStorage.getItem('pendingCompletions')
  const [fetched, setFetched] = useState(false)
  const [template, setTemplate] = useState([])
  const formId = `form_${template_id}`
  let includeOrganizationBrief = false
  let includePurposeBrief = false
  const inputsObject = {}

  saveLastPage('generate.html')


  if (!fetched) {
    const request_url = `${API_URL}/v1/prompting/templates/${template_id}`
    fetch(request_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token
      }
    })
      .then(response => response.json())
      .then((data) => {
        setTemplate(data, renderize = false);
        setFetched(true);
      })
  }

  actions.includePurposeCheckbox = (e) => {
    includePurposeBrief = includePurposeBrief ? false : true;
  }


  actions.goToTemplates = (e) => {
    e.preventDefault();
    localStorage.removeItem('template');
    redirectAndCleanCache('templates.html')
  }


  actions.generateWithPurpose = (e) => {
    includePurposeBrief = true;
    actions.generate(e);
  }



  actions.generate = (e) => {
    const buttonThinking = e.target
    buttonThinking.innerHTML = "Rigo is thinking..."
    buttonThinking.disabled = true;
    buttonThinking.classList.add('rigo-thinking');

    fetch(`${API_URL}/v1/prompting/completion/${template_id}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + token,
      },
      body: JSON.stringify({
        inputs: inputsObject,
        include_purpose_objective: includePurposeBrief,
        just_format: true
      })
    })
      .then(response => response.json())
      .then((data) => {
        for (let _key in inputsObject) {
          storeValue(`cache_${formId}`, _key, '')
        }


        chrome.tabs.create({ url: `${CHAT_URL}?token=${token}&purpose=${purpose_id}&completion=${data.id}&action=generate`});

        // chrome.tabs.create({ url: `${API_URL}/view/complete/?completion=${data.id}` });

      })
  }
  actions.handleInput = (e) => {
    inputsObject[e.target.name] = e.target.value
    storeValue(`cache_${formId}`, e.target.name, e.target.value)
  }
  
  actions.showGenerateOptions = () => {
    document.querySelector("#buttons-container").style.display = "flex";

    document.querySelector(".generate-button").style.display = "none";
  }

  const returnInputs = (obj) => {

    let inputs = `<form id="${formId}">`
    for (let variable in obj) {
      let description = variable.replace(/_/g, " ");
      description = description.charAt(0).toUpperCase() + description.slice(1)
      console.log(variable);

      const inputValue = String(retrieveValue(`cache_${formId}`, variable))
      inputsObject[variable] = inputValue

      inputs += `<input value="${inputValue}" class="variable-input" name="${variable}" type="text" placeholder="${description}"/>
            <span class="small">${obj[variable]}</span>
            `
    }
    inputs += `</form>`
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

        <div class="generate-button">
          <button >
            Generate
          </button >
        </div>
        
        
        <div id="buttons-container">
          <button id="generate-with-purpose">Generate with Rigo</button>
          <button id="generate-with-engine">Generate with GPT-4</button>
        </div>
  
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

document.addEventListener("render", () => {
  document.querySelector("#go-to-templates").addEventListener('click', actions.goToTemplates)
  document.querySelector("#generate-with-purpose").addEventListener('click', actions.generateWithPurpose)
  document.querySelector("#generate-with-engine").addEventListener('click', actions.generate)
  const variableInputs = document.querySelectorAll(".variable-input")
  variableInputs.forEach((input) => input.addEventListener('keyup', actions.handleInput))

  document.querySelector("#switch-organization").addEventListener('click', actions.switchToOrganization)
  document.querySelector("#logout-button").addEventListener('click', actions.logout)
  document.querySelector(".generate-button > button").addEventListener('click', actions.showGenerateOptions)
  document.querySelector("#include-purpose-checkbox").addEventListener('click', actions.includePurposeCheckbox)

})