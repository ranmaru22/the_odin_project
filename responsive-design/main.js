window.onload = function main() {
    const logoImg = document.querySelector(".logo");
    const stickyNav = document.querySelector(".sticky-nav");

    window.onscroll = () => {
        if (stickyNav.getBoundingClientRect().y === 0) {
            logoImg.classList.remove("hidden");
        } else {
            logoImg.classList.add("hidden");
        }
    }
}