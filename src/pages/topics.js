
let html = () => {
    const [fetched, setFetched] = useState(false)
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState(-1)
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    let pendingCompletions = localStorage.getItem('pendingCompletions');


    redirectToLastPage()
    if (!pendingCompletions) {
        fetch(API_URL+`/v1/finetuning/completions/list/?token=${token}&total=True`)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('pendingCompletions', data);
            pendingCompletions = data;
          })
    }

    const organizationName = localStorage.getItem('organizationName')
    const [error, setError] = useState('Error')

    
    
    if (!fetched) {

        if (localStorage.getItem('SELECTED_PURPOSE')) {
            setSelectedTopic(localStorage.getItem('SELECTED_PURPOSE'), renderize=false)
            // window.location.href = 'templates.html'
        }

        fetch(API_URL+'/v1/finetuning/purposes/', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token '+token
            }
          })
          .then(response => response.json())
          .then((data) =>{
            setTopics(data,  renderize=false);
            setFetched(true)
          } )
          .catch(err => actions.logout())
    }
    const isSelected = (id) => id == selectedTopic ? 'selected' : 'null'

    actions.chooseTopic = (e) => {
        localStorage.setItem('SELECTED_PURPOSE', selectedTopic)
        window.location.href = "templates.html"
        // if (selectedTopic != 0) {
        //     localStorage.setItem('SELECTED_PURPOSE', selectedTopic)
        //     window.location.href = "templates.html"
        // }
        // else {
        //     setError(`Please choose a topic`);
        //     const errorModal = document.querySelector(".error")
        //     errorModal.style.animationPlayState = 'running';
        // }
        
    }

    actions.openChat = () => {
        if (selectedTopic == 0){
            setError(`Please select a purpose to chat with`);
            const errorModal = document.querySelector(".error")
            errorModal.style.animationPlayState = 'running';
         return
        }
        
        chrome.tabs.create({url: `${API_URL}/chat?token=${token}&purpose=${selectedTopic}`});
    }

    actions.handleTopicsChange = (e) => {
        let topicId = Number(e.target.value)

        if (topicId != 0) {
            setSelectedTopic(topicId);
            const helpOptionsContainer = document.querySelector("#help-options");
            helpOptionsContainer.style.display = "block";
        }
        if (topicId == 0 && selectedTopic != 0) {
            setSelectedTopic(0);
            const helpOptionsContainer = document.querySelector("#help-options");
            helpOptionsContainer.style.display = "none";
        }
    }

    actions.goToTemplates = (e) => {
        e.preventDefault();
        localStorage.removeItem('template');
        window.location.href = "templates.html"
    }
    let helpOptionsClass = ""
    if (selectedTopic != 0 && selectedTopic != -1) {
        helpOptionsClass="block";
    }

    return `<div class="topics">
        <header class="header"><a>Get help from Rigo</a><a href="train.html">Teach rigo<span class="completions-toggle">${pendingCompletions}</span></a></header>
        <main>
     
        <h1>Get help in one particular purpose</h1>
        <select id="topics-select">
        <option value="0" ${isSelected(0)}>Click to select purpose</option>
        ${topics.map((item) => `<option ${isSelected(item.id)} value=${item.id}>${item.name}</option>`)}
        </select>

        <section id="help-options" class="${helpOptionsClass}">
            <h4>What type of help do you need?</h4>
            <div class="button-panel">
            <button id="choose-topic">Use a template</button>
            <button id="chat-opener" href="">Start a conversation</button>
            </div>
        </section>
        <div class="error">${error}</div>
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
        <button id="logout-button">Logout</button></div>
        </footer>
    </div>`;
}

document.addEventListener("render", ()=>{
    // document.querySelector("#go-to-templates").addEventListener('click', actions.goToTemplates)
    document.querySelector("#topics-select").addEventListener('change', actions.handleTopicsChange)
    document.querySelector("#choose-topic").addEventListener('click', actions.chooseTopic);
    document.querySelector("#switch-organization").addEventListener('click', actions.switchToOrganization)
    document.querySelector("#logout-button").addEventListener('click', actions.logout);
    document.querySelector("#chat-opener").addEventListener('click', ()=>{
        actions.openChat()
    })
})