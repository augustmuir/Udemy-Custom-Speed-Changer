var speeds = [];
var defaults = [0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];

function init(){
	window.addEventListener("beforeunload", function(e){
		speeds.sort(function(a, b) {return a - b;});
		chrome.storage.sync.set({udemyChangerSpeeds: speeds});
		chrome.storage.local.set({needsRefresh: true});
	 	chrome.runtime.reload();
	}, false);
	document.getElementById("addButton").onclick = function() { addSpeed(); }
	document.getElementById("restoreButton").onclick = function() { setDefault(); }
	chrome.storage.sync.get("udemyChangerSpeeds", function (data) {
		var loadedSpeeds = data['udemyChangerSpeeds'];
		if(loadedSpeeds === undefined) {
			setDefault();
		}
		else {
			speeds = loadedSpeeds;
			for(let i = 0; i < loadedSpeeds.length; i++) {
				addSpeedDiv(loadedSpeeds[i]);
			}
		}
	});
}


function addSpeedDiv(speed){
	var singleDiv = document.createElement("div");
	var singleP = document.createElement("p");
	var singleBut = document.createElement("button");

	singleDiv.setAttribute("id", speed.toString());
	singleDiv.setAttribute("style", "display:flex; align-items:center;");
	singleP.innerHTML = speed.toString() + "x";
	singleP.setAttribute("style","margin:10px; min-width:60px;");
	singleBut.innerHTML = "Remove";
	singleBut.onclick = function() { removeSpeed(speed, singleDiv); }
	singleBut.setAttribute("style", "height: 20px; margin-left:10px;");

	singleDiv.appendChild(singleP);
	singleDiv.appendChild(singleBut);
	document.getElementById("speeds").appendChild(singleDiv);
}


function addSpeed(){
	var speedInput = document.getElementById("speedInput");
	var speed = speedInput.value;
	if(speed != undefined && speed != null && speed.toString().length > 0)
	{
		speeds.push(speed);
		addSpeedDiv(speed);
		speedInput.value = null;
		chrome.storage.sync.set({udemyChangerSpeeds: speeds});
		chrome.storage.local.set({needsRefresh: true});
	}
}


function removeSpeed(speed, singleDiv){
	singleDiv.remove();
	var index = speeds.indexOf(speed);
	if (index !== -1) {
	  speeds.splice(index, 1);
	}
	chrome.storage.sync.set({udemyChangerSpeeds: speeds});
	chrome.storage.local.set({needsRefresh: true});
}


function setDefault() {
	chrome.storage.sync.set({udemyChangerSpeeds: defaults});
	chrome.storage.local.set({needsRefresh: true});
	location.reload();
}


document.addEventListener("DOMContentLoaded", function(event) {
	init();
});
