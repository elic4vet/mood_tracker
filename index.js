import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://mtracker-3c4fb-default-rtdb.europe-west1.firebasedatabase.app/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const moodListInDB = ref(database, "mood-list");
const inputFieldEL = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const moodListEl = document.getElementById("mood-list");
const dateTimeEl = document.getElementById("date-time");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEL.value;

  push(moodListInDB, inputValue);

  clearInputFieldEL();
});

onValue(moodListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearmoodListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItemtoMoodListEl(currentItem);
    }
  } else {
    moodListEl.innerHTML = "No data available";
  }
});

function clearmoodListEl() {
  moodListEl.innerHTML = "";
}

function clearInputFieldEL() {
  inputFieldEL.value = "";
}

function appendItemtoMoodListEl(item) {
  let itemID = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocationOfItemInDB = ref(database, `mood-list/${itemID}`);
    remove(exactLocationOfItemInDB);
  });
  moodListEl.append(newEl);
}
