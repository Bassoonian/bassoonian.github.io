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
		document.getElementById("doc_main_content").innerHTML=dat;
		//Make level list
		var tree=[];
		var leaf=null;
		for(var node of (document.getElementById("doc_main_content")).querySelectorAll("h1, h2, h3, h4, h5, h6"))
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
	});
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
				temp+=dbase[2][pipo];
			}
			pipo++;
		}
		if (temp!="") temp+="</pre>";
		dat=dat.replace("||SOUNDCHANGES||",temp);
	}
	return(parseEtymoText(dat));
}