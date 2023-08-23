
let html = () => {
    const [fetched, setFetched] = useState(false)
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState(0)
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const pendingCompletions = localStorage.getItem('pendingCompletions')
    const organization = localStorage.getItem('organization')
    const organizationName = localStorage.getItem('organizationName')
    const [error, setError] = useState('Error')

    const DEFAULT_ORGANIZATION = 1
    const SELECTED_PURPOSE = 0
    const DEFAULT_ORGANIZATION_NAME = "4Geeks"

    const current_organization = () => organization == null ? DEFAULT_ORGANIZATION : organization
    const current_topic = () => topic == null ? DEFAULT_TOPIC : topic
    const currentOrganizationName = () => organizationName == null ? DEFAULT_ORGANIZATION_NAME : organizationName

    if (localStorage.getItem('SELECTED_PURPOSE')) {
        window.location.href = 'templates.html'
    }
    
    if (!fetched) {
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
        setSelectedTopic(e.target.value);
    }

    return `<div class="topics">
        <header class="header"><a>Get help from Rigo</a><a href="train.html">Teach rigo<span class="completions-toggle">${pendingCompletions}</span></a></header>
        <main>
        <h1>Choose a purpose to play with Rigo</h1>
        <select id="topics-select">
        <option value=0 ${isSelected(0)}>All organization purposes</option>
        ${topics.map((item) => `<option ${isSelected(item.id)} value=${item.id}>${item.name}</option>`)}
        </select>
        <button id="choose-topic">Apply filters</button>
        <h1>Chat with Rigo</h1>
        <span>You must select a single purpose from the dropdown to use this option</span>
        <a class="help-option" id="chat-opener" href="">
        <div class="svg-container"><svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.57562 0.610962C5.67821 0.610962 3.15385 2.20779 1.17196 5.05559C0.81244 5.57219 0.92328 6.28049 1.42479 6.66077L3.53114 8.25789C4.03764 8.64192 4.75829 8.55212 5.15482 8.05535C6.37792 6.52307 7.28519 5.64084 9.19569 5.64084C10.6978 5.64084 12.5558 6.60759 12.5558 8.06423C12.5558 9.16541 11.6468 9.73093 10.1636 10.5625C8.43397 11.5322 6.14511 12.739 6.14511 15.758V16.236C6.14511 16.8832 6.66977 17.4078 7.31698 17.4078H10.8556C11.5028 17.4078 12.0275 16.8832 12.0275 16.236V15.9541C12.0275 13.8613 18.1441 13.7741 18.1441 8.11096C18.1441 3.84612 13.7202 0.610962 9.57562 0.610962ZM9.08632 18.8463C7.22128 18.8463 5.70394 20.3636 5.70394 22.2286C5.70394 24.0936 7.22128 25.611 9.08632 25.611C10.9514 25.611 12.4687 24.0936 12.4687 22.2286C12.4687 20.3636 10.9514 18.8463 9.08632 18.8463Z" fill="black"/>
            </svg>
        </div>
        <span >Chat</span>
        </a>
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
    document.querySelector("#topics-select").addEventListener('change', actions.handleTopicsChange)
    document.querySelector("#choose-topic").addEventListener('click', actions.chooseTopic);
    document.querySelector("#switch-organization").addEventListener('click', actions.switchToOrganization)
    document.querySelector("#logout-button").addEventListener('click', actions.logout);
    document.querySelector("#chat-opener").addEventListener('click', ()=>{
        actions.openChat()
    })
})