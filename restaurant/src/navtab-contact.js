import initMap from "./map.js";

export default function createTabContact(parentNode) {
    const container = document.createElement("div");
    container.classList.add("tabContent");
    const h3 = document.createElement("h3");
    h3.textContent = "Contact us";
    container.appendChild(h3);
    const map = initMap();
    container.appendChild(map);
    parentNode.appendChild(container);
}