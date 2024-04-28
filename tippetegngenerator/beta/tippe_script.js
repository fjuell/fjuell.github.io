

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
  let antHalvgard = 0;
  let antHelgard = 0;
  for (let i=1; i<13; i++) {
    is = i.toString();
    let h_id = is.concat("h");
    let u_id = is.concat("u");
    let b_id = is.concat("b");
    let kamp_id = "kamp".concat(is);
    let numberOfXes = 0;
    if (document.getElementById(kamp_id).getAttribute("data-lock") === "yes") {
      //
    } else {
      //
    }
  }
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
  let kamper = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
 
  // Pick random kamper to be halvgardert
  let halvgarderte;
  if (rekker==1) {
    halvgarderte = [];
  } else if (rekker==2) {
    halvgarderte = getRandomElements(kamper, 1);
  } else if (rekker==16) {
    halvgarderte = getRandomElements(kamper, 4);
  } else if (rekker==32) {
    halvgarderte = getRandomElements(kamper, 5);
  } else if (rekker==48) {
    halvgarderte = getRandomElements(kamper, 5);
  } else if (rekker==64) {
    halvgarderte = getRandomElements(kamper, 6);
  }
  document.getElementById("TESTAREA_2").innerHTML = "halvgarderte:".concat(halvgarderte);

  // Check locked kamper, and which is halv/helgardert allerede. 
  // Dette må avgjøre hvor mange garderinger som skal gjøres under.
  

  if (rekker==48) {
    // Bruk siste halvgardering, og gjør den til helgardering. 
    let last_element = halvgarderte[halvgarderte.length - 1]
    document.getElementById(last_element.concat("h")).innerHTML = "X";
    document.getElementById(last_element.concat("u")).innerHTML = "X";
    document.getElementById(last_element.concat("b")).innerHTML = "X";
    // Og fjern den fra listen
    halvgarderte.pop();
  }

  let halvgard_ids = []; // id-er til alle halvgarderinger som skal settes
  for (var i = 0, length = halvgarderte.length; i < length; i++) {
    let h_id = halvgarderte[i].concat("h");
    let u_id = halvgarderte[i].concat("u");
    let b_id = halvgarderte[i].concat("b");
    let ids_avail = [];
    if (document.getElementById(h_id).innerHTML != "X") {ids_avail.push(h_id)};
    if (document.getElementById(u_id).innerHTML != "X") {ids_avail.push(u_id)};
    if (document.getElementById(b_id).innerHTML != "X") {ids_avail.push(b_id)};
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