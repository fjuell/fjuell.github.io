
let isSkrankeOn = false;
let isProgOn = false;


function toggleButtonSkranke() {
    if (isSkrankeOn === false) {
        isSkrankeOn = true;
    }  else {
        isSkrankeOn = false;
    }
};

function toggleButtonProg() {
    if (isProgOn === false) {
        isProgOn = true;
    } else {
        isProgOn = false;
    }
};



function showSkranke() {
    var elements = document.querySelectorAll("#skranke");
    if (isSkrankeOn === false) {
        for (var i=0; i<elements.length; i++) {
            elements[i].className = "w3-btn w3-border fdm-border-cyan fdm-highlight fdm-hover w3-btn-block";
        }
        toggleButtonSkranke();
    } else {
        for (var i=0; i<elements.length; i++) {
            elements[i].className = "w3-btn w3-border-bottom fdm-border-blue fdm-highlight fdm-hover w3-btn-block";
        }
        toggleButtonSkranke();
    }
};


function showProgrammering() {
    var elements = document.querySelectorAll("#programmering");
    if (isProgOn === false) {
        for (var i=0; i<elements.length; i++) {
            elements[i].className = "w3-btn w3-border fdm-border-green fdm-green fdm-hover w3-btn-block";
        }
        toggleButtonProg();
    } else {
        for (var i=0; i<elements.length; i++) {
            elements[i].className = "w3-btn w3-border-bottom fdm-border-blue fdm-green fdm-hover w3-btn-block";
        }
        toggleButtonProg();
    }
};

