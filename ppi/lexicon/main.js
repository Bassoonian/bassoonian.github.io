function openLexicon()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>"+lexlist.length+" entries found</span></div><div id='div_searchbox'><input type='text' class='searchclass' id='searchbox' oninput='loadLexList();' placeholder='Search...'> <select id='searchselect' class='searchclass' onchange='loadLexList();'><option value='1'>CAR</option><option value='2'>ENG</option></select></div><div id='div_buttonleft'><span class='button2' onclick='openSoundChanges();'>Sound Changes</span></div><div id='searchresults'>";
	newhtml+="</div><div id='entryinformation'></div>";
	
	document.getElementById("content").innerHTML=newhtml;
	
	newhtml="<h1>Carisitt Lexicon</h1><p>Welcome to the Carisitt Lexicon! Click a word from the list on the left to learn more about it.</p><h3>Word of the Day</h3>";
	var now=Date.now();//milliseconds
	now=Math.floor(now/1000);//seconds
	now=Math.floor(now/60);//minutes
	now=Math.floor(now/60);//hours
	now=Math.floor(now/24);//days
	now*=now;
	var wid=now % lexlist.length;
	newhtml+="<span class='link' onclick='openLex(lexlist["+wid+"]);'>"+(lexlist[wid][0].split("~"))[0]+"</span>";
	document.getElementById("entryinformation").innerHTML=newhtml;
	
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
	searchdata=replaceAll("~","",searchdata);
	searchdata=escapeRegExp(searchdata);
	var g="";
	var k="";
	for(var i=0;i<lexlist.length;i++)
	{
		var success=false;
		if (document.getElementById("searchselect").value==1)
		{
			if (searchdata==""|searchRemoveDiacritics(lexlist[i][0]).search(searchdata)!=-1) success=true;
		}
		if (document.getElementById("searchselect").value==2)
		{
			if (searchdata==""|searchRemoveDiacritics(dbase[lexlist[i][1]][dbase[0].length-1]).search(searchdata)!=-1) success=true;
		}
		if (success==true)
		{
			k=(lexlist[i][0].split("~"))[0];
			if (k!=g)
			{
				newhtml+="<div class='searchresult' onclick='openLex(lexlist["+i+"])'>";
				newhtml+=(lexlist[i][0].split("~"))[0]+"</div>";
				g=k;
			}
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
	/**/ var timePass=(new Date()).getTime();
	var nid=qid[1];
	var newhtml="";
	
	var iterations=0;
	var iterate=true;
	
	while(iterate)
	{
		iterations+=1;
		newhtml+="<h2>Meaning "+iterations+"</h2>";
		
		var pron1=dbase[nid][dbase[0].length-2].replace(/\[.*?\]/g,"").toLowerCase();
		var pron2=dbase[nid][dbase[0].length-2].toLowerCase().replace(pron1,"").replace("[","").replace("]","");
		if (pron2=="") pron2=pron1;
	
		if ((pron1.match(/\./g) || []).length<2) pron1="ˈ"+pron1;
		else pron1=replace_nth_instance(pron1,(pron1.match(/\./g) || []).length-1,/\./g,".ˈ");
		if ((pron2.match(/\./g) || []).length<2) pron2="ˈ"+pron2;
		else pron2=replace_nth_instance(pron2,(pron2.match(/\./g) || []).length-1,/\./g,".ˈ");
	
		if ((pron1.match(/%/g) || []).length==1) pron1=pron1.replace("ˈ","");
		if ((pron2.match(/%/g) || []).length==1) pron2=pron2.replace("ˈ","");
		pron1=pron1.replace("%","");
		pron2=pron2.replace("%","");
	
		//Basic information
		var cl=qid[2];
		if (cl=="THEM_MASC"||cl=="THEM_MASC_PAL"||cl=="THEM_FEM"||cl=="THEM_FEM_PAL"||cl=="IS"||cl=="IS_PAL"||cl=="ĒR"||cl=="ĒR_PAL"||cl=="US"||cl=="US_PAL"||cl=="S_TS"||cl=="S_TS_PAL"||cl=="S"||cl=="S_PAL"||cl=="S_NS"||cl=="S_NS_PAL"||cl=="Ō"||cl=="Ō_PAL"||cl=="ŌR"||cl=="ŌR_PAL")
		{
			newhtml+="<h3>Noun</h3><b>"+orthGraph(dbase[nid][orthcolumn],7).replace("~"," ~ ")+"</b>; <span class='hovertext' title='common gender'>c</span>";
		}
		if (cl=="THEM_NEUT"||cl=="THEM_NEUT_PAL"||cl=="OR"||cl=="OR_PAL"||cl=="U"||cl=="U_PAL"||cl=="MUN"||cl=="MUN_PAL"||cl=="I"||cl=="I_PAL")
		{
			newhtml+="<h3>Noun</h3><b>"+orthGraph(dbase[nid][orthcolumn],7).replace("~"," ~ ")+"</b>; <span class='hovertext' title='neuter gender'>n</span>";
		}
		if (cl=="ADJ_THEM"||cl=="ADJ_THEM_PAL"||cl=="ADJ_IS"||cl=="ADJ_IS_PAL")
		{
			newhtml+="<h3>Adjective</h3><b>"+orthGraph(dbase[nid][orthcolumn],7).replace("~"," ~ ")+"</b>";
		}
		if (cl=="PART")
		{
			newhtml+="<h3>Particle</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>";
		}
		if (cl=="PREP")
		{
			newhtml+="<h3>Preposition</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>";
		}
		if (cl=="ADVERB")
		{
			newhtml+="<h3>Adverb</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>";
		}
		if (cl=="VERB_A"||cl=="VERB_A_PAL"||cl=="VERB_IRREGULAR")
		{
			newhtml+="<h3>Verb</h3><b>"+orthGraph(dbase[nid][orthcolumn],7).replace("~"," ~ ")+"</b>";
		}
		if (cl=="NUMERALS")
		{
			newhtml+="<h3>Numeral</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>";
		}
		if (cl=="INTERJEC")
		{
			newhtml+="<h3>Interjection</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>";
		}
		if (cl=="PERS_PRON")
		{
			newhtml+="<h3>Personal Pronoun</h3><b>"+orthGraph(dbase[nid][orthcolumn],7)+"</b>";
		}
		
		var irregularpron=false;
		if (pron1.charAt(0)=="!"||pron1.charAt(1)=="!")
		{
			irregularpron=true;
			pron1=pron1.replace("!","");
			pron2=pron2.replace("!","");
		}
		newhtml+="</br>/"+pron1+"/ ["+pron2+"]";
		if (irregularpron) newhtml+=" <span class='hovertext' title='irregular pronunciation'>!</span>";
	
		//Translation
		newhtml+="<h4>Translation</h4><ol>";
		var transarray=dbase[nid][dbase[0].length-1].split("§");
		for(var i=0;i<transarray.length;i++)
		{
			var transarray2=transarray[i].split("£");
			newhtml+="<li>"+transarray2[0];
			if (transarray2.length==2) newhtml+=" ("+transarray2[1]+")";
			newhtml+="</li>";
		}
		newhtml+="</ol>";
	
		//Inflection
		var j=-1;
		for(var i=0;i<declensionlist.length;i++)
		{
			if (declensionlist[i][0]==cl) j=i;
		}
		if (j!=-1)
		{
			newhtml+="<h4>Inflection</h4><table>"
			if (cl!="VERB_A"&&cl!="VERB_A_PAL")
			{
				newhtml+="<tr><th colspan='3' class='darktd'>"+declensionlist[j][1]+"</th></tr>";
				newhtml+="<tr><th class='darktd'><i>Case</i></th><th class='darktd'><i>Singular</i></th><th class='darktd'><i>Plural</i></th></tr>";
		
				newhtml+="<tr><td class='darktd'><i>Nom.</i></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,0)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,6)+"</td>";
			
				newhtml+="<tr><td class='darktd'><i>Voc.</i></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,1)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,7)+"</td>";
			
				newhtml+="</tr><tr><td class='darktd'><i>Acc.</i></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,2)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,8)+"</td>";
			
				newhtml+="</tr><tr><td class='darktd'><i>Gen.</i></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,3)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,9)+"</td>";
			
				newhtml+="</tr><tr><td class='darktd'><i>Dat.</i></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,4)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,10)+"</td>";
			
				newhtml+="</tr></table>";
			}
			else
			{
				newhtml+="<tr><th colspan='8' class='darktd'>"+declensionlist[j][1]+"</th></tr>";
				newhtml+="<tr><th rowspan='2' colspan='2' class='darktd'><i>Person</i></th><th colspan='3' class='darktd'><i>Singular</i></th><th colspan='3' class='darktd'><i>Plural</i></th></tr>"
				newhtml+="<tr><th class='darktd'><i>First</i></th><th class='darktd'><i>Second</i></th><th class='darktd'><i>Third</i></th><th class='darktd'><i>First</i></th><th class='darktd'><i>Second</i></th><th class='darktd'><i>Third</i></th></tr>";
			
				newhtml+="<tr><th class='darktd' colspan='8'><i>Active Indicative</i></th></tr><tr><th class='darktd' rowspan='6'>Simple</br>tenses</th><th class='darktd'>Present Imperfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,1)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,2)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,3)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,4)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,5)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,6)+"</td>";
			
				newhtml+="</tr><tr><th class='darktd'>Present Perfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,7)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,8)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,9)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,10)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,11)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,12)+"</td>";

				newhtml+="</tr><tr><th class='darktd'>Past Imperfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,13)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,14)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,15)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,16)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,17)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,18)+"</td>";

				newhtml+="</tr><tr><th class='darktd'>Past Perfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,19)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,20)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,21)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,22)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,23)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,24)+"</td>";
			
				newhtml+="</tr><tr><th class='darktd'>Present Optative</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,25)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,26)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,27)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,28)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,29)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,30)+"</td>";
				
				newhtml+="</tr><tr><th class='darktd'>Past Optative</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,31)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,32)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,33)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,34)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,35)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,36)+"</td>";
			
				//newhtml+="<tr><th class='darktd' rowspan='4'>Compound</br>tenses</th><th class='darktd'>Preterite</th>";//Preterite, pluperfect, future past
			
				newhtml+="</tr><tr><th class='darktd' colspan='8'><i>Active Imperative</i></th></tr><tr><th class='darktd' colspan='2'>Present</th><td></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,73)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,74)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,75)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,76)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,77)+"</td>";
				newhtml+="</tr><tr><th class='darktd' colspan='2'>Future</th><td></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,78)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,79)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,80)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,81)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,82)+"</td>";
			
				newhtml+="</tr><tr><th class='darktd' colspan='8'><i>Middle</i></th></tr><tr><th class='darktd' rowspan='6'>Simple</br>tenses</th><th class='darktd'>Present Imperfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,37)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,38)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,39)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,40)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,41)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,42)+"</td>";
			
				newhtml+="</tr><tr><th class='darktd'>Present Perfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,43)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,44)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,45)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,46)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,47)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,48)+"</td>";

				newhtml+="</tr><tr><th class='darktd'>Past Imperfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,49)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,50)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,51)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,52)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,53)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,54)+"</td>";

				newhtml+="</tr><tr><th class='darktd'>Past Perfective</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,55)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,56)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,57)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,58)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,59)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,60)+"</td>";
				
				newhtml+="</tr><tr><th class='darktd'>Present Optative</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,61)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,62)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,63)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,64)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,65)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,66)+"</td>";
				
				newhtml+="</tr><tr><th class='darktd'>Past Optative</th>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,67)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,68)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,69)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,70)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,71)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,72)+"</td>";
			
				//Compound tenses etc
			
				newhtml+="</tr><tr><th class='darktd' colspan='8'><i>Middle Imperative</i></th></tr><tr><th class='darktd' colspan='2'>Present</th><td></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,83)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,84)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,85)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,86)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,87)+"</td>";
				newhtml+="</tr><tr><th class='darktd' colspan='2'>Future</th><td></td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,88)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,89)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,90)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,91)+"</td>";
				newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,92)+"</td>";
			
				newhtml+="</tr></table>";
			}
		}
		if (transarray[0]=="two"||transarray[0]=="three")
		{
			var perk="";
			if (transarray[0]=="two") perk="NUM_TWO";
			if (transarray[0]=="three") perk="NUM_THREE";
			j=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]==perk) j=i;
			}
			newhtml+="<h4>Inflection</h4><table>";
			newhtml+="<tr><th colspan='3' class='darktd'>Irregular</th></tr>";
			newhtml+="<tr><th class='darktd'><i>Case</i></th><th class='darktd'><i>Common</i></th><th class='darktd'><i>Neuter</i></th></tr>";
	
			newhtml+="<tr><td class='darktd'><i>Nom.</i></td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+12][orthcolumn],7)+"</td>";
		
			newhtml+="<tr><td class='darktd'><i>Voc.</i></td>";
			if (dbase[declensionlist[j][2]+1][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
			if (dbase[declensionlist[j][2]+13][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+12][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+13][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Acc.</i></td>";
			if (dbase[declensionlist[j][2]+2][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+2][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
			if (dbase[declensionlist[j][2]+14][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+13][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+14][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+12][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+14][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Gen.</i></td>";
			if (dbase[declensionlist[j][2]+3][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+3][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+3][orthcolumn],7)+"</td>";
			if (dbase[declensionlist[j][2]+15][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+14][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+15][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+13][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+15][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Dat.</i></td>";
			if (dbase[declensionlist[j][2]+4][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+3][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+4][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+4][orthcolumn],7)+"</td>";
			if (dbase[declensionlist[j][2]+16][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+15][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+16][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+14][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+16][orthcolumn],7)+"</td>";
		
			newhtml+="</tr></table>";
		}
		if (cl=="PERS_PRON")
		{
			var perk="";
			if (transarray[0]=="I") perk="PERS_1S";
			if (transarray[0]=="you (sg.)") perk="PERS_2S";
			if (transarray[0]=="he") perk="PERS_3S_MASC";
			if (transarray[0]=="it") perk="PERS_3S_NEUT";
			if (transarray[0]=="we") perk="PERS_1P";
			if (transarray[0]=="you (pl.)") perk="PERS_2P";
			j=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]==perk) j=i;
			}
			newhtml+="<h4>Inflection</h4><table>";
			newhtml+="<tr><th colspan='3' class='darktd'>Irregular</th></tr>";
			newhtml+="<tr><th class='darktd'><i>Case</i></th><th class='darktd'><i>Form</i></th></tr>";
	
			newhtml+="<tr><td class='darktd'><i>Nom.</i></td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]][orthcolumn],7)+"</td>";
		
			newhtml+="<tr><td class='darktd'><i>Voc.</i></td>";
			if (dbase[declensionlist[j][2]+1][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Acc.</i></td>";
			if (dbase[declensionlist[j][2]+2][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+2][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Gen.</i></td>";
			if (dbase[declensionlist[j][2]+3][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+3][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+3][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Dat.</i></td>";
			if (dbase[declensionlist[j][2]+4][1]==">>-1") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+3][orthcolumn],7)+"</td>";
			else if (dbase[declensionlist[j][2]+4][1]==">>-2") newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
			else newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+4][orthcolumn],7)+"</td>";
		
			newhtml+="</tr></table>";
		}
		if (cl=="ADJ_THEM"||cl=="ADJ_THEM_PAL"||cl=="ADJ_IS"||cl=="ADJ_IS_PAL")
		{
			var perk="";
			if (cl=="ADJ_THEM") perk="THEM_MASC";
			if (cl=="ADJ_THEM_PAL") perk="THEM_MASC_PAL";
			if (cl=="ADJ_IS") perk="IS";
			if (cl=="ADJ_IS_PAL") perk="IS_PAL";
			j=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]==perk) j=i;
			}
			if (cl=="ADJ_THEM") perk="THEM_NEUT";
			if (cl=="ADJ_THEM_PAL") perk="THEM_NEUT_PAL";
			if (cl=="ADJ_IS") perk="I";
			if (cl=="ADJ_IS_PAL") perk="I_PAL";
			k=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]==perk) k=i;
			}
			
			newhtml+="<h4>Inflection</h4><table>";
			newhtml+="<tr><th colspan='5' class='darktd'>Declensions "+(declensionlist[j][1].split(" "))[1]+"/"+(declensionlist[k][1].split(" "))[1]+"</th></tr>";
			newhtml+="<tr><th class='darktd'></th><th colspan='2' class='darktd'>Common</th><th colspan='2' class='darktd'>Neuter</th></tr>";
			newhtml+="<tr><th class='darktd'><i>Case</i></th><th class='darktd'><i>Singular</i></th><th class='darktd'><i>Plural</i></th><th class='darktd'><i>Singular</i></th><th class='darktd'><i>Plural</i></th></tr>";
	
			newhtml+="<tr><td class='darktd'><i>Nom.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,0)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,6)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,0)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,6)+"</td>";
		
			newhtml+="<tr><td class='darktd'><i>Voc.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,1)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,7)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,1)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Acc.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,2)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,8)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,2)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,8)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Gen.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,3)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,9)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,3)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,9)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Dat.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,4)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,10)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,4)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,10)+"</td>";
		
			newhtml+="</tr></table>";
		}
		if (transarray[0]=="four")
		{
			j=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]=="THEM_MASC") j=i;
			}
			k=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]=="THEM_NEUT") k=i;
			}
			
			//very cheap hack
			var temp=dbase[nid][orthcolumn];
			dbase[nid][orthcolumn]=temp.replace("u","");
			
			newhtml+="<h4>Inflection</h4><table>";
			newhtml+="<tr><th colspan='3' class='darktd'>Declensions "+(declensionlist[j][1].split(" "))[1]+"/"+(declensionlist[k][1].split(" "))[1]+"</th></tr>";
			newhtml+="<tr><th class='darktd'><i>Case</i></th><th class='darktd'><i>Common</i></th><th class='darktd'><i>Neuter</i></th></tr>";
	
			newhtml+="<tr><td class='darktd'><i>Nom.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,6)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,6)+"</td>";
		
			newhtml+="<tr><td class='darktd'><i>Voc.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,7)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,7)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Acc.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,8)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,8)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Gen.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,9)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,9)+"</td>";
		
			newhtml+="</tr><tr><td class='darktd'><i>Dat.</i></td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],j,10)+"</td>";
			newhtml+="<td>"+doInflect(dbase[nid][orthcolumn],k,10)+"</td>";
		
			newhtml+="</tr></table>";
			
			dbase[nid][orthcolumn]=temp;
		}
		if (cl=="VERB_IRREGULAR")
		{
			var perk="";
			if (transarray[0]=="to be") perk="VERB_COPULA";
			j=0;
			for(var i=0;i<declensionlist.length;i++)
			{
				if (declensionlist[i][0]==perk) j=i;
			}
			
			newhtml+="<h4>Inflection</h4><table>";
			newhtml+="<tr><th colspan='8' class='darktd'>"+declensionlist[j][1]+"</th></tr>";
			newhtml+="<tr><th rowspan='2' colspan='2' class='darktd'><i>Person</i></th><th colspan='3' class='darktd'><i>Singular</i></th><th colspan='3' class='darktd'><i>Plural</i></th></tr>"
			newhtml+="<tr><th class='darktd'><i>First</i></th><th class='darktd'><i>Second</i></th><th class='darktd'><i>Third</i></th><th class='darktd'><i>First</i></th><th class='darktd'><i>Second</i></th><th class='darktd'><i>Third</i></th></tr>";
		
			newhtml+="<tr><th class='darktd' colspan='8'><i>Active</i></th></tr><tr><th class='darktd' rowspan='4'>Simple</br>tenses</th><th class='darktd'>Present</th>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+1][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+2][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+3][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+4][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+5][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+6][orthcolumn],7)+"</td>";
		
			newhtml+="</tr><tr><th class='darktd'>Imperfect</th>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+7][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+8][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+9][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+10][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+11][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+12][orthcolumn],7)+"</td>";

			newhtml+="</tr><tr><th class='darktd'>Future</th>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+13][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+14][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+15][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+16][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+17][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+18][orthcolumn],7)+"</td>";

			newhtml+="</tr><tr><th class='darktd'>Optative</th>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+31][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+32][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+33][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+34][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+35][orthcolumn],7)+"</td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+36][orthcolumn],7)+"</td>";
		
			//newhtml+="<tr><th class='darktd' rowspan='4'>Compound</br>tenses</th><th class='darktd'>Preterite</th>";//Preterite, pluperfect, future past
		
			newhtml+="</tr><tr><th class='darktd' colspan='2'>Imperative</th><td></td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+37][orthcolumn],7)+"</td><td></td><td></td>";
			newhtml+="<td>"+orthGraph(dbase[declensionlist[j][2]+38][orthcolumn],7)+"</td><td>";
		
			newhtml+="</tr></table>";
		}
	
		//Synonyms
		var syn=[];
		for(var j=0;j<(dbase[nid][dbase[0].length-1].split("§")).length;j++)
		{
			for(var i=3;i<_endborder;i++)
			{
				if (dbase[i][0]!="//"&&i!=nid)
				{
					for(var k=0;k<(dbase[i][dbase[0].length-1].split("§")).length;k++)
					{
						if (((dbase[i][dbase[0].length-1].split("§"))[k].split("£"))[0]==((dbase[nid][dbase[0].length-1].split("§"))[j].split("£"))[0]) syn.push([j,i]);
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
					if (i==-1) newhtml+="<li>(<i>"+(dbase[nid][dbase[0].length-1].split("§")[syn[j][0]].split("£"))[0]+"</i>): ";
					i=syn[j][0];
					k=false;
				}
				if (k==true) newhtml+=", ";
				newhtml+="<span class='link' onclick='openLex2("+syn[j][1]+");'>"+(orthGraph(dbase[syn[j][1]][orthcolumn],7).split("~"))[0]+"</span>";
			}
			newhtml+="</li></ul>"
		}
	
		//Anagrams
	
		/* DISABLED, in need of optimalisations
	
		var ana1=((orthGraph(dbase[nid][orthcolumn],7).split("~"))[0].toLowerCase().split("")).sort();
		var ana2=[];
		var syn=[];
		for(var j=3;j<_endborder;j++)
		{
			if (dbase[j][0]!="//"&&j!=nid&&(orthGraph(dbase[j][orthcolumn],7).split("~"))[0].toLowerCase()!=(orthGraph(dbase[nid][orthcolumn],7).split("~"))[0].toLowerCase())
			{
				ana2=((orthGraph(dbase[j][orthcolumn],7).split("~"))[0].toLowerCase().split("")).sort();
				if (ana1.toString()==ana2.toString())
				{
					syn.push(j);
				}
			}
		}
		if (syn.length>0)
		{
			newhtml+="<h4>Anagrams</h4><ul>";
			for(var j=0;j<syn.length;j++)
			{
				newhtml+="<li><span class='link' onclick='openLex2("+syn[j]+");'>"+(orthGraph(dbase[syn[j]][orthcolumn],7).split("~"))[0]+"</span></li>"
			}
			newhtml+="</ul>";
		}
	
		*/
	
		//Etymology
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
					if (temparr[0].charAt(0)=="L")
					{
						newhtml2+="loaned from "+getLangCode(temparr[0])+" <i>"+temparr[1]+"</i> around "+happenings[i][0];
					}
					if (temparr[0].charAt(0)=="D")
					{
						temparr[0]=temparr[0].replace("D.","");
						temparr=temparr[0].split("%");
						if (temparr[1]=="apheris") newhtml2+="aphetic variant";
						newhtml2+=" of <span class='link' onclick='openLex2("+eval(nid+temparr[0])+")'>";
						if (stagepass==stagelist.length-2) newhtml2+=orthGraph(dbase[eval(nid+temparr[0])][orthcolumn],7).replace("~"," ~ ");
						//LATER
						newhtml2+="</span> first attested in "+happenings[i][0];
					}
					i=happenings.length;
				}
				else
				{
					if (stagepass==0)
					{
						var reasoning="Ø";
						if (dbase[nid][2]!="")
						{
							newhtml2+="from Pre-Early Proto Carisitt <i>"+orthGraph((dbase[nid][2].split("{"))[0].replace(/\[.*?\]/g,"").replace("~"," ~ "),-1)+"</i>";
							reasoning=dbase[nid][2].replace((dbase[nid][2].split("{"))[0],"").replace("{","").replace("}","");
						}
						if (reasoning!="Ø")
						{
							newhtml2+=", ";
							if (reasoning=="them") newhtml2+="thematicisation";
							if (reasoning=="them-obl") newhtml2+="thematicisation of the oblique stem";
							if (reasoning=="meta") newhtml2+="metathesised variant";
							if (reasoning=="them-redup") newhtml2+="reduplicated thematicisation";
							if (reasoning=="them-meta") newhtml2+="metathesised variant of thematicisation";
							newhtml2+=" of";
						}
						else newhtml2+="from";
						newhtml2+=" Proto-Indo-European <i>"+orthGraph(dbase[nid][1].replace(/\[.*?\]/g,""),-1).replace("~"," ~ ")+"</i>";
						if (dbase[nid][0]!="")
						{
							newhtml2+=", from <i>"+orthGraph(dbase[nid][0].replace(/\[.?\]/g,""),-1)+"</i>";
						}
					}
					else if (stagepass!=8) newhtml2+="from "+stagelist[stagepass][0]+" <i>"+orthGraph(dbase[nid][happenings[i][1]].replace(/\[.?\]/g,""),stagepass-1).replace("~"," ~ ")+"</i>";
					stagepass-=1;
				}
			}
		}
		newhtml+=newhtml2.charAt(0).toUpperCase()+newhtml2.slice(1)+". (<span class='link' onclick='openHistorical(["+nid+","+'"'+cl+'"'+"]);'>View History</span>)";
		
		//Scoop up
		var llid=-1;
		for(var i=0;i<lexlist.length;i++)
		{
			if (lexlist[i]==qid) llid=i;
		}
		if (llid==lexlist.length-1) iterate=false;
		else
		{
			if ((lexlist[llid][0].split("~"))[0]==(lexlist[llid+1][0].split("~"))[0])
			{
				qid=lexlist[llid+1];
				nid=qid[1];
			}
			else iterate=false;
		}
	}
	
	if (iterations==1) newhtml=newhtml.replace("<h2>Meaning 1</h2>","");
	
	newhtml="<h1>"+(orthGraph(dbase[nid][orthcolumn],7).split("~"))[0]+"</h1>"+newhtml;
	
	document.getElementById("entryinformation").innerHTML=newhtml;
	
	console.log((new Date()).getTime()-timePass);
}

function getLangCode(ii)
{
	ii=ii.replace("L.","");
	switch(ii)
	{
		case "spa": ii="Spanish";break;
		case "por": ii="Portuguese";break;
		case "nld": ii="Dutch";break;
		case "fra": ii="French";break;
		case "dan": ii="Danish";break;
		case "ell": ii="Greek";break;
		case "grc": ii="Ancient Greek";break;
		case "pclt": ii="Proto-Celtic";break;
		case "peus": ii="Proto-Basque";break;
		case "MED": ii="a Mediterranean substrate word";break;
		case "substrate": ii="an unknown substrate word";break;
		case "frm": ii="Middle French";break;
		case "osp": ii="Old Spanish";break;
		case "pro": ii="Old Occitan";break;
		case "lat": ii="Latin";break;
		case "arb": ii="Arabic";break;
		case "got": ii="Gothic";break;
		case "glg": ii="Galician";break;
	}
	return(ii);
}

function reverseString(inp)
{
	return((inp.split("")).reverse().join(""));
}

function doInflect(input,dectype,numb)
{
	input=replaceAll(".","",input);
	var offset=declensionlist[dectype][2];
	
	//Fix numb accordingly if merged back in PIE
	if (dbase[offset+numb][1]==">>-1") numb-=1;
	else if (dbase[offset+numb][1]==">>-2") numb-=2;
	
	var suffix=dbase[offset+numb][orthcolumn];
	
	//Get the correct stem
	var stemid=(suffix.split("-"))[0].replace("(","").replace(")","");
	if ((input.match(/~/g) || []).length>=stemid) var stem=(input.split("~"))[stemid];
	else var stem=(input.split("~"))[0];
	if ((stem.match(/-/g) || []).length>0) stem=stem.replace("-","");
	else
	{
		//Take off the nominative suffix
		stem=reverseString(stem);
		var tempsuff=reverseString((dbase[offset][orthcolumn].split("-"))[1]);
		if (tempsuff!="Ø")
		{
			stem=stem.replace(tempsuff,"");
		}
		stem=reverseString(stem);
	}
	
	//Append the correct suffix if not a null suffix
	if ((suffix.split("-"))[1]!="Ø")
	{
		var fs=stem.charAt(stem.length-1);
		if (fs=="a"||fs=="e"||fs=="i"||fs=="o"||fs=="y"||fs=="u"||fs=="œ"||fs=="ɛ"||fs=="e̯"||fs=="i̯"||fs=="u̯"||fs=="ɨ") stem+="j";
		stem+=(suffix.split("-"))[1];
	}
	return(orthGraph(stem,7));
}

function doInflect2(input,numb)
{
	input=replaceAll(".","",input);
	var offset=declensionlist[__inflectiontype][2];
	
	//Fix numb accordingly if merged back in PIE
	if (dbase[offset+numb][1]==">>-1") numb-=1;
	else if (dbase[offset+numb][1]==">>-2") numb-=2;
	
	var suffix=__endings[numb];
	
	//Get the correct stem
	var stemid=(suffix.split("-"))[0].replace("(","").replace(")","");
	if ((input.match(/~/g) || []).length>=stemid) var stem=(input.split("~"))[stemid];
	else var stem=(input.split("~"))[0];
	if ((input.match(/-/g) || []).length>0) stem=stem.replace("-","");
	else
	{
		//Take off the nominative suffix
		stem=reverseString(stem);
		var tempsuff=reverseString((__endings[0].split("-"))[1]);
		if (tempsuff!="Ø")
		{
			stem=stem.replace(tempsuff,"");
		}
		stem=reverseString(stem);
	}
	//Append the correct suffix if not a null suffix
	if ((suffix.split("-"))[1]!="Ø")
	{
		var fs=stem.charAt(stem.length-1);
		//if (fs=="a"||fs=="e"||fs=="i"||fs=="o"||fs=="y"||fs=="u"||fs=="œ"||fs=="ɛ"||fs=="e̯"||fs=="i̯"||fs=="u̯"||fs=="ɨ") stem+="j";
		stem+=(suffix.split("-"))[1];
	}
	return(stem.replace(".",""));
}

function openHistorical(argo)
{
	if (argo[1]=="")
	{
		//
	}
	else
	{
		temparr=[];
		for(var i=3;i<dbase[0].length;i++)
		{
			if (dbase[argo[0]][i]=="") temparr.push(false);
			else temparr.push(true);
		}
		var j=-1;
		for(var i=0;i<declensionlist.length;i++)
		{
			if (declensionlist[i][0]==argo[1]) j=i;
		}
		for(var i=0;i<12;i++)
		{
			for(var k=3;k<dbase[0].length;k++)
			{
				if (dbase[declensionlist[j][2]+i][k]!="") temparr[k-3]=true;
			}
		}
		__word=dbase[argo[0]][1];
		if (dbase[argo[0]][2]!="") __word=dbase[argo[0]][2];
		__endings=[];
		for(var i=0;i<12;i++)
		{
			__endings.push(dbase[declensionlist[j][2]+i][1]);
		}
		__inflectiontype=j;
		__arr=[];
		for(var i=0;i<temparr.length;i++)
		{
			if (temparr[i]==true&&dbase[1][i+3]!="MEANING") __arr.push(i+3);
		}
		__wordo=argo[0];
		document.getElementById("search_overlay").style.display="table";
		var newhtml="<table>";
		newhtml+="<tr><th colspan='3' class='darktd'>Inflection</th></tr>";
		newhtml+="<tr><th class='darktd'><i>Case</i></th><th class='darktd'><i>Singular</i></th><th class='darktd'><i>Plural</i></th></tr>";

		newhtml+="<tr><td class='darktd'><i>Nom.</i></td>";
		newhtml+="<td id='hist_noms'>Ø</td>";
		newhtml+="<td id='hist_nomp'>Ø</td>";
	
		newhtml+="</tr><tr id='hist_voc'><td class='darktd'><i>Voc.</i></td>";
		newhtml+="<td id='hist_vocs'>Ø</td>";
		newhtml+="<td id='hist_vocp'>Ø</td>";
	
		newhtml+="</tr><tr><td class='darktd'><i>Acc.</i></td>";
		newhtml+="<td id='hist_accs'>Ø</td>";
		newhtml+="<td id='hist_accp'>Ø</td>";
	
		newhtml+="</tr><tr><td class='darktd'><i>Gen.</i></td>";
		newhtml+="<td id='hist_gens'>Ø</td>";
		newhtml+="<td id='hist_genp'>Ø</td>";
	
		newhtml+="</tr><tr><td class='darktd'><i>Dat.</i></td>";
		newhtml+="<td id='hist_dats'>Ø</td>";
		newhtml+="<td id='hist_datp'>Ø</td>";
		
		newhtml+="</tr><tr id='hist_abl'><td class='darktd'><i>Abl.</i></td>";
		newhtml+="<td id='hist_abls'>Ø</td>";
		newhtml+="<td id='hist_ablp'>Ø</td>";
	
		newhtml+="</tr></table>";
		newhtml+="</br><span id='explanation'></span></br><span class='link' onclick='historicalNext()'>Next</span> - <span class='link' onclick='closeHistorical()'>Close</span>";
		document.getElementById("search_overlay3").innerHTML=newhtml;
		
		__i=0;
		parseFormations();
	}
}

function parseFormations()
{
	if (__i!=0)
	{
		var tadz=__arr[__i-1];
		var exp=dbase[1][tadz];
		while (exp=="")
		{
			tadz-=1;
			exp=dbase[1][tadz];
		}
		var tadz=__arr[__i-1];
		exp+="</br></br>"+dbase[2][tadz];
		document.getElementById("explanation").innerHTML=exp;
		if (dbase[__wordo][tadz]!="") __word=dbase[__wordo][tadz];
		for(var i=0;i<12;i++)
		{
			if (dbase[declensionlist[__inflectiontype][2]+i][tadz]!="") __endings[i]=dbase[declensionlist[__inflectiontype][2]+i][tadz];
		}
	}
	else
	{
		document.getElementById("explanation").innerHTML="Reconstructed inflection table in Pre-Early Proto Carisitt. The dual is obsolete, the locative merged into the dative while the instrumental merged into the ablative.";
	}
	document.getElementById("hist_noms").innerHTML=doInflect2(__word,0);
	document.getElementById("hist_vocs").innerHTML=doInflect2(__word,1);
	document.getElementById("hist_accs").innerHTML=doInflect2(__word,2);
	document.getElementById("hist_gens").innerHTML=doInflect2(__word,3);
	document.getElementById("hist_dats").innerHTML=doInflect2(__word,4);
	document.getElementById("hist_abls").innerHTML=doInflect2(__word,5);
	document.getElementById("hist_nomp").innerHTML=doInflect2(__word,6);
	document.getElementById("hist_vocp").innerHTML=doInflect2(__word,7);
	document.getElementById("hist_accp").innerHTML=doInflect2(__word,8);
	document.getElementById("hist_genp").innerHTML=doInflect2(__word,9);
	document.getElementById("hist_datp").innerHTML=doInflect2(__word,10);
	document.getElementById("hist_ablp").innerHTML=doInflect2(__word,11);
}

function historicalNext()
{
	__i++;
	parseFormations();
}

function closeHistorical()
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
	
function orthGraph(str2,stag)
	{
		str2=replaceAll(".","",str2).replace(/\[.*?\]/g,"");
		var newstr="";
		var str="";
		for(var i=0;i<(str2.match(/~/g) || []).length+1;i++)
		{
			str=(str2.split("~"))[i].trim();
			if (stag==0)
			{
				var str3=reverseString(str.toLowerCase());
				str3=replaceAll("a","𐌀",str3);
				str3=replaceAll("ā","𐌀",str3);
				str3=replaceAll("b","𐌁",str3);
				str3=replaceAll("d","𐌃",str3);
				str3=replaceAll("e","𐌄",str3);
				str3=replaceAll("ē","𐌇",str3);
				str3=replaceAll("ê","𐌇",str3);
				str3=replaceAll("f","𐌅",str3);
				str3=replaceAll("v","𐌅",str3);
				str3=replaceAll("g","𐌂",str3);
				str3=replaceAll("h","𐌇",str3);
				str3=replaceAll("i","𐌉",str3);
				str3=replaceAll("ī","𐌉",str3);
				str3=replaceAll("j","𐌉",str3);
				str3=replaceAll("k","𐌊",str3);
				str3=replaceAll("l","𐌋",str3);
				str3=replaceAll("m","𐌌",str3);
				str3=replaceAll("n","𐌍",str3);
				str3=replaceAll("o","𐌏",str3);
				str3=replaceAll("ō","𐌏",str3);
				str3=replaceAll("ô","𐌏",str3);
				str3=replaceAll("p","𐌐",str3);
				str3=replaceAll("r","𐌓",str3);
				str3=replaceAll("ts","𐌆",str3);
				str3=replaceAll("s","𐌔",str3);
				str3=replaceAll("z","𐌔",str3);
				str3=replaceAll("t","𐌕",str3);
				str3=replaceAll("u","𐌖",str3);
				str3=replaceAll("ū","𐌖",str3);
				str3=replaceAll("w","𐌖",str3);
				str3=replaceAll("ȳ","𐌖",str3);
				
				str="</i>*"+str3+" (*"+str+")<i>";
			}
			if (stag==2)
			{
				var str3=str.toLowerCase();
				str3=replaceAll("b","𐌱",str3);
				str3=replaceAll("d","𐌳",str3);
				str3=replaceAll("h","𐌷",str3);
				str3=replaceAll("j","𐌾",str3);
				str3=replaceAll("k","𐌺",str3);
				str3=replaceAll("l","𐌻",str3);
				str3=replaceAll("m","𐌼",str3);
				str3=replaceAll("n","𐌽",str3);
				str3=replaceAll("p","𐍀",str3);
				str3=replaceAll("r","𐍂",str3);
				str3=replaceAll("s","𐍃",str3);
				str3=replaceAll("t","𐍄",str3);
				str3=replaceAll("z","𐌶",str3);
				str3=replaceAll("f","𐍆",str3);
				str3=replaceAll("g","𐌲",str3);
				str3=replaceAll("u","𐌿",str3);
				str3=replaceAll("ū","𐍉𐌿",str3);
				str3=replaceAll("i","𐌹",str3);
				str3=replaceAll("ī","𐌴𐌹",str3);
				str3=replaceAll("ǣ","𐌰𐌴",str3);
				str3=replaceAll("æ","𐌰𐌹",str3);
				str3=replaceAll("ō","𐍉",str3);
				str3=replaceAll("o","𐌰𐌿",str3);
				str3=replaceAll("a","𐌰",str3);
				str3=replaceAll("ā","𐌰",str3);
				str3=replaceAll("e","𐌰𐌹",str3);
				str3=replaceAll("ē","𐌴",str3);
				str3=replaceAll("ø","𐌰𐌿𐌹",str3);
				str3=replaceAll("ø̄","𐍉𐌹",str3);
				str3=replaceAll("w","𐍅",str3);
				str3=replaceAll("y","𐌿𐌹",str3);
				str3=replaceAll("ȳ","𐍉𐌿𐌹",str3);
				str3=replaceAll("v","𐌱",str3);
				
				str3=replaceAll("𐌽𐌺","𐌲𐌺",str3);
				str3=replaceAll("𐌽𐌲","𐌲𐌲",str3);
				
				str="</i>*"+str3+" (*"+str+")<i>";
			}
			if (stag==1||stag<0)
			{
				str="*"+str;
				str=replaceAll("x","h",str);
				str=replaceAll("X","H",str);
			}
			str=" "+replaceAll("%","",str)+" ";
			switch(stag)
			{
				case 3:
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
					str=replaceAll(" j","𐌾",str);
					str=replaceAll(" J","𐌾",str);
					str=replaceAll("j","i",str);
					str=replaceAll("J","I",str);
					str=replaceAll("W","U",str);
					str=replaceAll("w","u",str);
					
					str=replaceAll("ƈ","c",str);
					break;
				case 4:
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
					str=replaceAll("ƈ","c",str);
					break;
				case 5:
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
					str=replaceAll("ƈ","c",str);
					break;
				case 6:
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
					str=replaceAll("r̥","hr",str);
					str=replaceAll("R̥","Hr",str);
					str=replaceAll("l̥","hl",str);
					str=replaceAll("L̥","Hl",str);
					str=replaceAll("ƈ","c",str);
					break;
				case 7:
					str=replaceAll("x","°",str);
					str=replaceAll("X","^°",str);
					
					str=replaceAll("ks","x",str);
					str=replaceAll("Ks","X",str);
					str=applyNec(str,"k","qu",[""],["e","i","y"]);
					str=applyNec(str,"K","Qu",[""],["e","i","y"]);
					str=replaceAll("k","c",str);
					str=replaceAll("K","C",str);
					str=replaceAll("ø","eu",str);
					str=replaceAll("Ø","Eu",str);
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
					
					str=replaceAll("ge","gue",str);
					str=replaceAll("gi","gui",str);
					str=replaceAll("gé","gué",str);
					str=replaceAll("gy","guy",str);
					str=replaceAll("ʒe","ge",str);
					str=replaceAll("ʒi","gi",str);
					str=replaceAll("ʒé","gé",str);
					str=replaceAll("ʒy","gy",str);
					str=replaceAll("ʒ ","ge",str);
					str=replaceAll("ʒ","gh",str);
					
					str=replaceAll("c ","que",str);
					
					str=applyNec(str,"s","ss",["a","e","i","o","u","y","á","ó","ý","é"],["a","e","i","o","u","y","á","ó","ý","é","r̩","l̩","n̩","-"]);
					str=applyNec(str,"f","ff",["a","e","i","o","u","y","á","ó","ý","é"],["a","e","i","o","u","y","á","ó","ý","é","r̩","l̩","n̩","-"]);
					str=applyNec(str,"z","s",["a","e","i","o","u","y","á","ó","ý","é"],["a","e","i","o","u","y","á","ó","ý","é","r̩","l̩","n̩","-"]);
					str=applyNec(str,"v","f",["a","e","i","o","u","y","á","ó","ý","é"],["a","e","i","o","u","y","á","ó","ý","é","r̩","l̩","n̩","-"]);
					
					str=applyNec(str,"v ","fe",["a","e","i","o","u","y","á","ó","ý","é"],[""]);
					str=applyNec(str,"z ","se",["a","e","i","o","u","y","á","ó","ý","é"],[""]);
					
					str=replaceAll("r̩ ","re",str);
					str=replaceAll("l̩ ","le",str);
					str=replaceAll("n̩ ","ne",str);
					str=replaceAll("r̩","r",str);
					str=replaceAll("l̩","l",str);
					str=replaceAll("n̩","n",str);
				
					str=replaceAll("zv","sv",str);
					str=replaceAll("Zv","Sv",str);
					
					str=applyNec(str,"j ","i",["b","d","f","g","k","l","m","n","p","r","s","t","v","w","z"],[""]);
					
					str=replaceAll("y","í",str);
					str=replaceAll("Y","Í",str);
					str=replaceAll("j","y",str);
					str=replaceAll("J","Y",str);
					
					str=replaceAll("ah","à",str);
					str=replaceAll("Ah","À",str);
					str=replaceAll("eh","è",str);
					str=replaceAll("Eh","È",str);
					str=replaceAll("ih","ì",str);
					str=replaceAll("Ih","Ì",str);
					str=replaceAll("oh","ò",str);
					str=replaceAll("Oh","Ò",str);
					str=replaceAll("uh","ù",str);
					str=replaceAll("Uh","Ù",str);
					str=replaceAll("yh","ỳ",str);
					str=replaceAll("Yh","Ỳ",str);
					str=replaceAll("áh","â",str);
					str=replaceAll("Áh","Â",str);
					str=replaceAll("éh","ê",str);
					str=replaceAll("Éh","Ê",str);
					str=replaceAll("íh","î",str);
					str=replaceAll("Íh","Î",str);
					str=replaceAll("óh","ô",str);
					str=replaceAll("Óh","Ô",str);
					str=replaceAll("ýh","ŷ",str);
					str=replaceAll("Ýh","Ŷ",str);
					
					str=replaceAll("^ɲ","Gn",str);
					str=replaceAll("^ʎ","Lh",str);
					str=replaceAll("ɲ","gn",str);
					str=replaceAll("ʎ","lh",str);
					
					str=replaceAll("r̥","hr",str);
					str=replaceAll("R̥","Hr",str);
					str=replaceAll("l̥","hl",str);
					str=replaceAll("L̥","Hl",str);
					
					str=replaceAll("°","j",str);
					str=replaceAll("^°","J",str);
					
					str=applyNec(str,"y","i",["b","d","f","g","k","l","m","n","p","r","s","t","v","w","z","h"],["a","e","i","o","u","á","é","í","ó","ý"]);
					
					str=replaceAll("ɸ","ph",str);
					str=replaceAll("tʰ","th",str);
					str=replaceAll("ƈ","c",str);
					
					str=replaceAll("yý","ŷ",str);
					break;
			}
			if (i>0) newstr+="~";
			newstr+=str.trim();
		}
		return(newstr);
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
			var endborder=-1;
			for(var i=3;i<dbase.length;i++)
			{
				if (dbase[i][0]=="//") cat=dbase[i][1];
				if (dbase[i][0]=="@@@@")
				{
					endborder=i;
					i=dbase.length;
				}
				else if (endborder==-1&&dbase[i][0]!="//"&&dbase[i][0]!="NEG"&&dbase[i][0]!="!!")
				{
					lexlist.push([orthGraph(dbase[i][orthcolumn].replace(/\[.*?\]/g,""),7),i,cat]);
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
			
			var j=-1;
			declensionlist=[];
			for(var i=endborder;i<dbase.length;i++)
			{
				if (dbase[i][0]=="//") declensionlist.push([dbase[i][1],dbase[i][2],i+1]);
			}
			
			openLexicon();
			_endborder=endborder;
		}
	}

function applyNec(str,before,after,l,r)
{
	for(var i=0;i<l.length;i++)
	{
		for(var j=0;j<r.length;j++)
		{
			str=replaceAll(l[i]+before+r[j],l[i]+after+r[j],str);
		}
	}
	return(str);
}

function lexStats()
{
	var newhtml="<div id='buttons2'><span class='titlestuff'>Sound Changes</span></div><div id='div_searchbox'><span class='button2' onclick='openSoundChanges();'>Refresh</span></div><div id='div_buttonleft'><span class='button2' onclick='openLexicon();'>Lexicon</span></div><div id='textblock'>";
	newhtml+="<div id='nounclasses' class='piechart'></div><div id='letterspread' class='piechart'></div></div>";
	document.getElementById("content").innerHTML=newhtml;
	
	stats={
		nounclasses: {
			declA: 0,
			declB: 0,
			declC: 0,
			declD: 0,
			declA2: 0,
			declB2: 0,
			declC2: 0,
			declD2: 0
		},
		letters: {
			A: 0,
			B: 0,
			C: 0,
			D: 0,
			E: 0,
			F: 0,
			G: 0,
			H: 0,
			I: 0,
			K: 0,
			L: 0,
			M: 0,
			N: 0,
			O: 0,
			P: 0,
			Q: 0,
			R: 0,
			S: 0,
			T: 0,
			U: 0,
			V: 0,
			X: 0,
			Y: 0,
			Z: 0,
			AA: 0,
			EE: 0,
			OO: 0,
			YY: 0,
			II: 0
		}
	}
	
	var qq="";
	for(var i=0;i<lexlist.length;i++)
	{
		qq=lexlist[i][2];
		for(var j=0;j<declensionlist.length;j++)
		{
			if (qq==declensionlist[j][0]) qq=declensionlist[j][1]; 
		}
		if (qq=="Declension A") stats.nounclasses.declA+=1;
		if (qq=="Declension B") stats.nounclasses.declB+=1;
		if (qq=="Declension C") stats.nounclasses.declC+=1;
		if (qq=="Declension D") stats.nounclasses.declD+=1;
		if (qq=="Declension A (Palatal)") stats.nounclasses.declA2+=1;
		if (qq=="Declension B (Palatal)") stats.nounclasses.declB2+=1;
		if (qq=="Declension C (Palatal)") stats.nounclasses.declC2+=1;
		if (qq=="Declension D (Palatal)") stats.nounclasses.declD2+=1;
		qq=(lexlist[i][0].split("~"))[0].toLowerCase().split("");
		for(var j=0;j<qq.length;j++)
		{
			switch(qq[j])
			{
				case "a": stats.letters.A+=1;break;
				case "b": stats.letters.B+=1;break;
				case "c": stats.letters.C+=1;break;
				case "d": stats.letters.D+=1;break;
				case "e": stats.letters.E+=1;break;
				case "f": stats.letters.F+=1;break;
				case "g": stats.letters.G+=1;break;
				case "h": stats.letters.H+=1;break;
				case "i": stats.letters.I+=1;break;
				case "k": stats.letters.K+=1;break;
				case "l": stats.letters.L+=1;break;
				case "m": stats.letters.M+=1;break;
				case "n": stats.letters.N+=1;break;
				case "o": stats.letters.O+=1;break;
				case "p": stats.letters.P+=1;break;
				case "q": stats.letters.Q+=1;break;
				case "r": stats.letters.R+=1;break;
				case "s": stats.letters.S+=1;break;
				case "t": stats.letters.T+=1;break;
				case "u": stats.letters.U+=1;break;
				case "v": stats.letters.V+=1;break;
				case "x": stats.letters.X+=1;break;
				case "y": stats.letters.Y+=1;break;
				case "z": stats.letters.Z+=1;break;
				case "á": stats.letters.AA+=1;break;
				case "é": stats.letters.EE+=1;break;
				case "ó": stats.letters.OO+=1;break;
				case "ý": stats.letters.YY+=1;break;
				case "í": stats.letters.II+=1;break;
			}
		}
	}
	
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
}

function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Class', 'Occurences'],
          ['Declension A',     stats.nounclasses.declA],
			['Declension A (Palatal)',     stats.nounclasses.declA2],
          ['Declension B',      stats.nounclasses.declB],
			['Declension B (Palatal)',     stats.nounclasses.declB2],
          ['Declension C',  stats.nounclasses.declC],
			['Declension C (Palatal)',     stats.nounclasses.declC2],
          ['Declension D', stats.nounclasses.declD],
			['Declension D (Palatal)',     stats.nounclasses.declD2]
        ]);

        var options = {
          title: 'Noun Classes'
        };

        var chart = new google.visualization.PieChart(document.getElementById('nounclasses'));

        chart.draw(data, options);
		
        var data2 = google.visualization.arrayToDataTable([
          ['Letter', 'Occurences'],
          ['A',stats.nounclasses.declA],
			['A',stats.letters.A],
			['B',stats.letters.B],
			['C',stats.letters.C],
			['D',stats.letters.D],
			['E',stats.letters.E],
			['F',stats.letters.F],
			['G',stats.letters.G],
			['H',stats.letters.H],
			['I',stats.letters.I],
			['K',stats.letters.K],
			['L',stats.letters.L],
			['M',stats.letters.M],
			['N',stats.letters.N],
			['O',stats.letters.O],
			['P',stats.letters.P],
			['Q',stats.letters.Q],
			['R',stats.letters.R],
			['S',stats.letters.S],
			['T',stats.letters.T],
			['U',stats.letters.U],
			['V',stats.letters.V],
			['X',stats.letters.X],
			['Y',stats.letters.Y],
			['Z',stats.letters.Z],
			['Á',stats.letters.AA],
			['É',stats.letters.EE],
			['Í',stats.letters.II],
			['Ó',stats.letters.OO],
			['Ý',stats.letters.YY]
        ]);

        var options2 = {
          title: 'Letter distribution'
        };

        var chart2 = new google.visualization.PieChart(document.getElementById('letterspread'));

        chart2.draw(data2, options2);
      }