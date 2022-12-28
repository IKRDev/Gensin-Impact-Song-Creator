const NumNotes = {
	"1": "Do",
	"2": "Re",
	"3": "Mi",
	"4": "Fa",
	"5": "So",
	"6": "La",
	"7": "Ti"
}

const NumTones = {
	"1": "Treble",
	"2": "Alto",
	"3": "Bass"
}


let notes = 0;
let bpm = 60
let waitDur = 1/bpm
let container = document.getElementById("noteContainer")

function updateStats() {
	document.getElementById("notesCounter").innerHTML = "Notes: "+notes
	document.getElementById("lengthCounter").innerHTML = "Duration: "+(waitDur * notes)+" Seconds"
}

function makeElm(elm) {
	return document.createElement(elm);
}

function remove(itmid) {
	document.getElementById(itmid).remove()
}

function addNote() {
	notes++
	updateStats()
	//console.log(notes);

	var noteCont = makeElm("div");
	noteCont.id = "note"+notes+"Cont"
	noteCont.className = "note-container"

	var noteInputCont = makeElm("div")
	noteInputCont.id = "note"+notes+"InputCont"
	noteInputCont.className = "note-input-container"
	
	// notenum-note-tone
	var i_note = 0
	var i_tone = 0
	for(var tne=0; tne<3; tne++) {
		i_tone++
		i_note = 0
		//console.log(i_note)
		for(var nte=0; nte<7; nte++) {
			i_note++
			//console.log("note" + notes + "-" + i_note + "-" + i_tone)
			//console.log(NumNotes[i_note.toString()])
			//console.log(NumTones[i_tone.toString()])
			//console.log("-----")
			var tempCheck = makeElm("input")
			tempCheck.setAttribute("type", "checkbox")
			tempCheck.setAttribute("title", NumTones[i_tone.toString()]+" "+NumNotes[i_note.toString()])
			tempCheck.id = "note"+notes+"-"+NumTones[i_tone.toString()]+NumNotes[i_note.toString()]
			tempCheck.className = "note-check-btn"
			noteInputCont.appendChild(tempCheck)
		}
		noteInputCont.appendChild(makeElm("br"))
	}

	noteCont.appendChild(noteInputCont)

	//var tempBr = makeElm("br")
	//noteCont.appendChild(tempBr)

	var delBtn = makeElm("button");
	delBtn.innerHTML = "Delete Note"
	delBtn.className = "delete-button"
	delBtn.id = "note"+notes+"DeleteButton"
	delBtn.addEventListener('click', function() {
		notes -= 1
		updateStats()
		remove(noteCont.id)
	})
	
	//console.log(noteCont.id)

	noteCont.appendChild(delBtn)

	

	//var tempBr = makeElm("br")
	//container.appendChild(tempBr)
	//var tempLine = makeElm("hr")
	//noteCont.appendChild(tempLine)
	//var tempBr = makeElm("br")
	//-container.appendChild(tempBr)
	
	container.appendChild(noteCont)
	
}

function newSong() {
	if(window.confirm("Are you sure you want to create a new song? \n (This will delete the current song!)")) {
		container.innerHTML = ''
		notes = 0
		updateStats()
	}
}

function labelBPM() {
	bpm = document.getElementById("songBPM").value
	document.getElementById("bpmdisplay").innerHTML = bpm
	waitDur = 1/bpm
	updateStats()
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function readNote(notenum) {
	var txt = ""
	//console.log(document.getElementById("note"+notenum+"InputCont").children)
	for(var i=0; i<21; i++) {
		if(document.getElementById("note"+notenum+"InputCont").children[i].checked) {
			txt = txt+1
		}
		else {
			txt = txt+0
		}
	}
	return txt
}

function readNotes() {
	var txt = document.getElementById("songName").value + "\n" + bpm + "\n"
	for(var i=1; i<notes+1; i++) {
		txt = txt + readNote(i) + "\n"
	}
	console.log(txt)
	download(document.getElementById("songName").value, txt)
}

function changename() {
	var newname = window.prompt("New Name:")
	while(newname == "") {
		alert("Name Invalid!")
		newname = window.prompt("New Name:")
	}
	document.getElementById("songName").innerHTML = newname
}