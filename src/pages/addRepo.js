// Must be called html
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
let html = () => {
    const token = localStorage.getItem('token');
    const [error, setError] = useState('Error')
    const name = localStorage.getItem('name');
    const organizationName = localStorage.getItem('organizationName');

    const repoObject = {
    }
    
    actions.handleName = (e) => {
        repoObject.url = e.target.value
    }
    actions.handleCommits = (e) => {
        repoObject.commits_for_review = e.target.value
    }
    actions.handleWatchers = (e) => {

        repoObject.watchers = e.target.value
    }
    actions.handleGithubToken = (e) => {
        repoObject.personal_access_token = e.target.value
    }

    actions.login = (e) => {
        const URL = `${API_URL}/v1/finetuning/me/repository/`
        fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
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
    <main>
    <div>
        <svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <div class="error">${error}</div>
        <a class="backwards right lighter" href="train.html">Back</a>
    </div>
        <h2>Code reviews</h2>
        <p>As team expert, you can provide feedback on code and Rigo will become a better coder.</p>
        <h3>Submit a repo for code reviews</h3>
        <input  id="repo-url" placeholder="Repository url" type="text" />
        <input  id="commits" placeholder="How many commits you want to review" type="number" />
        <input  id="watchers" placeholder="Comma separated GitHub username of watchers" type="text" />
        <input  id="github_token" placeholder="Github token with repo permissions" type="text" />
        <button id="login-button">Submit repo for revisions</button>
        <span>This feature is currently supported only on github.com.</span>

    </main>
    ${footerComponent(name, organizationName)}
    </div>`;
}

document.addEventListener("render", ()=>{

    document.querySelector("#repo-url").addEventListener('keyup', actions.handleName);
    document.querySelector("#commits").addEventListener('change', actions.handleCommits);
    document.querySelector("#watchers").addEventListener('change', actions.handleWatchers);
    document.querySelector("#github_token").addEventListener('change', actions.handleGithubToken);

    document.querySelector("#login-button").addEventListener('click', actions.login);

})