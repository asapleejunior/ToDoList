////Récupéreko daoly le id anle input sy le bouton
let add = document.querySelector("#addToDo")
let input = document.querySelector("#inputField")
////Récupereko ny id anle partie ambany anasina anle tache rehetra napidirina
const toDoContainer = document.querySelector("#toDoContainer")
console.log(input)
////Ecouteurs d'évènements au click bouton
add.addEventListener("click", addItem)
////Raha manindry entrer ny utilisateur
input.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
        addItem()
    }
})

// Load from local storage on start
document.addEventListener("DOMContentLoaded", loadLS);

function addItem(e, savedText = null, savedCompleted = false) {
    // If savedText is provided, use it; otherwise, take from input
    // If it's a manual add (e is present), prevent empty additions
    const value = savedText || input.value;

    if (!value && !savedText) return; // Basic validation
    // console.log(value)
    ////Créeeko le div parent avec classe item
    const item = document.createElement("div")
    item.classList.add("item")


    ////Créeeko le div fanindroany ao anatin le div item
    const item_content = document.createElement("div")
    item_content.classList.add("content")
    item.append(item_content)

    ////Créeeko le input ao anatinle content
    const input_item = document.createElement("input")
    input_item.classList.add("text")
    input_item.type = "text"
    input_item.setAttribute("readonly", "readonly")
    /////Fonction miteny oe done après double click
    input_item.addEventListener("dblclick", function () {
        input_item.style.textDecoration = (input_item.style.textDecoration === "line-through") ? "none" : "line-through";
        updateLS();
    })
    input_item.value = value ////apetrako anatinle input vaovao le valeur vositona

    if (savedCompleted) {
        input_item.style.textDecoration = "line-through";
    }

    item_content.append(input_item)

    const item_action = document.createElement("div");
    item_action.classList.add("actions");

    ////Créeko le bouton modifier sy supprimer
    const edit_item = document.createElement("button")
    edit_item.classList.add('edit', 'btn', 'btn-success');
    edit_item.type = "button"
    edit_item.innerHTML = '<i class="fa fa-edit"></i> Edit';

    const delete_item = document.createElement("button")
    delete_item.classList.add('delete', 'btn', 'btn-danger');
    delete_item.type = "button"
    delete_item.innerHTML = '<i class="fa fa-trash"></i> Delete';

    item_action.append(edit_item)
    item_action.append(delete_item)
    item.append(item_action)






    ////alefako anatinle id principal amzay le natsofoka rehetra
    toDoContainer.append(item)

    if (!savedText) {
        updateLS();
    }


    ///Fonction fléchée mamafa sy manova
    input.value = ""
    edit_item.addEventListener("click", (e) => {
        if (edit_item.innerText.trim().toLowerCase() == "edit") {
            edit_item.innerHTML = '<i class="fa fa-save"></i> Save';
            input_item.removeAttribute("readonly");
            input_item.focus();
        } else {
            edit_item.innerHTML = '<i class="fa fa-edit"></i> Edit';
            input_item.setAttribute("readonly", "readonly");
            updateLS();
        }
    });

    delete_item.addEventListener("click", (e) => {
        toDoContainer.removeChild(item);
        updateLS();
    });

}

function updateLS() {
    const todosEl = document.querySelectorAll('.item');
    const todos = [];

    todosEl.forEach(todoEl => {
        const textElement = todoEl.querySelector('.text');
        todos.push({
            text: textElement.value,
            completed: textElement.style.textDecoration === 'line-through'
        });
    });

    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadLS() {
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
        todos.forEach(todo => addItem(null, todo.text, todo.completed));
    }
}