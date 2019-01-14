
// Beregn OG
function x() {
		document.getElementById('g').value = ((1000 +
			(
				375*parseFloat(document.getElementById('dme').value) +
				270*parseFloat(document.getElementById('lme').value)
			) /
			parseFloat(document.getElementById('vol').value)
			+
			parseFloat(document.getElementById('eff').value) * 
			(
				296*parseFloat(document.getElementById('basis').value) + 
				270*parseFloat(document.getElementById('spes').value)
			) /
			(
				100*parseFloat(document.getElementById('vol').value)
			)
		)/1000).toFixed(3);
	};
	
	// Total masse
	function f() {
		//var m = $('#m').val();		
		document.getElementById('m').value = (
			parseFloat(document.getElementById('basis').value) +
			parseFloat(document.getElementById('spes').value) +
			parseFloat(document.getElementById('lme').value) +
			parseFloat(document.getElementById('dme').value) 
		).toFixed(2);
	};
	
	// Andel i prosent
	function p() {
		document.getElementById('pbasis').value = ((100*parseFloat(document.getElementById('basis').value)) / document.getElementById('m').value).toFixed(0);
		document.getElementById('pspes').value = ((100*parseFloat(document.getElementById('spes').value)) / document.getElementById('m').value).toFixed(0);
		document.getElementById('plme').value = ((100*parseFloat(document.getElementById('lme').value)) / document.getElementById('m').value).toFixed(0);
		document.getElementById('pdme').value = ((100*parseFloat(document.getElementById('dme').value)) / document.getElementById('m').value).toFixed(0);
	};

	// Amerikanskel mål
	function imp() {
		document.getElementById('lbbasis').value = (parseFloat(document.getElementById('basis').value) * 2.2046).toFixed(1);
		document.getElementById('lbspes').value = (parseFloat(document.getElementById('spes').value) * 2.2046).toFixed(1);
		document.getElementById('lblme').value = (parseFloat(document.getElementById('lme').value) * 2.2046).toFixed(1);
		document.getElementById('lbdme').value = (parseFloat(document.getElementById('dme').value) * 2.2046).toFixed(1);
		document.getElementById('lbtot').value = (parseFloat(document.getElementById('m').value) * 2.2046).toFixed(1);
		document.getElementById('galvol').value = (parseFloat(document.getElementById('vol').value) / 3.7854).toFixed(1);
	};
	
	// ABV
	function fabv() {
		var fg = parseFloat(document.getElementById('fginput').value);
		var og = parseFloat(document.getElementById('oginput').value);
		var vol_w = parseFloat(document.getElementById('vol').value);
		var vol_co2 = parseFloat(document.getElementById('in_vol_co2').value);
		var wtemp = parseFloat(document.getElementById('in_temp').value);
		var vol_co2_w, tempfar, vol_co2_toadd, gram_co2_toadd, ferm_true, ferm_apparent, sg_trgt
		/* Beregne mengde priming */
		/* Convertere til Farenheit*/
		tempfar = 1.8*wtemp+32;
		/* Vol CO2 allerede i vørter: */
		vol_co2_w = 3.0378 - (0.050062 * tempfar) + (0.00026555 * tempfar*tempfar)
		document.getElementById('out_co2_wort').value = vol_co2_w.toFixed(1);
		/* Vol CO2 som må tilføres: */
		vol_co2_toadd = vol_co2 - vol_co2_w;
		gram_co2_toadd = 1.96*vol_co2_toadd;
		/* Priming med sukrose/farin: */
		document.getElementById('out_priming_sugar').value = (1.96*1.96*vol_w*vol_co2_toadd).toFixed(0);
		document.getElementById('out_priming_sugar_L').value = (1.96*1.96*vol_co2_toadd).toFixed(0);
		/* Priming med DME */
		document.getElementById('out_priming_dme').value = (1.96*1.96*vol_w*vol_co2_toadd/(0.82*0.80)).toFixed(0);
		/* Priming med rest av vørter fra samme brygg */
		/* Beregne utgjæringsgraden for øllet: */
		ferm_apparent = (og-fg)/(og-1.0)
		ferm_true = 0.82*ferm_apparent;
		/* Using rule of thumb: 1 point SG gives approx 0.5 volumes CO2 when fermented */
		sg_trgt = fg+vol_co2_toadd*0.002;
		/* document.getElementById('sg_points').value = (sg_trgt-fg).toFixed(5); */
		document.getElementById('out_priming_wort').value = (vol_w*(fg-sg_trgt)/(sg_trgt-og)).toFixed(2);


		/* Simple formula for ABV: */
		/* document.getElementById('abv').value = ((og-fg)*131.25).toFixed(1); */
		/* Advanced formula, more accurate for higher abv: */
		document.getElementById('abvtot').value = ((76.08 * (og-fg) / (1.775-og)) * (fg / 0.794)).toFixed(1);
		
	};	

	// Bruk beregnet OG i stedet for inntastet
	function setInput() {
		document.getElementById('oginput').value = document.getElementById('g').value
	};

	// Bitterhet/IBU
	function ibu() {
		var og = document.getElementById('g').value;
		var v = document.getElementById('vol').value;
		var masses = [document.getElementById('mass1').value, document.getElementById('mass2').value, document.getElementById('mass3').value, document.getElementById('mass4').value, document.getElementById('mass5').value];
		var alfas = [document.getElementById('alfa1').value/100, document.getElementById('alfa2').value/100, document.getElementById('alfa3').value/100, document.getElementById('alfa4').value/100, document.getElementById('alfa5').value/100];
		var times = [document.getElementById('time1').value, document.getElementById('time2').value, document.getElementById('time3').value, document.getElementById('time4').value, document.getElementById('time5').value];
		var ibu1, ibu2, ibu3, ibu4, ibu5;
		var ibus = [ibu1, ibu2, ibu3, ibu4, ibu5];

		for (i=0; i<5; i++) {
			ibus[i] = (alfas[i]*masses[i]*1000/v) 
					* (1.65*Math.pow(0.000125,(og-1))) 
					* (1-Math.exp(-0.04*times[i]))/4.15;
		}

		document.getElementById('ibu1').value = (ibus[0]).toFixed(1);
		document.getElementById('ibu2').value = (ibus[1]).toFixed(1);
		document.getElementById('ibu3').value = (ibus[2]).toFixed(1);
		document.getElementById('ibu4').value = (ibus[3]).toFixed(1);
		document.getElementById('ibu5').value = (ibus[4]).toFixed(1);
	
		document.getElementById('ibutot').value = (ibus[0]+ibus[1]+ibus[2]+ibus[3]+ibus[4]).toFixed(0);
	};

	// Konverteringsslider for temperatur
	function temp() {
		var fx = document.getElementById("myRangeT").value;
		document.getElementById("ftemp").innerHTML = (fx*1 + 0).toFixed(1);
		var cx = ((fx - 32.0)/1.8).toFixed(1);
		document.getElementById("ctemp").innerHTML = cx;
	};

	// Konverteringsslider for vekt
	function gOz() {
		var ozx = document.getElementById("myRangeW").value;
		document.getElementById("oz").innerHTML = (ozx*1 + 0).toFixed(2);
		var gx = (ozx*28.349).toFixed(1);
		document.getElementById("gram").innerHTML = gx;
	};










/* Export to new window with key data in plain text*/
function viewFormattedData () {
		/* Malt og vann */
		var basis = document.getElementById('basis').value;
		var spes = document.getElementById('spes').value;
		var dme = document.getElementById('dme').value;
		var lme = document.getElementById('lme').value;
		var vol = document.getElementById('vol').value;
		var eff = document.getElementById('eff').value;
		var totm = document.getElementById('m').value;
		var ogber = document.getElementById('g').value;
		var ogmaalt = document.getElementById('oginput').value;
		var fg = document.getElementById("fginput").value;
		var carbo = parseFloat(document.getElementById('carboinput').value);
		var abv = document.getElementById('abvtot').value;

		/* Humle */
		var masses = [document.getElementById('mass1').value, document.getElementById('mass2').value, document.getElementById('mass3').value, document.getElementById('mass4').value, document.getElementById('mass5').value];
		var alfas = [document.getElementById('alfa1').value, document.getElementById('alfa2').value, document.getElementById('alfa3').value, document.getElementById('alfa4').value, document.getElementById('alfa5').value];
		var times = [document.getElementById('time1').value, document.getElementById('time2').value, document.getElementById('time3').value, document.getElementById('time4').value, document.getElementById('time5').value];
		var ibu1 = document.getElementById('ibu1').value;
		var ibu2 = document.getElementById('ibu2').value;
		var ibu3 = document.getElementById('ibu3').value;
		var ibu4 = document.getElementById('ibu4').value;
		var ibu5 = document.getElementById('ibu5').value;
		var ibutot = document.getElementById('ibutot').value;


		var textOut = "<pre>"
		textOut += "<br/>Ingredienser:<br/>--------------------------<br/>";
		if (basis != 0.0) {
			textOut += ""+basis+"kg basismalt<br/>";
		}
		if (spes != 0.0) {
			textOut += ""+spes+"kg spesialmalt<br/>";
		}
		if (lme != 0.0) {
			textOut += ""+dme+"kg sirup/maltekstrakt<br/>";
		}
		if (dme != 0.0) {
			textOut += ""+spes+"kg sukker/spraymalt<br/>";
		}
		textOut += "Totalt: "+totm+"kg<br/>";
		textOut += "<br/><br/>Humleskjema:<br/>--------------------------<br/>";
		if (masses[0] != 0.0) {
			textOut += ""+times[0]+" min: "+masses[0]+"g Humle ("+alfas[0]+"%)<br/>";
		}
		if (masses[1] != 0.0) {
			textOut += ""+times[1]+" min: "+masses[1]+"g Humle ("+alfas[1]+"%)<br/>";
		}
		if (masses[2] != 0.0) {
			textOut += ""+times[2]+" min: "+masses[2]+"g Humle ("+alfas[2]+"%)<br/>";
		}
		if (masses[3] != 0.0) {
			textOut += ""+times[3]+" min: "+masses[3]+"g Humle ("+alfas[3]+"%)<br/>";
		}
		if (masses[4] != 0.0) {
			textOut += ""+times[4]+" min: "+masses[4]+"g Humle ("+alfas[4]+"%)<br/>";
		}
		textOut += "<br/>Bitterhet: ca. "+ibutot+" IBU<br/><br/><br/>";
		textOut += "Vitale mål:<br/>--------------------------<br/>";
		textOut += "Vørtervolum: "+vol+" liter<br/>";
		textOut += "Effektivitet: "+eff+"% av teoretisk mulig meskeutbytte<br/>";
		/*textOut += "OG beregnet: "+ogber+"<br/>";*/
		textOut += "OG målt: "+ogmaalt+"<br/>";
		textOut += "FG målt: "+fg+"<br/>";
		textOut += "Karbonering med sukker: "+carbo+"g/L<br/><br/>";
		textOut += "ABV inkl. karbonering: "+abv+"%<br/><br/>";
		textOut += "</pre>";
		var newWindow = window.open();
		newWindow.document.write(textOut);
	};







/* Last updated in footer */
var lm = new  Date(document.lastModified);
	document.getElementById("lastMod").innerHTML = ""+lm.getDate()+"/"+(lm.getMonth()+1)+"-"+lm.getFullYear()+"";


/*
	+", kl. "+lm.getHours()+":"+lm.getMinutes()+":"+lm.getSeconds()
*/











