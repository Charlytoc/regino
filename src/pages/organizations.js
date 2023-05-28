// Must be called html
let html = () => {
    const [fetched, setFetched] = useState(false)
    const [organizations, setOrganizations] = useState([])
    const [selectedOrganization, setSelectedOrganization] = useState(0)
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name')

    if (localStorage.getItem('organization')) {
        window.location.href = 'topics.html'
    }
    
    actions.handleOrganizationChange = (e) => {
        setSelectedOrganization(e.target.value);
    }

    actions.chooseOrgnization = (e) => {
        const organizationName = organizations.find(item => item.id == selectedOrganization).name
        localStorage.setItem('organization', selectedOrganization)
        localStorage.setItem('organizationName', organizationName)
        if (selectedOrganization != 0) {
            window.location.href = "templates.html"
        }
        
    }
    if (!fetched) {
        let requestUrl = API_URL+'/v1/auth/organization'
        fetch(requestUrl, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token '+token
            }
          })
          .then(response => response.json())
          .then((data) =>{
            setOrganizations(data, renderize=false);
            setFetched(true);
          } )
    }
    const isSelected = (id) => id == selectedOrganization ? 'selected' : 'null'


    return `<div class="organizations">
        <div>
        <h1>Hi, ${name}</h1>
        <p>Please choose an organization</p>
        <select id="organizations-select">
        <option value="0" selected>Select or type an organization</option>
        ${organizations.map((item, index) => `<option ${isSelected(item.id)} value=${item.id}>${item.name}</option>`)}
        </select>
        <button id="choose-organization" >Choose</button>
        </div>
    </div>`;
}

document.addEventListener("render", ()=>{
    document.querySelector("#organizations-select").addEventListener('change', actions.handleOrganizationChange)
    document.querySelector("#choose-organization").addEventListener('click', actions.chooseOrgnization)

})