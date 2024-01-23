window.addEventListener("scroll", function() {
    if (window.scrollY > 50) {
        document.querySelector(".isShowBtn").classList.add("bottom-active");
    } else {
        document.querySelector(".isShowBtn").classList.remove("bottom-active");
    }
});

document.querySelector(".isShowBtn").addEventListener("click", function() {
    toTop();
});

function toTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
