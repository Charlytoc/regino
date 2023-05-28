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

const answerQuestionsComponent = (questions) => `<h2>There are some answering that require your immediate attention, please answer:</h2>
${questions.map((item) => `
<a class="questions-container" data-topic=${item.id}><div>${item.completions} questions for ${item.name}</div><div><svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.59998 13.069L8.1714 7.17242L1.59998 1.27587" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<svg width="10" height="15" viewBox="0 0 10 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.59998 13.069L8.1714 7.17242L1.59998 1.27587" stroke="#333333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</div></a>`
).join("")}`

// Deleted this lines to add it when the functionality is ready
{/* <button><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.251 6.82177L9.4051 6.27621C9.49049 5.76169 9.49049 5.23387 9.4051 4.71936L10.251 4.1738C10.3483 4.1117 10.392 3.98307 10.3602 3.86331C10.1398 3.0738 9.76451 2.35969 9.27404 1.76534C9.19859 1.67441 9.07547 1.65223 8.98016 1.71433L8.13425 2.25989C7.7788 1.91836 7.36975 1.65445 6.92693 1.48147V0.39256C6.92693 0.268366 6.84949 0.159698 6.74028 0.133085C6.01152 -0.0487694 5.26489 -0.0398984 4.57188 0.133085C4.46267 0.159698 4.38522 0.268366 4.38522 0.39256V1.48368C3.9444 1.65889 3.53534 1.9228 3.17791 2.26211L2.33398 1.71655C2.23668 1.65445 2.11556 1.67441 2.0401 1.76755C1.54963 2.35969 1.17433 3.0738 0.953914 3.86553C0.920157 3.98529 0.965828 4.11392 1.06313 4.17601L1.90904 4.72158C1.82366 5.23609 1.82366 5.76391 1.90904 6.27842L1.06313 6.82399C0.965828 6.88608 0.922143 7.01471 0.953914 7.13447C1.17433 7.92398 1.54963 8.63809 2.0401 9.23244C2.11556 9.32337 2.23867 9.34555 2.33398 9.28345L3.1799 8.73789C3.53534 9.07942 3.9444 9.34333 4.38721 9.51632V10.6074C4.38721 10.7316 4.46465 10.8403 4.57387 10.8669C5.30262 11.0488 6.04925 11.0399 6.74226 10.8669C6.85148 10.8403 6.92892 10.7316 6.92892 10.6074V9.51632C7.36975 9.34111 7.7788 9.0772 8.13623 8.73789L8.98214 9.28345C9.07944 9.34555 9.20057 9.32559 9.27603 9.23244C9.7665 8.64031 10.1418 7.9262 10.3622 7.13447C10.392 7.01249 10.3483 6.88387 10.251 6.82177ZM5.65608 7.27197C4.78038 7.27197 4.06751 6.4758 4.06751 5.49778C4.06751 4.51976 4.78038 3.7236 5.65608 3.7236C6.53178 3.7236 7.24465 4.51976 7.24465 5.49778C7.24465 6.4758 6.53178 7.27197 5.65608 7.27197Z" fill="#F2F2F2"/>
    </svg>Manage campaigns</button> */}
const adminMain = (questions) => `
    <h1>Answer</h1>
    <div>
            <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <a class="backwards right lighter" href="train.html">Back</a>
    </div>
    <p>As team admin, you can create a trivia campaign among your team members and help Rigo learn. As Rigo gets smarter it will be a better companion for your team.</p>
    ${answerQuestionsComponent(questions)}
    `


let html = () => {
    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');
    const token = localStorage.getItem('token');

    const [fetched, setFetched] = useState(false)
    const [questions, setQuestions] = useState([])
    const [componentToShow, setComponentToShow] = useState(()=>'<p></p>')

    const retrieveQuestionsByPurpose = () => {
        fetch(API_URL+`/v1/finetuning/completions/list/?token=${token}`)
        .then(response => response.json())
        .then((data) =>{
          setQuestions(data,  renderize=false);
    } )
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
        e.preventDefault();
        const topic =  e.currentTarget.getAttribute('data-topic')
        chrome.tabs.create({url: `${API_URL}/view/answer/completion?token=${token}&purpose=${topic}`});
    }
    
    
    return `<div class="answer">
        ${headerComponent}
        <main>
        
        ${componentToShow(questions)}
        </main>
        ${footerComponent(name, organizationName)}
    </div>`
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