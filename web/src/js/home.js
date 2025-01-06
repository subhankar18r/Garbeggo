import { child, get, ref } from "firebase/database";
import { RTDB } from "./firebase.js";
import Map from "../components/map.js";

const OpenEmptyDustBtn = document.querySelector("#open-empty-dustbin-btn");
const arrowImage = OpenEmptyDustBtn.querySelector("img");
const filledDustContainer = document.querySelector(".filled");
const unfilledDustContainer = document.querySelector(".unfilled");
const mapContainer = document.querySelector(".map");

mapContainer.innerHTML = Map();

OpenEmptyDustBtn.addEventListener("click", () => {
  unfilledDustContainer.classList.toggle("hide");
  arrowImage.classList.toggle("rotate-90");
});

const dbRef = ref(RTDB);
get(child(dbRef, "dustbins"))
  .then((snapshot) => {
    if (!snapshot.exists()) {
      filledDustContainer.innerHTML = "No data available";
      console.log("No data available");
    }
    const data = snapshot.val();
    let hasEmpty = false;
    for (const dustbinId in data) {
      if (data.hasOwnProperty(dustbinId)) {
        const dustbin = data[dustbinId];
        if (dustbin.status == "full") {
          filledDustContainer.innerHTML += `
        <li>${dustbinId}</li>
        `;
          const item = document.querySelector(`#${dustbinId}`);
          if (item) {
            item.style.fill = "red";
          }
        } else if (dustbin.status == "empty") {
          hasEmpty = true;
          unfilledDustContainer.innerHTML += `
        <li>${dustbinId}</li>
        `;
        }
      }
    }
    if (!hasEmpty) {
      unfilledDustContainer.innerHTML = "No empty dustbins available";
    }
  })
  .catch((error) => {
    console.log(error);
  });
