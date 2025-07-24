var speeds = [];
var defaults = [0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];

document.addEventListener("DOMContentLoaded", function(event) {
    init();

    chrome.storage.sync.get("udemyChangerSpeeds", function (data) {
        var loadedSpeeds = data['udemyChangerSpeeds'];
        if(loadedSpeeds === undefined) {
            setDefault();
        } else {
            speeds = loadedSpeeds;
            for(let i = 0; i < loadedSpeeds.length; i++) {
                addSpeedDiv(loadedSpeeds[i]);
            }
        }
    });
});

function init(){
	document.getElementById("addButton").onclick = function() { addSpeed(); }
	document.getElementById("restoreButton").onclick = function() { setDefault(); }	
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


async function addSpeed(){
	var speedInput = document.getElementById("speedInput");
	var speed = speedInput.value;
	if(speed != undefined && speed != null && !isNaN(speed))
	{
		if (speed < 0 || speed > 16) {
			alert("Min speed is 0, max is 16.")
			return
		}
		addSpeedDiv(speed);
		speeds.push(speed);
		speedInput.value = null;
		speeds.sort(function(a, b) {return a - b;});
		localStorage.setItem('udemyChangerSpeeds', JSON.stringify(speeds));
		await chrome.storage.sync.set({udemyChangerSpeeds: speeds});
		await chrome.storage.local.set({needsRefresh: true});
	}
}


function removeSpeed(speed, singleDiv){
	singleDiv.remove();
	var index = speeds.indexOf(speed);
	if (index !== -1) {
	  speeds.splice(index, 1);
	}
	localStorage.setItem('udemyChangerSpeeds', JSON.stringify(speeds));
	chrome.storage.sync.set({udemyChangerSpeeds: speeds});
	chrome.storage.local.set({needsRefresh: true});
}


async function setDefault() {
	localStorage.setItem('udemyChangerSpeeds', JSON.stringify(defaults));
	await chrome.storage.sync.set({udemyChangerSpeeds: defaults});
	await chrome.storage.local.set({needsRefresh: true});
	alert("Default speeds set!\nPage refresh needed!\n(CTRL + R)");
}


document.addEventListener("DOMContentLoaded", function(event) {
	init();
});
