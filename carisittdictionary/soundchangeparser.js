function parseSoundChange(pp)
{
	var temp="";
	var temp2="";
	var orarray=pp.split("/");
	var through="";
	__ploor=false;
	//Cut up in from and to
	var orarraysub=orarray[0].split(">");
	var fromar=orarraysub[0].trim();
	var toar=orarraysub[1].trim();
	
	if ((fromar.split("→")).length>1)
	{
		through=(fromar.split("→"))[1];
		fromar=(fromar.split("→"))[0];
	}
	
	var from=splitIntoSequence(fromar);
	var to=splitIntoSequence(toar);
	
	if (through!="") temp+="through "+through;
	
	//Check for environments
	if (orarray.length>1)
	{
		var env=orarray[1].trim();
		temp+=" "+env+"";
	}
	//Output result
	return(temp+".");
}
function checkIfCategory(t,isfrom)
{
	return(t);
}
function splitIntoSequence(t)
{
	var out=[];
	var pl=t.charAt(0);
	var adding=false;
	for(var i=1;i<t.length;i++)
	{
		var p=t.charAt(i);
		if (p=="[") adding=true;
		if (!adding)
		{
			out.push(pl);
			pl=p;
		}
		else pl+=p;
		if (p=="]") adding=false;
	}
	out.push(pl);
	//Now figure out what actually up here
	var out2=[];
	var pl="";
	var pl2="";
	for(var i=0;i<out.length;i++)
	{
		var p=out[i].charAt(0);
		//Is this a category?
		switch(p)
		{
			case "C": pl="consonant";break;
			case "P": pl="plosive";break;
			case "T": pl="dental";break;
			case "H": pl="laryngeal";break;
			case "R": pl="resonant";break;
			case "S": pl="sonorant";break;
			case "K": pl="velar";break;
			case "N": pl="nasal";break;
			case "V": pl="vowel";break;
		}
		if (pl!=""||p=="[")
		{
			if (pl2!="") out2.push([pl2]);
			var k=out[i].split("[");
			if (k.length>1)
			{
				var l=k[1].split(" ");
				for(var j=0;j<l.length;j++)
				{
					var p=replaceAll("]","",l[j]);
					switch(p)
					{
						case "+voice": pl="voiced";break;
						case "-voice": pl="unvoiced";break;
						case "+aspirated": pl="aspirated";break;
						case "-aspirated": pl="unaspirated";break;
						case "+long": pl="long";break;
						case "+overlong": pl="overlong";break;
						case "-long": pl="short";break;
						case "-semivowel": pl="non-semivowel";break;
						case "-stress": pl="unstressed";break;
						case "+stress": pl="stressed";break;
						case "+alveolar": pl="alveolar";break;
						case "+bilabial": pl="bilabial";break;
					}
				}
			}
		}
		else pl2+=p;
	}
	out2.push([pl2]);
	return(out2);
}