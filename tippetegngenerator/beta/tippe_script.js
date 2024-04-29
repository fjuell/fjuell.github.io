

function toggleX(anID) {
  let x = document.getElementById(anID);
  let kampx = x.parentElement;
  if (x.innerHTML === "&nbsp;") {
    x.innerHTML = "X";
    kampx.setAttribute("data-lock", "yes");
  } else {
    x.innerHTML = "&nbsp;";
    // Check if any siblings have X, and if not, remove data-lock
    const collection = kampx.children;
    if (collection[0].innerHTML === "&nbsp;" && collection[1].innerHTML === "&nbsp;" && collection[2].innerHTML === "&nbsp;") {
      kampx.setAttribute("data-lock", "no");
    }
  }
  checklocks();
}



function tipptilfeldig(limHU, limUB) {
        // Print vekter
        let vekt_h = limHU*100;
        let vekt_u = limUB*100 - vekt_h;
        let vekt_b = 100 - 100*limUB;
        document.getElementById("wh").innerHTML = "".concat(vekt_h,"%");
        document.getElementById("wu").innerHTML = "".concat(vekt_u,"%");
        document.getElementById("wb").innerHTML = "".concat(vekt_b,"%");

        for (let i=1; i<13; i++) {
          is = i.toString();
          let h_id = is.concat("h");
          let u_id = is.concat("u");
          let b_id = is.concat("b");
          let kamp_id = "kamp".concat(is);

          if (document.getElementById(kamp_id).getAttribute("data-lock") == "yes") {
            // Hopp over hvis locked
            continue;
          } else {
            // Slett alle kryss
            document.getElementById(h_id).innerHTML = "&nbsp;";
            document.getElementById(u_id).innerHTML = "&nbsp;";
            document.getElementById(b_id).innerHTML = "&nbsp;";
          }

          const n = Math.random();     // returns a random number between 0 (inclusive),  and 1 (exclusive):
          if (n<limHU) {
            document.getElementById(h_id).innerHTML = "X";   // &#10006;
          } else if (n<limUB) {
            document.getElementById(u_id).innerHTML = "X";
          } else {
            document.getElementById(b_id).innerHTML = "X";
          }
        }
      }


     
function getRandomElements(array, n) {
  if (n > array.length) {
    throw new Error('n cannot be greater than the array length');
  }
  const shuffledArray = [...array].sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, n);
}



function getLockedGarderings() {
  let halvgards = [];
  let helgards = [];
  let nonLocked = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  for (let i=1; i<13; i++) {
    is = i.toString();
    let h_id = is.concat("h");
    let u_id = is.concat("u");
    let b_id = is.concat("b");
    let kamp_id = "kamp".concat(is);
    let numberOfXes = 0;
    if (document.getElementById(kamp_id).getAttribute("data-lock") === "yes") {
      const index = nonLocked.indexOf(is)
      nonLocked.splice(index, 1);
      if (document.getElementById(h_id).innerHTML === "X") {
        numberOfXes = numberOfXes+1;
      }
      if (document.getElementById(u_id).innerHTML === "X") {
        numberOfXes = numberOfXes+1;
      }
      if (document.getElementById(b_id).innerHTML === "X") {
        numberOfXes = numberOfXes+1;
      }
    }
    if (numberOfXes == 2) {
      halvgards.push(is);
    }
    if (numberOfXes == 3) {
      helgards.push(is);
    }
  } // end for
  document.getElementById("TESTAREA_6").innerHTML = "lockHalv:".concat([halvgards, "lockHel:", helgards]);
  return [halvgards, helgards, nonLocked];
}





function printError() {
  const header = document.getElementById("tippeHeader");
  header.innerHTML = "<div class='jersey-20'>user error: check your X-es</div>";
  header.classList.remove('w3-pink');
  header.classList.remove('w3-center');
  header.classList.add('w3-monospace');
  header.classList.add('header-message');
  //
  /*for (let i=1; i<13; i++) {
    is = i.toString();
    let h_id = is.concat("h");
    let u_id = is.concat("u");
    let b_id = is.concat("b");
    document.getElementById(h_id).innerHTML = "";
    document.getElementById(u_id).innerHTML = "E";
    document.getElementById(b_id).innerHTML = "&nbsp;";
  }*/
}


function printErrorClear() {
	const header = document.getElementById("tippeHeader");
  header.innerHTML = "Tippetegngenerator <small>v1.1 &beta;</small>";
  header.classList.remove('w3-gray');
  header.classList.add('w3-pink');
  header.classList.add('w3-center');
}



function garder() {
  let rekker = 1
  // Getting the checked radio button
  var rekkRadios = document.getElementsByName('antRekk');
  for (var i = 0, length = rekkRadios.length; i < length; i++) {
    if (rekkRadios[i].checked) {
      // do whatever you want with the checked radio
      rekker = rekkRadios[i].value;
      // only one radio can be logically checked, don't check the rest
      break;
    }
  }
  document.getElementById("TESTAREA_1").innerHTML = "rekker:".concat(rekker); // Output to test div
  
  usedGarderings = getLockedGarderings();

  // Kamper som ikke er locked
  let kamper = usedGarderings[2];
  document.getElementById("TESTAREA_7").innerHTML = "kamper:".concat(kamper);
 
  let antLockedHalvgards = usedGarderings[0].length
  let antLockedHelgards = usedGarderings[1].length
  // Pick random kamper to be halvgardert
  let halvgarderte;
  if (rekker==1) {
    if (antLockedHalvgards>0 || antLockedHelgards>0) {
      printError();
      return "Error: Brukerfeil";
    }
    halvgarderte = [];
  } else if (rekker==2) {
    if (antLockedHalvgards>1 || antLockedHelgards>0) {
      printError();
      return "Error: Brukerfeil";
    }
    halvgarderte = getRandomElements(kamper, (1 - usedGarderings[0].length));
  } else if (rekker==16) {
    if (antLockedHalvgards>4 || antLockedHelgards>0) {
      printError();
      return "Error: Brukerfeil";
    }
    halvgarderte = getRandomElements(kamper, (4 - usedGarderings[0].length));
  } else if (rekker==32) {
    if (antLockedHalvgards>5 || antLockedHelgards>0) {
      printError();
      return "Error: Brukerfeil";
    }
    halvgarderte = getRandomElements(kamper, (5 - (usedGarderings[0].length+usedGarderings[1].length)));
  } else if (rekker==48) {
    if (antLockedHalvgards>4 || antLockedHelgards>1) {
      printError();
      return "Error: Brukerfeil";
    }
    halvgarderte = getRandomElements(kamper, (5 - usedGarderings[0].length));
  } else if (rekker==64) {
    if (antLockedHalvgards>6 || antLockedHelgards>0) {
      printError();
      return "Error: Brukerfeil";
    }
    halvgarderte = getRandomElements(kamper, (6 - usedGarderings[0].length));
  }
  document.getElementById("TESTAREA_2").innerHTML = "halvgarderte:".concat(halvgarderte);

    
  // Special Case 48
  if (rekker==48 && antLockedHelgards==0) {
    // Bruk siste halvgardering, og gjør den til helgardering. 
    let last_element = halvgarderte[halvgarderte.length - 1]
    document.getElementById(last_element.concat("h")).innerHTML = "X";
    document.getElementById(last_element.concat("u")).innerHTML = "X";
    document.getElementById(last_element.concat("b")).innerHTML = "X";
    // Og fjern den fra listen
    halvgarderte.pop();
  } else if (rekker==48 && antLockedHelgards==1) {
    halvgarderte.pop();
  }

  let halvgard_ids = []; // id-er til alle halvgarderinger som skal settes
  for (var i = 0, length = halvgarderte.length; i < length; i++) {
    let h_id = halvgarderte[i].concat("h");
    let u_id = halvgarderte[i].concat("u");
    let b_id = halvgarderte[i].concat("b");
    let kamp_id = "kamp".concat(halvgarderte[i]);
    locked = document.getElementById(kamp_id).getAttribute("data-lock");
    let ids_avail = [];
    if (document.getElementById(h_id).innerHTML != "X" && locked === "no") {ids_avail.push(h_id)};
    if (document.getElementById(u_id).innerHTML != "X" && locked === "no") {ids_avail.push(u_id)};
    if (document.getElementById(b_id).innerHTML != "X" && locked === "no") {ids_avail.push(b_id)};
    document.getElementById("TESTAREA_3").innerHTML = "ids_avail:".concat(ids_avail);
    const n = Math.random();
    if (n<0.5) {halvgard_ids.push(ids_avail[0])}
      else {halvgard_ids.push(ids_avail[1])}
  }
  document.getElementById("TESTAREA_4").innerHTML = "halvgard_ids:".concat(halvgard_ids);
  // Sett inn halvgarderingene
  for (var i = 0, length = halvgard_ids.length; i < length; i++) {
    document.getElementById(halvgard_ids[i]).innerHTML = "X"; 
  }
} // end function






function clearall() {
  for (let i=1; i<13; i++) {
    is = i.toString();
    let h_id = is.concat("h");
    let u_id = is.concat("u");
    let b_id = is.concat("b");
    document.getElementById(h_id).innerHTML = "&nbsp;";
    document.getElementById(u_id).innerHTML = "&nbsp;";
    document.getElementById(b_id).innerHTML = "&nbsp;";
    let kamp_id = "kamp".concat(is);
    document.getElementById(kamp_id).setAttribute("data-lock", "no");
  }
  const header = document.getElementById("tippeHeader");
  header.innerHTML = "Tippetegngenerator <small>v1.1 &beta;</small>";
  header.classList.remove('w3-gray');
  header.classList.add('w3-pink');
  header.classList.add('w3-center');
}



function checklocks() {
  //locks = [];
  for (let i=1; i<13; i++) {
    is = i.toString();
    let kamp_id = "kamp".concat(is);
    let lock_id = "lock".concat(is);
    if (document.getElementById(kamp_id).getAttribute("data-lock") === "yes") {
      document.getElementById(lock_id).innerHTML = "lock";
    } else {
      document.getElementById(lock_id).innerHTML = "";
    }
    //locks.push(is.concat("-",document.getElementById(kamp_id).getAttribute("data-lock"),"<br/>"));
  }
  //document.getElementById("TESTAREA_6").innerHTML = "Locks:<br/>".concat(locks);
}