---
title: Jitouch on OS X 10.10 Yosemite
image: http://i.imgur.com/EZG7fYt.jpg
description: My fix for the Mac OS X trackpad gesture application, Jitouch, on Yosemite.
---

Jitouch has apparently been worked on [since October 18th, 2014](https://twitter.com/macjitouch/status/523551702499459072) for Yosemite compatibility, but as of writing this post it's still broken.

This sucks, because it's one of the core apps that [makes OS X usable for me](http://christian.gen.co/macbook-developer-setup/). I don't want to sound melodramatic, but using Yosemite has been a daily struggle without all of my Jitouch muscle-memory UX goodness.

Here's how to halfway fix it:

First, open `System Preferences`, right click `Jitouch`, and select "Remove Jitouch Preference Pane":

![Remove Jitouch from preferences](http://i.imgur.com/XqyPtnf.png)

Next, [download the Yosemite beta](http://www.jitouch.com/download/). Instead of double clicking to install it, you need to manually move it to `/System/Library/PreferencePanes`. This folder is hidden by default, but you can open it by selecting `Go -> Go to Folder` in Finder:

![Go -> Go to Folder in Finder](http://i.imgur.com/O7CKIbQ.png)

then type `/System/Library/PreferencePanes` and hit `Go`:

![/System/Library/PreferencePanes](http://i.imgur.com/DQDSCWE.png)

Now just drag and drop the `Jitouch.prefPane` you downloaded before into this window:

![drag and drop Jitouch.prefPane to /System/Library/PreferencePanes](http://i.imgur.com/rb1EYk7.png)

Jitouch will now show up in `System Preferences -> Security and Privacy`, which will re-enable a lot of the broken gestures (like drawing characters).

![Jitouch now shows up in the Security and Privacy page of System Preferences](http://i.imgur.com/RhxGSbX.png)

I'm still having some quirky trouble, though. Here's a list of the bugs I've noticed:

* next/previous tab is [triggered twice](https://twitter.com/benradler/status/528038108701278208), which is incredibly annoying. **Update**: a day after installing the new Jitouch beta with the abov steps, next/previous tab is only getting triggered once!
* When my laptop has been asleep for a while (long enough to trigger hibernation or safe sleep mode), Jitouch stops working. It seems to work again if I manually put my laptop to sleep and immediately wake it up again.
* The One-Fix One-Slide-Up action is gone, which is what I used to use to resize windows.
* `Move Window` and `Resize Window` have been merged into a single `Move/Resize` action. To trigger `Resize` from `Move/Resize`, use `One-Hold Right-Tap`.

If you notice anything else, let me know [@cgenco](https://twitter.com/cgenco) on twitter and I'll add to this list. The developer has been frustratingly unresponsive [@macjitouch](https://twitter.com/macjitouch).
