export default function setupMain(initFunction) {
    const main = document.createElement("main");
    initFunction(main);
    return main;
}