/* global $ */

var gJSONfiles = ["data/soundboard1.json", "data/soundboard2.json"];
var gSoundboards = [];

$(window).on("load", function() {
  $.when(loadJSONDoc(gJSONfiles[0]), loadJSONDoc(gJSONfiles[1])).done(function() {
    renderSoundboards();
  });
});

// Load JSON data from server asynchronously
function loadJSONDoc(jsonFile) {
  return $.ajax({
    url: jsonFile,
    async : true,
    timeout: 5000,
    success: function(data) {
      gSoundboards.push(data);
    },
    error: function(jqXHR) {
      if (jqXHR.status == 404) {
        alert("404 Page not found");
      } else if (jqXHR.status == 500) {
        alert("Server error");
      } else if (jqXHR.statusText == "timeout") {
        alert("Request has timed out, please refresh the page to try again");
      }
    }
    });
}

// Generate all rich and compact soundoards
function renderSoundboards() {
  var sb;
  for (var index = 0; index < gSoundboards.length; index++) {
    sb = gSoundboards[index];
    
    $( "<div/>", { "id" : sb.name }).appendTo("main");
    $( "<div/>", { "id" : sb.name + "compact" }).appendTo("main");
    $("<ul/>", { "id" : sb.name + "compactList" }).appendTo("#" + sb.name + "compact");
    
    for (var i = 0; i < sb.images.length; i++) {
      var boxClassName = "sb-" + (index+1) + "-box-" + (i+1);
      
      //RENDER COMPACT MODE CONTENT
      renderCompact(sb, i);
   
      $("<div/>", {
          "class" : "grid-box",
          "id" : boxClassName
      }).appendTo("#" + sb.name);
      
      $("<img/>", {
          "class" : "image",
          "src" : sb.images[i],
          "alt" : "image " + (i+1)
      }).appendTo("#" + boxClassName);
      
      $("<img/>", {
          "class" : "play",
          "src" : sb.play_icon,
          "alt" : "play",
           click: function() {
              $(this).css("visibility", "hidden");
              $(this).next().css("visibility", "visible");
              $(this).next().next().get(0).play();
           }
      }).appendTo("#" + boxClassName);

      $("<img/>", {
          "class" : "pause",
          "src" : sb.pause_icon,
          "alt" : "pause",
          click: function() {
              $(this).css("visibility", "hidden");
              $(this).prev().css("visibility", "visible");
              $(this).next().get(0).pause();
          }
      }).appendTo("#" + boxClassName);
      
      $("<audio/>", {
          "class" : "audio-" + (index+1),
          "src" : sb.sounds[i]
      }).appendTo("#" + boxClassName);
      
      $(".audio-" + (index+1)).on("ended", function() {
        $(this).prev().css("visibility", "hidden");
        $(this).prev().prev().css("visibility", "visible");
      });
    }
  }
  // Hide all extraneous soundboards
  $("#soundboard2").css("display","none");
  $("#soundboard1compact").css("display","none");
  $("#soundboard2compact").css("display","none");
}

// Generate compact mode content
function renderCompact(sb, i) {
   var li = $('<li/>')
          .appendTo("#" + sb.name + "compactList");
    var aaa = $('<a/>')
        .addClass('ui-all')
        .text(sb.titles[i])
        .appendTo(li);
      
    var ac = $("<audio controls/>").appendTo(li);
    
    var soundsource = $("<source>", { "src" : sb.sounds[i]})
      .appendTo(ac);
}

// Switch CSS Styles
function changeTheme() {
  var stylesheet = $("head link"),
      lightCSS = "assets/css/homepageDARK.css",
      darkCSS = "assets/css/homepageLIGHT.css";
      
  $("#theme-select").val() == "dark" ? stylesheet.attr("href", lightCSS) :
  stylesheet.attr("href", darkCSS);
}

// Change content of the site
function changeContent() {
  if ($("#content-select").val() == "Set 1") {
    changeSiteElements("Set 1");
    if ($("#mode").text() == "Rich") {
      $("#soundboard1").css("display", "flex");
      $("#soundboard2").css("display", "none");
    }
    if ($("#mode").text() == "Compact") {
      $("#soundboard2compact").css("display","none");
      $("#soundboard1compact").css("display","flex");
    }
    
  }
  if ($("#content-select").val() == "Set 2") {
    changeSiteElements("Set 2");
    if ($("#mode").text() == "Rich") {
      $("#soundboard1").css("display", "none");
      $("#soundboard2").css("display", "flex");
    }
    if ($("#mode").text() == "Compact") {
      $("#soundboard1compact").css("display","none");
      $("#soundboard2compact").css("display","flex");
    }
  }
}

// Toggle between rich and compact site modes
function changeMode() {
  if ($("#mode").text() == "Rich") {
    $("#mode").text("Compact");
    if ($("#content-select").val() == "Set 1") {
      $("#soundboard1").css("display","none");
      $("#soundboard1compact").css("display","flex");
    }
    else {
      $("#soundboard2").css("display","none");
      $("#soundboard2compact").css("display","flex");
    }
  }
  else {
    $("#mode").text("Rich");
    if ($("#content-select").val() == "Set 1") {
      $("#soundboard1").css("display","flex");
      $("#soundboard1compact").css("display","none");
    }
    else {
      $("#soundboard2").css("display","flex");
      $("#soundboard2compact").css("display","none");
    }
  }
}

// Helper function to set text of the site when content is changed
function changeSiteElements(strOption) {
  if (strOption == "Set 1") {
    $(".left-nav a").text("Portal 2 Soundboard");
    $(".jumbotron h1").html("Portal 2 Soundboard");
    $(".jumbotron p").html("Brought to you through a collaborative effort between Aperture Science and WES")
    $(".jumbotron").css("background-image", "url(images/portal_2_wallpaper.webp)");
  }
  if (strOption == "Set 2") {
    $(".left-nav a").text("Rick and Morty Soundboard");
    $(".jumbotron h1").html("Rick and Morty Soundboard");
    $(".jumbotron p").html("Brought to you through a collaborative effort between Rick, Morty, and WES");
    $(".jumbotron").css("background-image", "url(images/rick_and_morty_wp.jpg)");
  }
}