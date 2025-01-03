import { onValue, ref } from "firebase/database";
import { RTDB } from "./firebase.js";

const OpenEmptyDustBtn = document.querySelector("#open-empty-dustbin-btn");

const unfilledDustContainer = document.querySelector(".unfilled");
const arrowImage = OpenEmptyDustBtn.querySelector("img");

OpenEmptyDustBtn.addEventListener("click", () => {
  unfilledDustContainer.classList.toggle("hide");
  arrowImage.classList.toggle("rotate-90");
});

const starCountRef = ref(RTDB, "Dustbins");
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
