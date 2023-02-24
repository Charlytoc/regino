const API_URL = 'https://8000-charlytoc-rigobot-r361j7bbeuu.ws-us87.gitpod.io'

form = document.querySelector('.form-login')
form.addEventListener('submit', login)

function login (e) {
  e.preventDefault()

  const username = form.querySelector('input[name="username"]').value
  const password = form.querySelector('input[name="password"]').value
  const extension = form.querySelector('input[name="extension"]').value

  fetch(`${API_URL}/v1/prompting/auth/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      extension: extension
    })
  })
  .then(response => response.json())
  .then(data => {
    const token = data.token
    chrome.storage.local.set({token: token}, function() {
      console.log('Token guardado en el almacenamiento local');
    });

    const tokenDiv = document.createElement('div')
    tokenDiv.textContent = `Your token is: ${token}`
    document.querySelector('.container').appendChild(tokenDiv)

    const continueButton = document.createElement('button')
    continueButton.textContent = 'Continue'
    continueButton.addEventListener('click', () => {
      chrome.storage.local.get(['token'], function(result) {
        console.log('Token recuperado del almacenamiento local: ', result.token);
        if (result.token) {
          fetchTemplates(result.token);
        }
      });
    });
    document.querySelector('.container').appendChild(continueButton)
  })
  .catch(error => console.error(error))
}


async function fetchTemplates(token) {
  try {
    const response = await fetch(`${API_URL}/extension/complete/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'token': token
      })
    });
    const data = await response.json();
const container = document.querySelector(".templates-container");
const template = data.templates[0];

let title = document.createElement('h2');
title.innerText = template.name;
container.appendChild(title);

let body = document.createElement('h2');
body.innerText = template.description;
container.appendChild(body);

let form = document.createElement('form');

for (let variable in template.variables) {
  let label = document.createElement('label');
  label.innerText = variable;
  let input = document.createElement('input');
  input.setAttribute('name', variable);
  input.setAttribute('placeholder', template.variables[variable]);
  form.appendChild(label);
  form.appendChild(input);
}

let submitButton = document.createElement('button');
submitButton.innerText = 'Submit';
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const payload = {
    input: Object.fromEntries(formData),
    organization: 1
  };
  fetch(`${API_URL}/v1/prompting/complete/${template.id}`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // handle successful response
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
});

form.appendChild(submitButton);
container.appendChild(form);

    // puedes agregar aquí más código para manipular la respuesta
  } catch (error) {
    console.log('Error:', error);
  }
}

const tokenButton = document.querySelector(".view-token")
tokenButton.addEventListener('click', ()=> {
  chrome.storage.local.get(['token'], (result) =>{
    const tokenContainer = document.querySelector(".token-container")
    tokenContainer.innerText = result.token
    const fetchButton = document.createElement('button')
    fetchButton.innerText = 'Fetch'
    tokenContainer.appendChild(fetchButton)
    fetchButton.addEventListener('click', () => {
      fetchTemplates(result.token)
    }, { passive: true } )
  })
}, { passive: true })
