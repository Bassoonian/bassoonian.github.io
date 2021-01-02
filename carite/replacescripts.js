function getLangName(q)
	{
		switch(q)
		{
			case "lat": return("Latin");break;
			case "eus": return("Basque");break;
			case "peus": return("Proto-Basque");break;
			case "grc": return("Ancient Greek");break;
			case "peo": return("Old Persian");break;
			case "pclt": return("Proto-Celtic");break;
			case "legp": return("Late Egyptian");break;
			case "eng": return("English");break;
			case "pslv": return("Proto-Slavic");break;
			case "pgmc": return("Proto-Germanic");break;
			case "sqi": return("Albanian");break;
			case "toch": return("Tocharian");break;
			case "tchA": return("Tocharian A");break;
			case "tchB": return("Tocharian B");break;
			case "san": return("Sanskrit");break;
			case "hit": return("Hittite");break;
			case "hye": return("Armenian");break;
			case "gal": return("Gaulish");break;
			case "xpu": return("Punic");break;
			case "sbi": return("Suebi");break;
			case "ett": return("Etruscan");break;
			case "pie": return("Proto-Indo-European");break;
			case "psmt": return("Proto-Semitic");break;
			case "mga": return("Middle Irish");break;
			case "got": return("Gothic");break;
			case "ang": return("Old English");break;
			case "purl": return("Proto-Uralic");break;
			case "sga": return("Old Irish");break;
			case "cym": return("Welsh");break;
			case "mhg": return("Middle High German");break;
			case "gle": return("Irish");break;
			case "rus": return("Russian");break;
			case "xlu": return("Luwian");break;
			case "xib": return("Iberian");break;
			default: return(q);break;
		}
	}
function IPAtoXSampa(a)
	{
		//Stress, length, etc
		a=replaceAll("ˈ",'"',a);
		a=replaceAll("ː",":",a);
		a=replaceAll("ʲ","_j",a);
		a=replaceAll("ʷ","_w",a);
		a=replaceAll("ʰ","_h",a);
		a=replaceAll("̩","=",a);
		a=replaceAll("̞","_o",a);
		a=replaceAll("̃","~",a);
		a=replaceAll("̯","_^",a);
		
		//Consonants
		a=replaceAll("ɣ","G",a);
		a=replaceAll("β","B",a);
		a=replaceAll("ð","D",a);
		a=replaceAll("ŋ","N",a);
		a=replaceAll("ʃ","S",a);
		a=replaceAll("ʁ","R",a);
		a=replaceAll("ɡ","g",a);
		a=replaceAll("ɾ","4",a);
		a=replaceAll("ɲ","J",a);
		a=replaceAll("θ","T",a);
		
		//Vowels
		a=replaceAll("æ","{",a);
		a=replaceAll("ø","2",a);
		a=replaceAll("ɑ","A",a);
		a=replaceAll("ɛ","E",a);
		a=replaceAll("ɪ","I",a);
		a=replaceAll("ɔ","O",a);
		a=replaceAll("ʊ","U",a);
		return(a);
	}
function apply_romanisation(word,stage)
	{
		var w=(word.split("~"))[0];
		w=pronFixOrtho(w,stage);
		if (stage==0)
		{
			w="*"+replaceAll("ŋ","n",w);
		}
		return(w);
	}
function apply_orthography(word,stage,subgroup)
	{
		subgroup = typeof subgroup !== 'undefined' ? subgroup : _activeOrtho[stage];
		var w=(word.split("~"))[0];
		w=replaceAll("'","",w);
		w=pronFixOrtho(w,stage);
		if (stage==0&&subgroup==0)
		{
			w=replaceAll("nk","γk",w);
			w=replaceAll("ng","γg",w);
			w=replaceAll("ks","ξ",w);
			w=replaceAll("ps","ψ",w);
			
			w=replaceAll("p","π",w);
			w=replaceAll("P","Π",w);
			w=replaceAll("b","β",w);
			w=replaceAll("B","Β",w);
			w=replaceAll("t","τ",w);
			w=replaceAll("T","Τ",w);
			w=replaceAll("d","δ",w);
			w=replaceAll("D","Δ",w);
			w=replaceAll("k","κ",w);
			w=replaceAll("K","Κ",w);
			w=replaceAll("g","γ",w);
			w=replaceAll("G","Γ",w);
			w=replaceAll("m","μ",w);
			w=replaceAll("M","Μ",w);
			w=replaceAll("n","ν",w);
			w=replaceAll("N","Ν",w);
			
			w=replaceAll("f","φ",w);
			w=replaceAll("F","Φ",w);
			w=replaceAll("v","θ",w);
			w=replaceAll("V","Θ",w);
			w=replaceAll("s","σ",w);
			w=replaceAll("S","Σ",w);
			w=replaceAll("z","ζ",w);
			w=replaceAll("Z","Ζ",w);
			w=replaceAll("r","ρ",w);
			w=replaceAll("R","Ρ",w);
			w=replaceAll("l","λ",w);
			w=replaceAll("L","Λ",w);
			w=replaceAll("j","ῐ",w);
			w=replaceAll("J","Ῐ",w);
			w=replaceAll("w","ῠ",w);
			w=replaceAll("W","Ῠ",w);
			w=replaceAll("h","η",w);
			w=replaceAll("H","Η",w);
			
			w=w.replace(/(θ)([βδγθζ])/g,"θ$2");
			w=w.replace(/(Θ)([βδγθζ])/g,"Θ$2");
			w=w.replace(/(ζ)([βδγθζ])/g,"σ$2");
			w=w.replace(/(Ζ)([βδγθζ])/g,"Σ$2");
			
			w=replaceAll("ā","ᾱ",w);
			w=replaceAll("Ā","Ᾱ",w);
			w=replaceAll("ī","ῑ",w);
			w=replaceAll("Ῑ","Ῑ",w);
			w=replaceAll("ū","ῡ",w);
			w=replaceAll("Ū","Ῡ",w);
			
			w=replaceAll("a","α",w);
			w=replaceAll("A","Α",w);
			w=replaceAll("i","ι",w);
			w=replaceAll("I","Ι",w);
			w=replaceAll("u","υ",w);
			w=replaceAll("U","Υ",w);
			
			w=replaceAll("ø̄","οι",w);
			w=replaceAll("Ø̄","Οι",w);
			
			//When Osthoff strikes back
			w=replaceAll("ø","οι",w);
			w=replaceAll("Ø","Οι",w);
			
			w=replaceAll("e","ε",w);
			w=replaceAll("E","Ε",w);
			w=replaceAll("ē","ε̄",w);
			w=replaceAll("Ē","Ε̄",w);
			w=replaceAll("ê","η",w);
			w=replaceAll("Ê","Η",w);
			w=replaceAll("o","ο",w);
			w=replaceAll("O","Ο",w);
			w=replaceAll("ō","ο̄",w);
			w=replaceAll("Ō","Ο̄",w);
			w=replaceAll("ô","ω",w);
			w=replaceAll("Ô","Ω",w);
			
			w=replaceAll("ŋ","γ",w);
			
			w=w.replace(/(σ)($|\s)/g,"ς$2");
			
			w="*"+w;
		}
		if (stage==0&&subgroup==1) w=apply_romanisation(w,stage);
		if (stage==1)
		{
			w=replaceAll("X","Ḫ",w);
			w=replaceAll("x","ḫ",w);
			w=replaceAll("̯","",w);
			w="*"+w;
		}
		if (stage==2)
		{
			w=replaceAll("ʰ","h",w);
			w=replaceAll("β","bh",w);
			w=replaceAll("ð","dh",w);
			w=replaceAll("ɣ","gh",w);
			w=replaceAll("^b","B",w);
			w=replaceAll("^d","D",w);
			w=replaceAll("^g","G",w);
		}
		if (stage==3&&subgroup==0)
		{
			w=replaceAll("θ","th",w);
			w=replaceAll("ð","dh",w);
			w=replaceAll("x","kh",w);
			w=replaceAll("X","Kh",w);
			w=replaceAll("ɣ","gh",w);
			
			w=replaceAll("^t","T",w);
			w=replaceAll("^d","D",w);
			w=replaceAll("^g","G",w);
			
			//Accents TO FIX!
			w=w.replace(/([AĀEĒIĪOŌUŪÆØYaāeēiīoōuūæyø̄%])/g,"$1§")
			var q=w.split("§");
			
			
			for(var i=0;i<q.length;i++)
			{
				if (q[i]=="̄"&&i>0)
				{
					q[i-1]+="̄";
					q.splice(i,1);
					i-=1;
				}
			}
			
			if (q[q.length-1]=="̄")
			{
				q[q.length-2]+="̄";
				q.pop();
			}
			else if (q[q.length-1]=="") q.pop();
			
			if (q.length>0)
			{
				var ptk=q[q.length-1].replace(/([AĀEĒIĪOŌUŪÆØYaāeēiīoōuūæyø̄%])/g,"!");
				if (!ptk.includes("!"))
				{
					q[q.length-2]+=q[q.length-1];
					q.pop();
				}
			}
			
			if (q.length>2) //FIX! 1) don't display if stress is penultimate 2) take antestress into account (muy dificil señor!)
			{
				//q[q.length-1]=q[q.length-1].replace(/([mnlr]ˠ?ʲ?)\%/g,"§$1°");
				q[q.length-2]+="́";
			}
			w=q.join("");
			w=replaceAll("́̄","̄́",w);
			w=replaceAll("%","",w);
			
			w=replaceAll("k","c",w);
			w=replaceAll("K","C",w);
			w=replaceAll("w","u",w);
			w=replaceAll("W","U",w);
			w=replaceAll("j","i",w);
			w=replaceAll("J","I",w);
			w=replaceAll("ŋ","nh",w);
			
			//diacritics
			w=replaceAll("ʲ","̇",w);
			w=replaceAll("ʷ","̨",w);
		}
		if (stage==3&&subgroup==1)
		{
			w=w.toLowerCase();
			//Consonants
			w=replaceAll("b","𐌱",w);
			w=replaceAll("g","𐌲",w);
			w=replaceAll("d","𐌳",w);
			w=replaceAll("z","𐌶",w);
			w=replaceAll("h","𐌷",w);
			w=replaceAll("k","𐌺",w);
			w=replaceAll("l","𐌻",w);
			w=replaceAll("m","𐌼",w);
			w=replaceAll("n","𐌽",w);
			w=replaceAll("j","𐌾",w);
			w=replaceAll("p","𐍀",w);
			w=replaceAll("r","𐍂",w);
			w=replaceAll("s","𐍃",w);
			w=replaceAll("t","𐍄",w);
			w=replaceAll("f","𐍆",w);
			w=replaceAll("w","𐍅",w);
			
			w=replaceAll("𐌽𐌲","𐌲𐌲",w);
			w=replaceAll("𐌽𐌺","𐌲𐌺",w);
			//Vowels
			w=replaceAll("a","𐌰",w);
			w=replaceAll("ā","𐌰",w);
			w=replaceAll("ǣ","𐌰𐌹",w);
			w=replaceAll("æ","𐌰𐌹",w);
			w=replaceAll("e","𐌴",w);
			w=replaceAll("ē","𐌴",w);
			w=replaceAll("i","𐌹",w);
			w=replaceAll("ī","𐌴𐌹",w);
			w=replaceAll("o","𐌰𐌿",w);
			w=replaceAll("ō","𐍉",w);
			w=replaceAll("u","𐌿",w);
			w=replaceAll("ū","𐌿",w);
			w=replaceAll("ø̄","𐍉𐌹",w);
			w=replaceAll("ø","𐍉𐌹",w);
			w=replaceAll("ȳ","𐍅",w);
			w=replaceAll("y","𐍅",w);
			
			w=replaceAll("%","",w);
			//TO DO: ^j/ʷ, v, bh/dh/gh
		}
		if (stage==3&&subgroup==2)
		{
			w=" "+w.toLowerCase()+" ";
			w=w.replace("%","");
			
			//Mergers
			w=replaceAll("e","i",w);
			w=replaceAll("ē","ī",w);
			w=replaceAll("o","u",w);
			w=replaceAll("ō","ū",w);
			w=replaceAll("ȳ","ū",w);
			w=replaceAll("y","u",w);
			w=replaceAll("ǣ","ā",w);
			w=replaceAll("æ","a",w);
			w=replaceAll("ø̄","ū",w);
			w=replaceAll("ø","u",w);
			
			//Long Vowels
			w=replaceAll(" ā","آ",w);
			w=replaceAll("ā","ا",w);
			w=replaceAll(" ī","اي",w);
			w=replaceAll("ī","ي",w);
			w=replaceAll(" ū","او",w);
			w=replaceAll("ū","و",w);
			
			//Short vowels
			w=replaceAll(" a","ا",w);
			w=replaceAll("a","َ",w);
			w=replaceAll(" i","ا",w);
			w=replaceAll("i","ِ",w);
			w=replaceAll(" u","ا",w);
			w=replaceAll("u","ُ",w);
			
			//Consonants
			w=replaceAll("gʲ","ج",w);
			w=replaceAll("sʲ","ش",w);
			w=replaceAll("tʷ","ط",w);
			w=replaceAll("sʷ","ص",w);
			w=replaceAll("zʷ","ظ",w);
			
			w=replaceAll("b","ب",w);
			w=replaceAll("t","ت",w);
			w=replaceAll("d","د",w);
			w=replaceAll("r","ر",w);
			w=replaceAll("z","ز",w);
			w=replaceAll("s","س",w);
			w=replaceAll("ɣ","غ",w);
			w=replaceAll("f","ف",w);
			w=replaceAll("k","ك",w);
			w=replaceAll("l","ل",w);
			w=replaceAll("m","م",w);
			w=replaceAll("n","ن",w);
			w=replaceAll("h","ه",w);
			w=replaceAll("w","و",w);
			w=replaceAll("j","ي",w);
			w=replaceAll("x","خ",w);
			w=replaceAll("θ","ث",w);
			w=replaceAll("ð","ذ",w);
			w=replaceAll("g","ق",w);
			
			w=replaceAll("v","ب",w);
			w=replaceAll("p","ف",w);
			
			w=replaceAll("ʷ","",w);
			w=replaceAll("ʲ","",w);
			
			w=w.trim();
		}
		if (stage==4)
		{
			w=replaceAll("kw","qu",w);
			w=replaceAll("Kw","Qu",w);
			
			w=replaceAll("J","Y",w);
			w=replaceAll("j","y",w);
			w=replaceAll("W","U",w);
			w=replaceAll("w","u",w);
			
			w=w.replace(/(k)([iey])/g,"qu$2");
			w=w.replace(/(K)([iey])/g,"Qu$2");
			w=replaceAll("k","c",w);
			w=replaceAll("K","C",w);
			
			
			if (w=="i") w="y";
			if (w=="I") w="Y";
			
			w=replaceAll("ʃt","st",w);
			w=replaceAll("ʃ","x",w);
			w=replaceAll("^x","X",w);
			w=replaceAll("ʒd","sd",w);
			w=replaceAll("ʒ","j",w);
			
			w=replaceAll("ɲ","nh",w);
			w=replaceAll("ʎ","lh",w);
			w=replaceAll("xx","sx",w);
			w=w.replace(/([aeiou])(z)([aeiou])/g,"$1s$3");
			w=w.replace(/([BCDFGHKLMNPRSTVXbcdfghklmnprstvx])(y)([aeiou])/g,"$1i$3");
			
			w=w.replace(/([aeiou])(i)/g,"$1y");
			w=w.replace(/([qQ])(u)(y)/g,"$1ui");
			
			w=w.replace(/(g)([ie])/g,"gu$2");
			w=w.replace(/(G)([ie])/g,"Gu$2");
			
			w=replaceAll("txi","ci",w);
			w=replaceAll("Txi","Ci",w);
			w=replaceAll("tx","ci",w);
			w=replaceAll("Tx","Ci",w);
			w=replaceAll("dj","gi",w);
			w=replaceAll("Dj","Gi",w);
			
			w=replaceAll("ŋ","g",w);
			
			w=replaceAll("%","",w);
			
			w+=" ";
			w=replaceAll("u ","o ",w);
			w=w.trim();
			
			w=w.replace(/z$/g,"se");
		}
		if (w=="*") w="";
		return(w);
	}
function applyArchaic(w)
	{
		if (showarchaic)
		{
			var z="";
			w=w.toLowerCase();
			var lmn=w.split("");
			for (var i=0;i<lmn.length;i++)
			{
				if (lmn[i]!="*"&&lmn[i]!="-"&&lmn[i]!="̄")
				{
					z+="<img class='img_src_inline' title='"+lmn[i]+"' alt='"+lmn[i]+"' src='alphabetsvg/";
					switch(lmn[i])
					{
						case "α": z+="A";break;
						case "ᾱ": z+="A";break;
						case "β": z+="B";break;
						case "γ": z+="G";break;
						case "δ": z+="D";break;
						case "κ": z+="K";break;
						case "λ": z+="L";break;
						case "μ": z+="M";break;
						case "ν": z+="N";break;
						case "ω": z+="OO";break;
						case "ο": z+="O";break;
						case "π": z+="P";break;
						case "τ": z+="T";break;
						case "ε": z+="E";break;
						case "ι": z+="I";break;
						case "ῑ": z+="I";break;
						case "ῐ": z+="I";break;
						case "υ": z+="U";break;
						case "ῡ": z+="Y";break;
						case "ῠ": z+="U";break;
						case "ρ": z+="R";break;
						case "ζ": z+="Z";break;
						case "ξ": z+="X";break;
						case "φ": z+="F";break;
						case "θ": z+="V";break;
						case "σ": z+="S";break;
						case "ς": z+="S";break;
						case "ψ": z+="PS";break;
						case "η": z+="H";break;
						case "ȳ": z+="Y";break;
						case "y": z+="Y";break;
						default: z+=lmn[i];break;
					}
					z+=".svg'>";
				}
			}
			w=z;
		}
		return(w);
	}
function formatPie(w,isroot)
	{
		if (__pie.poothstyle)
		{
			//Consonants
			w=w.replace(/k[^ʷ]/g,"q");
			w=w.replace(/g[^w]/g,"ɢ");
			w=w.replace(/ḱ/g,"k");
			w=w.replace(/ǵ/g,"g");
			
			w=w.replace(/bʰ/g,"b̤");
			w=w.replace(/dʰ/g,"d̤");
			w=w.replace(/g(ʷ?)ʰ/g,"g̈$1");
			w=w.replace(/ɢʰ/,"ɢ̤");
			
			w=w.replace(/b([^̤])/g,"ɓ$1");
			w=w.replace(/d([^̤])/g,"ɗ$1");
			w=w.replace(/g([^̈])/g,"ɠ$1");
			w=w.replace(/ɢ([^̤])/g,"ʛ$1");
			
			w=w.replace(/h₁/g,"ʔ");
			w=w.replace(/h₂/g,"χ");
			w=w.replace(/h₃/g,"ʕ");
			w=w.replace(/hₓ/g,"?");
			
			//Vowels
			w=w.replace(/e/g,"ɛ");
			w=w.replace(/é/g,"ɛ́");
			w=w.replace(/ē/g,"ɛ̄");
			w=w.replace(/ḗ/g,"ɛ̄́");
			w=w.replace(/o/g,"ɔ");
			w=w.replace(/ó/g,"ɔ́");
			w=w.replace(/ō/g,"ɔ̄");
			w=w.replace(/ṓ/g,"ɔ̄́");
			
			if (isroot) w=w.replace(/ɛ/g,"€");
		}
		else
		{
			if (__pie.glides)
			{
				w=w.replace(/w/g,"u̯");
				w=w.replace(/y/g,"i̯");
			}
			if (__pie.palatals)
			{
				w=w.replace(/ḱ/g,"k̂");
				w=w.replace(/ǵ/g,"ĝ");
			}
			if (__pie.aspiration) w=w.replace(/ʰ/g,"h");
		}
		return(w);
	}
/*function apply_nativealphabet(word,stage) THIS IS A RELIC, left in case it's useful in the future
	{
		var w=(word.split("~"))[0];
		w=pronFixOrtho(w,stage);
		if (stage==0)
		{
			REPLACED!
			w=replaceAll("st","𐌆",w);
			w=replaceAll("sk","𐌗",w);
			
			w=replaceAll("a","𐌀",w);
			w=replaceAll("ā","𐌀",w);
			w=replaceAll("b","𐌁",w);
			w=replaceAll("d","𐌃",w);
			w=replaceAll("e","𐌄",w);
			w=replaceAll("ē","𐌄",w);
			w=replaceAll("ê","𐌄",w);
			w=replaceAll("f","𐌅",w);
			w=replaceAll("v","𐌅",w);
			w=replaceAll("w","𐌅",w);
			w=replaceAll("u","𐌅",w);
			w=replaceAll("ū","𐌅",w);
			w=replaceAll("g","𐌂",w);
			w=replaceAll("h","𐌇",w);
			w=replaceAll("i","𐌉",w);
			w=replaceAll("ī","𐌉",w);
			w=replaceAll("j","𐌉",w);
			w=replaceAll("k","𐌊",w);
			w=replaceAll("l","𐌋",w);
			w=replaceAll("m","𐌌",w);
			w=replaceAll("n","𐌍",w);
			w=replaceAll("o","𐌏",w);
			w=replaceAll("ō","𐌏",w);
			w=replaceAll("ô","𐌏",w);
			w=replaceAll("p","𐌐",w);
			w=replaceAll("r","𐌓",w);
			w=replaceAll("s","𐌔",w);
			w=replaceAll("z","𐌔",w);
			w=replaceAll("t","𐌕",w);
			w=replaceAll("ȳ","𐌖",w);
			
			var qqq=Math.floor((Math.random()* 2));
			if (qqq==0) w=replaceAll("ø̄","𐌄",w);
			else w=replaceAll("ø̄","𐌏",w);
			
			w=((word.split("")).reverse()).join("");
		}
		return(w);
	}*/