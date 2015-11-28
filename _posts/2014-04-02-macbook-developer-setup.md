---
title: MacBook Developer Setup
image: http://i.imgur.com/tnCchmn.jpg
image_small: http://i.imgur.com/tnCchmns.jpg
excerpt: I've been on Macs since I was 10 years old. I love them obsessively, but my needs for Mac OS X as a developer are more than the operating system comes with by default.
---

I've been on Macs since I was 10 years old. I love them obsessively, but my needs for Mac OS X as a developer are more than the operating system comes with by default.

Over the years I've added layers and layers of tweaks and customizations to make my MacBook a coding and productivity powerhouse. Here's a list of the things I can no longer live without.

### Applications

* [Chrome](https://www.google.com/intl/en/chrome/browser/): most of my work is in web development. Chrome is the best browser, and it's lovely syncing all of my user settings and history across all of my computers and devices.
* [iTerm2](http://www.iterm2.com/#/section/home): a better terminal for your Mac. I set up a system wide hotkey, `⌘ + ~`, to get a terminal to cover the left half of my screen at any time. You can set this in `iTerm / Preferences / Keys` under `Hotkey`: ![iterm2 hotkey preferences](http://i.imgur.com/cDFT1sV.png) You can adjust the appearance of this window under `Appearance / Hotkey Window`: ![appearance of hotkey window](http://i.imgur.com/KcLHjbZ.png)
* [Sublime Text 2](http://www.sublimetext.com/): the best text editor for any language. Be sure to enable [Vintage Mode](https://www.sublimetext.com/docs/2/vintage.html) to enable vim keybindings, learn how to use [multiple cursors](https://www.youtube.com/watch?v=WXuBgSpLpK4), install [Package Control](https://sublime.wbond.net/installation) (and learn how to install packages, like language packs for syntax highlighting), and install a nice theme and font (I like [soda](https://github.com/buymeasoda/soda-theme/) and [Anonymous Pro](http://www.marksimonson.com/fonts/view/anonymous-pro)).
* [jitouch](http://www.jitouch.com/): customize trackpad gestures. Here's the configuration I use: ![jitouch configuration](http://i.imgur.com/jyx1vks.png) And my iTerm and Sublime specific tweaks: ![jitouch tweaks for iTerm and Sublime](http://i.imgur.com/H2AwxST.png)
* [Typinator](http://www.ergonis.com/products/typinator/): text expand shortcuts. Example: if I type "mye" it expands to my email address, "myph" my full phone number, "mladt" an MLA formatted date for today (like 2 April 2014), "dt" for a sortable date for naming files (like 2014-04-02), "edt" for a unix timestamp (like 1396416206), and "lod" for `ಠ_ಠ`.
* [f.lux](http://justgetflux.com/): adjusts your screen brightness at night so it's easier on the eyes.
* [Backblaze](http://www.backblaze.com/): cheap full hard drive cloud backup service. Use with [Time Machine](http://support.apple.com/kb/ht1427) for double safety.
* [Alfred](http://www.alfredapp.com/): scriptable application launcher and system shortcut... thing. This can quadrouple your productivity on a mac.
* [Fantastical](https://flexibits.com/fantastical): a calendar that understands natural language a system keyboard shortcut away (I use `ctrl + space`).

### Command Line Tools

* [brew](http://brew.sh/): `apt-get` for mac.
* [zsh](https://github.com/robbyrussell/oh-my-zsh): better than bash. Command autocompletion, color-coding, and a more customizable command prompt.
* [pry](http://pryrepl.org/): if you use Ruby (which you should - it's great), it's a better `irb`. Stick `binding.pry` anywhere in your code to go into an interactive REPL.

### ZSH/bash shortcuts

Here's a list of my handy git aliases:

    export GIT_EDITOR="vim"
    alias gs='git status '
    alias ga='git add '
    alias gap='git add -p' # patch mode
    alias gb='git branch '
    alias gc='git commit'
    alias gd='git diff'
    # alias go='git checkout ' # need this for "go" compiles
    alias gh='git hist'
    alias gha='git hist --all'
    alias gp='git pull'
    alias gpgp='git pull && git push'

And a fantastic system for marking and jumping to specific folders:

    export MARKPATH=$HOME/.marks
    function jump {
      cd -P $MARKPATH/$1 2>/dev/null || echo "No such mark: $1"
    }
    function mark {
      mkdir -p $MARKPATH; ln -s $(pwd) $MARKPATH/$1
    }
    function unmark {
      rm -i $MARKPATH/$1
    }
    function marks {
      \ls -l $MARKPATH | tail -n +2 | sed 's/  / /g' | cut -d' ' -f9- | awk -F ' -> ' '{printf "%-10s -> %s\n", $1, $2}'
    }
    alias j="jump"
    alias m="mark"

For example, I marked my project directory for [Textbooks Please](http://textbooksplease.com) with:

    cd LONG/DIRECTORY/THAT/TAKES/A/LONG/TIME/TO/TYPE/textbooksplease
    m tbp

And now I can jump to that directory from anywhere with:

    j tbp

### System Tweaks

* Enable hot corners in `System Preferences / Mission Control / Hot Corners`. I like top right for mission control, bottom right for desktop, top left for screensaver, and bottom left for application windows. ![hot corners](http://i.imgur.com/X9pqpAq.png)
* Enable tap to click in `System Preferences / Trackpad / Point & Click`.
* [KeyRemap4MacBook](https://pqrs.org/macosx/keyremap4macbook/index.html.en): use it to remap caps lock - the most useless key in prime real estate - to `ctrl` when held and `esc` when pressed. Just check `Control L to Control L (+ When you type Control L only, send Escape` in system preferences after installing. Edit: this functionality was moved to [PCKeyboardHack](https://github.com/tekezo/PCKeyboardHack) (thanks [@Splendor](https://twitter.com/Splendor)!).
* `XCode / preferences / Downloads and install Command Line Tools` to install missing build tools.
* faster expose and mission control animations: `defaults write com.apple.dock expose-animation-duration -float 0.1 && killall Dock`

I hope this helps to make you as productive as possible on your Mac!
