import { formatDistanceToNow } from 'date-fns';
import * as event from "./event-handlers";

// type TodoItem = String String Int
export default function TodoItem(title, date, priority, done = false, noDateParse = false) {
    this.title = title;
    this.date = noDateParse
        ? date
        : formatDistanceToNow(new Date(...date.split("-")), { addSuffix: true });
    this.priority = priority;
    this.checked = done;
}

TodoItem.prototype.getListItemNode = function () {
    const ret = document.createElement("li");
    ret.classList.add("content-todoitem");
    if (this.checked) {
        ret.classList.add("todoitem-done");
    }
    ret.classList.add(`prio-${this.priority}`);
    const title = document.createElement("p");
    title.classList.add("content-todotitle");
    title.textContent = this.title;
    ret.appendChild(title);
    const buttonCheck = document.createElement("span");
    buttonCheck.textContent = "✔";
    buttonCheck.classList.add("content-button");
    buttonCheck.addEventListener("click", event.markTodoItemAsDone);
    const buttonDelete = document.createElement("span");
    buttonDelete.textContent = "✘";
    buttonDelete.classList.add("content-button");
    buttonDelete.addEventListener("click", event.deleteTodoItem);
    ret.appendChild(buttonDelete);
    ret.appendChild(buttonCheck);
    const date = document.createElement("p");
    date.classList.add("content-tododue");
    date.textContent = this.date;
    ret.appendChild(date);
    return ret;
};

TodoItem.prototype.toJson = function () {
    return {
        title: this.title,
        date: this.date,
        prio: this.priority,
        done: this.done
    };
};