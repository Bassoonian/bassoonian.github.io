_haspreppeddoc=false;

function prepDoc()
{
	if (!_haspreppeddoc)
	{
		_haspreppeddoc=true;
		var temp="";
		for(var i=0;i<stagelist.length;i++)
		{
			temp+="<li><a>"+stagelist[i][0]+"</a></li>";
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
			temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].level+"' <a>"+tree[i].text+"</a>";
			if (tree[i].children.length>0)
			{
				temp+="<ul>";
				for(var j=0;j<tree[i].children.length;j++)
				{
					temp+="<li class='DOC_toc-entry DOC_toc-h"+tree[i].children[j].level+"' <a>"+tree[i].children[j].text+"</a>";
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
	for(var i=0;i<stagelist.length;i++) dat=replaceAll("§lang_"+i,stagelist[i][0],dat);
	if (dat.search("||SOUNDCHANGES||")>-1)
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
	var generaltalk=false;
	//Change words yo
	var prefix="";
	b[0]=b[0].trim().replace("ʰ","[+aspirated]");
	if (b[0].includes("["))
	{
		var tempo=b[0].split("[");
		tempo[1]=tempo[1].replace("]","");
		b[0]=tempo[0];
		
		if (tempo[1]=="+voice") prefix+=" voiced";
		if (tempo[1]=="-voice") prefix+=" voiceless";
		if (tempo[1]=="+aspirated") prefix+=" aspirated";
		if (tempo[1]=="-aspirated") prefix+=" unaspirated";
		prefix=prefix.trim();
	}
	if (b[0]=="C")
	{
		b[0]="consonants";
		generaltalk=true;
	}
	
	if (prefix=="") b[0]=b[0].charAt(0).toUpperCase()+b[0].slice(1);
	else prefix=prefix.charAt(0).toUpperCase()+prefix.slice(1);
	b[0]=prefix+" "+b[0];
	
	b[1]=b[1].trim();
	if (b[1]=="[+voice]") b[1]="voiced";
	if (b[1]=="[-voice]") b[1]="voiceless";
	if (b[1]=="[-aspirated]") b[1]="deaspirated";
	
	if (a.length>1)
	{	
		c[0]=c[0].trim();
		if (c[0].charAt(0)=="#")
		{
			c[0]="word-initial "+c[0].replace("#","");
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
		if (wherecheck<1) temp+="following "+c[0];
		if (wherecheck==0) temp+" and ";
		if (wherecheck>-1) temp+="preceding "+c[1];
	}
	temp+=".";
	return(temp);
}