function str_insert(str,ch,pos)
{
	return(str.slice(0,pos-1)+ch+str.slice(pos-1));
}

function searchRemoveDiacritics(str)
{
	str=str.toLowerCase();
	str=replaceAll("-","",str);
	str=replaceAll("ā","a",str);
	str=replaceAll("ē","e",str);
	str=replaceAll("ī","i",str);
	str=replaceAll("ō","o",str);
	str=replaceAll("ô","o",str);
	str=replaceAll("ū","u",str);
	str=replaceAll("ȳ","y",str);
	str=replaceAll("ø̄","ø",str);
	str=replaceAll("ǣ","æ",str);
	return(str);
}