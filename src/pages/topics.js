
let html = () => {
    const [fetched, setFetched] = useState(false)
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState(0)
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const organization = localStorage.getItem('organization')
    const organizationName = localStorage.getItem('organizationName')

// Must be called html

    if (localStorage.getItem('topic')) {
        window.location.href = 'templates.html'
    }
    if (!fetched) {
        fetch(API_URL+'/extension/complete/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                organization: organization,
                topic: null
            })
          })
          .then(response => response.json())
          .then((data) =>{
            setTopics(data.topics,  renderize=false);
            setFetched(true)
          } )
    }
    const isSelected = (id) => id == selectedTopic ? 'selected' : 'null'

    actions.chooseTopic = (e) => {
        localStorage.setItem('topic', selectedTopic)
        window.location.href = "templates.html"
    }

    actions.handleTopicsChange = (e) => {
        setSelectedTopic(e.target.value);
    }

    return `<div class="topics">
        <header class="header"><a>Get help from Rigo</a><a href="train.html">Teach rigo</a></header>
        <main>
        <h1>Choose a topic of expertise</h1>
        <select id="topics-select">
        <option value="0" selected>Select or type a topic</option>
        ${topics.map((item) => `<option ${isSelected(item.id)} value=${item.id}>${item.name}</option>`)}
        </select>
        <button id="choose-topic">Show templates</button>
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
    document.querySelector("#logout-button").addEventListener('click', actions.logout)
})