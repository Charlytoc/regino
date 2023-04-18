// Must be called html
let html = () => {
    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');
    const token = localStorage.getItem('token');

    const [fetched, setFetched] = useState(false)
    const [questions, setQuestions] = useState([])

    if (!fetched) {
        fetch(API_URL+`/v1/finetuning/completions/list/?token=${token}`)
          .then(response => response.json())
          .then((data) =>{
   
            console.log(data)
            setQuestions(data,  renderize=false);
            setFetched(true)
 } )
    }


    actions.answerQuestions = (e) => {
        e.preventDefault();
        const topic =  e.currentTarget.getAttribute('data-topic')
        chrome.tabs.create({url: `${API_URL}/view/answer/completion?token=${token}&topic=${topic}`});
    }
    return `<div class="train">
        <header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>
        <main>
        <h2>There are some trainings that require your expertise, please answer questions for:</h2>
        ${questions.map((item) => `
        <a class="questions-container" data-topic=${item.purpose_id}><div>${item.completions} questions for ${item.topic}</div><div><svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.59998 13.069L8.1714 7.17242L1.59998 1.27587" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.59998 13.069L8.1714 7.17242L1.59998 1.27587" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div></a>`
        ).join("")}
        <a href="bookmark.html">Bookmark website</a>
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
    const questionsContainer = document.querySelectorAll(".questions-container");
    questionsContainer.forEach((container) => {
        container.addEventListener('click', actions.answerQuestions);
    });

    document.querySelector("#switch-organization").addEventListener('click', ()=>{
        actions.switchToOrganization()
    })
    document.querySelector("#logout-button").addEventListener('click', ()=>{
        actions.logout()
    })
})