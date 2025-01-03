const OpenEmptyDustBtn = document.querySelector("#open-empty-dustbin-btn")

const unfilledDustContainer = document.querySelector(".unfilled")
const arrowImage = OpenEmptyDustBtn.querySelector("img")

OpenEmptyDustBtn.addEventListener("click", () => {
    unfilledDustContainer.classList.toggle("hide")
    arrowImage.classList.toggle("rotate-90")
})