---
title: The Walkie Sockie
image: http://i.imgur.com/vmcLabA.jpg
description: An Arduino project for a walkie talkie you use with your feet.
---

For a wearable computing course I'm taking at SMU, I made a wearable input and output device for your feet: the Walkie Sockie.

<iframe width="560" height="315" src="//www.youtube.com/embed/AGLWKFxsVvQ" frameborder="0" allowfullscreen></iframe>

The design of the Walkie Sockie is very simple. It consists of an Arduino lilypad sewed in the top of a sock with a pressure sensor by the pinkie toe:

<figure class="center"><img src="http://i.imgur.com/2nePQXO.jpg" /><figcaption>pressure sensor</figcaption></figure>

And a vibrating motor in the arch of the foot:

<figure class="center"><img src="http://i.imgur.com/TcAzApw.jpg" /><figcaption>I don't suggest googling "vibrating motor"</figcaption></figure>

Here's the [source code](https://gist.github.com/christiangenco/9b0b2232e9ccb2f532d7) to demonstrate the basic functionality. Upload this to an arduino with a pressure sensor on pin A5 and a vibrating motor on pin 11 and you will get immediate feedback of pressing the button. In the source code is also a ruby script and a web page to demonstrate how the walkie sockie can communicate with a computer through its serial connection.
