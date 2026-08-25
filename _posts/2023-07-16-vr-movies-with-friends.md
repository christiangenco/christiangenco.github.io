---
title: "How I Watch Movies with Friends in VR on Meta Quest 2"
image:
image_small:
excerpt: ""
---

Watching films in VR is an incredible experience but it's currently needlessly clunky. I have no doubt Apple's Vision Pro headset will usher in a new era of user friendliness and simplicity, but until then here's the easiest setup for the best experience I've come up with to watch movies with friends in VR.

First, everybody needs to get a [Meta Quest VR headset](https://amzn.to/3rx6Nb1). I've convinced a ton of people to get the Meta Quest 2 but the Pro or 3 will also work for this. They'll all need a copy of [Bigscreen](https://www.bigscreenvr.com/) which they can download from their headset.

Next, get a copy of the film you want to watch as a file on your computer. 3D films are especially cool in VR. If you can track down a subtitle file for your film each person watching can turn subtitles on or off.

To add the subtitle track to your movie file use the command line program `ffmpeg` and run `ffmpeg -i movie.mp4 -i subtitles.srt -map 0:v -map 0:a -map 1 -c:v copy -c:a copy -c:s mov_text movie-with-subtitles.mp4`

The standard way to watch movies together on Bigscreen is to set up a PC running the [Bigscreen Remote Desktop Client](https://www.bigscreenvr.com/remotedesktop), create a room on the PC, and then stream your screen to everyone watching. This is the easiest way for your guests to get set up (all they need to do is enter a code and join your room) but in practice it sucks because:

- If your primary computer runs macOS or linux you have to get a PC with a beefy graphics card to host it
- Your internet needs to have great upload speeds to stream to everyone
- Controlling playback of the film needs to happen on your computer and the interface to control your computer from your headset is clunky

In practice setting it up this way leads to a lot of frustration and glitchy playback.

There's a much better way though: you can send the movie to everyone ahead of time to download to their device, then just use Bigscreen to sync local playback. Now the film is being played back directly from everyone's device and all that needs to go through the network is the video sync information and your audio and avatar data.

I like to upload the video on cloud storage like S3 or GCS but Dropbox or Google Drive work too. Use a link shortener like [t.ly](https://t.ly) to make it easy for your friends to type in the URL.

Here are the instructions I send to my technically challenged friends to get the video downloaded:

```
To download the movie to your computer:

1. Open a web browser (preferably chrome)
2. type TINY_URL in the address bar and hit enter
3. the movie might start to download right away. If so, you're done! If not it'll probably just start playing. You can click the three dots in the bottom right corner of the video to open a menu that should include a "Download" option
```

Then if they have a PC I send them these instructions to get it on the headset:

```
Once the video is downloaded, to get it on your headset:

1. Locate MOVIE.mp4 on your computer by clicking the up arrow on the "MOVIE.mp4" download in the bottom left corner of your screen. There should be an option along the lines of "Show in Windows Explorer". When it opens it'll probably be in your Downloads folder. Make sure it's highlighted and press CTRL+C on your keyboard to copy it for later. Keep this window open.
2. Plug the small end (USB C) of that cable into the Oculus and the big end (USB A) into your computer
3. Put the headset on and "Allow Connected Devise to Access Files"
4. The headset should appear as a drive on your computer in the left side of the same Windows Explorer window that had MOVIE.mp4 on it. If not let me know and we can debug
5. Click on your headset in the left side of the Windows Explorer window, then open the Movies directory, then press CTRL+V on your keyboard to start transferring MOVIE.mp4 to your headset
6. If you get an error saying there's not enough space try deleting some other videos from the Movies directory on your headset.
```

and if they have a Mac I send them these instructions:

```
1. Download Android File Transfer at android.com/filetransfer on your computer
2. Locate MOVIE.mp4 on your computer by clicking the up arrow on the "MOVIE.mp4" download in the bottom left corner of your screen. There should be an option along the lines of "Show in Finder". When it opens it'll probably be in your Downloads folder. Keep this window open for later.
3. Plug the small end (USB C) of that cable into the Oculus and the big end (USB A) into your computer, or use the USB C to USB C cable that came with your headset if your computer has the same type of port that's on your headset.
4. Put the headset on and "Allow Connected Devise to Access Files"
5. The Android File Transfer window should automatically pop up. If it doesn't, use Spotlight to search for "Android File Transfer" and open it. You should see a list of folders that includes a folder caled "Movies"
6. Double click the "Movies" folder, then drag and drop your "MOVIE.mp4" file from before into this window.
7. If you get an error saying there's not enough space try deleting some other videos from the Movies directory on your headset.
```

I send these instructions out a few days before the movie night to give people time to download it and get set up.

Right before the movie night remind everybody to find a comfy spot where they can keep their headset plugged in (the standard Quest batteries usually last less than 2 hours).

On your headset create a room. From `My Home` click `Hosting` and change `Privacy` to `Private, invite only`. Change the `Max Players in Room` to 1 or 2 over the number of people you expect (sometimes there are bugs where people drop off and come back but bigscreen counts them twice). Hit `Save`, then `Show room ID`. Text out this room ID. To play your local video file click `Video Player` then select your local video file.

To join your room your guests will need to open bigscreen and click `JOIN ROOM ID` then enter the code you texted them.

If your video file is in 3D everyone will need to individually click on the screen, then click the three gear icon in the lower right, then click the `3D MODE` button until it matches the format of your 3D video (probably `SBS` for "side-by-side"). From the three gear icon pane they can also toggle subtitles or change the audio track if your video includes multiple audio tracks.

---

Avatar 2 VR movie night is tonight! Apparently the instructions I sent don't work anymore because of some changes Meta made to how developer mode works. I've got a new method that's a bit of a pain to set up but it'll make it easier to do future movie nights (for the next one you won't even need a computer!)

The first step of the new method is to follow the instructions in this video for installing Sidequest on your headset: https://youtu.be/HD1gCEvV8N8

...but instead of the "Easy Installer" use the "Advanced Installer."

Sidequest is a way to install 3rd party applications and games that haven't been approved by Meta so installing it will also give you access to a whole new app store of cool stuff! We'll use it to install a file manager that will let you move the downloaded Avatar2.mp4 file from the Downloads folder to the Movies folder.

Once you've followed the instructions in that video, on your computer download the "app-fdroid-release.apk" file for the Amaze file manager from https://github.com/TeamAmaze/AmazeFileManager/releases

Next, in sidequest on your computer with your headset plugged in, click the box with the down arrow icon in the top right that says "Install APK file from folder on computer." when you hover over it, then find the app-fdroid-release.apk file you downloaded in the previous step (it's probably in your Downloads folder). This will install the 3rd party file manager that will let us move files around!

Once Amaze is installed you're done with this one-time setup 🥳

Now this is what you'll need to do to get Avatar2 and for any future movie night:

1. on your headset open the web browser (App library => Meta Quest Browser)
2. type tinyurl.com/genco-avatar2 into the browser
3. You'll see the movie in the web browser screen and you'll be able to play it there but it'll look weird (doubled side by side). Click the three dots in the lower right corner and select "Download"
4. It won't look like anything is happening but if you click on the three dot menu in the upper right and then click "Downloads" you'll see the file downloading with it's progress. If you look down at your app bar you may also see that download is progressing.
5. Keep your headset awake until the movie's downloaded.
6. Once it's downloaded, open the Amaze file manager on your headset by going to your app library, click in the "Search Apps" search box, click the "All" dropdown at the top, click the "Unknown Sources" option at the bottom of that list, then open Amaze.
7. The first time you open Amaze it may ask for permissions to access your device. Allow everything it asks for. If you need to reset the application or go back click the Home icon in the top right (not the X icon in the bottom left—that closes the application)
8. Open the Downloads folder in Amaze. You should see Avatar2.mp4 in this folder. Click the three dots next to it and select "cut"
9. Click the Home icon in the top right to go back
10. Open the Movies folder
11. Click Paste at the bottom of the window.
12. You're done! Probably. To verify that the video is in the right place and works with Bigscreen, open Bigscreen and click on "My Room" in the bottom bar, then Watch on the sidebar, then the orange "Videoplayer" video in the main window, then "Local Video Files", then you should see "Avatar2.mp4" and if you tap on it it should start playing!
