// Must be called html
let headerComponent = `<header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>`
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




const adminMain = (questions, selectedPurpose) => `
    <div>
            <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <a class="backwards right lighter" id="back-button">Back</a>
    </div>
    <h1>Answer</h1>
    <p>As team admin, you can create a trivia campaign among your team members and help Rigo learn. As Rigo gets smarter it will be a better companion for your team.</p>
    ${answerQuestionsComponent(questions, selectedPurpose)}
    `
// ${item.completions} questions for ${item.name}
const isSelected = (id, selectedPurpose) => id == selectedPurpose ? 'selected' : 'null'
const answerQuestionsComponent = (questions, selectedPurpose) => `
<h2>There are some completions that require your immediate attention, choose a purpose and start answering!</h2>
<select id="purpose-selector">
<option value="0">Select a purpose</option>
${questions.map((item) => `
<option class="question-container" ${isSelected(item.id, selectedPurpose)} value=${item.id} data-topic=${item.id}>
        ${item.name}
</option>`
).join("")}
</select>
<button class="button w-100" id="answer-button">Go</button>
`

let html = () => {


    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');
    const token = localStorage.getItem('token');

    const [selectedPurpose, setSelectedPurpose] = useState(0)
    const [fetched, setFetched] = useState(false)
    const [questions, setQuestions] = useState([])
    const [componentToShow, setComponentToShow] = useState(()=>'<p></p>')
    saveLastPage('answer.html')
    const retrieveQuestionsByPurpose = () => {
        fetch(API_URL+`/v1/finetuning/completions/list/?token=${token}`)
        .then(response => response.json())
        .then((data) =>{
          setQuestions(data,  renderize=false);
    } )
    }

    actions.selectPurpose = (e) => {
        // console.log(e.target.value);
        setSelectedPurpose(e.target.value);
    }

    const retrieveUserStatus = () => {
        fetch(API_URL+`/v1/auth/user/role?token=${token}`)
        .then(response => response.json())
        .then((data) =>{
     
          if (data.is_admin) {
            setComponentToShow(adminMain, renderize=false)
          }
          else  {
            setComponentToShow(answerQuestionsComponent, renderize=false);
          }
          setFetched(true)
        } )
    }
    if (!fetched) {
        retrieveQuestionsByPurpose()
        retrieveUserStatus()
        
    }
    actions.answerQuestions = (e) => {
        if (selectedPurpose != 0) {
            const topic = selectedPurpose
            chrome.tabs.create({url: `${API_URL}/view/answer/completion?token=${token}&purpose=${topic}`});
        }

    }
    
    
    return `<div class="answer">
    ${headerComponent}
    <main>
    
        ${componentToShow(questions, selectedPurpose)}
        </main>
        ${footerComponent(name, organizationName)}
    </div>`
}


document.addEventListener("render", ()=>{
    // const questionsContainer = document.querySelectorAll(".question-container");
    // questionsContainer.forEach((container) => {
    //     container.addEventListener('click', actions.answerQuestions);
    // });

    document.querySelector("#switch-organization").addEventListener('click', ()=>{
        actions.switchToOrganization()
    })
    document.querySelector("#answer-button").addEventListener('click', ()=>{
        actions.answerQuestions()
    })
    document.querySelector("#purpose-selector").addEventListener('change', (e)=>{
        actions.selectPurpose(e)
    })
    document.querySelector("#back-button").addEventListener('click', ()=>{
        redirectAndCleanCache("train.html")
    })
    document.querySelector("#logout-button").addEventListener('click', ()=>{
        actions.logout()
    })
})