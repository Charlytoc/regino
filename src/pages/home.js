

// Must be called html
let html = () => {
    const [todos, setTodos] = useState(['make the bed', 'eat lunch']);
    const [newTodo, setNewTodo] = useState("");

    actions.addTodo = (e) => setTodos([ ...todos, newTodo]);
    actions.handleInputChange = (e) => setNewTodo(e.target.value);

    return `<div class="home">
        Hello world from home <a href="login.html"> take me to login</a>
        
        <h3>Here are some todos</h3>
        <div>
            ${todos.map(t => `<li>${t}</li>`)}
        </div>
        <input type="text" value="${newTodo}" onchange="actions.handleInputChange(event)" />
        <button onclick="actions.addTodo(event)">Add new prompt</button>
    </div>`;
}

window.html