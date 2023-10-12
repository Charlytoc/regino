// Must be called html

let svgOptions = () => `<svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.00324 0.5H0.996775C0.720783 0.5 0.581518 0.904156 0.777074 1.14017L3.17141 4.03033V7.25C3.17141 7.37236 3.22088 7.48703 3.30394 7.55722L4.33966 8.4319C4.54399 8.60453 4.82855 8.42958 4.82855 8.12468V4.03033L7.22296 1.14017C7.41811 0.904625 7.27981 0.5 7.00324 0.5Z" fill="black"/>
</svg>`

let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const organization = localStorage.getItem('organization')
    const organizationName = localStorage.getItem('organizationName')

    const SELECTED_PURPOSE = localStorage.getItem('SELECTED_PURPOSE') ? localStorage.getItem('SELECTED_PURPOSE') : 0;

    const [fetched, setFetched] = useState(false)
    const [templates, setTemplates] = useState(JSON.parse(sessionStorage.getItem('TEMPLATES')) || [])
    const [pendingCompletions, setPendingCompletions] = useState(0)

    const current_organization = () => organization == null ? DEFAULT_ORGANIZATION : organization
    const currentOrganizationName = () => organizationName == null ? DEFAULT_ORGANIZATION_NAME : organizationName

    redirectToLastPage()

    const filterSessionStorageTemplates = () => {
      let storedData = sessionStorage.getItem('TEMPLATES');
      let data = JSON.parse(storedData);

      function filterTemplatesByPurpose(templateArray, purposeId) {
        return templateArray.filter(template => template.purpose.id == purposeId);
      }
     if (SELECTED_PURPOSE != 0) {
       let filteredTemplates = filterTemplatesByPurpose(data, SELECTED_PURPOSE);
       setTemplates(filteredTemplates, renderize=false)
     }
     else {
      setTemplates(data, renderize=false)
     }

    }

    if (!fetched) {
        let REQUEST_URL = API_URL+'/v1/prompting/templates/'
        if (SELECTED_PURPOSE > 0) REQUEST_URL+=`?purpose=${SELECTED_PURPOSE}`;
        fetch(REQUEST_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token '+token
          }
        })
        .then(response => response.json())
        .then((data) => {
          // setTemplates(data,  renderize=false);
          sessionStorage.setItem('TEMPLATES', JSON.stringify(data));
          filterSessionStorageTemplates()
          return fetch(API_URL+`/v1/finetuning/completions/list/?token=${token}&total=True`)
          
        })
            
          .then(response => response.json())
          .then(data => {
            setPendingCompletions(pendingCompletions+data, renderize=false);
            localStorage.setItem('pendingCompletions', data)
            setFetched(true);
          })
          .catch(error => {
            // Handle error here
            console.error(error);
            actions.logout();
          });
    }

    actions.selectTemplate = (e) => {
        e.preventDefault();
        localStorage.setItem('TEMPLATE', e.currentTarget.getAttribute('data-template'));
        window.location.href = 'generate.html'
    }

    actions.goToTopics = (e) => {
        e.preventDefault();
        localStorage.removeItem('SELECTED_PURPOSE')
        window.location.href = 'topics.html'
    }
    actions.goToHistory = (e) => {
      let templateId = e.currentTarget.getAttribute('data-template-id')
      chrome.tabs.create({url: `${API_URL}/view/completion/history?token=${token}&template=${templateId}`});

    }
    let _html;
    try {
      _html =     `<div class="templates">
      <header class="header"><a>Get help from Rigo</a><a href="train.html">Teach Rigo<span class="completions-toggle">${pendingCompletions}</span> </a></header>
      <main>
      <a class="backwards left" id="go-to-topics">
      ${svgOptions()}
      Switch purpose</a>


      ${templates.map((item) => `
      <a data-template=${item.id} class="template-container">
        <h2>${item.name} 
            <span class="tag">#${item.purpose.name}</span>
        </h2>
        <div>
            <small>${item.num_variables} variables</small>
            <div class="svg-container">
              <i data-template-id=${item.id} class="fa-solid fa-list history-icon"></i>
                <div  class="info-history-modal">Go to the completion history</div>
              <i class="fa-solid fa-circle-info information-icon"></i>
                <div  class="info-modal">${item.description}</div>
            </div>
        </div>
      </a>`
      ).join("")}
      </main>
      <footer>
      <div>
      <img src="rigo-icon.png"/>
      <div><p>${name}</p><div><p>${currentOrganizationName()}</p><button id="switch-organization">
      <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 9L4 18L14 27" stroke="#2F80ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M26 9L16 18L26 27" stroke="#2F80ED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      switch</button></div></div>
      </div>
      <div>
      <button id="logout-button">Logout</button></div>
      </footer>
  </div>`;
  return _html;
    }
    catch (error) {
      console.error(error);
      _html = '<p>An error occurred while generating the HTML.</p><button id="logout-button">Logout</button></div>';
      return actions.logout();
      }
    
}

document.addEventListener("render", ()=>{
    const templateContainers = document.querySelectorAll(".template-container");
    templateContainers.forEach((container) => {
        container.addEventListener('click', actions.selectTemplate);
    });
    document.querySelector("#go-to-topics").addEventListener('click', actions.goToTopics)
    document.querySelector("#switch-organization").addEventListener('click', actions.switchToOrganization)
    document.querySelector("#logout-button").addEventListener('click', actions.logout)
    const historyIcons = document.querySelectorAll(".history-icon");

    historyIcons.forEach((historyIcon) => {
      historyIcon.addEventListener('click', actions.goToHistory);
    });
})

