import Sortable from 'sortablejs';

export function displayTodoList(list) {
    const rootNode = document.querySelector("#tabcontent");
    const listNode = list.getFullListNode();
    rootNode.childNodes.forEach(x => {
        rootNode.removeChild(x);
    });
    rootNode.dataset.listName = list.name;
    rootNode.appendChild(listNode);
    const sortableList = new Sortable(listNode);
}

export function displayAllLists(listArray) {
    const rootNode = document.querySelector("#list-tabs");
    listArray.forEach(elem => {
        rootNode.appendChild(elem.getListLinksNode());
    });
    rootNode.firstElementChild.classList.add("active-tab");
    displayTodoList(listArray[0]);
    const sortableList = new Sortable(rootNode);
}