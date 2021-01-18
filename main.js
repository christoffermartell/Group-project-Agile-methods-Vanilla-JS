"use strict";

let bodyTag = document.getElementsByTagName("body")[0];

// Create header element
let createHeader = document.createElement("header");
createHeader.setAttribute("id", "head");
bodyTag.appendChild(createHeader);

// Create aside element
let createAside = document.createElement("aside");
createAside.setAttribute("id", "noteBooks");
bodyTag.appendChild(createAside);

// Create main element
let createMain = document.createElement("main");
bodyTag.appendChild(createMain);

// Create form element
let createForm = document.createElement("form");
createForm.setAttribute("id", "inputForm");
document.getElementsByTagName("main")[0].appendChild(createForm);

// Create textarea and a line break inside of form
let createTextarea = document.createElement("textarea");
createTextarea.setAttribute("id", "inputArea");
createTextarea.setAttribute("rows", "7");
createForm.appendChild(createTextarea);

let createBreak = document.createElement("br");
createForm.appendChild(createBreak);

// Create Add text button
let createTextButton = document.createElement("button");
createTextButton.setAttribute("id", "inputText");
createTextButton.textContent = "Add text";
createForm.appendChild(createTextButton);

// Create Add list button
let createListButton = document.createElement("button");
createListButton.setAttribute("id", "inputList");
createListButton.textContent = "Add list";
createForm.appendChild(createListButton);

// Create writeNotesHere div
let createMainDiv = document.createElement("div");
createMainDiv.setAttribute("id", "writeNotesHere");
bodyTag.appendChild(createMainDiv);

document.getElementById("head").innerHTML = "Ease Your Mind";
document.querySelector("header").style.cssText = "color: black; font-size: 125px; font-family: courier;";
document.querySelector("#noteBooks").style.cssText = "color: black; font-size: 16px; font-family: courier;";

let inputForm = document.getElementById("inputForm");
let inputArea = document.getElementById("inputArea");
let inputSubmit = document.getElementById("inputText");
let listSubmit = document.getElementById("inputList");
let toggleButton = document.getElementById("toggleList");
let main = document.getElementById("writeNotesHere");

// Ternary because it looks better
let inputArray = window.localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
let noteBookArray = window.localStorage.getItem("savedNoteBooks") ? JSON.parse(localStorage.getItem("savedNoteBooks")) : [];
let listArray = window.localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
let listBookArray = window.localStorage.getItem("savedListBooks") ? JSON.parse(localStorage.getItem("savedListBooks")) : [];
let textAreaArrayNotes = window.localStorage.getItem("saveEditedNotes") ? JSON.parse(localStorage.getItem("saveEditedNotes")) : [];
let textAreaArrayLists = window.localStorage.getItem("saveEditedLists") ? JSON.parse(localStorage.getItem("saveEditedLists")) : [];

// Makes the array elements into JSON strings which is required to store them into localstorage
localStorage.setItem("notes", JSON.stringify(inputArray));
localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
localStorage.setItem("list", JSON.stringify(listArray));
localStorage.setItem("savedListBooks", JSON.stringify(listBookArray));
localStorage.setItem("saveEditedNotes", JSON.stringify(textAreaArrayNotes));
localStorage.setItem("saveEditedLists", JSON.stringify(textAreaArrayLists));

// The arrays are changed into a normal javascript string before we call them
// into the functions that show them on the page on refresh / opening of page.
let savedNotesFromMain = JSON.parse(localStorage.getItem("notes"));
let savedListFromMain = JSON.parse(localStorage.getItem("list"));
let notesIntoNoteBooks = JSON.parse(localStorage.getItem("savedNoteBooks"));
let listIntoNoteBooks = JSON.parse(localStorage.getItem("savedListBooks"));
let editedNotesIntoTextarea = JSON.parse(localStorage.getItem("saveEditedNotes"));
let editedListsIntoTextarea = JSON.parse(localStorage.getItem("saveEditedLists"));

// Adds the notes from textarea, also removes the edited storage and arrays if notes was edited
inputSubmit.addEventListener("click", function saveAsText(e) {
	normalText();
	for (let i = 0; i < textAreaArrayNotes.length; i++) {
		textAreaArrayNotes.splice(i, 1);
		i--;
	}
	localStorage.removeItem("saveEditedNotes");
});

// Adds the lists from textarea, also removes the edited storage and arrays if lists was edited
listSubmit.addEventListener("click", function saveASList(e) {
	saveList();
	for (let i = 0; i < textAreaArrayLists.length; i++) {
		textAreaArrayLists.splice(i, 1);
		i--;
	}
	localStorage.removeItem("saveEditedLists");
});

// saves the input as a normal text but also saves it in saveList() localstorage function
function normalText() {
	if (inputArea.value === "") {
		alert("Can not add an empty note.");
	} else {
		storeInMain();
		let userText = inputArea.value;
		let newParagraph = document.createElement("p");
		let textNode = document.createTextNode(userText);
		newParagraph.appendChild(textNode);
		main.appendChild(newParagraph);
	}

	inputArea.value = "";
}

// saves the input as a list but also stores it in localStorage when it reaches storeListInMain()
function saveList() {
	if (inputArea.value === "") {
		alert("Can not add an empty list.");
	} else {
		if (document.getElementById("ulElement") === null) {
			let newUL = document.createElement("ul");
			newUL.setAttribute("id", "ulElement");
			main.appendChild(newUL);
		}

		let userText = inputArea.value.split("\n");

		for (let i = 0; i < userText.length; i++) {
			if (userText[i] !== "") {
				let listItem = document.createElement("li");
				let textNode = document.createTextNode(userText[i]);
				listItem.appendChild(textNode);
				document.getElementById("ulElement").appendChild(listItem);
			}
		}

		storeListInMain();
	}

	inputArea.value = "";
}

// Function to save plain text, normal notes
function storeInMain() {
	inputArray.push(inputArea.value);
	localStorage.setItem("notes", JSON.stringify(inputArray));
}

// Function to store the list elements.
function storeListInMain() {
	listArray.push(inputArea.value);
	localStorage.setItem("list", JSON.stringify(listArray));
}

// Fills the noteBookArray with the elements from inputArray but also empties inputArray
// when a note is saved into noteBooks the "notes" in main will be emptied
function saveNoteInNoteBooks() {
	for (let i = 0; i < inputArray.length; i++) {
		noteBookArray.push(inputArray[i]);
		inputArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("savedNoteBooks", JSON.stringify(noteBookArray));
	localStorage.removeItem("notes");
}

// Fills the listBookArray with the elements from listArray but also empties listArray
// when a list is saved into noteBooks the "list" in main will be emptied
function saveListInNoteBooks() {
	for (let i = 0; i < listArray.length; i++) {
		listBookArray.push(listArray[i]);
		listArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("savedListBooks", JSON.stringify(listBookArray));
	localStorage.removeItem("list");
}

// Creates Save note button
let saveNote = document.createElement("button");
saveNote.textContent = "Save note";
inputForm.appendChild(saveNote);

let folder = document.createElement("div");
folder.setAttribute("id", "folderForNotes");

let aside = document.getElementById("noteBooks");
aside.appendChild(folder);

// Save text from main to noteBooks
saveNote.addEventListener("click", function (e) {
	let firstPText = main.querySelector("p");

	if (main.innerHTML == "") {
		alert("Please enter something in the note before saving.");
	} else {
		if (firstPText.textContent !== "") {
			saveNoteInNoteBooks();
			main.innerHTML = "";
		}
	}
});

// Creates Save list button
let saveNoteList = document.createElement("button");
saveNoteList.textContent = "Save list";
inputForm.appendChild(saveNoteList);

// Save list from main to noteBooks
saveNoteList.addEventListener("click", function (e) {
	let pList = document.getElementById("ulElement");

	if (main.innerHTML == "") {
		alert("Please create a list before saving your lists.");
	} else {
		if (pList.textContent !== "") {
			let newP2 = document.createElement("li");
			newP2.textContent = pList.textContent;
			let arrayList = [];
			arrayList.push(pList);
			arrayList.forEach(function () {
				folder.appendChild(newP2);
			});
			folder.appendChild(newP2);
			main.innerHTML = "";

			saveListInNoteBooks();
		}
	}
});

// The saved elements in the savedListFromMain gets restored to a UL on refresh
function savedList() {
	let todoList = document.createElement("ul");
	todoList.setAttribute("id", "ulElement");

	let listString = savedListFromMain.join("\n");
	let splitList = listString.split("\n");

	for (let i = 0; i < splitList.length; i++) {
		if (splitList[i] !== "") {
			let child = document.createElement("li");
			child.appendChild(document.createTextNode(splitList[i]));
			todoList.appendChild(child);
			document.getElementById("writeNotesHere").appendChild(todoList);
		}
	}
}

// The saved elements in savedNotesFromMain is again output as normal text in main on refresh.
function savedNote() {
	for (let i = 0; i < savedNotesFromMain.length; i++) {
		let toDoNote = document.createElement("p");
		toDoNote.appendChild(document.createTextNode(savedNotesFromMain[i]));
		document.getElementById("writeNotesHere").appendChild(toDoNote);
	}
}

// The saved elements in savedNotesFromMain is again output as normal text in noteBooks on refresh.
function saveNoteToNoteBooks() {
	for (let i = 0; i < notesIntoNoteBooks.length; i++) {
		let noteSavedNote = document.createElement("p");
		noteSavedNote.appendChild(document.createTextNode(notesIntoNoteBooks[i]));
		document.getElementById("noteBooks").appendChild(noteSavedNote);
	}
}

// The saved elements in listIntoNoteBooks is output as a <ul> on page refresh in noteBooks
function saveListToNoteBooks() {
	let uList = document.createElement("ul");

	let listString = listIntoNoteBooks.join("\n");
	let splitList = listString.split("\n");

	for (let i = 0; i < splitList.length; i++) {
		if (splitList[i] !== "") {
			let listItem = document.createElement("li");
			let textNode = document.createTextNode(splitList[i]);
			listItem.appendChild(textNode);
			uList.appendChild(listItem);
			document.getElementById("noteBooks").appendChild(listItem);
		}
	}
}

// Creates Delete notes and Delete lists buttons
let eraseNotesInMain = document.createElement("button");
let eraseListInMain = document.createElement("button");
eraseNotesInMain.textContent = "Delete notes";
eraseListInMain.textContent = "Delete lists";
eraseNotesInMain.setAttribute("id", "eraseNotesInMain");
eraseListInMain.setAttribute("id", "eraseListInMain");
inputForm.appendChild(eraseNotesInMain);
inputForm.appendChild(eraseListInMain);

// Erase normal text from both memory and frontend
eraseNotesInMain.addEventListener("click", function () {
	for (let i = 0; i < inputArray.length; i++) {
		inputArray.splice(i, 1);
		i--;
	}
	localStorage.removeItem("notes");
});

// Erase unordered lists from both memory and frontend
eraseListInMain.addEventListener("click", function () {
	for (let i = 0; i < listArray.length; i++) {
		listArray.splice(i, 1);
		i--;
	}
	localStorage.removeItem("list");
});

// Creates a review <h2> above main
let reviewText = document.createElement("h2");
reviewText.setAttribute("id", "review");
document.getElementById("inputForm").appendChild(reviewText);
document.getElementById("review").innerHTML = "Review";

// Creates button to edit notes
let editNotes = document.createElement("button");
editNotes.setAttribute("id", "editNotes");
editNotes.innerHTML = "Edit Notes";
inputForm.appendChild(editNotes);

// Every saved element in the noteBookArray is thrown into the textarea while also erasing the memory of notes in "noteBooks"
editNotes.addEventListener("click", function (e) {
	noteBookArray.forEach((element) => {
		inputArea.value += element + "\r";
	});
	savedEditedNotesTextArea();
});

// Creates Clear All button
let clearAll = document.createElement("button");
clearAll.setAttribute("id", "clearAll");
clearAll.textContent = "Clear All";
inputForm.appendChild(clearAll);

// Eventlistener that calls on both the functions that erase lists and notes in frontend and localstorage
clearAll.addEventListener("click", function () {
	deleteSavedNote();
	deleteSavedList();
	location.reload();
});

// Creates button to edit lists
let editLists = document.createElement("button");
editLists.setAttribute("id", "editLists");
editLists.textContent = "Edit Lists";
inputForm.appendChild(editLists);

// Every saved element in the listBookArray is thrown into the textarea while also erasing the memory of lists in "noteBooks"
editLists.addEventListener("click", function (e) {
	listBookArray.forEach((element) => {
		inputArea.value += element + "\r";
	});
	saveEditedListsTextArea();
	localStorage.removeItem("savedListBooks");
});

// Deletes notes in the aside, both frontend and localstorage
function deleteSavedNote() {
	for (let i = 0; i < notesIntoNoteBooks.length; i++) {
		notesIntoNoteBooks.splice(i, 1);
		i--;
	}
	localStorage.removeItem("savedNoteBooks");
}

// Deletes lists in aside, both frontend and localstorage
function deleteSavedList() {
	for (let i = 0; i < listIntoNoteBooks.length; i++) {
		listIntoNoteBooks.splice(i, 1);
		i--;
	}
	localStorage.removeItem("savedListBooks");
}

// Creates Saved h2
let savedInputs = document.createElement("h2");
savedInputs.setAttribute("id", "saveInputs");
savedInputs.textContent = "Saved";
inputForm.appendChild(savedInputs);

// Removes notes in NoteBooks (aside) from both frontend and localstorage. puts it into textareas array and storage
function savedEditedNotesTextArea() {
	for (let i = 0; i < noteBookArray.length; i++) {
		textAreaArrayNotes.push(noteBookArray[i]);
		noteBookArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("saveEditedNotes", JSON.stringify(textAreaArrayNotes));
	localStorage.removeItem("savedNoteBooks");
}

// Shows the notes to be edited on page refresh
function saveEditedNoteToTextAreaFrontend() {
	for (let i = 0; i < editedNotesIntoTextarea.length; i++) {
		document.getElementById("inputArea").appendChild(document.createTextNode(editedNotesIntoTextarea));
	}
}

// Empties both the array and localstorage in "noteBooks" and puts the list values into a textarea storage for lists
function saveEditedListsTextArea() {
	for (let i = 0; i < listBookArray.length; i++) {
		textAreaArrayLists.push(listBookArray[i]);
		listBookArray.splice(i, 1);
		i--;
	}
	localStorage.setItem("saveEditedLists", JSON.stringify(textAreaArrayLists));
	localStorage.removeItem("savedListBooks");
}

// Shows the lists to be edited in page refresh in Textarea
function saveEditedListsToTextareaFrontEnd() {
	for (let i = 0; i < editedListsIntoTextarea.length; i++) {
		document.getElementById("inputArea").appendChild(document.createTextNode(editedListsIntoTextarea));
	}
}

window.addEventListener("DOMContentLoaded", (event) => {
	savedNote();
	savedList();
	saveNoteToNoteBooks();
	saveListToNoteBooks();
	saveEditedNoteToTextAreaFrontend();
	saveEditedListsToTextareaFrontEnd();
});