// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const organization = localStorage.getItem('organization')
    const organizationName = localStorage.getItem('organizationName')
    const topic = localStorage.getItem('topic')

    const DEFAULT_ORGANIZATION = 1
    const DEFAULT_TOPIC = 0
    const DEFAULT_ORGANIZATION_NAME = "4Geeks"
    const [fetched, setFetched] = useState(false)
    const [templates, setTemplates] = useState([])

    const current_organization = () => organization == null ?DEFAULT_ORGANIZATION : organization
    const current_topic = () => topic == null ? DEFAULT_TOPIC : topic
    const currentOrganizationName = () => organizationName == null ? DEFAULT_ORGANIZATION_NAME : organizationName
    if (!fetched) {
        fetch(API_URL+'/extension/complete/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                organization: current_organization(),
                topic: current_topic(),
                template: null
            })
          })
          .then(response => response.json())
          .then((data) =>{
            console.log(data.templates)
            setTemplates(data.templates,  renderize=false);
            setFetched(true);
          } )
    }
    actions.selectTemplate = (e) => {
        e.preventDefault();
        localStorage.setItem('template', e.currentTarget.getAttribute('data-template'));
        topic == null ? localStorage.setItem("topic", current_topic()) : null
        organization == null ? localStorage.setItem("organization", current_organization()) : null
        organizationName == null ? localStorage.setItem("organizationName", currentOrganizationName()) : null
        window.location.href = 'generate.html'
    }
    actions.goToTopics = (e) => {
        e.preventDefault();
        localStorage.removeItem('topic')
        window.location.href = 'topics.html'
    }

    return `<div class="templates">
        <header class="header"><a>Get help from Rigo</a><a href="train.html">Teach Rigo</a></header>
        <main>
        <a class="backwards left" id="go-to-topics">
        <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.00324 0.5H0.996775C0.720783 0.5 0.581518 0.904156 0.777074 1.14017L3.17141 4.03033V7.25C3.17141 7.37236 3.22088 7.48703 3.30394 7.55722L4.33966 8.4319C4.54399 8.60453 4.82855 8.42958 4.82855 8.12468V4.03033L7.22296 1.14017C7.41811 0.904625 7.27981 0.5 7.00324 0.5Z" fill="black"/>
</svg>

        Filter help options</a>
        ${templates.map((item) => `<a data-template=${item.id} class="template-container"><h2>${item.name}</h2>
        <div><small>${item.variables} variables</small><i class="fa-solid fa-circle-info information-icon"></i>
        <div class="info-modal">${item.description}</div></div>
    </a>`
        
        )}
        
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
}

document.addEventListener("render", ()=>{
    const templateContainers = document.querySelectorAll(".template-container");
    templateContainers.forEach((container) => {
        container.addEventListener('click', actions.selectTemplate);
    });
    document.querySelector("#go-to-topics").addEventListener('click', actions.goToTopics)
    document.querySelector("#switch-organization").addEventListener('click', actions.switchToOrganization)
    document.querySelector("#logout-button").addEventListener('click', actions.logout)

})

