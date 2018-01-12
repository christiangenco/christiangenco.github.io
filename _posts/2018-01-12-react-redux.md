---
title: React Redux Summary
image:
image_small:
excerpt: "A high level guide on using Redux in React"
---

Prerequisites:

* Understand [React](https://reactjs.org/docs/hello-world.html)
* Understand [Redux](https://redux.js.org/) *see my [Redux Summary](/redux) guide*

---

Redux was created with React in mind, so they work super well together with a helper library [React Redux](https://github.com/reactjs/react-redux). This relationship is similar to the relationship of React and [ReactDOM](https://reactjs.org/docs/react-dom.html).

Assuming you have a redux `store` object available (from `createStore`), a simple React+Redux integration could look like this:

```
// Counter is a dumb presentational component that doens't care about redux
const Counter = ({
  value,
  onIncrement,
  onDecrement
}) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

// render is a smart container component that connects Counter to redux
const render = () => {
  ReactDOM.render(
    <Counter
      // get state from the store
      value={store.getState()}

      // onIncrement and onDecrement, dispatch a redux action
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};

// re-render if the redux store's state changes
store.subscribe(render);
render();
```

Dispatching actions on a global `store` object (as in this example) doesn't scale very well (global variables encourage [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code)). You could pass `store` as a prop down through every component, but that would be super annoying.

To fix this annoyance, Dan Abramov made a package called [react-redux](https://github.com/reactjs/react-redux) to help bind React components to redux.

`react-redux` only has two components you need to care about:

1. `<Provider store>`: pass down a reference to your global `store` through [React `context`](https://reactjs.org/docs/context.html)
2. `connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])`: create a function to wrap [dumb presentational components with a generated smart container component](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) that pulls state and actions out of the store

## `<Provider store>`

Wrap your entire app in a `Provider` component so any descendant can pull out a piece of the store it wants:

```
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo}/>
        <Route path="bar" component={Bar}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
```

`Provider` will now pass `store` down through React's [`context`](https://reactjs.org/docs/context.html), so any descendant of `Provider` can access `this.context.store`.

> [Provider] magically make[s] the store available to all container components in the application without passing [the store] explicitly

## `connect(mapStateToProps, mapDispatchToProps)`

Every descendant having access to the entire store is a bad practice. It's much cleaner to only give components exactly what they actually need.

Also, `context` "is an experimental API and it is likely to break in future releases of React", so you probably shouldn't use it directly.

`connect` addresses these bad options by wrapping dump React presentational components in a new smart container component that feeds the dumb component only what the dumb component needs from the redux store.

> Technically, a [connect] container component is just a React component that uses store.subscribe() to read a part of the Redux state tree and supply props to a presentational component it renders...[connect] provides many useful optimizations to prevent unnecessary re-renders [so] you shouldn't have to worry about the React performance suggestion of implementing shouldComponentUpdate yourself.
> -- [Redux Usage with React](https://redux.js.org/docs/basics/UsageWithReact.html)

`connect` does a few other convenient things, like automatically subscribing to store changes and unsubscribing if it unmounts.

`connect` is a [higher order function](https://en.wikipedia.org/wiki/Higher-order_function) (a function that returns another function) so calling it looks odd:

```javascript
import { connect } from 'react-redux'

const TodosContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodosPresentationalComponent)

export default TodosContainerComponent
```

### `mapStateToProps`

`connect`'s `mapStateToProps` argument is a function that receives `store.getState()` (the same store passed down from `Provider`) and the props passed to the connected component. If you don't need to pass any state, leave this argument to `connect` as `null` for extra efficiency.

`mapStateToProps` returns a plain javascript object that will be passed to the wrapped dumb presentational connected component as props.

Here's an example:

```javascript
const mapStateToProps = (state, ownProps) => {
  return {
    todos: state.todos
  }
}
```

This `mapStateToProps` will feed its connected component a `todos` prop that will come from `store.getState().todos`.

Functions that take a redux state and return an object to be passed to props are called *selectors*. [reselect](https://github.com/reactjs/reselect) is a popular library for [memoizing](https://en.wikipedia.org/wiki/Memoization) selectors.

### `mapDispatchToProps`

`connect`'s `mapDispatchToProps` argument is a function that receives `store.dispatch` (the same store passed down from `Provider`) and the props passed to the connected component. If you leave this argument as `null`, the wrapped component will receive `dispatch` as a prop.

`connect`'s `mapDispatchToProps` argument takes two types of arguments.

Either 1) a function that receives `store.dispatch` and the props passed to the connected component and returns an object of keys whose values are functions:

```javascript
const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    payload: {id}
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: id => {
      dispatch(toggleTodo(id))
    }
  }
}
```

or 2) an object of action creators:

```javascript
const mapDispatchToProps = {
  onClick: toggleTodo
}
```

If `mapDispatchToProps` received an object of action creators, it automatically wraps each action creator in a function that will `dispatch` the action on the `store`. It also passes along any arguments.

Binding a `store`'s `dispatch` to an action creator and passing along arguments is effectively what [Redux.bindActionCreators](https://redux.js.org/docs/api/bindActionCreators.html) does, if you want to make your own smart container component instead of having it automatically generated by `connect`.

---

# `create-react-app` with redux

```bash
$ create-react-app blog
$ cd blog && yarn add redux react-redux
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

# Todo:

* [ducks](https://github.com/erikras/ducks-modular-redux)
* react-router-redux
* redux-thunk

---

fbr generate component Blog title:string body:text public:boolean

generates component, redux actions, firebase connections, tests, and [storybook](https://storybook.js.org/) files

---

Resources:

* [react-redux](https://github.com/reactjs/react-redux)
* https://egghead.io/lessons/javascript-redux-displaying-error-messages
* http://www.penta-code.com/how-to-add-redux-to-create-react-app/
