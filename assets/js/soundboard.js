var gJSONfiles = ["data/soundboard1.json", "data/soundboard2.json"];
var gSoundboards = [];

window.onload = function() {
  loadXMLDoc(gJSONfiles[0], 0);
}

// Ajax request function
function loadXMLDoc(jsonFile, fileIndex) {
  var xmlhttp = new XMLHttpRequest();
  var ajaxDone = false;
  
  ++fileIndex == gJSONfiles.length ? ajaxDone = true : ajaxDone = false;
  // Callback function when request comes back from server
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
       if (xmlhttp.status == 200) {
         gSoundboards.push(JSON.parse(xmlhttp.responseText));
         
         // If done processing all JSON, render the soundboard
         ajaxDone ? renderSoundboards() : loadXMLDoc(gJSONfiles[fileIndex], fileIndex);
       }
       else if (xmlhttp.status == 400) {
         alert('There was an error 400');
       }
       else {
         alert('something else other than 200 was returned');
       }
    }
  };
  xmlhttp.open("GET", jsonFile, true);
  xmlhttp.send();
}


function renderSoundboards () {
  
  var sb;
  // Render both soundboards so content can be easily swapped out
  for (var index = 0; index < gSoundboards.length; index++) {
    sb = gSoundboards[index];
    var soundboardGrid = document.createElement("DIV");
    soundboardGrid.id = sb.name;
    
    for (var i = 0; i < sb.images.length; i++) {
      var boxNode = document.createElement("DIV");
      var imgNode = document.createElement("IMG");
      var playNode = document.createElement("IMG");
      var pauseNode = document.createElement("IMG");
      var audioNode = document.createElement("AUDIO");
      
      boxNode.className = "grid-box";
      imgNode.className = "image";
      playNode.className = "play";
      pauseNode.className = "pause";
      
      imgNode.setAttribute("src", sb.images[i]);
      imgNode.setAttribute("alt", "test_image");
      playNode.setAttribute("src", sb.play_icon);
      playNode.setAttribute("alt", "play icon");
      playNode.addEventListener("click", function(){playPause(this)});
      pauseNode.setAttribute("src", sb.pause_icon);
      pauseNode.setAttribute("alt", "pause_icon");
      pauseNode.addEventListener("click", function(){playPause(this)});
      audioNode.setAttribute("src", sb.sounds[i]);
      audioNode.setAttribute("type", "audio/mpeg");
      audioNode.addEventListener("ended", function(){audioEnded(this)});
      
      boxNode.appendChild(imgNode);
      boxNode.appendChild(playNode);
      boxNode.appendChild(pauseNode);
      boxNode.appendChild(audioNode);
      soundboardGrid.appendChild(boxNode);
    }
    document.getElementsByTagName("main")[0].appendChild(soundboardGrid);
  }
  // Disable soundboard2 view for initial site look
  document.querySelector("#soundboard2").style.display = "none";
}

function playPause (e) {
  var playBtn = e.parentNode.firstChild.nextSibling, 
      pauseBtn = e.parentNode.lastChild.previousSibling, 
      audio = e.parentNode.lastChild;
  
  if (playBtn.style.visibility == "visible") {
    pauseBtn.style.visibility = "visible";
    playBtn.style.visibility = "hidden";
    audio.play();
  } else {
    pauseBtn.style.visibility = "hidden";
    playBtn.style.visibility = "visible";
    audio.pause();
  }
}

function audioEnded (e) {
  var playBtn, pauseBtn;
  
  playBtn = e.parentNode.firstChild.nextSibling;
  pauseBtn = e.parentNode.lastChild.previousSibling;
  
  pauseBtn.style.visibility = "hidden";
  playBtn.style.visibility = "visible";
}

function changeTheme() {
  var stylesheet = document.querySelector("head link"),
      value = document.getElementById("theme-select").value;
  
  if (value == "light") {
    stylesheet.setAttribute("href", "assets/css/homepageLIGHT.css");
  } else {
    stylesheet.setAttribute("href", "assets/css/homepageDARK.css");
  }
}

function changeContent() {
  var value = document.getElementById("content-select").value,
      set1 = document.getElementById("soundboard1").style,
      set2 = document.getElementById("soundboard2").style;
      
  if (value == "Set 1") {
    set1.display = "flex";
    set2.display = "none";
  } else {
    set1.display = "none";
    set2.display = "flex";
  }
}

// TODO: Implement Compact Form 
function changeMode() {
  var main = document.getElementsByTagName("main")[0],
      toggler = document.getElementById("mode");
  
  if (toggler.value == "rich") {
    toggler.value = "compact";
    toggler.innerHTML = "Compact";
    
  } else {
    toggler.value = "rich";
    toggler.innerHTML = "Rich";
  }
}

// Attemplating to dynamically generate the soundboard using <template>
// Not working,nextSibling function call is throwing error
// function renderSoundboardTemplate () {
  
//   var sbTemplate = document.getElementById("soundboard-template");
//   // var soundboard = soundboard1;
  
//   for (var i = 0; i < soundboard.images.length; i++) {
//     var gridBox = document.getElementsByClassName("grid-box")[0],
//         imgContent = gridBox.firstChild,
//         playBtn = gridBox.firstChild.nextSibling,
//         pauseBtn = gridBox.playBtn.nextSibling,
//         audioContent = gridBox.lastChild;
    
//     imgContent.className = "image";
//     imgContent.setAttribute("src", soundboard.images[i]);
//     imgContent.setAttribute("alt", "test image");
    
//     playBtn.className = "play";
//     playBtn.setAttribute("src", soundboard.play_icon);
//     playBtn.setAttribute("alt", "play icon");
//     playBtn.setAttribute("onclick", "playPause(this);");
    
//     pauseBtn.className = "pause";
//     pauseBtn.setAttribute("src", soundboard.pause_icon);
//     pauseBtn.setAttribute("alt", "pause_icon");
//     pauseBtn.setAttribute("onclick", "playPause(this);");
    
//     audioContent.className = "audio";
//     audioContent.setAttribute("src", soundboard.sounds[i]);
//     audioContent.setAttribute("type", "audio/mpeg");
//     audioContent.setAttribute("onended", "audioEnded(this);");
      
//     sbTemplate.appendChild(gridBox.cloneNode(true));
//   }
// }
