---
title: Introducing Timecard App
image: http://i.imgur.com/EtyKAZg.png
image_small: http://i.imgur.com/EtyKAZgs.png
excerpt: a rewrite of my oldest useful program
---

When I got an email from my dad's office saying the program I wrote about 10 years ago stopped working, I had two choices: fix it, or rebuild it from scratch.

I was shocked to hear they were still using it. Imagine your 10th grade English teacher calling you up asking if you could print another copy of your essay on To Kill a Mockingbird, because the copy she was using got worn out. It's a cool feeling to know that thoughts I've had a decade ago were still being useful out in the world.

Usually in these cases it's easier and faster to patch whatever broke and let it limp along, but there were some new technologies I wanted to play with, and I've been kicking around ideas for how I would make it better.

The problem is straightforward (though one of my more ambitious projects of my youth): given the typed-in raw data of a timecard (a sheet of paper office workers use to document when they start and stop working), calculate how many hours the worker has worked for the period (usually two weeks long).

Here's the input format I made up from typing in the physical timesheets:

<pre>
Harry
1003+1804
1014+1252 1322+2000
1009+1803
week
1000+2000
1000+2000

Ron
1501+2000
1000+1530
week
1500+1802

Hermione
1102+1648 1744+1952
week
1135+2001
1706+2000
1756+1959
1730+2020
1129+1803
</pre>

and what a 14 year old Christian Genco made as output with a 257 line ruby script:

<figure class="center"><img src="http://i.imgur.com/4wxZa0G.png" /><figcaption>Screenshot of my original ruby program output</figcaption></figure>

Functional, but not the prettiest thing in the world. The main thing I wanted to improve was the way the office manager interacts with the program. Here were the steps to use it:

1. open WordPad (it won't work if you type it up in any other editor)
2. Type up the timesheet
3. Save the timesheet text file
4. Find where you saved it
5. Drag and drop it onto a special icon I put on the Desktop
6. Find the .html file with the same name as the file you made
7. Open the .html file
8. Print it

Web apps make everything easier, and I've been on a [React](https://facebook.github.io/react/) kick recently, so I re-wrote the program as [Timecard App](https://timecards.gen.co):

<figure class="center"><img src="http://i.imgur.com/eLfILGN.png" /><figcaption>The new timecards.gen.co</figcaption></figure>

(it was also a nice opportunity to play with [antd](https://ant.design/docs/react/introduce) instead of my go-to [Bootstrap](http://getbootstrap.com/))

In a few hours I had a much more usable workflow:

1. Open [timecards.gen.co](https://timecards.gen.co)
2. Type up the timesheet (see it live update as you type to catch errors easier)
3. Print it

Try it out at [timecardapp.com](https://timecardapp.com)! If you have ideas for how it could be better, [I'd love to hear them](/contact).
