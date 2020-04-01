import setupHeader from "./create-header.js";
import setupMain from "./create-main.js";
import setupFooter from "./create-footer.js";
import addEventHandlers from "./event-handlers.js";
import createTabAbout from "./navtab-about.js";

export default function setup() {
    const mainContainer = document.querySelector("#content");

    const header = setupHeader();
    mainContainer.appendChild(header);
    const main = setupMain(createTabAbout);
    mainContainer.appendChild(main);
    const footer = setupFooter();
    mainContainer.appendChild(footer);

    const [tabAbout, tabMenu, tabContact] = document.querySelector("#navigation").childNodes;
    addEventHandlers(tabAbout, tabMenu, tabContact, main);
}