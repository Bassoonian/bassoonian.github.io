function openLexicon()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'><select id='current_stage_select' onchange='changeDicStage();'>";
	for(var i=0;i<stage.s.length;i+=1)
	{
		newhtml+="<option value='"+i+"'";
		if (i==dic_current_stage) newhtml+=" selected";
		newhtml+=">"+stage.s[i]+"</option>";
	}
	newhtml+="</select> ("+dictionary[dic_current_stage].length+" matches)</span></div><div id='div_searchbox'><input type='text' class='searchclass' id='searchbox' oninput='loadLexList();'> <button type='button' class='searchclass' onclick='openSearchOverlay();'>Advanced...</button></div><div id='searchresults'>";
	newhtml+="</div><div id='entryinformation'>Select a word on the left to learn more about it.</div>";
	document.getElementById("content").innerHTML=newhtml;
	newhtml="<table border='0' style='width: 100%; text-align: center;'><tr><th colspan='2'>Advanced Search</th></tr><tr><td colspan='2'><input type='text' class='searchclass' id='searchbox_dummy' oninput='updateNonDummySearch();loadLexList();'></td></tr><tr><td style='width: 50%;'>Search Field: <select id='searchselect' class='searchclass' onchange='loadLexList();'><option value='1'>"+stage.s[dic_current_stage]+"</option><option value='2'>English</option></select></td><td>Classes:</br><input type='checkbox' id='search_check_noun' onchange='loadLexList();' checked> Nouns<br><input type='checkbox' id='search_check_adj' onchange='loadLexList();' checked> Adjectives<br><input type='checkbox' id='search_check_num' onchange='loadLexList();' checked> Numerals<br><input type='checkbox' id='search_check_verb' onchange='loadLexList();' checked> Verbs<br><input type='checkbox' id='search_check_pref' onchange='loadLexList();' checked> Prefixes</br><input type='checkbox' id='search_check_suf' onchange='loadLexList();' checked> Suffixes<br><input type='checkbox' id='search_check_prep' onchange='loadLexList();' checked> Prepositions<br><input type='checkbox' id='search_check_part' onchange='loadLexList();' checked> Particles</td></tr><tr><td colspan='2'><button type='button' class='searchclass' onclick='closeSearchOverlay();'>Back</button></td></tr></table>";
	document.getElementById("search_overlay3").innerHTML=newhtml;
	loadLexList();
}

function changeDicStage()
{
	dic_current_stage=Number(document.getElementById("current_stage_select").value);
	openLexicon();
}

function openContact()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>Contact</span></div><div id='textblock'>Did you notice an error or do you have a suggestion? Please let me know by contacting me!<ul><li>Reddit: <a class='link' onclick='wopen("+'"'+"https://www.reddit.com/message/compose/?to=Iasper"+'"'+");'>Iasper</a></li><li>Twitter: <a class='link' onclick='wopen("+'"'+"https://twitter.com/intent/tweet?text=@Bassoonian%20"+'"'+");'>@Bassoonian</a></li></ul></div>";
	document.getElementById("content").innerHTML=newhtml;
}

function wopen(url)
{
	window.open(url);
}

function openForeword()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>Foreword</span></div><div id='textblock'><b>Untitled</b> is an a posteriori artificially constructed language, serving as a project to both enrich my linguistic knowledge and to apply it. The contents of this website haven't been made up on the spot - in fact, every single part of this language has been created through research of the Proto-Indo-European language and its descendants. My main goal was to create a language that follows realistic laws on language evolution, in such a way the final result is a language that hypothetically could have existed today. As a result, along with the fact our knowledge concerning the Proto-Indo-European language keeps expanding and changing, this language will forever be considered a work in progress. Whenever a new discovery is made concerning this Proto-language, I carefully go through "+stage.s[0]+"'s grammar and vocabulary to make sure everything stays as accurate as possible.</br></br>Along with the actual grammar and vocabulary, in-depth descriptions of how the grammar evolved as well as the hypothetical history of its speakers are provided as well. Due to the nature of this work, historical information will be presented as authentic and realistic, despite the fact many of the events obviously never happened. Nonetheless, a great deal of research went into these documents as well, meaning most events pertaining to non-fictional people have, in fact, happened in our historical timeline.</br></br>I would like to thank Elector Dark in special. Without him, this entire project would not have been possible. His tremendous amount of knowledge concerning linguistics has been and always will be something truly inspiring.</div>";
	document.getElementById("content").innerHTML=newhtml;
}

function openIntroduction()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>History</span></div><div id='textblock'>Not much is known about the early history of the Untitled language and its speakers. No written records of the language remain; however, they had contact with the Ancient Greeks frequently. In fact, a fair portion of the "+stage.s[0]+" vocabulary consists of loans from Ancient Greek.</div>";
	document.getElementById("content").innerHTML=newhtml;
}

function openDocumentation()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>Documentation</span></div><div id='textblock'>Note: This documentation is currently a work in progress and highly unstructured.</br></br>";
	newhtml+="<b>Proto-Indo-European Phonology</b><table border='1'><tr><td colspan='2' rowspan='2'></td><th rowspan='2'>Labial</th><th rowspan='2'>Coronal</th><th colspan='3'>Dorsal</th><th rowspan='2'>Laryngeal</th></tr><tr><th>palatal</th><th>plain</th><th>labial</th></tr><tr><th colspan='2'>Nasal</th><td align='center'>*m</td><td align='center'>*n</td></tr><th rowspan='3'>Plosive</th><th>voiceless</th><td align='center'>*p</td><td align='center'>*t</td><td align='center'>*ḱ</td><td align='center'>*k</td><td align='center'>kʷ</td></tr><tr><th>voiced</th><td align='center'>*b</td><td align='center'>*d</td><td align='center'>*ǵ</td><td align='center'>*g</td><td align='center'>*gʷ</td></tr><tr><th>aspirated</th><td align='center'>*bʰ</td><td align='center'>*dʰ</td><td align='center'>*ǵʰ</td><td align='center'>*gʰ</td><td align='center'>*gʷʰ</td></tr><tr><th colspan='2'>Fricative</th><td></td><td align='center'>*s</td><td colspan='3'></td><td align='center'>*h₁ *h₂ *h₃</td></tr><tr><th colspan='2'>Liquid</th><td></td><td align='center'>*r *l</td></tr><tr><th colspan='2'>Semivowel</th><td colspan='2'></td><td align='center'>*y</td><td></td><td align='center'>*w</td></tr></table><table border='1'><tr><td></td><th>Front</th><th>Back</th></tr><tr><th>Mid</th><td align='center'>*e</td><td align='center'>*o *ō</td></tr></table></br></br>";
	newhtml+="<b>"+stage.s[0]+" Phonology</b><table border='1'><tr><td></td><th>Bilabial</th><th>Labiodental</th><th>Dental</th><th>Alveolar</th><th>Postalveolar</th><th>Palatal</th><th>Velar</th><th>Glottal</th></tr><tr><th>Plosive</th><td align='center'>p b</td><td></td><td colspan='3' align='center'>t d</td><td></td><td align='center'>k g</td></tr><tr><th>Nasal</th><td align='center'>m</td><td></td><td colspan='3' align='center'>n</td><td></td><td align='center'>[ŋ]<sup>1</sup></td></tr><tr><th>Trill</th><td colspan='2'></td><td colspan='3' align='center'>r</td></tr><tr><th>Fricative</th><td></td><td align='center'>f v</td><td></td><td align='center'>s z</td><td colspan='3'></td><td align='center'>h</td></tr><tr><th>Approximant</th><td></td><td align='center'>ʋ</td><td colspan='3'></td><td align='center'>j</td></tr><tr><th>Lateral</br>Approximant</th><td colspan='2'></td><td colspan='3' align='center'>l</td></tr></table><sup>1</sup>Allophone of /n/ preceding a velar plosive.</br></br>";//Add vowels
	newhtml+="<b>"+stage.s[1]+" Phonology</b><table border='1'><tr><td></td><th>Bilabial</th><th>Labiodental</th><th>Dental</th><th>Alveolar</th><th>Postalveolar</th><th>Palatal</th><th>Velar</th><th>Glottal</th></tr><tr><th>Plosive</th><td align='center'>p b</td><td></td><td colspan='3' align='center'>t d</td><td></td><td align='center'>k g</td></tr><tr><th>Nasal</th><td align='center'>m</td><td></td><td colspan='3' align='center'>n</td><td></td><td align='center'>[ŋ]<sup>1</sup></td></tr><tr><th>Trill</th><td colspan='2'></td><td colspan='3' align='center'>r</td></tr><tr><th>Fricative</th><td></td><td align='center'>f v</td><td align='center'>θ [ð]<sup>2</sup></td><td align='center'>s z</td><td colspan='3'></td><td align='center'>h</td></tr><tr><th>Approximant</th><td align='center'>w</td><td colspan='4'></td><td align='center'>j</td></tr><tr><th>Lateral</br>Approximant</th><td colspan='2'></td><td colspan='3' align='center'>l</td></tr></table><sup>1</sup>Allophone of /n/ preceding a velar plosive.</br><sup>2</sup>Allophone of /d/ in intervocalic positions.</br></br>";//Add vowels
	newhtml+="<b>"+stage.s[2]+" Phonology</b><table border='1'><tr><td></td><th>Bilabial</th><th>Labiodental</th><th>Dental</th><th>Alveolar</th><th>Postalveolar</th><th>Palatal</th><th>Velar</th><th>Glottal</th></tr><tr><th>Plosive</th><td align='center'>p b</td><td></td><td colspan='3' align='center'>t d</td><td></td><td align='center'>k g</td></tr><tr><th>Nasal</th><td align='center'>m</td><td></td><td colspan='3' align='center'>n</td><td></td><td align='center'>[ŋ]<sup>1</sup></td></tr><tr><th>Trill</th><td colspan='2'></td><td colspan='3' align='center'>r</td></tr><tr><th>Fricative</th><td align='center'>[β]<sup>2</sup></td><td align='center'>f v</td><td align='center'>θ [ð]<sup>3</sup></td><td align='center'>s z</td><td colspan='2'></td><td align='center'>[ɣ]<sup>4</sup></td><td align='center'>h</td></tr><tr><th>Approximant</th><td align='center'>w</td><td colspan='4'></td><td align='center'>j</td></tr><tr><th>Lateral</br>Approximant</th><td colspan='2'></td><td colspan='3' align='center'>l</td></tr></table><sup>1</sup>Allophone of /n/ preceding a velar plosive.</br><sup>2</sup>Allophone of /b/ in intervocalic positions.</br><sup>3</sup>Allophone of /d/ in intervocalic positions.</br><sup>4</sup>Allophone of /g/ in intervocalic positions.</br></br>";//Add vowels
	newhtml+="</div>";
	document.getElementById("content").innerHTML=newhtml;
}

function loadLexList()
{
	var newhtml="";
	var searchdata=document.getElementById("searchbox").value;
	searchdata=searchRemoveDiacritics(searchdata);
	searchdata=replaceAll("*","",searchdata);
	searchdata=escapeRegExp(searchdata);
	for(var i=0;i<dictionary[dic_current_stage].length;i++)
	{
		var success=false;
		if (document.getElementById("searchselect").value==1)
		{
			if (searchdata==""|searchRemoveDiacritics(dictionary[dic_current_stage][i][0]).search(searchdata)!=-1) success=true;
		}
		else
		{
			for(var j=0;j<dictionary[dic_current_stage][i][1].length;j++)
			{
				for(var k=0;k<dictionary[dic_current_stage][i][1][j][2].length;k++)
				{
					if (searchdata==""|searchRemoveDiacritics(dictionary[dic_current_stage][i][1][j][2][k]).search(searchdata)!=-1) success=true;
				}
			}
		}
		if (success==true)
		{
			success=false;
			for(var j=0;j<dictionary[dic_current_stage][i][1].length;j++)
			{
				if (dictionary[dic_current_stage][i][1][j][0]==cl.noun&&document.getElementById("search_check_noun").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.adj&&document.getElementById("search_check_adj").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.num&&document.getElementById("search_check_num").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.verb&&document.getElementById("search_check_verb").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.pref&&document.getElementById("search_check_pref").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.part&&document.getElementById("search_check_part").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.prep&&document.getElementById("search_check_prep").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.suf&&document.getElementById("search_check_suf").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.sufn&&document.getElementById("search_check_suf").checked==true) success=true;
				if (dictionary[dic_current_stage][i][1][j][0]==cl.sufa&&document.getElementById("search_check_suf").checked==true) success=true;
			}
		}
		if (success==true)
		{
			newhtml+="<div class='searchresult' onclick='openLex(dic_current_stage,this)'>";
			if (dic_current_stage<2) newhtml+="*";
			newhtml+=dictionary[dic_current_stage][i][0]+"</div>";
		}
	}
	document.getElementById("searchresults").innerHTML=newhtml;
}

function openSearchOverlay()
{
	document.getElementById("search_overlay").style.display="table";
	document.getElementById("searchbox_dummy").value=document.getElementById("searchbox").value;
}

function closeSearchOverlay()
{
	document.getElementById("search_overlay").style.display="none";
}

function updateNonDummySearch()
{
	document.getElementById("searchbox").value=document.getElementById("searchbox_dummy").value;
}

openForeword();

document.getElementById("titletext").innerHTML=stage.s[stage.s.length-1];
document.getElementById("header").innerHTML=stage.s[stage.s.length-1];