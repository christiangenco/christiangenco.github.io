#!/usr/bin/env ruby
require 'listen'
require 'shellwords'
# require 'erb'

def osascript script
  system 'osascript', *script.split(/\n/).map { |line| ['-e', line] }.flatten
end

def refresh_chrome
  osascript %{
    tell application "Google Chrome" to tell the first tab of its first window
      reload
    end tell
  }
end

refresh_chrome

listener = Listen.to('src') do |modified, added, removed|
  # puts(modified: modified, added: added, removed: removed)
  modified.each{|path|
    p path
    dest_path = path.sub("/src/", "/build/")
    `cp #{path.shellescape} #{dest_path.shellescape}`
    refresh_chrome
  }
end
listener.start
sleep
