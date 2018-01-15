---
title: React Redux Firestore Application Scaffold
image:
image_small:
excerpt: "My opinionated decisions on the best way to structure and make webapps in 2018."
---

We've been pretty deep in the weeds of how [`redux`](/redux) works with [`react`](/react-redux). Let's zoom out and see how all the minutia we've learned could all fit together in a deployed app.

One of the things I really miss about [Ruby on Rails](http://rubyonrails.org/) is that it's [strongly opinionated](http://rubyonrails.org/doctrine/#convention-over-configuration). The Javascript ecosystem seems to prefer smaller configuration over convention, but this causes strong [Javascript Fatigue]() in all the choices you have to make. I'll be making some opinionated decisions here to hopefully reduce that fatigue.

My opinionated decisions (inspired by the [Rails Doctrine](http://rubyonrails.org/doctrine/)) are:

* **static hosting and cloud functions are better than hosted applications**: serving your app as a static bundle of html, css, and javascript means no 4am alerts that your server crashed and your entire app is down. Hosting static apps is practically free. Deploying static apps is usually just a `git push` or `firebase deploy` or `aws s3 sync`. Scaling is stupidly simple - just throw a [CloudFront](https://aws.amazon.com/cloudfront/) proxy in front of your host. [next.js](https://zeit.co/blog/next), Ruby on Rails, and Meteor don't agree with this decision.
* **paying a premium for services that replace devops work is better than doing that work yourself**: you know why I love coding? I get to make useful stuff. Configuring postgres or mongo databases so a VPS stops running out of memory from uncleared log files isn't an activity I enjoy doing, it's a necessary evil to get my stuff to work. If I can pay [firebase](https://firebase.google.com) to manage my authentication, database, and cloud functions so I can just focus on things that make my application unique, I'd much rather do that. I'd *like* to treat Heroku the same way, but the end result isn't as good (I still have to think about how many instances - dynos - I need) and way more expensive.
* **almost every webapp will need a model CRUD, authentication, and routes**: I love that [next.js](https://zeit.co/blog/next), Ruby on Rails, Meteor, and every other sane web framework come with routes baked in. I hate that there's no standard way to persist models to a database in React/Redux land, and I hate that I can't `rails generate scaffold Person name:string age:integer` and get every REST CRUD action and view with tests laid out for me. Let's invest some time in creating sensible defaults to solve authentication, routes, and model persistence (CRUD) so we never have to think about it again (akin to the Rails Doctrine's [Convention over Configuration](http://rubyonrails.org/doctrine/#convention-over-configuration)).
* **server side rendering is important for SEO on marketing pages, but not for the core application**: it used to be that server side rendering was the only kind of rendering, so search engines work much better with server-rendered sites. This is changing ([fetch as google](https://support.google.com/webmasters/answer/6066468?hl=en) will render some javascript-rendered sites), but in the interum can be fixed by statically generating marketing pages you want indexed by google. Server side rendering also makes pages load faster and makes it easier to create an API, but those both have easier solutions than adding universal rendering to our app.
* **re-inventing UI/UX components sucks**: every project doesn't need a new and unique design. It needs a custom logo and a distinctive color. People shouldn't use things I make because my buttons look cool. [Bootstrap](http://getbootstrap.com/) used to be my go-to choice for pre-made UI components, but [material-ui](http://www.material-ui.com/) has much better built-in support for React.
* **popular tools are better than unpopular ones**: I've spent a lot of time diving deep into technologies that didn't pan out and do what I needed them to. Experimenting is great, and being on the cutting edge is fun but for getting stuff done it's safer to move forward with proven technologies. As of 2017 [React is strongly more popular than any other javascript frontend option](https://stateofjs.com/2017/front-end/results) and [Redux and Firebase are solidly popular choices](https://stateofjs.com/2017/state-management/results).
* TODO: function first vs. feature first folder organization; [smart containers, dumb components, and modules directories](https://medium.com/@scbarrus/the-ducks-file-structure-for-redux-d63c41b7035c)

First, create a new app with [`create-react-app`](https://github.com/facebookincubator/create-react-app) and add the [`redux`](https://redux.js.org/), [`react-redux`](https://github.com/reactjs/react-redux), [`redux-form`](https://github.com/erikras/redux-form), [`react-router-redux`](https://github.com/reactjs/react-router-redux), and [`material-ui`](http://www.material-ui.com/#/) packages:

```bash
$ create-react-app blog
$ cd blog
$ yarn add redux react-redux redux-form react-router-redux material-ui@next material-ui-icons
```




```bash
$ cd src && mkdir actions components reducers
```

```
src/
├── App.js
├── index.js
├── store.js
├── actions/
├── components/
├── reducers/
│   └── index.js
└── registerServiceWorker.js
```

---

## Forms

* http://alexkuz.github.io/react-input-enhancements/
* https://github.com/formsy/formsy-react/
* https://github.com/andrewhathaway/winterfell

---

# Todo:

* [ducks](https://github.com/erikras/ducks-modular-redux): https://github.com/goopscoop/ga-react-tutorial/blob/6-reduxActionsAndReducers/src/redux/modules/toDoApp.js
* react-router-redux
* redux-thunk

---

fbr generate component Blog title:string body:text public:boolean

generates component, redux actions, firebase connections, tests, and [storybook](https://storybook.js.org/) files

https://github.com/amwmedia/plop

---

# Resources

* http://www.penta-code.com/how-to-add-redux-to-create-react-app/
