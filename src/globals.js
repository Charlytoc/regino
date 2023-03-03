
const switchToOrganization = () => {
    token = localStorage.getItem('token');
    _name = localStorage.getItem('name');
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('name', _name);
    window.location.href = "organizations.html"
}
actions.switchToOrganization = switchToOrganization

const logout = () => {
    localStorage.clear();
    window.location.href = "home.html"
}
actions.logout = logout