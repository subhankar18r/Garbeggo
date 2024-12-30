const progressCircle = document.querySelector(".progress-circle");
const progressPercentage = document.querySelector(".progress-percentage");

let progressValue = 0;
const targetValue = 75; // Set the target percentage

const updateProgress = () => {
  if (progressValue <= targetValue) {
    progressCircle.style.background = `conic-gradient(
      #4caf50 ${progressValue * 3.6}deg,
      #e0e0e0 ${progressValue * 3.6}deg
    )`;

    progressPercentage.textContent = "65%";
    progressValue++;
    setTimeout(updateProgress, 20); // Adjust speed
  }
};

updateProgress();