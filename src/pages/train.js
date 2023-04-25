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
const buttonSection = `
<section class="training-buttons">
<a href="answer.html">
<span class="number-notification-badge">3</span>
<div class="svg-container"><svg width="19" height="26" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.57562 0.610962C5.67821 0.610962 3.15385 2.20779 1.17196 5.05559C0.81244 5.57219 0.92328 6.28049 1.42479 6.66077L3.53114 8.25789C4.03764 8.64192 4.75829 8.55212 5.15482 8.05535C6.37792 6.52307 7.28519 5.64084 9.19569 5.64084C10.6978 5.64084 12.5558 6.60759 12.5558 8.06423C12.5558 9.16541 11.6468 9.73093 10.1636 10.5625C8.43397 11.5322 6.14511 12.739 6.14511 15.758V16.236C6.14511 16.8832 6.66977 17.4078 7.31698 17.4078H10.8556C11.5028 17.4078 12.0275 16.8832 12.0275 16.236V15.9541C12.0275 13.8613 18.1441 13.7741 18.1441 8.11096C18.1441 3.84612 13.7202 0.610962 9.57562 0.610962ZM9.08632 18.8463C7.22128 18.8463 5.70394 20.3636 5.70394 22.2286C5.70394 24.0936 7.22128 25.611 9.08632 25.611C10.9514 25.611 12.4687 24.0936 12.4687 22.2286C12.4687 20.3636 10.9514 18.8463 9.08632 18.8463Z" fill="black"/>
    </svg>
</div>
<span >Answer</span>
</a>
<a href="bookmark.html">
<span class="number-notification-badge">3</span>
<div ><svg width="30" height="29" viewBox="0 0 30 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.1562 0H9.03125C7.53027 0 6.3125 1.21777 6.3125 2.71875V5.4375H3.59375C2.09277 5.4375 0.875 6.65527 0.875 8.15625V26.2812C0.875 27.7822 2.09277 29 3.59375 29H21.7188C23.2197 29 24.4375 27.7822 24.4375 26.2812V23.5625H27.1562C28.6572 23.5625 29.875 22.3447 29.875 20.8438V2.71875C29.875 1.21777 28.6572 0 27.1562 0ZM21.7188 26.2812H3.59375V14.5H21.7188V26.2812ZM27.1562 20.8438H24.4375V8.15625C24.4375 6.65527 23.2197 5.4375 21.7188 5.4375H9.03125V2.71875H27.1562V20.8438Z" fill="black"/>
</svg>
</div>
<span >Web</span>
</a>
<a href="documents.html">
<span class="number-notification-badge">3</span>
<div ><svg width="27" height="29" viewBox="0 0 27 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M25.3091 3.73494L22.2981 0.796311C21.7756 0.286445 21.0671 3.77043e-06 20.3283 0L10.3393 0C8.80076 0 7.55357 1.21721 7.55357 2.71875V5.4375H2.91071C1.37219 5.4375 0.125 6.65471 0.125 8.15625V26.2812C0.125 27.7828 1.37219 29 2.91071 29H15.9107C17.4492 29 18.6964 27.7828 18.6964 26.2812V23.5625H23.3393C24.8778 23.5625 26.125 22.3453 26.125 20.8438V5.65738C26.125 4.93632 25.8315 4.2448 25.3091 3.73494ZM15.5625 26.2812H3.25893C3.16658 26.2812 3.07801 26.2454 3.0127 26.1817C2.9474 26.118 2.91071 26.0315 2.91071 25.9414V8.49609C2.91071 8.40596 2.9474 8.31952 3.0127 8.25579C3.07801 8.19205 3.16658 8.15625 3.25893 8.15625H7.55357V20.8438C7.55357 22.3453 8.80076 23.5625 10.3393 23.5625H15.9107V25.9414C15.9107 26.0315 15.874 26.118 15.8087 26.1817C15.7434 26.2454 15.6549 26.2812 15.5625 26.2812ZM22.9911 20.8438H10.6875C10.5951 20.8438 10.5066 20.8079 10.4413 20.7442C10.376 20.6805 10.3393 20.594 10.3393 20.5039V3.05859C10.3393 2.96846 10.376 2.88202 10.4413 2.81829C10.5066 2.75455 10.5951 2.71875 10.6875 2.71875H16.8393V7.70312C16.8393 8.4539 17.4629 9.0625 18.2321 9.0625H23.3393V20.5039C23.3393 20.594 23.3026 20.6805 23.2373 20.7442C23.172 20.8079 23.0834 20.8438 22.9911 20.8438ZM23.3393 6.34375H19.625V2.71875H20.184C20.2763 2.71875 20.3649 2.75455 20.4302 2.81827L23.2373 5.55786C23.2696 5.58942 23.2953 5.62689 23.3128 5.66813C23.3303 5.70936 23.3393 5.75356 23.3393 5.79819V6.34375Z" fill="black"/>
</svg>
</div>
<span>Docs</span>
</a>
<a href="addRepo.html">
<span class="number-notification-badge">3</span>
<div ><svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.6275 27.9727L12.2918 27.0047C11.9419 26.9062 11.745 26.5398 11.8434 26.1898L19.3077 0.473784C19.4061 0.123758 19.7725 -0.0731322 20.1225 0.0253127L23.4582 0.993354C23.8081 1.0918 24.005 1.45823 23.9066 1.80826L16.4423 27.5243C16.3384 27.8743 15.9775 28.0766 15.6275 27.9727ZM9.39363 21.8363L11.7724 19.2986C12.0239 19.0306 12.0075 18.6041 11.7286 18.3579L6.7743 13.999L11.7286 9.6401C12.0075 9.39399 12.0294 8.96739 11.7724 8.6994L9.39363 6.16171C9.14756 5.89919 8.73196 5.88278 8.46402 6.13437L0.584163 13.5177C0.305279 13.7748 0.305279 14.2178 0.584163 14.4748L8.46402 21.8637C8.73196 22.1153 9.14756 22.1043 9.39363 21.8363ZM27.286 21.8691L35.1658 14.4803C35.4447 14.2233 35.4447 13.7803 35.1658 13.5232L27.286 6.1289C27.0235 5.88278 26.6079 5.89372 26.3564 6.15624L23.9776 8.69393C23.7261 8.96192 23.7425 9.38852 24.0214 9.63463L28.9757 13.999L24.0214 18.3579C23.7425 18.6041 23.7206 19.0306 23.9776 19.2986L26.3564 21.8363C26.6024 22.1043 27.018 22.1153 27.286 21.8691Z" fill="black"/>
</svg>
</div>
<span >Code</span>
</a>
</section>`
const adminMain = () => `<main>
    <p>As team admin, you can assign experts to can help you train Rigo.</p>
    <p>You can launch trivia campaigns and Rigo will start asking questions to you and your team members experts.</p>
    <p>Rigo can read and learn from any website, document or trivia campaign. As Rigo gets smarter it will be a better companion for you and your team.</p>
    ${buttonSection}
    </main>`

const expertMain = (purposesOfExpertise) => `<main>
<p>Your team admins named you an expert on the following topics: ${purposesOfExpertise.map((it)=> it).join(' ')} </p>
${buttonSection}
</main>`

const defaultMain = `<main><p>You are not an expert on any topic for this team 4Geeks, ask your team admin to name you an expert and you will be able to help make Rigo smarter!</p>
                    <p>You can also switch to another team if you need want.</p></main>`
let html = () => {
    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');
    const token = localStorage.getItem('token');

    const [fetched, setFetched] = useState(false)
    const [questions, setQuestions] = useState([])
    const [componentToShow, setComponentToShow] = useState('')

    const retrieveQuestionsByPurpose = () => {
        fetch(API_URL+`/v1/finetuning/completions/list/?token=${token}`)
        .then(response => response.json())
        .then((data) =>{
          setQuestions(data,  renderize=false);
          setFetched(true)
    } )
    }
    if (!fetched) {
        // retrieveQuestionsByPurpose()
        fetch(API_URL+`/v1/auth/user/status?token=${token}`)
        .then(response => response.json())
        .then((data) =>{
     
          if (data.is_admin) {
            setComponentToShow(adminMain(), renderize=false)
            setFetched(true)
          }
          else if (!data.is_admin && data.is_expert) {
            setComponentToShow(expertMain(data.purposes_of_expertise), renderize=false);
            setFetched(true)
          }
          else {
            setComponentToShow(defaultMain, renderize=false);
            setFetched(true)
          }
    } )
        
    }
    actions.answerQuestions = (e) => {
        e.preventDefault();
        const topic =  e.currentTarget.getAttribute('data-topic')
        chrome.tabs.create({url: `${API_URL}/view/answer/completion?token=${token}&purpose=${topic}`});
    }
    
    
    return `<div class="train">
        ${headerComponent}
        ${componentToShow}
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