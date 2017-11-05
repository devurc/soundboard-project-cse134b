/* global $ */

var gJSONfiles = ["data/soundboard1.json", "data/soundboard2.json"];
var gSoundboards = [];

$(window).on("load", function(){
  loadXMLDoc(gJSONfiles[0], 0);
});

function loadXMLDoc(jsonFile, fileIndex) {
  var ajaxDone = false;
  ++fileIndex == gJSONfiles.length ? ajaxDone = true : ajaxDone = false;
  
  $.getJSON( jsonFile, function( data ) {
    gSoundboards.push(data);
    ajaxDone ? renderSoundboards() : loadXMLDoc(gJSONfiles[fileIndex], fileIndex);
  }).fail(function(jqXHR) {
    if (jqXHR.status == 404) {
        alert("404 Not Found");
    } else {
        alert("Other non-handled error type");
    }
});
}

function renderSoundboards () {

  var sb;
  for (var index = 0; index < gSoundboards.length; index++) {
    sb = gSoundboards[index];
    
    $( "<div/>", { "id" : sb.name }).appendTo( "main");
    
    for (var i = 0; i < sb.images.length; i++) {
      
      var box = "sb-" + (index+1) + "-box-" + (i+1);
      
      $("<div/>", {
          "class" : "grid-box",
          "id" : box
      }).appendTo("#" + sb.name);
      
      $("<img/>", {
          "class" : "image",
          "src" : sb.images[i],
          "alt" : "image " + (i+1),
      }).appendTo("#" + box);
      
      $("<img/>", {
          "class" : "play",
          "src" : sb.play_icon,
          "alt" : "play",
           click: function() {
              $(this).css("visibility", "hidden");
              $(this).next().css("visibility", "visible");
              $(this).next().next().get(0).play();
           }
      }).appendTo("#" + box);

      $("<img/>", {
          "class" : "pause",
          "src" : sb.pause_icon,
          "alt" : "pause",
          click: function() {
              $(this).css("visibility", "hidden");
              $(this).prev().css("visibility", "visible");
              $(this).next().get(0).pause();
          }
      }).appendTo("#" + box);
      
      $("<audio/>", {
          "class" : "audio-" + (index+1),
          "src" : sb.sounds[i]
      }).appendTo("#" + box);
      
      $(".audio-" + (index+1)).on("ended", function() {
        $(this).prev().css("visibility", "hidden");
        $(this).prev().prev().css("visibility", "visible");
      });
    }
  }
  $("#soundboard2").css("display","none");
}

function changeTheme() {
  var stylesheet = $("head link");
      
  if ($("#theme-select").val() == "dark") {
    stylesheet.attr("href", "assets/css/homepageDARK.css");
  } 
  
  if ($("#theme-select").val() == "light") {
    stylesheet.attr("href", "assets/css/homepageLIGHT.css");
  } 
  
}

function changeContent() {
  
  if ($("#content-select").val() == "Set 1") {
    $("#soundboard1").css("display", "flex");
    $("#soundboard2").css("display", "none");
  }
  if ($("#content-select").val() == "Set 2") {
    $("#soundboard1").css("display", "none");
    $("#soundboard2").css("display", "flex");
  }
}

function changeMode() {
  
  var toggler = $("#mode");
  if (toggler.val() == "rich") {
    toggler.attr("value", "compact");
    toggler.html("Compact");
  }
  if (toggler.val() == "compact") {
    toggler.attr("value", "rich");
    toggler.html("Rich");
  }
}