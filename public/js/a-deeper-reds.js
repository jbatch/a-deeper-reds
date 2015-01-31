var text = '';
var wordArray = [];
var i = 0;
var playing = false;
var pausePeriod = 1.5;

var wpm = 300;

var timer;

function updateText(){

}

function stepBackward(){

}

function stepForward(){
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

		timer = setInterval(stepForward, 60000/wpm);
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

