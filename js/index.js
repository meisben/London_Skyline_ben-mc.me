/*----Notes for readers.---
* Uses Greensock plugin
* Uses JQuery UI for Modal - (c) MIT Licensed
*/

//Hide modal text

$(function () {
  $("#dialog1").dialog({
    autoOpen: false  ///added this line
  });
});

$(function () {
  $("#dialog2").dialog({
    autoOpen: false  ///added this line
  });
});

//Standard Variables
container = $('.container');
svg = $('.svg');
WindowWidth = $(window).width(); //Can Delete?
console.log(WindowWidth);

//---Selecting elements and entering variables
//   --Buidlings
Big_Ben = document.getElementById('Big_Ben');
City_Hall = document.getElementById('CityHall');
Milenium_Wheel = document.getElementById('Milenium_wheel');
Tower_Bridge = document.getElementById('Tower_Bridge');
Parliment = document.getElementById('Parliment');
Shard = document.getElementById('Shard');
Strata = document.getElementById('Strata');
//   --Cones and Logos
Github = document.getElementById('Github');
Github_Cone = document.getElementById('Github_Cone');
LinkedIn = document.getElementById('LinkedIn');
LinkedIn_Cone = document.getElementById('LinkedIn_Cone');
Instagram = document.getElementById('Instagram');
Instagram_Cone = document.getElementById('Instagram_Cone');
Plotly = document.getElementById('Plotly');
Plotly_Cone = document.getElementById('Plotly_Cone');
Twitter = document.getElementById('Twitter');
Twitter_Cone = document.getElementById('Twitter_Cone');
Wordpress = document.getElementById('Wordpress');
Wordpress_Cone = document.getElementById('Wordpress_Cone');
//   --Variables
n = 0;

//center the container to make it look good
TweenMax.set(container, {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
})
TweenMax.set('svg', {
  visibility: 'visible',
  scale: 1.5
})

//Set some variables for initial layout
$('.Text_For_Labels').hide();
TweenMax.set(['.skylineText'], { autoAlpha: 0 });
TweenMax.set([Github, Github_Cone, LinkedIn, LinkedIn_Cone, Instagram, Instagram_Cone, Plotly, Plotly_Cone, Twitter, Twitter_Cone, Wordpress, Wordpress_Cone], { autoAlpha: 0 });
TweenMax.set('#Diagram_Area', { autoAlpha: 0 });
TweenMax.set(['#Name_Text', '#Description_Text'], { autoAlpha: 0 });

//Firework variables
var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function (s) {
    return document.querySelector(s);
  },
  selectAll = function (s) {
    return document.querySelectorAll(s);
  },
  mainTl,
  pContainer = select('.pContainer'),
  particlePool = [],
  numParticles = 20,
  particleCount = 0;

//--- START OF MAIN PROGRAM

//Define main timeline
var mainTl = new TimelineMax;//({repeat: 0});

//Create particles for firework function
createParticles(); // create some firework particles

//Start animation

//Text heading animation
var headingTl = new TimelineMax;
headingTl.fromTo(".lineHidingText", 1, { drawSVG: '50% 50%' }, { drawSVG: '0% 100%' }, 0);
headingTl.to('#Name_Text', 2, { autoAlpha: 1 }, 0);
headingTl.to('#Description_Text', 2, { autoAlpha: 1 }, 1);
headingTl.fromTo('.scribble', 1, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%' }, 3.5);
headingTl.to('.skylineText', 2, { autoAlpha: 1 }, 4.5);

//Animation to make main drawing visible
var drawingTl = new TimelineMax;
drawingTl.to('#Diagram_Area', 8, { autoAlpha: 1, ease: Linear.easeNone }, 0);

// Millenium Wheel animations including fan animations
var milleniumInitialTl = new TimelineMax();
var milleniumTl = new TimelineMax({
  repeat: -1,
  repeatDelay: 0
});

milleniumInitialTl.staggerFrom(".MW_Capsules", 1.5, { drawSVG: 0 }, 0.6, 0.5); //for initial capsule animations

milleniumTl.to(["#Mil_Wheel_Main"], 120, { rotation: 360, transformOrigin: "center", repeat: -1, ease: Linear.easeNone }, 0); //Wheel rotation
milleniumTl.staggerTo(["#Fan1", "#Fan2", "#Fan3"], 4, { rotation: 360, transformOrigin: "center", repeat: -1, ease: Linear.easeNone }, 0.6, 0); //Fan animations


//Big_Ben animations
var bigBenTl = new TimelineMax();
bigBenTl.to("#Big_hand", 15, { rotation: 1400, transformOrigin: "left bottom" }, 1); //Rotations for clock face
bigBenTl.to("#Small_hand", 15, { rotation: 51, transformOrigin: "right bottom" }, 1);

//Boat Animations
var boatTl = new TimelineMax();
boatTl.fromTo("#Boat", 20, { x: '-=50' }, { x: '+=30' }, 0);

//Introduce link cones
var conesTl = new TimelineMax();
conesTl.to([Github, Github_Cone], 5, { autoAlpha: 1 }, 0);
conesTl.to([LinkedIn, LinkedIn_Cone], 5, { autoAlpha: 1 }, 1);
conesTl.to([Instagram, Instagram_Cone], 5, { autoAlpha: 1 }, 2);
conesTl.to([Plotly, Plotly_Cone], 5, { autoAlpha: 1 }, 3);
conesTl.to([Twitter, Twitter_Cone], 5, { autoAlpha: 1 }, 4);
conesTl.to([Wordpress, Wordpress_Cone], 5, { autoAlpha: 1 }, 5);

//Setup Mouse interactions
Big_Ben.addEventListener("click", linkLinkedIn);
City_Hall.addEventListener("click", linkWordpress);
Milenium_Wheel.addEventListener("click", linkInstagram);
Parliment.addEventListener("click", linkLinkedIn);
Tower_Bridge.addEventListener("click", linkTwitter);
Shard.addEventListener("click", linkGithub);
Strata.addEventListener("click", linkPlotly);
Github.addEventListener("click", linkGithub);
Github_Cone.addEventListener("click", linkGithub);
LinkedIn.addEventListener("click", linkLinkedIn);
LinkedIn_Cone.addEventListener("click", linkLinkedIn);
Instagram.addEventListener("click", linkInstagram);
Instagram_Cone.addEventListener("click", linkInstagram);
Plotly.addEventListener("click", linkPlotly);
Plotly_Cone.addEventListener("click", linkPlotly);
Twitter.addEventListener("click", linkTwitter);
Twitter_Cone.addEventListener("click", linkTwitter);
Wordpress.addEventListener("click", linkWordpress);
Wordpress_Cone.addEventListener("click", linkWordpress);

// Waves Animations
var wavesTl = new TimelineMax();
wavesTl.staggerFromTo(".waveOne_fillLine", 2, { drawSVG: '10% 100%', autoAlpha: 0 }, { drawSVG: '0% 0%', autoAlpha: 0.5, repeat: -1 }, 1, 0);
wavesTl.staggerFromTo(".waveTwo_fillLine", 2, { drawSVG: '40% 0%', autoAlpha: 0 }, { drawSVG: '100% 100%', autoAlpha: 0.7, repeat: -1, }, 0.9, 0);
wavesTl.staggerFromTo(".waveThree_fillLine", 3, { drawSVG: '30% 0%', autoAlpha: 0 }, { drawSVG: '100% 100%', autoAlpha: 0.7, repeat: -1, }, 2, 0);


//Colour animations
var colourTl = new TimelineMax();
colourTl.to(".LinkedIn_colour2", 1, { fill: "#ff7fa2" }, 0);
colourTl.to(".Twitter_colour2", 1, { fill: "#dfe2e6" }, 0);
colourTl.to(".Instagram_colour2", 1, { fill: "#ffdc7f" }, 0);
colourTl.to(".Github_colour2", 1, { fill: "#b4ff98" }, 0);
colourTl.to(".Wordpress_colour2", 1, { fill: "#98ffe3" }, 0);
colourTl.to(".Plotly_colour2", 1, { fill: "#e398ff" }, 0);

//Firework Trail animations
var fireworkTl = new TimelineMax({
  repeat: -1,
  repeatDelay: 10
});

fireworkTl.fromTo(".Firework_Trail_5", 1, { drawSVG: '90% 100%' }, { drawSVG: '0% 0%', onComplete: playParticles, onCompleteParams: [{ x: 304, y: 170 }] }, 0);
fireworkTl.fromTo(".Firework_Trail_4", 2, { drawSVG: '90% 100%' }, { drawSVG: '0% 0%', onComplete: playParticles, onCompleteParams: [{ x: 125, y: 190 }] }, 1);
fireworkTl.fromTo(".Firework_Trail_3", 3, { drawSVG: '90% 100%' }, { drawSVG: '0% 0%', onComplete: playParticles, onCompleteParams: [{ x: 265, y: 200 }] }, 3);
fireworkTl.fromTo(".Firework_Trail_2", 2, { drawSVG: '90% 100%' }, { drawSVG: '0% 0%', onComplete: playParticles, onCompleteParams: [{ x: 400, y: 140 }] }, 5);
fireworkTl.fromTo(".Firework_Trail_1", 2, { drawSVG: '90% 100%' }, { drawSVG: '0% 0%', onComplete: playParticles, onCompleteParams: [{ x: 170, y: 140 }] }, 8);



//Setup nested timelines (where all the action happens!) drawingTl
mainTl.add(colourTl, 0); // add colours to cones
mainTl.add(headingTl, 0); //make heading animate
mainTl.add(drawingTl, 3); // make drawing appear
mainTl.add(milleniumInitialTl, 3); // make millenium wheel start to draw
mainTl.add(milleniumTl, 6); // make millenium wheel rotate and fans move forever
mainTl.add(bigBenTl, 3); // make clock face turn
mainTl.add(boatTl, 3); //make boat move
mainTl.add(conesTl, 8); //make cones appear
mainTl.add(wavesTl, 3); // start waves on boat
mainTl.add(fireworkTl, 18); // start fireworks

// ---Make links -----
function linkGithub() { var win = window.open("https://codepen.io/benisme/", '_blank'); win.focus(); console.log("https://codepen.io/benisme/"); }

function linkLinkedIn() { var win = window.open("https://www.linkedin.com/in/ben-money-coomes/", '_blank'); win.focus(); console.log("https://www.linkedin.com/in/ben-money-coomes/"); }

function linkInstagram() { var win = window.open("https://www.instagram.com/benismememe/", '_blank'); win.focus(); console.log("https://www.instagram.com/benismememe/"); }

function linkPlotly() { var win = window.open("https://github.com/meisben", '_blank'); win.focus(); console.log("https://github.com/meisben"); }

function linkTwitter() { var win = window.open("https://twitter.com/benmoneycoomes?lang=en", '_blank'); win.focus(); console.log("https://twitter.com/benmoneycoomes?lang=en"); }

function linkWordpress() { var win = window.open("https://fridayfrisbee.wordpress.com/", '_blank'); win.focus(); console.log("https://fridayfrisbee.wordpress.com/"); }

// ---> Functions for fireworks only <-----

function createParticles() {

  var i = numParticles,
    p;
  while (--i > -1) {

    p = document.createElementNS(xmlns, 'use');
    p.setAttributeNS(xlinkns, "xlink:href", '#particle');
    pContainer.appendChild(p);
    p.setAttribute('class', "particle");
    TweenMax.set(p, {
      scale: randomBetween(1, 7),
      autoAlpha: 0
    });
    particlePool.push(p);
    //console.log(p);
  }

}

function playParticles(obj) {

  var i = particlePool.length;

  while (--i > -1) {
    var p = particlePool[i];
    var curr = {
      x: obj.x,
      y: obj.y
    };

    TweenMax.set(p, {
      x: curr.x,
      y: curr.y,
      transformOrigin: '50% 50%'
    });

    var tl = new TimelineMax();

    tl.set(p, {
      autoAlpha: 1
    })
      .to(p, randomBetween(1, 23) / 10, {
        physics2D: {
          velocity: randomBetween(240, 370),
          angle: randomBetween(-130, -45),
          gravity: randomBetween(550, 600)
        },
        scale: 0.1,
        onComplete: completeParticle,
        onCompleteParams: [p],
        alpha: 1
      });

    particleCount++;

    //makes particleCount zero when it exceeds numParticles

    particleCount = (particleCount >= numParticles) ? 0 : particleCount


  }

  return tl;
}

function completeParticle(p) {
  TweenMax.set(p, {
    scale: randomBetween(1, 3),
    alpha: 0
  });

}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



//  --- -- Hover Colour changes ! --- --

$(function twitterHover() {
  $('.Twitter_colour').hover(twitterMouseOver, twitterMouseOff);
  $('.Twitter_colour2').hover(twitterMouseOver, twitterMouseOff);
  $('.twitterLogo').hover(twitterMouseOver, twitterMouseOff);
});

function twitterMouseOver() {
  $('.Twitter_colour').css('fill', "#d9dce1");
  $('.Twitter_colour2').css('fill', "#c0c5ce");
}
function twitterMouseOff() {
  // on mouseout, reset the background colour
  $('.Twitter_colour').css('fill', 'white');
  $('.Twitter_colour2').css('fill', '#dfe2e6');
}



$(function linkedinHover() {
  $('.totalParliment').hover(linkedinMouseOver, linkedinMouseOff);
  $('.LinkedIn_colour2').hover(linkedinMouseOver, linkedinMouseOff);
  $('.linkedinLogo').hover(linkedinMouseOver, linkedinMouseOff);
});

function linkedinMouseOver() {
  $('.LinkedIn_colour').css('fill', "#ffd8e3");
  $('.LinkedIn_colour2').css('fill', "#ff7fa2");
}
function linkedinMouseOff() {
  // on mouseout, reset the background colour
  $('.LinkedIn_colour').css('fill', 'white');
  $('.LinkedIn_colour2').css('fill', '#ffa5bd');
}



$(function instagramHover() {
  $('.milleniumWheel').hover(instagramMouseOver, instagramMouseOff);
  $('.Instagram_colour2').hover(instagramMouseOver, instagramMouseOff);
  $('.instagramLogo').hover(instagramMouseOver, instagramMouseOff);
});

function instagramMouseOver() {
  $('.Instagram_colour').css('fill', "#ffdc7f");
  $('.Instagram_colour2').css('fill', "#ffc733");
}
function instagramMouseOff() {
  // on mouseout, reset the background colour
  $('.Instagram_colour').css('fill', 'white');
  $('.Instagram_colour2').css('fill', '#ffdc7f');
}


$(function githubHover() {
  $('.Github_colour').hover(githubMouseOver, githubMouseOff);
  $('.Github_colour2').hover(githubMouseOver, githubMouseOff);
  $('.githubLogo').hover(githubMouseOver, githubMouseOff);
});

function githubMouseOver() {
  $('.Github_colour').css('fill', "#c3ffac");
  $('.Github_colour2').css('fill', "#90cc79");
}
function githubMouseOff() {
  // on mouseout, reset the background colour
  $('.Github_colour').css('fill', 'white');
  $('.Github_colour2').css('fill', '#b4ff98');
}


$(function wordpressHover() {
  $('.Wordpress_colour').hover(wordpressMouseOver, wordpressMouseOff);
  $('.Wordpress_colour2').hover(wordpressMouseOver, wordpressMouseOff);
  $('.wordpressLogo').hover(wordpressMouseOver, wordpressMouseOff);
});

function wordpressMouseOver() {
  $('.Wordpress_colour').css('fill', "#acffe8");
  $('.Wordpress_colour2').css('fill', "#79ccb5");
}
function wordpressMouseOff() {
  // on mouseout, reset the background colour
  $('.Wordpress_colour').css('fill', 'white');
  $('.Wordpress_colour2').css('fill', '#98ffe3');
}


$(function plotlyHover() {
  $('.strataTotal').hover(plotlyMouseOver, plotlyMouseOff);
  $('.Plotly_colour2').hover(plotlyMouseOver, plotlyMouseOff);
  $('.plotlyLogo').hover(plotlyMouseOver, plotlyMouseOff);
});

function plotlyMouseOver() {
  $('.Plotly_colour').css('fill', "#e8acff");
  $('.Plotly_colour2').css('fill', "#b579cc");
}
function plotlyMouseOff() {
  // on mouseout, reset the background colour
  $('.Plotly_colour').css('fill', 'white');
  $('.Plotly_colour2').css('fill', '#e398ff');
}



$(function aboutmeHover() {
  $('.aboutMe').hover(aboutmeMouseOver, aboutmeMouseOff);
});

function aboutmeMouseOver() {
  $('.btnAboutMe').css('fill', "#ffe6a5");
}
function aboutmeMouseOff() {
  // on mouseout, reset the background colour
  $('.btnAboutMe').css('fill', '#ffdc7f');
}


$(function awardsHover() {
  $('.awards').hover(awardsMouseOver, awardsMouseOff);
});

function awardsMouseOver() {
  $('.btnAwards').css('fill', "#a5ffe6");
}
function awardsMouseOff() {
  // on mouseout, reset the background colour
  $('.btnAwards').css('fill', '#7fffdc');
}


// --- -- Buttons --- --
//#1
$('.aboutMe').click(function () {
  $("#dialog1").dialog("open");
  return false;
});
//#2
// make variable for true/false
var countVisible = 0;
//button code
$('.awards').click(function () {
  if (countVisible == 1) {
    //labels are showing
    $('.Text_For_Labels').hide();
    countVisible = 0;
  }
  else {
    //labels are hidden
    $('.Text_For_Labels').show();
    countVisible = 1;
  }
  return false;
});    
