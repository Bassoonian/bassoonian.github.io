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
			case "purl": return("Proto-Uralice");break;
			case "sga": return("Old Irish");break;
			case "cym": return("Welsh");break;
			case "mhg": return("Middle High German");break;
			case "gle": return("Irish");break;
			case "rus": return("Russian");break;
			case "xlu": return("Luwian");break;
			default: return(q);break;
		}
	}
function IPAtoXSampa(a)
	{
		//Stress, length, etc
		a=replaceAll("ˈ",'"',a);
		a=replaceAll("ː",":",a);
		a=replaceAll("ʲ","_j",a);
		a=replaceAll("ˠ","_G",a);
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
			w="*"+w;
		}
		return(w);
	}
function apply_orthography(word,stage)
	{
		var w=(word.split("~"))[0];
		w=pronFixOrtho(w,stage);
		if (stage==0)
		{
			w=replaceAll("nk","γk",w);
			w=replaceAll("ng","γg",w);
			w=replaceAll("ks","χ",w);
			
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
			w=replaceAll("v","ϝ",w);
			w=replaceAll("V","Ϝ",w);
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
			w=replaceAll("h","ψ",w);
			w=replaceAll("H","Ψ",w);
			
			w=w.replace(/(ϝ)([βδγ])/g,"φ$2");
			w=w.replace(/(Ϝ)([βδγ])/g,"Φ$2");
			w=w.replace(/(ζ)([βδγ])/g,"σ$2");
			w=w.replace(/(Ζ)([βδγ])/g,"Σ$2");
			
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
			
			w=replaceAll("ȳ","y",w);
			w=replaceAll("Ȳ","Y",w);
			w=replaceAll("ø̄","ευ",w);
			w=replaceAll("Ø̄","Ευ",w);
			
			w=replaceAll("e","ε",w);
			w=replaceAll("E","Ε",w);
			w=replaceAll("ē","ει",w);
			w=replaceAll("Ē","Ει",w);
			w=replaceAll("ê","η",w);
			w=replaceAll("Ê","Η",w);
			w=replaceAll("o","ο",w);
			w=replaceAll("O","Ο",w);
			w=replaceAll("ō","ου",w);
			w=replaceAll("Ō","Ου",w);
			w=replaceAll("ô","ω",w);
			w=replaceAll("Ô","Ω",w);
			
			w=w.replace(/(σ)($|\s)/g,"ς$2");
			
			w="*"+w;
		}
		if (stage==1)
		{
			w=replaceAll("X","H",w);
			w=replaceAll("x","h",w);
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
		if (stage==3)
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
			w=replaceAll("ˠ","̨",w);
		}
		if (w=="*") w="";
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