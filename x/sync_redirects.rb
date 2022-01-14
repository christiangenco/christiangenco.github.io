#!/usr/bin/env ruby

require 'json'

`echo > /tmp/blank`

JSON.parse(File.read('redirects.gen.co.json')).each do |path, url|
  # unless path.include "christian.gen.co"
  puts "https://gen.co/#{path} => #{url}"
  `aws s3 cp /tmp/blank s3://gen.co/#{path} --website-redirect="#{url}"`
  # ?utm_source=genco&utm_campaign=redirect
  # end
end
