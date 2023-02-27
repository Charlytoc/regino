const API_URL = "https://8000-charlytoc-rigobot-1y705aqt1lg.ws-us88.gitpod.io"

const switchToOrganization = () => {
    token = localStorage.getItem('token');
    _name = localStorage.getItem('name');
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('name', _name);
    window.location.href = "organizations.html"
}
actions.switchToOrganization = switchToOrganization
// document.querySelector('#switch-organization').addEventListener('click', switchToOrganization)