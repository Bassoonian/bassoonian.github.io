_haspreppeddoc=false;

function prepDoc()
{
	if (!_haspreppeddoc)
	{
		_haspreppeddoc=true;
		/*var temp=""; <<<< now defunct
		for(var i=0;i<stagelist.length;i++)
		{
			temp+="<li><a onclick='loadDocContent("+i+")'>"+stagelist[i][0]+"</a></li>";
		}
		document.getElementById("DOC_sidenav_langlist").innerHTML=temp;*/
		loadDocContent("introduction");
	}
}

function loadDocContent(contentid)
{
	_last_loaded_file=contentid;
	_inflection_table_id=0;
	$.get("documentation/"+contentid+".html",function(dat){
		dat=docParseData(dat);
		//Append bibliography
		for(var i=0;i<_documentation_bibliography.length;i++)
		{
			if (_documentation_bibliography[i][0]==_last_loaded_file) dat+="<h2>Bibliography</h2><ol>"+list_sources(_documentation_bibliography[i][1].split(","))+"</ol>";
		}
		document.getElementById("doc_main_content").innerHTML=dat;
		if (contentid=="bibliography") render_bibliography();
		(document.getElementById("doc_main_content").getElementsByTagName("h1"))[0].id="backtotop_";
		
		//Make level list
		var tree=[];
		var leaf=null;
		for(var node of (document.getElementById("doc_main_content")).querySelectorAll("h2, h3"))
		{
			var nodeLevel=parseInt(node.tagName[1]);
			var newLeaf={
				level: nodeLevel,
				text: node.textContent,
				children: [],
				parent: leaf
			};
			
			while(leaf&&newLeaf.level<=leaf.level)
				leaf=leaf.parent;
			
			if (!leaf)
				tree.push(newLeaf);
			else
				leaf.children.push(newLeaf);
			
			leaf=newLeaf;
		}
		//Parse level list
		var temp="";
		for(var i=0;i<tree.length;i++)
		{
			temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].level+"'> <a href='javascript:void(0);' onclick='scrollToValue("+'"'+getSubtitleName(tree[i].text)+'"'+")'>"+tree[i].text+"</a>";
			if (tree[i].children.length>0)
			{
				temp+="<ul>";
				for(var j=0;j<tree[i].children.length;j++)
				{
					temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].children[j].level+"'> <a href='javascript:void(0);' onclick='scrollToValue("+'"'+getSubtitleName(tree[i].children[j].text)+'"'+")'>"+tree[i].children[j].text+"</a>";
					if (tree[i].children[j].children.length>0)
					{
						temp+="<ul>";
						for(var k=0;k<tree[i].children[j].children.length;k++)
						{
							temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].children[j].children[k].level+"'> <a href='javascript:void(0);' onclick='scrollToValue("+'"'+getSubtitleName(tree[i].children[j].children[k].text)+'"'+")'>"+tree[i].children[j].children[k].text+"</a></li>";
						}
						temp+="</ul>";
					}
					temp+="</li>";
				}
				temp+="</ul>";
			}
			temp+="</li>";
		}
		document.getElementById("doc_quick_navigation").innerHTML=temp;
		
		//Add correct ids to titles
		var listoftitles=document.getElementById("doc_main_content").getElementsByTagName("h2");
		for(var i=0;i<listoftitles.length;i++)
		{
			listoftitles[i].id=getSubtitleName(listoftitles[i].innerHTML);
			listoftitles[i].innerHTML=listoftitles[i].innerHTML+" <i class='fas fa-angle-up clickety' onclick='scrollToValue("+'"backtotop_"'+")'></i>";
		}
		listoftitles=document.getElementById("doc_main_content").getElementsByTagName("h3");
		for(var i=0;i<listoftitles.length;i++)
		{
			listoftitles[i].id=getSubtitleName(listoftitles[i].innerHTML);
			listoftitles[i].innerHTML=listoftitles[i].innerHTML+" <i class='fas fa-angle-up clickety' onclick='scrollToValue("+'"backtotop_"'+")'></i>";
		}
		
		$('[data-toggle="tooltip"]').tooltip();
	});
	//Update sidebar to the left
	updateLeftSidebar();
	document.body.scrollTop=0;//Safari
	document.documentElement.scrollTop=0;//Other browsers
}

function updateLeftSidebar()
{
	var sb=[
		["Introduction","introduction"],
		//["Anthropology",
			//["History","history"],
			//["Important Figures","figures"],
			//["Mythology","mythology"]
			//["List of Holidays","holidays"]
		//],
		["0",
			["Preface","0/preface"],
			["Phonology","0/phono"],
			["Orthography","0/ortho"],
			["Sound Changes","0/sc"],
			["Nominal Morphology","0/nom"],
			["Verbal Morphology","0/vrb"],
			["Derivational Morphology","0/deriv"],
			["Syntax","0/syn"],
			["External Interactions","0/external"]
		],
		["1",
			["Phonology","1/phono"],
			["Orthography","1/ortho"],
			["Sound Changes","1/sc"]
		],
		["Bibliography","bibliography"]
	];
	var temp="";
	for(var i=0;i<sb.length;i++)
	{
		var tt=sb[i][0];
		for(var j=0;j<stagelist.length;j++) tt=tt.replace(j,stagelist[j][0]);
		temp+="<div class='DOC_bd-toc-item'";
		if (sb[i].length==2) temp+=" id='DOC_left_sidenav_unexpandable_"+sb[i][1]+"'";
		temp+="><a class='DOC_bd-toc-link' href='javascript:void(0);' onclick='loadDocContent(\"";
		if (sb[i].length>2) temp+=sb[i][1][1];
		else temp+=sb[i][1];
		temp+="\");'>"+tt+"</a>";
		if (sb[i].length>2)
		{
			temp+="<ul class='nav DOC_bd-sidenav'>";
			for(var j=1;j<sb[i].length;j++)
			{
				temp+="<li";
				if (_last_loaded_file==sb[i][j][1]) temp+=" class='active DOC_bd-sidenav-active'";
				temp+="><a href='javascript:void(0);' onclick='loadDocContent(\""+sb[i][j][1]+"\");'>"+sb[i][j][0]+"</a></li>";
			}
			temp+="</ul>";
		}
		temp+="</div>";
	}
	document.getElementById("DOC_bd-docs-nav").innerHTML=temp;
	//
	var q=document.getElementsByClassName("DOC_bd-sidenav-active");
	if (q.length>0) q[0].parentNode.parentNode.classList.add("active");
	else document.getElementById("DOC_left_sidenav_unexpandable_"+_last_loaded_file).classList.add("active");
}

function getExample(changecolumn,sett)
{
	var pit=[];
	var out="";
	for(var i=3;i<dbase.length;i++)
	{
		if(dbase[i][changecolumn]!=""&&dbase[i][0]!="//")
		{
			if (!dbase[i][changecolumn].includes("~")) pit.push(i);//Temporarily exclude ablauting stuff for nicer display
		}
	}
	if (pit.length==0) out="N/A";
	else
	{
		var selected=pit[~~(pit.length*Math.random())];
		var s=dbase[selected][changecolumn];
		if (s.charAt(1)=="-") s=s.slice(1);
		for(var i=0;i<10;i++) s=s.replace("-"+i+"-","-…-")
		out="<i><b>"+s+"</b></i>";
		var lookup=changecolumn;
		for(var i=0;i<maincolumns.length;i++)
		{
			if (lookup<maincolumns[i])
			{
				lookup=maincolumns[i];
				i=maincolumns.length;
			}
		}
		//Final
		s=dbase[selected][lookup];
		if (s.charAt(1)=="-") s=s.slice(1);
		for(var i=0;i<10;i++) s=s.replace("-"+i+"-","-…-")
		out+=" > <i>"+s+"</i>";
		//
		var lookup=changecolumn-1;
		for(var i=lookup;i>0;i--)
		{
			if (dbase[selected][i]!=""&&dbase[1][i]!="MEANING"&&dbase[1][i]!="GRAMMAR")
			{
				lookup=i;
				i=0;
			}
		}
		s=dbase[selected][lookup];
		if (s.charAt(1)=="-") s=s.slice(1);
		for(var i=0;i<10;i++) s=s.replace("-"+i+"-","-…-")
		out="<i>"+s+"</i> > "+out;
	}
	if (!sett) return(out);
	else document.getElementById("span_change_"+changecolumn).innerHTML=out;
}

function docParseData(dat)
{
	for(var i=0;i<stagelist.length;i++) dat=replaceAll("§lang_"+i,stagelist[i][0],dat);
	var qqp=Number(_last_loaded_file.charAt(0));
	//Include sound changs
	if (dat.includes("||SOUNDCHANGES||"))
	{
		var temp="";
		var pipo=stagelist[qqp][1];
		var texto="";
		while(pipo<__maxscroll)
		{
			if (qqp!=stagelist.length-1)
			{
				if (pipo==stagelist[qqp+1][1]) break;
			}
			if (dbase[1][pipo].charAt(0)!="!"&&dbase[2][pipo]!="VVV"&&dbase[1][pipo]!="GRAMMAR"&&dbase[1][pipo]!="LOANS")
			{
				if (dbase[1][pipo]!="")
				{
					if (temp!="") temp+="</pre>";
					if (texto!="") temp+="<p>"+texto+"</p>";
					var teetee=dbase[1][pipo].split("|-|");
					temp+="<p>"+teetee[0]+"</p><pre>";
					if (teetee.length>1) texto=teetee[1];
					else texto="";
				}
				else temp+="</br>";
				temp+="<span";
				if (enablesoundchangetooltips)
				{
					temp+=' data-toggle="tooltip" data-placement="right" title="'+parseSoundChange(replaceAll("Ø","∅",dbase[2][pipo]))+'"';
				}
				temp+=">"+replaceAll("Ø","∅",dbase[2][pipo])+"</span>";
				//Include in example
				temp+=" (ex. <span id='span_change_"+pipo+"'>"+getExample(pipo,false)+"</span> <a onclick='getExample("+pipo+",true);' class='clickety'><i class='fas fa-redo'></i></a>)";
			}
			pipo++;
		}
		if (temp!="") temp+="</pre>";
		if (texto!="") temp+="<p>"+texto+"</p>"
		dat=dat.replace("||SOUNDCHANGES||",temp);
	}
	//Include deity tree
	if (dat.includes("||DEITYTREE||"))
	{
		var dtree=[
			["TIME"],
			["SUNGOD","MOONGOD","SKYDADDY","EARTHMUMMY"]
		];
		var temp="";
		dat=dat.replace("||DEITYTREE||",temp);
	}
	//Do tables
	for(var i=0;i<declensionlist.length;i++)
	{
		if (dat.includes("||TABLE-"+declensionlist[i][0]+"||"))
		{
			var temp="Table of "+declensionlist[i][0];
			temp=getRandomInflectionTable(declensionlist[i][0],qqp,false,true,_inflection_table_id);
			_inflection_table_id++;
			dat=dat.replace("||TABLE-"+declensionlist[i][0]+"||",temp);
		}
	}
	return(parseEtymoText(dat,getBoop(_last_loaded_file)));
}

function getBoop(pop)
{
	if (pop=="mythology") pop="4";
	else if (pop.includes("0/")) pop="0";
	else if (pop.includes("1/")) pop="1";
	else if (pop.includes("2/")) pop="2";
	else if (pop.includes("3/")) pop="3";
	else if (pop.includes("4/")) pop="4";
	else pop=-1;
	return(pop);
}

function getRandomInflectionTable(pattern,stage,forceblank,adddiv,tablid)
{
	var temp="";
	//Make list of candidate categories
	var pit_cat=[];
	var inflectioncategory="";
	for(var i=0;i<declensionlist.length;i++)
	{
		if (dbase[declensionlist[i][1]][1]==pattern||dbase[declensionlist[i][1]][stagelist[stage][1]].replace(">","")==pattern) pit_cat.push(dbase[declensionlist[i][1]][1]);
		if (dbase[declensionlist[i][1]][1]==pattern) inflectioncategory=dbase[declensionlist[i][1]][2];
	}
	//Populate possible words
	var pit=[];
	var referrent=false;
	if (inflectioncategory=="Comparative"||inflectioncategory=="Superlative")
	{
		pit_cat=[];
		for(var i=0;i<declensionlist.length;i++) //Find all adjectives
		{
			if (dbase[declensionlist[i][1]][2]=="Adjective") pit_cat.push(dbase[declensionlist[i][1]][1]);
		}
	}
	//
	var lastindice="";
	for(var i=3;i<dbase.length;i++)
	{
		if (dbase[i][0]=="@@@@") i=dbase.length;
		else
		{
			if (dbase[i][0]=="//")
			{
				referrent=false;
				if (pit_cat.includes(dbase[i][1])) referrent=true;
				lastindice=dbase[i][1];
			}
			else if (referrent==true&&dbase[i][maincolumns[stage]]!="")
			{
				if (inflectioncategory=="Comparative"||inflectioncategory=="Superlative") pit.push([i,lastindice]);
				else pit.push(i);
			}
		}
	}
	if (pit.length==0) return("N/A");
	var selected=pit[~~(pit.length*Math.random())];
	//Make actual table
	if (inflectioncategory=="Noun") temp=tableNoun(selected,pattern,stage,false,tablid);
	if (inflectioncategory=="Adjective") temp=tableAdjective(selected,pattern,stage,false,tablid,0);
	if (pattern=="PRON_PERS_1"||pattern=="PRON_PERS_2") temp=tablePersPronoun(pattern,stage);
	if (pattern=="PRON_PERS_3") temp=tablePronounIrregular(pattern,stage);
	if (inflectioncategory=="Comparative") temp=tableAdjective(selected[0],selected[1],stage,false,tablid,1);
	if (inflectioncategory=="Superlative") temp=tableAdjective(selected[0],selected[1],stage,false,tablid,2);
	if (inflectioncategory=="Numeral") temp=tableAdjective(selected,pattern,stage,true,tablid,0);
	if (inflectioncategory=="Verb") temp=tableVerb(selected,pattern,stage,true,tablid);
	if (adddiv) temp="<div id='randomInflectionTable"+tablid+"'>"+temp+"</div>";
	return(temp);
}

function findNewTable(tableid,pattern,stage,forceblank)
{
	var temp=getRandomInflectionTable(pattern,stage,forceblank,false,tableid);
	document.getElementById("randomInflectionTable"+tableid).innerHTML=temp;
}

function getSubtitleName(txt)
{
	txt=replaceAll(" ","_",txt.toLowerCase());
	txt=replaceAll("'","",txt);
	return(txt+"_");
}