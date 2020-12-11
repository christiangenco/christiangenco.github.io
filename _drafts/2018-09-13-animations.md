---
title: Best Animation libraries
image:
image_small:
excerpt: "Comparing popmotion, Animate.css, react-spring"
hide: true
---

There are a ton of options for adding animations to a React app. Which is the best?

## [Animate.css](https://github.com/daneden/animate.css)

Pros: Simple implementation and use - just add and remove classes. Would work really well even outside React. Only dependency is a single CSS file.

Cons: animations don't look good. They look way too stiff.

## [Dynamics.js](http://dynamicsjs.com/)

Pros: really nice physics, really nice demos

Cons: older style of Javascript library would be work to get nice to play with React. Github project hasn't been updated in years.

## [Popmotion/React Pose](https://popmotion.io/)

## [React Motion](https://github.com/chenglou/react-motion)

## [React Spring](https://github.com/drcmda/react-spring)

This seems to be the winner. It was built as a response to React Motion and Popmotion, and uses the fancy new React style of render props:

```jsx
import { Spring } from 'react-spring'

<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
  {styles => <div style={styles}>i will fade in</div>}
</Spring>
```

## [React Simple Animate](https://github.com/bluebill1049/react-simple-animate)



## Other stuff

* [Suggestions for where to put in animations to make your app great](https://uxdesign.cc/good-to-great-ui-animation-tips-7850805c12e5)
* CSS animation for [hamburger menus](https://jonsuh.com/hamburgers/)
* [Animated Roboto font](https://medium.com/sketch-app-sources/roboto-bold-animated-a-free-animated-svg-alphabet-d6519fcc903d)
* [A cool Avengers-infinity-war-style button effect](https://github.com/transitive-bullshit/react-particle-effect-button)
* React Native only [React Native Interactable](https://github.com/wix/react-native-interactable)
