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
			case "pbsl": return("Proto-Balto-Slavic");break;
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
			case "esp": return("Spanish");break;
			case "por": return("Portuguese");break;
			case "cat": return("Catalan");break;
			case "fra": return("French");break;
			case "ita": return("Italian");break;
			case "gli": return("Galician");break;
			case "arb": return("Arabic");break;
			case "pkvl": return("Proto-Kartvelian");break;
			case "avz": return("Avestan");break;
			case "on": return("Old Norse");break;
			case "lit": return("Lithuanian");break;
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
function format_historical_form(str,stage,subgroup)
	{
		if ((stage==2||stage==3)&&subgroup==1) str="<span class='smallcapsroman'>"+str.toLowerCase()+"</span>";
		return(str);
	}
function apply_orthography(word,stage,subgroup)
	{
		subgroup = typeof subgroup !== 'undefined' ? subgroup : _activeOrtho[stage];
		var w=(word.split("~"))[0];
		w=replaceAll("'","",w);
		w=pronFixOrtho(w,stage);
//////STAGE 0
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
			w=replaceAll("ē","η",w);
			w=replaceAll("Ē","Η",w);
			w=replaceAll("o","ο",w);
			w=replaceAll("O","Ο",w);
			w=replaceAll("ō","ω",w);
			w=replaceAll("Ō","Ω",w);
			
			w=replaceAll("ŋ","γ",w);
			
			w=w.replace(/(σ)($|\s)/g,"ς$2");
			
			w="*"+w;
		}
		if (stage==0&&subgroup==1) w=apply_romanisation(w,stage);
////////// STAGE 1
		if (stage==1)
		{
			w=replaceAll("X","Ḫ",w);
			w=replaceAll("x","ḫ",w);
			w=replaceAll("̯","",w);
			w=replaceAll("ŋ","ng",w);
			w=replaceAll("ks","x",w);
			w="*"+w;
		}
////////// STAGE 2
		if (stage==2)
		{
			w=replaceAll("k","c",w);
			w=replaceAll("K","C",w);
			w=replaceAll("ʰ","h",w);
			
			w=replaceAll("f","ff",w);
			w=replaceAll("F","Ff",w);
			w=replaceAll("v","f",w);
			w=replaceAll("V","F",w);
			//Clean up excessive ffs
			w=w.replace(/(^|\s)ff/g,"$1f");w=w.replace(/(^|\s)Ff/g,"$1F");//Word-initially
			w=w.replace(/([ptkfs])ff/g,"$1f");w=w.replace(/ff([ptkfs])/g,"f$1");//In clusters
			
			w=replaceAll("w","v",w);
			w=replaceAll("W","V",w);
			w=replaceAll("cs","x",w);
			
			w=replaceAll("cv","qu",w);
			w=replaceAll("Cv","Qu",w);
			w=w.replace(/u([uų])/g,"$1");
			
			w=replaceAll("ō","au",w);
			w=replaceAll("Ō","Au",w);
			w=replaceAll("ū","ou",w);
			w=replaceAll("Ū","Ou",w);
			w=replaceAll("ȳ","ui",w);
			w=replaceAll("Ȳ","Ui",w);
			w=replaceAll("ǣ","ae",w);
			w=replaceAll("ǣ","ae",w);
			w=replaceAll("Ǣ","Ae",w);
			w=replaceAll("ø̄","oe",w);
			w=replaceAll("Ø̄","Oe",w);
			w=replaceAll("ŋ","ng",w);
		}
		if (stage==2&&subgroup==0)
		{
			w=replaceAll("β","ḅ",w);
			w=replaceAll("ð","ḍ",w);
			w=replaceAll("ɣ","ġ",w);
			w=replaceAll("^ḅ","Ḅ",w);
			w=replaceAll("^ḍ","Ḍ",w);
			w=replaceAll("^ġ","Ġ",w);
			
			w=replaceAll("y","î",w);
			w=replaceAll("Y","Î",w);
			w=replaceAll("æ","ə",w);
			w=replaceAll("Æ","Ə",w);
			w=replaceAll("ø","ê",w);
			w=replaceAll("Ø","Ê",w);
			
			//postconsonantal /w/ & /j/ (eg pva > pua)
			w=w.replace(/([mnpbtdkglrfvswj])v([aeiouəîêęǫųāēī])/g,"$1u$2");
			w=w.replace(/([mnpbtdkglrfvswj])j([aeiouəîêęǫųāēī])/g,"$1i$2");
		}
		if (stage==2&&subgroup==1)
		{
			w=replaceAll("ð","d",w);
			w=replaceAll("ɣ","g",w);
			w=replaceAll("^d","D",w);
			w=replaceAll("^g","G",w);
			w=replaceAll("ř","r",w);
			w=replaceAll("Ř","R",w);
			
			w=replaceAll("ā","a",w);
			w=replaceAll("Ā","a",w);
			w=replaceAll("ē","e",w);
			w=replaceAll("Ē","E",w);
			w=replaceAll("ī","i",w);
			w=replaceAll("Ī","I",w);
			w=replaceAll("ę","e",w);
			w=replaceAll("Ę","E",w);
			w=replaceAll("ǫ","o",w);
			w=replaceAll("Ǫ","O",w);
			w=replaceAll("ų","u",w);
			w=replaceAll("Ų","U",w);
			w=replaceAll("y","i",w);
			w=replaceAll("Y","I",w);
			w=replaceAll("æ","e",w);
			w=replaceAll("Æ","E",w);
			w=replaceAll("ø","e",w);
			w=replaceAll("Ø","E",w);
			
			w=replaceAll("j","i",w);
			w=replaceAll("J","I",w);
			w=replaceAll("u","v",w);
			w=replaceAll("U","V",w);
		}
///////// STAGE 3
		if (stage==3&&subgroup==0)
		{
			w=splitIntoSyllables(w,3);
			var k=w.split("§");
			if (k.length>1)
			{
				//Indicate penultimate stress unless preceding syllable is heavy
				//if (k.length==2) k[0]=applyStressToFirstVowel(k[0],3); //Bisyllabic, so always the first syllable
				if (k[k.length-1].includes("%")&&!k[k.length-1].includes("ʲ%")&&!k[k.length-1].includes("z%")&&k.length>2)//else
				{
					if (_sylbreaks[3].includes(k[k.length-3].slice(-1))) k[k.length-2]=applyStressToFirstVowel(k[k.length-2],3); //Open syllable
					//else k[k.length-3]=applyStressToFirstVowel(k[k.length-3],3); //Closed
				}
			}
			w=k.join("");
		}
		if (stage==3&&subgroup<2)
		{
			w=replaceAll("k","c",w);
			w=replaceAll("K","C",w);
			w=replaceAll("cw","qw",w);
			w=replaceAll("Cw","Qw",w);
			
			w=replaceAll("ī","ei",w);
			w=replaceAll("Ī","Ei",w);
			w=replaceAll("ō","au",w);
			w=replaceAll("Ō","Au",w);
			w=replaceAll("ū","ou",w);
			w=replaceAll("Ū","Ou",w);
			w=replaceAll("ø̄","oi",w);
			w=replaceAll("Ø̄","Oi",w);
			w=replaceAll("ǣ","ai",w);
			w=replaceAll("ǣ","ai",w);
			w=replaceAll("Ǣ","Ai",w);
			w=replaceAll("ȳ","ui",w);
			w=replaceAll("Ȳ","Ui",w);
			if (subgroup==0)
			{
				w=replaceAll("æ","ə",w);
				w=replaceAll("Æ","Ə",w);
				w=replaceAll("y","î",w);
				w=replaceAll("Y","Î",w);
				w=replaceAll("ø","ê",w);
				w=replaceAll("Ø","Ê",w);
			}
			else
			{
				w=replaceAll("æ","e",w);
				w=replaceAll("Æ","E",w);
				w=replaceAll("y","i",w);
				w=replaceAll("Y","I",w);
				w=replaceAll("ø","e",w);
				w=replaceAll("Ø","E",w);
			}
			
			w=w.replace(/qw(!?[eēiəîêʲ])/g,"cw$1");
			w=w.replace(/Qw(!?[eēiəîêʲ])/g,"Cw$1");
			w=w.replace(/c(!?[eēiəîêʲ])/g,"qw$1");
			w=w.replace(/C(!?[eēiəîêʲ])/g,"Qw$1");
			w=w.replace(/g(!?[eēiəîêʲ])/g,"gw$1");
			w=w.replace(/G(!?[eēiəîêʲ])/g,"Gw$1");
			
			//Stress
			if (subgroup==0) w=w.replace(/!([aAāĀeēEĒiIoOuUîÎêÊəƏ])/g,"$1́");
			
			if (subgroup==0)
			{
				w=replaceAll("ð","ḍ",w);
				w=replaceAll("ɣ","ġ",w);
				w=replaceAll("^ḍ","Ḍ",w);
				w=replaceAll("^ġ","Ġ",w);
			}
			else
			{
				w=replaceAll("ð","d",w);
				w=replaceAll("ɣ","g",w);
			}
			w=replaceAll("θ","th",w);
			w=replaceAll("x","ch",w);
			w=replaceAll("X","Ch",w);
			
			w=w.replace(/w([uŭú])/g,"y$1");
			w=w.replace(/W([uŭú])/g,"Y$1");
			w=w.replace(/([uú])w/g,"$1y");
			w=w.replace(/([cCqQ])y/g,"$1u");
			
			w=replaceAll("w","u",w);
			w=replaceAll("W","U",w);
			
			w=replaceAll("j","i",w);
			w=replaceAll("J","I",w);
			
			w=replaceAll("z%","sa",w);
			w=replaceAll("zʲ%","sia",w);
			w=replaceAll("z","s",w);
			
			w=replaceAll("^t","T",w);
			w=replaceAll("^d","D",w);
			w=replaceAll("^g","G",w);
			//Fix some stuff
			w=replaceAll("ʲ%","i",w);
			w=w.replace(/(ʲ)($|\s)/g,"i$2");
			w=replaceAll("ʲ","i",w);
			w=replaceAll("%","",w);
			w=replaceAll("ŋ","ng",w);
			
			if (subgroup==1)
			{
				w=replaceAll("u","v",w);
				w=replaceAll("ŭ","v",w);
				w=replaceAll("U","V",w);
				w=replaceAll("ā","a",w);
				w=replaceAll("Ā","A",w);
				w=replaceAll("ē","e",w);
				w=replaceAll("Ē","E",w);
			}
		}
		if (stage==3&&subgroup==2)
		{
			/*w=" "+w.toLowerCase()+" ";
			w=w.replace("%","");
			w=w.replace("ŭ","");
			
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
			
			w=w.trim();*/
			w="[to do]";
		}
//////// STAGE 4
		if (stage==4)
		{
			w=splitIntoSyllables(w,4);
			var k=w.split("§");
			if (k.length>1)
			{
				//Indicate penultimate stress unless preceding syllable is heavy
				//if (k.length==2) k[0]=applyStressToFirstVowel(k[0],3); //Bisyllabic, so always the first syllable
				if (k[k.length-1].includes("%")&&!k[k.length-1].includes("ʲ%")&&k.length>2)//else
				{
					if (_sylbreaks[3].includes(k[k.length-3].slice(-1))) k[k.length-2]=applyStressToFirstVowel(k[k.length-2],3); //Open syllable
					//else k[k.length-3]=applyStressToFirstVowel(k[k.length-3],3); //Closed
				}
			}
			w=k.join("");
			w=w.replace(/!([aAeEiIoOuU])/g,"$1́");
			
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
			
			w=w.replace(/ʃ([ptcmnq])/g,"s$1",w);
			w=replaceAll("ʃ","x",w);
			w=replaceAll("^x","X",w);
			w=replaceAll("^s","S",w);
			w=replaceAll("ʒd","sd",w);
			w=replaceAll("ʒ","j",w);
			
			w=replaceAll("ɲ","ñ",w);
			w=replaceAll("^ñ","Ñ",w);
			w=replaceAll("ʎ","ł",w);
			w=replaceAll("^ł","Ł",w);
			w=replaceAll("xx","sx",w);
			w=w.replace(/([aeiouy])(z)([aeiouy])/g,"$1s$3");
			w=w.replace(/([BCDFGHKLMNPRSTVXbcdfghklmnprstvx])(y)([aeiou])/g,"$1i$3");
			w=w.replace(/([qQ]u)y/g,"$1i");
			
			//w=w.replace(/([aeiou])(i)/g,"$1y");
			//w=w.replace(/([qQ])(u)(y)/g,"$1ui");
			
			w=w.replace(/(g)([ie])/g,"gu$2");
			w=w.replace(/(G)([ie])/g,"Gu$2");
			
			// v correct
			w=replaceAll("tsi","ci",w);
			w=replaceAll("Tsi","Ci",w);
			w=replaceAll("ts","ç",w);
			w=replaceAll("Ts","Ç",w);
			w=replaceAll("tx","ch",w);
			w=replaceAll("Tx","Ch",w);
			
			w=replaceAll("dj","dy",w);
			w=replaceAll("Dj","Dy",w);
			
			w=replaceAll("ŋ","ng",w);
			w=replaceAll("nng","ng",w);
			w=replaceAll("ngn","gn",w);
			
			w=replaceAll("%","",w);
			
			w+=" ";
			//w=replaceAll("u ","o ",w);
			w=w.trim();
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
	
function applyStressToFirstVowel(syl,stage)
	{
		var k=syl.split("");
		for(var i=0;i<k.length;i++)
		{
			if (_sylbreaks[stage].includes(k[i]))
			{
				k[i]="!"+k[i];
				i=k.length;
			}
		}
		return(k.join(""));
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