import createTabAbout from "./navtab-about.js";
import createTabMenu from "./navtab-menu.js";
import createTabContact from "./navtab-contact.js";

function renderContent(mainNode, renderFunction) {
    mainNode.childNodes.forEach(node => mainNode.removeChild(node));
    renderFunction(mainNode);
}

export default function addEventHandlers(tabAbout, tabMenu, tabContact, mainNode) {
    tabAbout.addEventListener("click", _ => renderContent(mainNode, createTabAbout));
    tabMenu.addEventListener("click", _ => renderContent(mainNode, createTabMenu));
    tabContact.addEventListener("click", _ => renderContent(mainNode, createTabContact));
}