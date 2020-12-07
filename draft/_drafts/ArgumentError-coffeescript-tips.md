---
title: Coffeescript Tips
image: 
description: 
---

[Coffeescript](http://coffeescript.org/) is fantastic. If you write javascript and you don't use Coffeescript, your quality of life will significantly improve after reading this.

Coffeescript turns this:

    sum = (a, b) ->
        a + b

    x = 5
    y = 10

    alert sum x, y

Into this:

    var sum, x, y;

    sum = function(a, b) {
      return a + b;
    };

    x = 5;

    y = 10;

    alert(sum(x, y));

It's like javascript and Ruby had a beautiful baby.

Anyway, here are a few things I wish I knew when I started using coffeescript.

#### Thin and fat arrows

Functions in vanilla javascript are a pain: 

    var lol = function(foo){
      return foo + " bar";
    }
    
Coffeescript's arrow syntax is much cleaner:

    lol = (foo) ->
      foo + " bar"

But there are actually two different arrows you can use: 

* the thin arrow (`->`) creates a new local scope
* the fat arrow (`=>`) keeps the previous scope

This is especially useful in a class-oriented framework like Backbone or Ember. What that means, practically, is that instead of writing:

    $("a").click ->
      self = this
      

#### The existential operator: ?

I love this feature so much. This alone makes coffeescript my preferred language over ruby (gasp) sometimes.

Say you're parsing some JSON:

    people = [
    	{
        	name: "George",
            age: 17,
            address: {
            	street: "123 Mockingbird",
                state: "New York"
            }
        },
        {
        	name: "Amy",
            age: 17,
            pets: {
            	dogs: 5,
                cats: 17
            }
        }
    ]

and we want to print out the `state` of the `address` of each person if it exists. We could do something like: 

    for person in people
    	console.log person.address.state

But oh no!

    TypeError: Cannot read property 'state' of undefined
    
If we try to call `.address.state` on Amy, we end up calling `.state` on `undefined`, which is a big no-no. The obvious fix is:

    for person in people
    	if person.address != undefined
			console.log person.address.state

Which is fine, but it gets really unweildy when dealing with a lot of nesting, as we'll see in a moment.

Here's coffeescript's solution:

    for person in people
		console.log person.address?.state    

Which compiles into:

    for (_i = 0, _len = people.length; _i < _len; _i++) {
      person = people[_i];
      console.log((_ref = person.address) != null ? _ref.state : void 0);
    }

And you can keep chaining those for as long as you want:

    person.address?.state?.capital?.zip

Such a small amount of effort to accomplish:

    if ((_ref1 = person.address) != null) {
      if ((_ref2 = _ref1.state) != null) {
        if ((_ref3 = _ref2.capital) != null) {
          _ref3.zip;
        }
      }
    }

Note: you can *kind of* do the same thing in ruby (but only in Rails) using `.try(:method_name)`. More on that on [the apidock for rails](http://apidock.com/rails/Object/try).

console?.log? 'enabled'


---


`10 in [1,10]`


3. 
"hello #{foo}!"

4. 

if 321 <= width <= 480

5.

do ->

to solve clojure traps: http://aseemk.com/talks/intro-to-coffeescript#/32

6. 

[x, y] = coords
and {count, offset} = opts

7. 

{
foo
bar
baz
}

8. 

x ?= 1


tf and= false
tf or= true

fetch = (opts={}) ->
    {count, offset} = opts
    count or= 10
    offset or= 0



sync = (callback) ->
    # ...
    callback? results

items?[0]

"/api/#{users?[0].id?}/info"

10. Comments in regex

url.match ///
    # absolute; SSL optional:
    https?://

    # simplified domain:
    [a-zA-Z0-9-.]+

    # simplified path:
    /.*
///

11. map/filter 

names =
  for u in users when u.isAdmin
    u.name

12. try without catch


result = try
    readFromCache()

13. 

map = {}
map[u.id] = u for u in users
