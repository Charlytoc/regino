// Must be called html
let html = () => {
 
    const email = {}
    actions.handleEmailChange = (e) => {
        email.email = e.target.value
    }
    

    actions.reset = (e) => {
        // console.log(email)
        window.location.href ="thanks.html"
    }


        
    return `<div class="forgot">
    <img src="src/assets/rigobot-logo.png" />
    <div><h2>What is your email associated to Rigobot?</h2>
    <input  id="email-input" placeholder="Your email" type="email" />
    <button id="reset-button">Send password reset</button>
    <div><svg width="12" height="12" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 9L4 18L14 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 9L16 18L26 27" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <a class="backwards lighter" href="home.html">Back to login</a></div>

    </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#email-input").addEventListener('keyup', actions.handleEmailChange);
    document.querySelector("#reset-button").addEventListener('click', actions.reset);

})