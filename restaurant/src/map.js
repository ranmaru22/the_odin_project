export default function initMap() {
    const mapContainer = document.createElement("div");
    mapContainer.classList.add("map");
    const iframe = document.createElement("iframe");
    const url = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.855824203696!2d174.77680595079437!3d-41.311999979169315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzQzLjIiUyAxNzTCsDQ2JzQ0LjQiRQ!5e0!3m2!1sen!2sde!4v1585748486610!5m2!1sen!2sde";
    iframe.setAttribute("src", url);
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("tabindex", 0);
    mapContainer.appendChild(iframe);

    return mapContainer;
}