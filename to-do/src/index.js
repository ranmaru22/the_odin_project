/* jshint browser: true */
/* jshint esversion: 10 */

"use strict";
import TodoList from "./todo-list";
import TodoItem from "./todo-item";
import * as event from "./event-handlers";
import * as dom from "./dom-handlers";

// Reload data or initialize default.
if (window.localStorage.length !== 0) {
    window.listArray = TodoList.loadFromLocalStorage();
} else {
    window.listArray = [new TodoList("Reminders")];
}

window.onload = () => {
    // Attach event listeners
    dom.displayAllLists(window.listArray);
    document.querySelector("#form-add-item")
        .addEventListener("submit", event.addNewTodoItem);
    document.querySelector("#form-add-list")
        .addEventListener("submit", event.addNewList);
    document.querySelectorAll(".tab-list")
        .forEach(x => { x.addEventListener("click", event.selectList); });
};