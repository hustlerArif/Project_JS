import { renderNotes } from "./app.js";

let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addNoteBtn = document.querySelector(".add-btn");
let notesDisplay = document.querySelector(".notes-display");
let showPinnedNotes = document.querySelector(".pinned-notes-container");
let showOtherNotes = document.querySelector(".notes-container");
let pinTitle = document.querySelector(".pin-title");
let otherTitle = document.querySelector(".other-title");

let arrayOfNotes =
  JSON.parse(localStorage.getItem("notes")) ||
  [
    // {
    //   title: "sf",
    //   note: "sfdss",
    //   id: "123",
    //   isArchived: false,
    //   isPinned: false,
    // },
  ];

if (arrayOfNotes.length > 0) {
  pinTitle.classList.toggle("d-none");
  otherTitle.classList.toggle("d-none");
}

notesDisplay.addEventListener("click", (event) => {
  // console.log(event.target.dataset.id);
  let type = event.target.dataset.type;
  let noteId = event.target.dataset.id;

  //  console.log({type,noteId})

  switch (type) {
    case "del":
      arrayOfNotes = arrayOfNotes.filter(({ id }) => id.toString() !== noteId);
      showOtherNotes.innerHTML = renderNotes(
        arrayOfNotes.filter(
          ({ isPinned, isArchived }) => !isPinned && !isArchived
        )
      ); // give unpinned & unarchived note id array
      showPinnedNotes.innerHTML = renderNotes(
        arrayOfNotes.filter(({ isPinned }) => isPinned)
      ); // give that pinned note id which are true
      localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
      break;

    case "pinned":
      arrayOfNotes = arrayOfNotes.map((note) =>
        note.id.toString() === noteId
          ? { ...note, isPinned: !note.isPinned }
          : note
      );
      // console.log(arrayOfNotes)
      showOtherNotes.innerHTML = renderNotes(
        arrayOfNotes.filter(
          ({ isPinned, isArchived }) => !isPinned && !isArchived
        )
      );
      showPinnedNotes.innerHTML = renderNotes(
        arrayOfNotes.filter(({ isPinned }) => isPinned)
      );
      localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
      break;

    case "archive":
      arrayOfNotes = arrayOfNotes.map((note) =>
        note.id.toString() === noteId
          ? { ...note, isArchived: !note.isArchived }
          : note
      );
      showOtherNotes.innerHTML = renderNotes(
        arrayOfNotes.filter(
          ({ isArchived, isPinned }) => !isArchived && !isPinned
        )
      );
      localStorage.setItem("notes", JSON.stringify(arrayOfNotes));
      break;
  }
});


addNoteBtn.addEventListener("click", () => {
  // console.log(title.value)
  // console.log(note.value)
  if (note.value.trim().length > 0 || title.value.trim().length > 0) {
    arrayOfNotes = [
      ...arrayOfNotes, // not array.push, as just need original array to show/not change the original value
      {
        title: title.value.trim(),
        note: note.value.trim(),
        id: Date.now(),
        isArchived: false,
        isPinned: false,
      },
    ];

    note.value = title.value = "";
    showOtherNotes.innerHTML = renderNotes(
      arrayOfNotes.filter(
        ({ isPinned, isArchived }) => !isPinned && !isArchived
      )
    );
    localStorage.setItem("notes", JSON.stringify(arrayOfNotes)); // array into string
  }
  //   console.log(arrayOfNotes);
});


showOtherNotes.innerHTML = renderNotes(
  arrayOfNotes.filter(({ isPinned, isArchived }) => !isPinned && !isArchived)
); // once refresh renderNotes called
showPinnedNotes.innerHTML = renderNotes(
  arrayOfNotes.filter(({ isPinned }) => isPinned)
);
