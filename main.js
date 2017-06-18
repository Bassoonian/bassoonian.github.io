function openLexicon()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>"+lexlist.length+" entries found</span></div><div id='div_searchbox'><input type='text' class='searchclass' id='searchbox' oninput='loadLexList();' placeholder='Search...'> <!--- <button type='button' class='searchclass' onclick='openSearchOverlay();'>Advanced...</button> ---></div><div id='div_buttonleft'><span class='button2' onclick='openSoundChanges();'>Sound Changes</span></div><div id='searchresults'>";
	newhtml+="</div><div id='entryinformation'>Select a word on the left to learn more about it.</div>";
	document.getElementById("content").innerHTML=newhtml;
	newhtml="<table border='0' style='width: 100%; text-align: center;'><tr><th colspan='2'>Advanced Search</th></tr><tr><td colspan='2'><input type='text' class='searchclass' id='searchbox_dummy' oninput='updateNonDummySearch();loadLexList();'></td></tr><tr><td style='width: 50%;'>Search Field: <select id='searchselect' class='searchclass' onchange='loadLexList();'><option value='1'>Carisitt</option><option value='2'>English</option></select></td><td>Classes:</br><input type='checkbox' id='search_check_noun' onchange='loadLexList();' checked> Nouns<br><input type='checkbox' id='search_check_adj' onchange='loadLexList();' checked> Adjectives<br><input type='checkbox' id='search_check_num' onchange='loadLexList();' checked> Numerals<br><input type='checkbox' id='search_check_verb' onchange='loadLexList();' checked> Verbs<br><input type='checkbox' id='search_check_pref' onchange='loadLexList();' checked> Prefixes</br><input type='checkbox' id='search_check_suf' onchange='loadLexList();' checked> Suffixes<br><input type='checkbox' id='search_check_prep' onchange='loadLexList();' checked> Prepositions<br><input type='checkbox' id='search_check_part' onchange='loadLexList();' checked> Particles</td></tr><tr><td colspan='2'><button type='button' class='searchclass' onclick='closeSearchOverlay();'>Back</button></td></tr></table>";
	document.getElementById("search_overlay3").innerHTML=newhtml;
	loadLexList();
}

function openSoundChanges()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>Sound Changes</span></div><div id='div_searchbox'><span class='button2' onclick='openSoundChanges();'>Refresh</span></div><div id='div_buttonleft'><span class='button2' onclick='openLexicon();'>Lexicon</span></div><div id='textblock'>";
	newhtml+="<h1>Preface</h1><p>Below, you can find a list of the sound changes Carisitt has experienced in the thousands of years of its existence. They are shown chronologically, divided in the different stages which are in turn divided in smaller periods. Changes shown in red are theoreticised to have happened but lack evidence.</p><p>Examples underneath each rule will be provided and they can be rerolled from the database by pushing the Refresh button in the top right. Words will be shown as their original form at the beginning of the stage, what it looked like before the change, what it looked like after the change, and what the word becomes at the end of the stage.</p>";
	var justtitle=false;
	var curstage=0;
	for(var i=3;i<dbase[1].length;i++)
	{
		if (dbase[0][i]!="")
		{
			if (i!=3) newhtml+="</ul></ul>";
			newhtml+="<h1>"+dbase[0][i]+"</h1>";
			justtitle=true;
			curstage+=1;
		}
		if (dbase[1][i]=="LOANS")
		{
			newhtml+="</ul></ul><h2>"+dbase[2][i]+"</h2>";
			justtitle=true;
		}
		if (dbase[1][i]!=""&&dbase[1][i]!="RESULT"&&dbase[1][i]!="MEANING"&&dbase[1][i]!="LOANS"&&dbase[1][i]!="GRAMMAR")
		{
			if (justtitle==true)
			{
				justtitle=false;
				newhtml+="<ul>";
			}
			else
			{
				newhtml+="</ul></li>";
			}
			newhtml+="<li>"+replaceAll("§",",",dbase[1][i]).replace("lang{}","Carisitt")+"<ul>";
		}
		if (dbase[2][i]!="CHANGES"&&dbase[2][i]!="VVV"&&dbase[1][i]!="LOANS")
		{
			var temparray=[];
			for(var j=3;j<dbase.length;j++)
			{
				if (dbase[j][i]!="") temparray.push(j);
			}
			newhtml+="<li>";
			if (temparray.length==0) newhtml+="<span class='unknownchange'>";
			newhtml+=dbase[2][i];
			if (temparray.length==0) newhtml+="</span>";
			if (temparray.length>0)
			{
				var chosenrow=temparray[Math.floor(Math.random()*temparray.length)];
				newhtml+="<ul><li>"+orthGraph(dbase[chosenrow][stagelist[curstage][1]-2],curstage-1);
				var newrow=-1;
				for(var j=0;j<i-stagelist[curstage][1];j++)
				{
					if (dbase[chosenrow][i-j]!=""&&i-j!=i)
					{
						newrow=i-j;
						j=i-stagelist[curstage][1];
					}
				}
				if (newrow!=-1) newhtml+=" > "+orthGraph(dbase[chosenrow][newrow],curstage-1)
				newhtml+=" > <b>"+orthGraph(dbase[chosenrow][i],curstage-1)+"</b>";
				if (i<450) newrow=stagelist[curstage+1][1]-2;
				else newrow=dbase[0].length-2;
				newhtml+=" > "+orthGraph(dbase[chosenrow][newrow],curstage-1)+"</li></ul>";
			}
			newhtml+="</li>";
		}
	}
	newhtml+="</ul></div>";
	document.getElementById("content").innerHTML=newhtml;
}

function wopen(url)
{
	window.open(url);
}

function loadLexList()
{
	var newhtml="";
	var searchdata=document.getElementById("searchbox").value;
	searchdata=searchRemoveDiacritics(searchdata);
	searchdata=replaceAll("*","",searchdata);
	searchdata=escapeRegExp(searchdata);
	for(var i=0;i<lexlist.length;i++)
	{
		var success=false;
		if (document.getElementById("searchselect").value==1)
		{
			if (searchdata==""|searchRemoveDiacritics(lexlist[i][0]).search(searchdata)!=-1) success=true;
		}
		if (success==true)
		{
			newhtml+="<div class='searchresult' onclick='openLex(lexlist["+i+"])'>";
			newhtml+=lexlist[i][0]+"</div>";
		}
	}
	document.getElementById("searchresults").innerHTML=newhtml;
}

function replace_nth_instance(s, p, c, r) {
    var output = new String();
    var match;
    var current_scan = 1;
    while ((match = c.exec(s)) != null) {
        if (current_scan == p) {
            output = s.substr(0, match.index) + r + s.substr(match.index + match[0].length);
        }
        current_scan += 1;
    }
    return output;
}

function openLex2(pad)
{
	var i=-1;
	for(var j=0;j<lexlist.length;j++)
	{
		if (lexlist[j][1]==pad) i=j;
	}
	if (i==-1) alert("Error: unable to open required word.");
	else openLex(lexlist[i]);
}

function openLex(qid)
{
	var nid=qid[1];
	var newhtml="<h1>"+(orthGraph(dbase[nid][orthcolumn],7).split("~"))[0]+"</h1>";
	var pron1=dbase[nid][dbase[0].length-2].replace(/\[.*?\]/g,"").toLowerCase();
	var pron2=dbase[nid][dbase[0].length-2].toLowerCase().replace(pron1,"").replace("[","").replace("]","");
	if (pron2=="") pron2=pron1;
	
	if ((pron1.match(/\./g) || []).length<2) pron1="ˈ"+pron1;
	else pron1=replace_nth_instance(pron1,(pron1.match(/\./g) || []).length-1,/\./g,".ˈ");
	if ((pron2.match(/\./g) || []).length<2) pron2="ˈ"+pron2;
	else pron2=replace_nth_instance(pron2,(pron2.match(/\./g) || []).length-1,/\./g,".ˈ");
	
	newhtml+="<h2>/"+pron1+"/ ["+pron2+"]</h2>";
	
	var cl=qid[2];
	if (cl=="THEM_MASC"||cl=="THEM_FEM"||cl=="IS"||cl=="ĒR"||cl=="US")
	{
		newhtml+="<h3>Noun</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>; <span class='hovertext' title='common gender'>c</span>";
	}
	if (cl=="THEM_NEUT"||cl=="OR"||cl=="U")
	{
		newhtml+="<h3>Noun</h3><b>"+orthGraph(dbase[nid][orthcolumn],7).replace("~"," ~ ")+"</b>; <span class='hovertext' title='neuter gender'>n</span>";
	}
	
	newhtml+="<h4>Translation</h4><ol><li>"+replaceAll("§","</li><li>",dbase[nid][dbase[0].length-1])+"</li></ol>";
	
	var syn=[];
	for(var j=0;j<(dbase[nid][dbase[0].length-1].split("§")).length;j++)
	{
		for(var i=3;i<dbase.length;i++)
		{
			if (dbase[i][0]!="//"&&i!=nid)
			{
				for(var k=0;k<(dbase[i][dbase[0].length-1].split("§")).length;k++)
				{
					if ((dbase[i][dbase[0].length-1].split("§"))[k]==(dbase[nid][dbase[0].length-1].split("§"))[j]) syn.push([j,i]);
				}
			}
		}
	}
	
	if (syn.length>0)
	{
		newhtml+="<h4>Synonyms</h4><ul>";
		var i=-1;
		var k=false;
		for(var j=0;j<syn.length;j++)
		{
			if (syn[j][0]!=i)
			{
				if (i==-1) newhtml+="<li>(<i>"+dbase[nid][dbase[0].length-1].split("§")[syn[j][0]]+"</i>): ";
				i=syn[j][0];
				k=false;
			}
			if (k==true) newhtml+=", ";
			newhtml+="<span class='link' onclick='openLex2("+syn[j][1]+");'>"+(orthGraph(dbase[syn[j][1]][orthcolumn],7).split("~"))[0]+"</span>";
		}
		newhtml+="</li></ul>"
	}
	
	newhtml+="<h4>Etymology</h4>"
	var newhtml2="";
	var stagepass=stagelist.length-2;
	for(var i=0;i<happenings.length;i++)
	{
		if (dbase[nid][happenings[i][1]]!="")
		{
			if (newhtml2!="") newhtml2+=", ";
			if (happenings[i][0]!="STAGE")
			{
				var temparr=dbase[nid][happenings[i][1]].split(" ");
				newhtml2+="loaned from "+temparr[0].replace("L^L","Latin").replace("L^C","Proto-Celtic").replace("L^G","Ancient Greek").replace("L^B","Proto-Basque").replace("L^","").replace("_"," ")+" <i>"+temparr[1]+"</i> around "+happenings[i][0];
				i=happenings.length;
			}
			else
			{
				if (stagepass!=8) newhtml2+="from "+stagelist[stagepass][0]+" <i>"+orthGraph(dbase[nid][happenings[i][1]].replace(/\[.*?\]/g,"").replace("~"," ~ "),stagepass-1)+"</i>";
				stagepass-=1;
			}
		}
	}
	newhtml+=newhtml2.charAt(0).toUpperCase()+newhtml2.slice(1)+".";
	
	document.getElementById("entryinformation").innerHTML=newhtml;
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

rawcsv=$.get("https://docs.google.com/spreadsheets/d/1XJMnBv6NcE-YzmR7WPIryln0m_PS9kltAhhmZG-DBs8/pub?gid=853780085&single=true&output=csv", function() {
	console.log("Attempting to connect to server...");
})
	.done(function(){
		console.log("Lexicon retrieval succesful!");
		dbase=$.csv.toArrays(rawcsv.responseText);
		parseDbase();
	})
	.fail(function(){
		console.log("Unable to connect to Google. Resorting to local copy which may be out of date.");
		rawcsv=$.get("backup_csv.csv", function() {
			console.log("Attempting to read local file...");
		})
			.done(function(){
				console.log("Lexicon retrieval succesful!");
				dbase=$.csv.toArrays(rawcsv.responseText);
				parseDbase();
			})
			.fail(function(){
				console.log("No local copy can be found.");
				loaderror();
			});
	});
	
function loaderror()
	{
		alert("An error has occurred while loading the lexicon. Please try again later.");
	}
	
function escapeRegExp(string) {
	    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
	}

function replaceAll(find, replace, string) {
	  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	}
	
function orthGraph(str,stag)
	{
		str=replaceAll(".","",str).replace(/\[.*?\]/g,"");
		if (stag<3)
			{
				str="*"+str;
				str=replaceAll("x","h",str);
				str=replaceAll("X","H",str);
			}
		if (stag==3)
		{
			str=replaceAll("ks","x",str);
			str=replaceAll("Ks","X",str);
			str=replaceAll("ka","ca",str);
			str=replaceAll("ko","co",str);
			str=replaceAll("ky","cy",str);
			str=replaceAll("ku","cu",str);
			str=replaceAll("kø","cø",str);
			str=replaceAll("Ka","Ca",str);
			str=replaceAll("Ko","Co",str);
			str=replaceAll("Ky","Cy",str);
			str=replaceAll("Ku","Cu",str);
			str=replaceAll("Kø","Cø",str);
			str=replaceAll("ki","qui",str);
			str=replaceAll("ke","que",str);
			str=replaceAll("Ki","Qui",str);
			str=replaceAll("Ke","Que",str);
			str=replaceAll("k","c",str);
			str=replaceAll("K","C",str);
			str=replaceAll("ø","eu",str);
			str=replaceAll("Ø","Eu",str);
			str=replaceAll("^ɲ","Nh",str);
			str=replaceAll("^ʎ","Lh",str);
			str=replaceAll("ɲ","nh",str);
			str=replaceAll("ʎ","lh",str);
			str=replaceAll("ui̯","ý",str);
			str=replaceAll("Ui̯","Ý",str);
			str=replaceAll("ou̯","ó",str);
			str=replaceAll("Ou̯","Ó",str);
			str=replaceAll("au̯","á",str);
			str=replaceAll("Au̯","Á",str);
			str=replaceAll("eu̯","é",str);
			str=replaceAll("Eu̯","É",str);
			str=replaceAll("ai̯","ae",str);
			str=replaceAll("Ai̯","Ae",str);
			str=replaceAll("oi̯","oe",str);
			str=replaceAll("Oi̯","Oe",str);
			str=replaceAll("t͡ʃ","ch",str);
			str=replaceAll("d͡ʒ","gh",str);
			str=replaceAll("t͡s","ts",str);
			str=replaceAll("d͡z","dz",str);
			str=replaceAll("j","i",str);
			str=replaceAll("J","I",str);
			str=replaceAll("W","U",str);
			str=replaceAll("w","u",str);
		}
		if (stag==4)
		{
			str=replaceAll("ks","x",str);
			str=replaceAll("Ks","X",str);
			str=replaceAll("ka","ca",str);
			str=replaceAll("ko","co",str);
			str=replaceAll("ky","cy",str);
			str=replaceAll("ku","cu",str);
			str=replaceAll("kø","cø",str);
			str=replaceAll("Ka","Ca",str);
			str=replaceAll("Ko","Co",str);
			str=replaceAll("Ky","Cy",str);
			str=replaceAll("Ku","Cu",str);
			str=replaceAll("Kø","Cø",str);
			str=replaceAll("ki","qui",str);
			str=replaceAll("ke","que",str);
			str=replaceAll("Ki","Qui",str);
			str=replaceAll("Ke","Que",str);
			str=replaceAll("k","c",str);
			str=replaceAll("K","C",str);
			str=replaceAll("ø","eu",str);
			str=replaceAll("Ø","Eu",str);
			str=replaceAll("^ɲ","Nh",str);
			str=replaceAll("^ʎ","Lh",str);
			str=replaceAll("ɲ","nh",str);
			str=replaceAll("ʎ","lh",str);
			str=replaceAll("ui̯","ý",str);
			str=replaceAll("Ui̯","Ý",str);
			str=replaceAll("ou̯","ó",str);
			str=replaceAll("Ou̯","Ó",str);
			str=replaceAll("au̯","á",str);
			str=replaceAll("Au̯","Á",str);
			str=replaceAll("eu̯","é",str);
			str=replaceAll("Eu̯","É",str);
			str=replaceAll("ai̯","ae",str);
			str=replaceAll("Ai̯","Ae",str);
			str=replaceAll("oi̯","oe",str);
			str=replaceAll("Oi̯","Oe",str);
			str=replaceAll("t͡ʃ","ch",str);
			str=replaceAll("d͡ʒ","gh",str);
			str=replaceAll("t͡s","ts",str);
			str=replaceAll("d͡z","dz",str);
			str=replaceAll("j","i",str);
			str=replaceAll("J","I",str);
			str=replaceAll("W","U",str);
			str=replaceAll("w","u",str);
		}
		if (stag==5)
		{
			str=replaceAll("ks","x",str);
			str=replaceAll("Ks","X",str);
			str=replaceAll("ka","ca",str);
			str=replaceAll("ko","co",str);
			str=replaceAll("ky","cy",str);
			str=replaceAll("ku","cu",str);
			str=replaceAll("kø","cø",str);
			str=replaceAll("Ka","Ca",str);
			str=replaceAll("Ko","Co",str);
			str=replaceAll("Ky","Cy",str);
			str=replaceAll("Ku","Cu",str);
			str=replaceAll("Kø","Cø",str);
			str=replaceAll("ki","qui",str);
			str=replaceAll("ke","que",str);
			str=replaceAll("Ki","Qui",str);
			str=replaceAll("Ke","Que",str);
			str=replaceAll("k","c",str);
			str=replaceAll("K","C",str);
			str=replaceAll("ø","eu",str);
			str=replaceAll("Ø","Eu",str);
			str=replaceAll("^ɲ","Nh",str);
			str=replaceAll("^ʎ","Lh",str);
			str=replaceAll("ɲ","nh",str);
			str=replaceAll("ʎ","lh",str);
			str=replaceAll("ui̯","ý",str);
			str=replaceAll("Ui̯","Ý",str);
			str=replaceAll("ou̯","ó",str);
			str=replaceAll("Ou̯","Ó",str);
			str=replaceAll("au̯","á",str);
			str=replaceAll("Au̯","Á",str);
			str=replaceAll("eu̯","é",str);
			str=replaceAll("Eu̯","É",str);
			str=replaceAll("ai̯","ae",str);
			str=replaceAll("Ai̯","Ae",str);
			str=replaceAll("oi̯","oe",str);
			str=replaceAll("Oi̯","Oe",str);
			str=replaceAll("t͡ʃ","ch",str);
			str=replaceAll("d͡ʒ","gh",str);
			str=replaceAll("t͡s","ts",str);
			str=replaceAll("d͡z","dz",str);
			str=replaceAll("j","i",str);
			str=replaceAll("J","I",str);
		}
		if (stag==6)
		{
			str=replaceAll("ks","x",str);
			str=replaceAll("Ks","X",str);
			str=replaceAll("ka","ca",str);
			str=replaceAll("ko","co",str);
			str=replaceAll("ky","cy",str);
			str=replaceAll("ku","cu",str);
			str=replaceAll("kø","cø",str);
			str=replaceAll("Ka","Ca",str);
			str=replaceAll("Ko","Co",str);
			str=replaceAll("Ky","Cy",str);
			str=replaceAll("Ku","Cu",str);
			str=replaceAll("Kø","Cø",str);
			str=replaceAll("ki","qui",str);
			str=replaceAll("ke","que",str);
			str=replaceAll("Ki","Qui",str);
			str=replaceAll("Ke","Que",str);
			str=replaceAll("k","c",str);
			str=replaceAll("K","C",str);
			str=replaceAll("ø","eu",str);
			str=replaceAll("Ø","Eu",str);
			str=replaceAll("^ɲ","Nh",str);
			str=replaceAll("^ʎ","Lh",str);
			str=replaceAll("ɲ","nh",str);
			str=replaceAll("ʎ","lh",str);
			str=replaceAll("ui̯","ý",str);
			str=replaceAll("Ui̯","Ý",str);
			str=replaceAll("ou̯","ó",str);
			str=replaceAll("Ou̯","Ó",str);
			str=replaceAll("au̯","á",str);
			str=replaceAll("Au̯","Á",str);
			str=replaceAll("eu̯","é",str);
			str=replaceAll("Eu̯","É",str);
			str=replaceAll("ai̯","ae",str);
			str=replaceAll("Ai̯","Ae",str);
			str=replaceAll("oi̯","oe",str);
			str=replaceAll("Oi̯","Oe",str);
			str=replaceAll("ʃ","ch",str);
			str=replaceAll("ʒ","gh",str);
			str=replaceAll("j","i",str);
			str=replaceAll("J","I",str);
		}
		if (stag==7)
		{
			str=replaceAll("ks","x",str);
			str=replaceAll("Ks","X",str);
			str=replaceAll("ka","ca",str);
			str=replaceAll("ko","co",str);
			str=replaceAll("ky","cy",str);
			str=replaceAll("ku","cu",str);
			str=replaceAll("kø","cø",str);
			str=replaceAll("Ka","Ca",str);
			str=replaceAll("Ko","Co",str);
			str=replaceAll("Ky","Cy",str);
			str=replaceAll("Ku","Cu",str);
			str=replaceAll("Kø","Cø",str);
			str=replaceAll("ki","qui",str);
			str=replaceAll("ke","que",str);
			str=replaceAll("Ki","Qui",str);
			str=replaceAll("Ke","Que",str);
			str=replaceAll("k","c",str);
			str=replaceAll("K","C",str);
			str=replaceAll("r̩","r",str);
			str=replaceAll("l̩","l",str);
			str=replaceAll("n̩","n",str);
			str=replaceAll("ø","eu",str);
			str=replaceAll("Ø","Eu",str);
			str=replaceAll("^ɲ","Nh",str);
			str=replaceAll("^ʎ","Lh",str);
			str=replaceAll("ɲ","nh",str);
			str=replaceAll("ʎ","lh",str);
			str=replaceAll("ui̯","ý",str);
			str=replaceAll("Ui̯","Ý",str);
			str=replaceAll("ou̯","ó",str);
			str=replaceAll("Ou̯","Ó",str);
			str=replaceAll("au̯","á",str);
			str=replaceAll("Au̯","Á",str);
			str=replaceAll("eu̯","é",str);
			str=replaceAll("Eu̯","É",str);
			str=replaceAll("ai̯","ae",str);
			str=replaceAll("Ai̯","Ae",str);
			str=replaceAll("oi̯","oe",str);
			str=replaceAll("Oi̯","Oe",str);
			str=replaceAll("ʃ","ch",str);
			str=replaceAll("ʒ","gh",str);
			str=replaceAll("j","i",str);
			str=replaceAll("J","I",str);
		}
		return(str);
	}
	
function parseDbase()
	{
		orthcolumn=-1;
		var j=dbase[1].length;
		for(var i=0;i<j;i++)
		{
			if (dbase[1][i]=="ORTHO") orthcolumn=i;
		}
		if (orthcolumn==-1) loaderror();
		else
		{
			lexlist=[];
			var cat="";
			var ended=false;
			for(var i=3;i<dbase.length;i++)
			{
				if (dbase[i][0]=="//") cat=dbase[i][1];
				if (dbase[i][0]=="@@@@") ended=true;
				else if (!ended&&dbase[i][0]!="//")
				{
					lexlist.push([(orthGraph(dbase[i][orthcolumn].replace(/\[.*?\]/g,""),7).split("~"))[0],i,cat]);
				}
			}
			lexlist.sort(function(a, b){
			    var keyA = a[0].toLowerCase(),
			        keyB = b[0].toLowerCase();
			    if(keyA < keyB) return -1;
			    if(keyA > keyB) return 1;
			    return 0;
			});
			
			stagelist=[["Proto-Indo-European",0]];
			happenings=[];
			for(var i=3;i<dbase[0].length;i++)
			{
				if (dbase[0][i]!="")
				{
					stagelist.push([dbase[0][i],i]);
					happenings.push(["STAGE",i-2]);
				}
				if (dbase[1][i]=="LOANS") happenings.push([dbase[2][i],i])
			}
			happenings.sort(function(a, b){
			    var keyA = a[1],
			        keyB = b[1];
			    if(keyA > keyB) return -1;
			    if(keyA < keyB) return 1;
			    return 0;
			});
			
			openLexicon();
		}
	}
	