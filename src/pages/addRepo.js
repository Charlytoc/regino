// Must be called html
let html = () => {
    const token = localStorage.getItem('token');
    const [error, setError] = useState('Error')


    const repoObject = {
    }
    
    actions.handleName = (e) => {
        repoObject.repo_url = e.target.value
    }
    actions.handleCommits = (e) => {
        console.log(e.target.value)
        repoObject.how_many_commits = e.target.value
    }

    actions.login = (e) => {
        console.log(repoObject)
        fetch(`${API_URL}/v1/finetuning/review/repo/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(repoObject)
          })
          .then(response => {
            if (response.ok) {
                return response.json()
            }
            else {
                throw new Error(response.status)
            }
          })
          .then((data) =>{
            setError(`Congratulations, you've added a repository for review!`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
          } ).
          catch((error) => {
            if (error.message.startsWith('400')) {
                setError(`Please provide both, email and password`);
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            if (error.message.startsWith('401')) {
                setError(`You are an active user, but your password didn't match`);codeReviews.html
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
            else {
                setError(`An unexpected error occured, status code: ${error}`)
                const errorModal = document.querySelector(".error")
                errorModal.style.animationPlayState = 'running';
            }
          })
    }


        
    return `<div class="add-repo">
    <header class="header train-header"><a href="templates.html">Get help from Rigo</a><a>Teach Rigo</a></header>
        <div><h2>Fill the repository info</h2>
    <input  id="repo-url" placeholder="Repository url" type="text" />
    <input  id="commits" placeholder="How many commits you want to review" type="number" />
    <button id="login-button">Submit repo for revisions</button>
    <div><svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div class="error">${error}</div>
    <a class="backwards right lighter" href="train.html">Back</a></div>

    </div>
    </div>`;
}

document.addEventListener("render", ()=>{

    document.querySelector("#repo-url").addEventListener('keyup', actions.handleName);
    document.querySelector("#commits").addEventListener('change', actions.handleCommits);

    document.querySelector("#login-button").addEventListener('click', actions.login);

})