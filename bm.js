

// Initialize a variable to track the state
let isOn = false;

// Function to handle the click event and toggle the state
function toggleButton(event) {
  isOn = !isOn; // Toggle the state
  if (isOn) {
    // Perform actions when the button is "on"
    console.log('Button is on');
  } else {
    // Perform actions when the button is "off"
    console.log('Button is off');
  }
}

// Assign the function to the button's click event using addEventListener
const button = document.querySelector('button');
button.addEventListener('click', toggleButton);




function showSkranke() {
    var elements = document.querySelectorAll("#skranke");
    for (var i=0; i<elements.length; i++) {
        elements[i].className = "w3-btn w3-border fdm-border-cyan fdm-highlight fdm-hover w3-btn-block";
    }
};


function showProgrammering() {
    var elements = document.querySelectorAll("#programmering");
    for (var i=0; i<elements.length; i++) {
        elements[i].className = "w3-btn w3-border fdm-border-green fdm-green fdm-hover w3-btn-block";
    }
}