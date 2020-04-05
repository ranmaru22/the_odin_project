import TodoItem from "./todo-item";

// type TodoList = String [TodoItem]
export default function TodoList(name) {
    this.name = name;
    this.items = new Array();
    this.saveToLocalStorage();
}

TodoList.prototype.push = function (item) {
    this.items = [...this.items, item];
    this.saveToLocalStorage();
};

TodoList.prototype.remove = function (item) {
    this.items = this.items.filter(x => x !== item);
    this.saveToLocalStorage();
};

TodoList.prototype.get = function (itemTitle) {
    return this.items.find(x => x.title === itemTitle);
};

TodoList.prototype.getFullListNode = function () {
    const newList = document.createElement("ul");
    newList.classList.add("content-todolist");
    this.items.forEach(x => {
        newList.appendChild(x.getListItemNode());
    });
    return newList;
};

TodoList.prototype.getListLinksNode = function () {
    const ret = document.createElement("p");
    ret.classList.add("tab-list");
    ret.textContent = this.name;
    return ret;
};

TodoList.prototype.toJson = function () {
    const ret = {
        name: this.name,
        items: new Array()
    };
    this.items.forEach(x => {
        ret.items.push(x.toJson());
    });
    return JSON.stringify(ret);
};

TodoList.fromJson = function (json) {
    const data = JSON.parse(json);
    const instance = new TodoList(data.name);
    data.items.forEach(x => {
        instance.push(new TodoItem(x.title, x.date, x.prio, x.done, true));
    });
    return instance;
};

TodoList.prototype.saveToLocalStorage = function () {
    const jsonData = this.toJson();
    window.localStorage.setItem(this.name, jsonData);
};

TodoList.loadFromLocalStorage = function (key) {
    if (key) {
        const data = window.localStorage.getItem(key);
        return [TodoList.fromJson(data)];
    }
    const data = new Array();
    Object.keys(window.localStorage).forEach(x => {
        data.push(TodoList.fromJson(window.localStorage.getItem(x)));
    });
    return data;
};