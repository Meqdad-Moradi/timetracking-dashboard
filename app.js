// select elements
const controls = [...document.querySelectorAll(".controls")];
const headers = [...document.querySelectorAll(".card-body h1")];
const footers = [...document.querySelectorAll(".card-body p")];

// get data
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    // controls btn
    controls.forEach((control) =>
      control.addEventListener("click", (e) => {
        const currentControl = e.currentTarget;
        const type = e.target.dataset.type;
        controls.forEach((control) => control.classList.remove("active"));
        currentControl.classList.add("active");

        if (type === "daily") {
          const type = "daily";
          timeFrame(data, type);
        } else if (type === "weekly") {
          const type = "weekly";
          timeFrame(data, type);
        } else {
          const type = "monthly";
          timeFrame(data, type);
        }
      })
    );
  });

// report function
function timeFrame(data, type) {
  headers.forEach((header, i) => {
    data.forEach((item, j) => {
      if (i === j) {
        header.textContent = item.timeframes[type].current + "hrs";
      }
    });
  });

  // set data item to footer
  footers.forEach((footer, i) => {
    data.forEach((item, j) => {
      if (i === j) {
        footer.textContent = `Previous - ${item.timeframes[type].previous}hrs`;
      }
    });
  });
}
