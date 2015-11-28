---
title: The Remote Control Person
image: http://i.imgur.com/1DXVc3V.jpg
image_small: http://i.imgur.com/1DXVc3Vs.jpg
excerpt: A design for a remote control you can use on people.
---

<iframe width="560" height="315" src="//www.youtube.com/embed/_UNwHurfqgg" frameborder="0" allowfullscreen></iframe>

For my final project of my wearable computing course at SMU, I made a wireless belt controlled by a wiimote. The wiimote sends remote commands to the person wearing the belt.

## The Belt

This belt's vibration is controlled through a compressed method of serial communication. The arduino sends each discrete directional command in a single byte of information. The first four bits of the byte sends the rotational information (0 to 360 degrees) and the last four bytes send the power (0% to 100%).

By compressing signals this way, communication between the arduino and the belt happens immediately.

<figure class="left"><img src="http://i.imgur.com/r4cSfhy.jpg" /><figcaption></figcaption></figure>

This belt can be be incorporated into any project where directional sensing is required. For example, this would make an excellent way for a blind person to sense their way around a new space if coupled with a Kinect or ultrasonic sensor. It could also be used as a general purpose alerting device, such as another way to receive phone notifications to better discern the difference between a facebook alert and a text, or just as a secondary method of vibration that is always on your skin (for women who keep their phone in their purse and can't feel the vibration). In this case, patterns of vibration could be used to discriminate between different signals ("around my body" could mean a phone call from your significant other, "from the front to the back" could be a facebook alert, etc.).

<figure class="center"><img src="http://i.imgur.com/5oDnkgo.jpg" /><figcaption>everything hooked up to the Arduino</figcaption></figure>

Here's a dump of the [arduino code](https://gist.github.com/christiangenco/6323580) to get all that done.

## Controlling People

<figure class="left-overflow"><img src="http://i.imgur.com/s0eg7Wa.png" /><figcaption></figcaption></figure>

Conceptually, this piece was a fascinating juxtoposition between the increasingly realistic video games, and the (by definition) realism of the real world. This is an area that has gotten considerably more attention as the immersive power of video games has exponentially increased over the past several years, from PacMan released just three decades ago

<figure class="center"><img src="http://i.imgur.com/iZl7Iez.jpg" /><figcaption></figcaption></figure>

to Activision's latest graphical feat of producing an "uncanny" recreation of a human face

<figure class="center"><img src="http://i.imgur.com/1kB0weY.jpg" /><figcaption>Activision's state-of-the-art animation announced March 27th, 2013</figcaption></figure>

it is not unreasonable to question the point at which reality will be indistinguishable from an immersive video game. This is a concept that has been explored extensively by science fiction writers such as Greg Egan in his novel "Permutation City," and has become all the more relevant in light of emerging virtual reality technologies like the Oculus Rift.

From the technical side, my project features a system for remotely controlling a person designated as the avatar, who wears a vibrating belt that is controlled by a game controller held by the player.

<figure class="left"><img src="http://i.imgur.com/Vz4qDBK.png" /><figcaption>The technical setup for the avatar in "The Life Game"</figcaption></figure>

This setup is technically challenging, as it requires the avatar's setup to be wireless in both power and two-way communication with the player's computer so the avatar may be navigated through a wide range of spaces.

My initial plan was to couple the arduino with a raspberry pi which would power both the arduino and a USB webcam from a battery pack. The Raspberry Pi would have then be responsible for transmitting a live stream of video data back to the player's computer, and relaying directional commands from the player's computer to the arduino, which would have - in turn - conveyed them to the avatar through the vibrating belt, and possibly other input devices (like a pair of headphones that can direct the avatar to do more complex actions, like speaking "use item" when the player's A button is pressed).

<figure class="center-overflow"><img src="http://i.imgur.com/8pTJWOA.jpg" /><figcaption></figcaption></figure>

In practice, however, the raspberry pi totally sucked. Its connection to wifi was just awful, and there was nothing I could figure out to fix it. I ended up using two Xbee modules for the arduino for relaying the remote control signal (which worked excellently, and over a very long range) and a video streaming app for the iPhone to relay video.

### Hardware List

* Vibrating belt
  * Arduino Uno
  * 4 Vibrating Motors
  * Stranded core wire
  * USB Cable
* iPhone
* Wiimote
* USB battery pack
* iPad to stream video to
