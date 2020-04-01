export default function setupNav(mainNode) {
    const tabs = document.createElement("nav");
    tabs.setAttribute("id", "navigation");
    tabs.classList.add("navtabs");

    ["About", "Menu", "Contact"].forEach((name, i) => {
        const newTab = document.createElement("div");
        newTab.setAttribute("id", `tab${i + 1}`);
        newTab.classList.add("tabButton");
        const link = document.createElement("a");
        link.setAttribute("href", "#");
        link.textContent = name;
        newTab.appendChild(link);
        tabs.appendChild(newTab);
    });

    return tabs;
}