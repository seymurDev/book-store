const hamburgerMenu = document.querySelector("#hamburgerMenu");
const responsiveNav = document.querySelector("#responsiveNav");
const close = document.querySelector(".close");


hamburgerMenu.addEventListener("click", function () {
  responsiveNav.style.display = "block";
  setTimeout(function () {
    responsiveNav.style.right = "0";
  }, 10);
});

close.addEventListener("click", function () {
  responsiveNav.style.right = "100%";
  setTimeout(function () {
    responsiveNav.style.display = "none";
    responsiveNav.style.right = "-100%";
  }, 400);
});

