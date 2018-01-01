#!/usr/bin/env ruby

require 'json'

`echo > /tmp/blank`

JSON.parse(File.read('redirects.json')).each do |path, url|
  puts "https://gen.co/#{path} => #{url}"
  `aws s3 cp /tmp/blank s3://gen.co/#{path} --website-redirect="#{url}?utm_source=genco&utm_campaign=redirect"`
end
