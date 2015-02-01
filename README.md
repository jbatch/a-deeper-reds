#A Deeper Reds

A deeper reds is a tool to help you read faster. It is my implementation of
an idea patented by [Sprtiz](http://www.spritzinc.com/). Who did a tonne of
research to show that their technique could help everyday people read up to
40% faster.

I read about Spritz during its announcement a while back and was triggered to
write my own version of it after stumbling upon a version written by [Louis
Lepper](https://github.com/louislepper). His version is currently hosted 
[here](http://onewordreader.com/).

##The Name
I'm not entirely set or happy with the name. Naming things is one of the 
hardest parts of computer science. The name came from an anagram of 'Speed
Reader'. If I didn't go with this I was looking at 'Speared Dear'. So that's
that.

##What it does
Basically you can paste in a wall of text you would like to read in the text
area and hit play. The app will go through the text one word at a time keeping
the middle of the word centered in the reading area and highlighting the middle
letter in red. This is not exactly how Spritz is implemented. They use crazy
algorithms to find the Optical Recognition Point™ (ORP™) which is not actually
always in the middle but hey.

You can use the config area to choose how many words per minute you want it to
read at and how long to pause on periods and commas (NOTE: this is not yet
implemented.)

##Live Page
You can see this page live at [red.jbat.ch](http://red.jbat.ch)