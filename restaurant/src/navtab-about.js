export default function createTabAbout(parentNode) {
    const lipsum = "Relax and enjoy a delicious meal with a glass of your pick from of our extensive, carefully curated wine list. We believe that food always tastes better when it's made from scratch, therefore our breads and desserts are baked fresh daily and all our meals are prepared when you order them.";

    const container = document.createElement("div");
    container.classList.add("tabContent");
    const h3 = document.createElement("h3");
    h3.textContent = "Welcome to Ranmaru's Wine Tavern";
    container.appendChild(h3);
    const p = document.createElement("p");
    p.textContent = lipsum;
    container.appendChild(p);

    parentNode.appendChild(container);
}