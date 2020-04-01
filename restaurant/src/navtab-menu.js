export default function createTabMenu(parentNode) {
    const container = document.createElement("div");
    container.classList.add("tabContent");
    const h3 = document.createElement("h3");
    h3.textContent = "Some of our wines";
    container.appendChild(h3);

    const list = document.createElement('ul');
    [
        "Wine1",
        "Wine2",
        "Wine3",
        "Wine4",
        "Wine5"
    ].forEach(x => {
        const listItem = document.createElement("li");
        listItem.textContent = x;
        list.appendChild(listItem);
    });

    container.appendChild(list);
    parentNode.appendChild(container);
}