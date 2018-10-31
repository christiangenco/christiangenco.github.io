---
title: The Conversation Monitor
image: http://i.imgur.com/Dw51mer.png
image_small: http://i.imgur.com/Dw51mers.png
excerpt: College project to measure how much each person In a group speaks
---

The Conversation Monitor is a quick class project I made for attempting to quantify the level of contribution to a conversation that each individual has. It does this, naievly, by recording the time that each individual is speaking, assuming that only one individual is speaking at a time, and that while they are speaking the microphone closest to them will be the loudest.

It is theoretically compatible with any device capable of audio level monitoring and TCP network connections, which would lend itself very easily to the world of wearable computing. My initial design intended for each user's audio monitoring throught their smart phone, but technical limitations got in the way. HTML5's <a href="http://www.w3.org/TR/html-media-capture/">Media Capture API</a> is still in its beta stages, and is not supported on any mobile browsers. I considered many alternatives, including coding a native iPhone or Mac OS X application, but found that the Processing framework provided all necessary functionality.

<figure class="left-overflow"><img src=http://i.imgur.com/WZcZ23t.jpg" /><figcaption></figcaption></figure>

The current implementation consists of a Processing script that monitors the current audio level from a computer's audio input, sends it asynchronously to a TCP server written in Ruby that decides which of its clients is currently the loudest, and sends that data back to the Processing client which draws a pie chart based on the data. Here is <a href="https://www.dropbox.com/s/rgc5jzqqau4k0lv/Christian%20Genco%20Conversation%20Monitor%20Code.zip">the code for this implementation</a>, and here's the <a href="https://www.dropbox.com/s/raelyk50cn48ucu/conversation_monitor_client.pde">Conversation Monitor Client</a> for an in-class demonstration (be sure to change your name at the top of the code).

Practical uses include preventing a particular member from dominating the conversation (from the social embarrassment of knowing that everyone can see the percentage they’ve been talking), measuring class participation, and maintaining a balanced group discussion.
