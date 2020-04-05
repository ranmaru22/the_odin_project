import TodoItem from "./todo-item";
import TodoList from "./todo-list";
import * as dom from "./dom-handlers";

function getCurrentList(listName) {
    return window.listArray.filter(x => x.name === listName)[0];
}

export function addNewTodoItem(e) {
    e.preventDefault();
    const newTodo = new TodoItem(
        e.target.elements["todo-title"].value,
        e.target.elements["todo-due"].value,
        e.target.elements["todo-prio"].value
    );
    getCurrentList(document.querySelector(".active-tab").textContent).push(newTodo);
    document.querySelector(".content-todolist").appendChild(newTodo.getListItemNode());
    e.target.reset();
}

export function markTodoItemAsDone(e) {
    e.target.parentElement.classList.toggle("todoitem-done");
    getCurrentList(document.querySelector(".active-tab").textContent)
        .get(e.target.parentElement.firstElementChild.textContent)
        .checked = true;
}

export function deleteTodoItem(e) {
    if (window.confirm(`Delete ${e.target.parentElement.firstElementChild.textContent}?`)) {
        document.querySelector(".content-todolist").removeChild(e.target.parentElement);
        const currentList = getCurrentList(document.querySelector(".active-tab").textContent);
        currentList.remove(
            currentList.get(e.target.parentElement.firstElementChild.textContent)
        );
    }
}

export function addNewList(e) {
    e.preventDefault();
    const newList = new TodoList(e.target.elements["list-title"].value);
    window.listArray.push(newList);
    const newListNode = newList.getListLinksNode();
    const rootNode = document.querySelector("#list-tabs");
    newListNode.addEventListener("click", selectList);
    rootNode.appendChild(newListNode);
    e.target.reset();
}

export function selectList(e) {
    document.querySelector("#list-tabs").childNodes.forEach(x => {
        x.classList.remove("active-tab");
    });
    e.target.classList.add("active-tab");
    dom.displayTodoList(getCurrentList(e.target.textContent));
}