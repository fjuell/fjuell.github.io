

function toggleX(anID) {
  var x = document.getElementById(anID);
  if (x.innerHTML === "&nbsp;") {
    x.innerHTML = "X";
  } else {
    x.innerHTML = "&nbsp;";
  }
}



function tipptilfeldig(limHU, limUB) {
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
          // Slett alle kryss
          /*document.getElementById(h_id).innerHTML = "&nbsp;";
          document.getElementById(u_id).innerHTML = "&nbsp;";
          document.getElementById(b_id).innerHTML = "&nbsp;";*/

          if (document.getElementById(h_id).innerHTML == "X" || document.getElementById(u_id).innerHTML == "X" || document.getElementById(b_id).innerHTML == "X") {
            continue;
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

        if (rekker==48) {
          let last_element = halvgarderte[halvgarderte.length - 1]
          document.getElementById(last_element.concat("h")).innerHTML = "X";
          document.getElementById(last_element.concat("u")).innerHTML = "X";
          document.getElementById(last_element.concat("b")).innerHTML = "X";
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
        }
      }