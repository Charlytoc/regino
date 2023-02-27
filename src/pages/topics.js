// Must be called html
let html = () => {
    const [fetched, setFetched] = useState(false)
    const [topics, setTopics] = useState([])
    const [selectedTopic, setSelectedTopic] = useState(0)
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')
    const organization = localStorage.getItem('organization')
    const organizationName = localStorage.getItem('organizationName')
    const url = 'https://8000-charlytoc-rigobot-zs3y5cs1199.ws-us88.gitpod.io/extension/complete/'


    if (localStorage.getItem('topic')) {
        window.location.href = 'templates.html'
    }
    if (!fetched) {
        fetch(url, {
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
            setTopics(data.topics)
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
        <header class="header"><a>Generate</a><a href="train.html">Train</a></header>
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
        <div><p>${name}</p><div><p>${organizationName}</p><button>switch</button></div></div>
        </div>
        <div>
        <button>Logout</button></div>
        </footer>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#topics-select").addEventListener('change', actions.handleTopicsChange)
    document.querySelector("#choose-topic").addEventListener('click', actions.chooseTopic)
})