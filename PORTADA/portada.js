"use strict";

const light = document.querySelector(".light");

document.addEventListener("mousemove", (evt) => {
  light.style.top = `${evt.pageY - 100}px`;
  light.style.left = `${evt.pageX - 100}px`;
});
