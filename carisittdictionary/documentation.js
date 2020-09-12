_haspreppeddoc=false;

function prepDoc()
{
	if (!_haspreppeddoc)
	{
		_haspreppeddoc=true;
		var temp="";
		for(var i=0;i<stagelist.length;i++)
		{
			temp+="<li><a onclick='loadDocContent("+i+")'>"+stagelist[i][0]+"</a></li>";
		}
		document.getElementById("DOC_sidenav_langlist").innerHTML=temp;
		loadDocContent(0);
	}
}

function loadDocContent(contentid)
{
	_last_loaded_file=contentid;
	$.get("documentation/"+contentid+".html",function(dat){
		dat=docParseData(dat);
		//Append title
		dat="<h1>"+getDocTitle(_last_loaded_file)+"</h1>"+dat;
		document.getElementById("doc_main_content").innerHTML=dat;
		//Make level list
		var tree=[];
		var leaf=null;
		for(var node of (document.getElementById("doc_main_content")).querySelectorAll("h2, h3, h4, h5, h6"))
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
			temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].level+"'> <a>"+tree[i].text+"</a>";
			if (tree[i].children.length>0)
			{
				temp+="<ul>";
				for(var j=0;j<tree[i].children.length;j++)
				{
					temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].children[j].level+"'> <a>"+tree[i].children[j].text+"</a>";
					if (tree[i].children[j].children.length>0)
					{
						temp+="<ul>";
						for(var k=0;k<tree[i].children[j].children.length;k++)
						{
							temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].children[j].children[k].level+"'> <a>"+tree[i].children[j].children[k].text+"</a></li>";
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
		
		$('[data-toggle="tooltip"]').tooltip();
	});
}

function getDocTitle(idi)
{
	var t="";
	for(var i=0;i<stagelist.length;i++)
	{
		if (idi==i) t=stagelist[i][0];
	}
	return(t);
}

function docParseData(dat)
{
	console.log(dat);
	for(var i=0;i<stagelist.length;i++) dat=replaceAll("§lang_"+i,stagelist[i][0],dat);
	if (dat.includes("||SOUNDCHANGES||"))
	{
		var temp="";
		var pipo=stagelist[_last_loaded_file][1];
		var texto="";
		while(pipo<dbase[0].length)
		{
			if (_last_loaded_file!=stagelist.length-1)
			{
				if (pipo==stagelist[_last_loaded_file+1][1]) break;
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
					temp+=' data-toggle="tooltip" data-placement="right" title="'+parseSoundChange(dbase[2][pipo])+'"';
				}
				temp+=">"+dbase[2][pipo]+"</span>";
			}
			pipo++;
		}
		if (temp!="") temp+="</pre>";
		if (texto!="") temp+="<p>"+texto+"</p>"
		dat=dat.replace("||SOUNDCHANGES||",temp);
	}
	return(parseEtymoText(dat));
}

function parseSoundChange(pp)
{
	//Get relevant data
	var a=pp.split("/");
	var b=a[0].split(">");
	if (a.length>1)
	{
		var c=a[1].split("_");
		c[0]=c[0].trim();
	}
	generaltalk=false;
	//Change words yo
	var prefix="";
	b[0]=b[0].trim();
	b[0]=b[0].replace("ʰ","[+aspirated]");
	b[0]=b[0].replace("ʷ","[+rounded]");
	b[0]=b[0].replace("̥","[+syllabic]");
	if (b[0].includes("["))
	{
		var tempo=b[0].split("[");
		tempo[1]=tempo[1].replace("]","");
		b[0]=tempo[0];
		
		prefix=getFeatureName(tempo[1]);
	}
	b[0]=getCategoryName(b[0],true);
	
	if (generaltalk&&prefix=="") b[0]=b[0].charAt(0).toUpperCase()+b[0].slice(1);
	else if (prefix!="") prefix=prefix.charAt(0).toUpperCase()+prefix.slice(1);
	b[0]=prefix+" "+b[0];
	
	b[1]=getFeatureName(b[1]);
	
	if (a.length>1)
	{	
		c[0]=c[0].trim();
		if (c[0].charAt(0)=="#")
		{
			c[0]="word-initial "+c[0].replace("#","");
		}
		if (c.length>1)
		{
			c[1]=c[1].trim();
		}
	}
	
	//Formulate
	var temp=b[0];
	if (a.length==1) temp+=" unconditionally";
	temp+=" become";
	if (!generaltalk) temp+="s"
	temp+=" "+b[1];
	if (a.length>1)
	{
		var wherecheck=0;
		if (c[0]=="") wherecheck++;
		if (c[1]=="") wherecheck--;
		temp+=" when ";
		if (wherecheck<1)
		{
			if (c[0]=="word-initial") temp+=c[0];
			else temp+="following "+c[0];
		}
		if (wherecheck==0) temp+" and ";
		if (wherecheck>-1)
		{
			temp+="preceding "+c[1];
		}
	}
	temp+=".";
	return(temp);
}

function getFeatureName(list)
{
	var p="";
	if (list.includes("+voice")) p+=" voiced";
	if (list.includes("-voice")) p+=" voiceless";
	if (list.includes("+stress")) p+=" stressed";
	if (list.includes("-stress")) p+=" unstressed";
	if (list.includes("+aspirated")) p+=" aspirated";
	if (list.includes("-aspirated")) p+=" unaspirated";
	if (list.includes("+syllabic")) p+=" syllabic";
	if (list.includes("+long")) p+=" long";
	if (list.includes("+overlong")) p+=" overlong";
	if (list.includes("+rounded")) p+=" rounded";
	if (list.includes("-rounded")) p+=" unrounded";
	if (list.includes("-long")) p+=" short";
	if (list.includes("-semivowel")) p+=" non-semivowel";
	if (list.includes("+alveolar")) p+=" alveolar";
	if (list.includes("+bilabial")) p+=" bilabial";
	if (p!="") return(p.trim());
	else return(list);
}

function getCategoryName(list,gen)
{
	var pa="";
	if (list=="P") pa="plosive";
	if (list=="C") pa="consonant";
	if (list=="H") pa="laryngeal";
	if (list=="V") pa="vowel";
	if (list=="R") pa="resonant";
	if (list=="S") pa="sonorant";
	if (list=="T") pa="dental";
	if (list=="K") pa="velar";
	if (list=="N") pa="nasal";
	if (pa!="")
	{
		if (gen)
		{
			generaltalk=true;
			pa+="s";
		}
		return(pa);
	}
	else return(list);
}