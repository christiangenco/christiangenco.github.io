module Jekyll
  class SayHello < Liquid::Tag

    def initialize(tag_name, text, tokens)
      super
      @text = text
    end

    def render(context)
      # "#{@text} #{Time.now}"
      "hello world!"
    end
  end
end

Liquid::Template.register_tag('say_hello', Jekyll::SayHello)
