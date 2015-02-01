var text = '';
var wordArray = [];
var wordIndex;
var playing = false;
var pausePeriod = 1.5;
var pauseComma = 0.5;
var highlightedIndex = -1;

var wpm = 100;

var timer;

// This is pretty great. Thankyou beiyuu
// https://gist.github.com/beiyuu/2029907
$.fn.selectRange = function(start, end) {
    var e = document.getElementById($(this).attr('id')); // I don't know why... but $(this) don't want to work today :-/
    if (!e) return;
    else if (e.setSelectionRange) { e.focus(); e.setSelectionRange(start, end); } /* WebKit */ 
    else if (e.createTextRange) { var range = e.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', start); range.select(); } /* IE */
    else if (e.selectionStart) { e.selectionStart = start; e.selectionEnd = end; }
};


function updateText(){

}

function stepBackward(){
	if(highlightedIndex >= 1){
		highlightedIndex--;
	}
	wordIndex = -1;
	highlightParagraph(highlightedIndex);

}

function stepForward(){
	highlightedIndex++;
	wordIndex = -1;
	highlightParagraph(highlightedIndex);
}

function nextWord(){
	wordIndex++;
	if(wordIndex > wordArray[highlightedIndex].length){
		wordIndex = 0;
		highlightedIndex++;
		highlightParagraph(highlightedIndex);
	}
	if(playing)
	{
		var len = wordArray[highlightedIndex][wordIndex].length;
		if(len % 2 == 0){
			wordArray[highlightedIndex][wordIndex] = ' ' + wordArray[highlightedIndex][wordIndex];
		}
		var word = colorLetter();
		$('#current-word').html(word);
	}
	else{
		pause();
	}
	
}

function play(){
	if(!playing)
	{
		wordIndex = -1;

		if(highlightedIndex == -1){
			highlightedIndex = 0;
		}

		buildWordArray();
		highlightParagraph(highlightedIndex);

		playing = true;
		$('#play-btn').removeClass('glyphicon-play').addClass('glyphicon-pause');

		timer = setInterval(nextWord, 60000/wpm);
	}
	else{
		pause();
	}
}

function pause(){
	clearInterval(timer);
	$('#play-btn').removeClass('glyphicon-pause').addClass('glyphicon-play');
	playing = false;
}

function colorLetter(){
	var word = wordArray[highlightedIndex][wordIndex];
	var middleIndex = Math.ceil(word.length / 2) - 1;
	var letter = word.charAt(middleIndex);
	var beg = word.substring(0, middleIndex);
	var end = word.substring(middleIndex + 1, word.length);
	letter = '<span style="color:red">' + letter + '</span>';

	return beg + letter + end;
}

function cleanArray(array){
	var newArray = [];
	for(var index = 0; index < array.length; index++){
		if(array[index]){
			newArray.push(array[index]);
		}
	}

	return newArray;
}

function highlightParagraph(index){
	//find paragraph
	var curr = 0;
	var newLineCount = 0;
	var start = 0;
	var end = 0;
	var currChar;
	//In case text doesn't end in a \n\n
	var text = $('#text').val() + '\n\n';
	var max = text.length;
	
	while(newLineCount < index){
		currChar = text.charAt(curr);
		if(currChar == '\n'){
			if(text.charAt(curr + 1) == '\n'){
				newLineCount++;
				curr++;
			}
		}
		curr++;
	}
	start = curr;
	while(newLineCount == index && curr <= max){
		currChar = text.charAt(curr);
		if(currChar == '\n'){
			if(text.charAt(curr + 1) == '\n'){
				end = curr;
				newLineCount++;
			}
		}
		curr++;
	}

	if(curr > max){
		highlightedIndex--;
		playing = false;
		highlightParagraph(highlightedIndex);
	}
	else{
		$('#text').selectRange(start, end);
	}
}

function buildWordArray(){
	var text = $('#text').val();
	var paraArray = cleanArray(text.split('\n\n'));

	for(var ii = 0; ii < paraArray.length; ii++){
		paraArray[ii] = paraArray[ii].replace('\n', ' ');
		wordArray[ii] = paraArray[ii].split(' ');
	}

	console.log(wordArray);
}

function saveConfig(){
	wpm = $('#wpm').val();
	pausePeriod = $('#pausePeriod').val();
	pauseComma = $('#pauseComma').val();
}







