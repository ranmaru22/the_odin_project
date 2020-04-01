import setupNav from "./create-nav.js";

export default function setupHeader(mainNode) {
    const header = document.createElement("header");

    const pTitle = document.createElement("h2");
    pTitle.classList.add("title");
    pTitle.textContent = "Ranmaru's Wine Tavern";
    header.appendChild(pTitle);

    const nav = setupNav(mainNode);
    header.appendChild(nav);

    return header;
}