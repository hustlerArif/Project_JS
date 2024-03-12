let title = document.querySelector(".title");
let note = document.querySelector(".note");
let addNoteBtn = document.querySelector(".add-btn");
let arrayOfNotes=[{title:'todo', note:'xyz', id:'123',isPinned:false, isArchived:false }]

addNoteBtn.addEventListener("click", () => {
  if (note.value.trim().length > 0 || title.value.trim().length > 0) {
    arrayOfNotes = [
      ...arrayOfNotes,
      {
        id: Date.now(),
        title: title.value.trim(),
        note: note.value.trim(),
        isPinned: false,
        isArchived: false,
      },
    ];
  }

  console.log(arrayOfNotes);
});
