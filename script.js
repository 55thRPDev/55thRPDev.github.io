import { Module } from "./assets/entity/Module.js";

window.onload = function(){
    loadModules();
    document.getElementById("slideMenuButton").addEventListener("click", toggleSlideMenu);
    document.getElementById("linksButton").addEventListener("click", shareToFacebook);
    document.getElementById("helpButton").addEventListener("click", showHelpPopup);
    document.getElementById("prev").addEventListener("click", prevSlide);
    document.getElementById("next").addEventListener("click", nextSlide);
}

//Site variables and constants
let moduleNum = 0;
let moduleDataFile = "./assets/content/modules.json";
let modules = [];
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

//Share links
let uFredURL = "https://ufred.ca";

/*Name: loadModules
/*Variables: moduleDataFile (path to .json file with module content)
/*Description: This function accesses the .json file containing the module information and sends the data to the modules array. used on page load*/
function loadModules(){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
        if (xmlhttp.readyState === XMLHttpRequest.DONE){
            if (xmlhttp.status === 200){
                populateModules(xmlhttp.responseText);
            }
        }
    };
    xmlhttp.open("GET", moduleDataFile, true);
    xmlhttp.send();
}

/*Name: populateModules
/*Variables: moduleData (module data in JSON format)
/*Description: This function parses the json data and populates the modules array*/
function populateModules(moduleJSONData){
    //parse the data
    let moduleData = JSON.parse(moduleJSONData).modules;
    //loop through the data to populate the module array with objects
    moduleData.forEach(module => {
        let tempMod = new Module(module.moduleNum, module.moduleTitle, module.paragraphs);
        modules.push(tempMod);
    });

    //call function to display module info
    displayModuleContent(moduleNum);
}

/*Name: displayModuleTitle
/*Variables: moduleNum (global variable that tracks the current displayed module from the global array)
/*Description: Populates the space in the footer that displays the module id and title */
function displayModuleTitle(moduleNum){
    let currentMod = modules[moduleNum];
    
    //Module ID and title string
    let output = `<p>Module ${currentMod.id}: ${currentMod.title}</p>`;

    //populate footer
    document.querySelector("#footerModuleTitle").innerHTML = output;
}

/*Name: displayModuleContent
/*Variables: moduleNum (global variable that tracks the current displayed module from the global array)
/*Description: Populates the content box with module title and content*/
function displayModuleContent(moduleNum){
    let contentBox = document.querySelector("#textArea");

    //build structure inside content box
    let output = `<div class="carousel-container">`;
    output += `<div class="carousel-inner">`;

    //populate the carousel with module data
    modules.forEach((mod, index) => {
        output += `<div class="carousel-item ${index === moduleNum ? 'active' : ''}">`;
        //populate the title
        output += `<h1 class="carousel-mod-title">${mod.title}</h1><p class="barrier"></p>`;
        //populate the paragraphs
        mod.content.forEach(paragraph => {
            output += `<p class="carousel-mod-paragraph">${paragraph}</p>`;
        });
        output += `</div>`;
    });

    output += `<div>`;
    output += `</div>`;

    //populate content box and display module title
    contentBox.innerHTML = output;
    displayModuleTitle(moduleNum);

    //enable or disable buttons
    moduleNum === (modules.length - 1) ? disableButton(nextButton) : "";
    moduleNum === 0 ? disableButton(prevButton) : "";
}

/*Name: nextSlide
/*Variables: None
/*Description: Increases the global moduleNum to advance the slide, then enables prev button if needed*/
function nextSlide(){
    if(moduleNum < modules.length - 1){
        moduleNum++;
        displayModuleContent(moduleNum);
        enableButton(prevButton);
    }else{
        alert("No more slides left!")
    }    
}

/*Name: prevSlide
/*Variables: None
/*Description: Decreases the global moduleNum to go back a slide, then enables next button if needed*/
function prevSlide(){
    if(moduleNum > 0){
        moduleNum--;
        displayModuleContent(moduleNum);
        enableButton(nextButton);    
    }else{
        alert("Already on slide 1!");
    }  
}

/*Name: disableButton
/*Variables: button (an html button element)
/*Description: disables the button and adds the disabled class for styling*/
function disableButton(button){
    button.disabled = true;
    button.classList.add("disabled");
}

/*Name: enableButton
/*Variables: button (an html button element)
/*Description: removes the disabled tag and disabled class*/
function enableButton(button){
    button.disabled = false;
    button.classList.remove("disabled");
}

/*Name: toggleSlideMenu
/*Variables: none
/*Description: This function toggles the "on" class for the slide menu. This moves the slide menu onto or off of the screen*/
function toggleSlideMenu(){
    document.getElementById("slideMenu").classList.toggle("on");
}

/*Name: shareToFacebook
/*Variables: none
/*Description: This function opens a new facebook tab to share the site as a facebook post*/
function shareToFacebook(){
    window.open('http://facebook.com/sharer/sharer.php?u='+encodeURIComponent(uFredURL), '', '');
}

/*Name: showHelpPopup
/*Variables: none
/*Description: Shows a helpful tip when help button is clicked, then fades out*/
function showHelpPopup(){
    document.getElementById("helpPopup").classList.add("visible");
    setTimeout(() => {
        document.getElementById("helpPopup").classList.remove("visible");
    }, 3000);
}