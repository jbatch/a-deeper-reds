var text = '';
var wordArray = [];
var i = 0;
var playing = false;
var pausePeriod = 1.5;
var pauseComma = 0.5;
var highlightedIndex = -1;

var wpm = 300;

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
	highlightParagraph(highlightedIndex);
}

function stepForward(){
	highlightedIndex++;
	highlightParagraph(highlightedIndex);
}

function nextWord(){
	i++;
	if(i < wordArray.length)
	{
		len = wordArray[i].length;
		if(len % 2 == 0){
			wordArray[i] = ' ' + wordArray[i];
		}
		colorLetter();
		$('#current-word').html(wordArray[i]);
	}
	else{
		pause();
	}
	
}

function play(){
	if(!playing)
	{
		
		console.log('play');
		text = $('#text').val();

		var paraArray = text.split('\n');
		console.log(cleanArray(paraArray));

		wordArray = text.split(' ');
		i = 0;

		var len = wordArray[0].length;

		if(len % 2 == 0){
			wordArray[0] = ' ' + wordArray[0];
		}

		colorLetter();

		$('#current-word').html(wordArray[0]);

		$('#play-btn').removeClass('glyphicon-play').addClass('glyphicon-pause');
		playing = true;

		timer = setInterval(nextWord, 60000/wpm);
	}
	else{
		pause();
	}
}

function pause(){
	console.log('pause');
	clearInterval(timer);
	$('#play-btn').removeClass('glyphicon-pause').addClass('glyphicon-play');
	playing = false;
}

function colorLetter(){
	var word = wordArray[i];
	console.log(word);
	var middleIndex = Math.ceil(word.length / 2) - 1;
	console.log(middleIndex);
	var letter = word.charAt(middleIndex);
	var beg = word.substring(0, middleIndex);
	var end = word.substring(middleIndex + 1, word.length);
	letter = '<span style="color:red">' + letter + '</span>';

	console.log(beg);

	wordArray[i] = beg + letter + end;
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
		highlightParagraph(highlightedIndex);
	}
	else{
		$('#text').selectRange(start, end);
	}

	
}












