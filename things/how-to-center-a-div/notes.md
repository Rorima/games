This might be the hardest thing you will ever come across in your entire life. The worst thing about it is when you search, you might find answers that are not good and don't solve your problem. Here I'm going to present you a way to center a div both horizontally and vertically, explaning bit by bit how to do it. At the end of this tutorial, you'll be able to do the ABSOLUTE UNIMAGINABLE: to center a div!

CSS:

```
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

#content {
  width: 300px;
}
```

The most imoprtant point is that the parent, which is the `body` in this case, needs to have a height, otherwise the item will not be centered vertically.

Another way:

```
.parent {
    display: grid;
    place-items: center;
    height: 100vh;
}

#gameArea {
    display: grid;
    place-items: center;
    border: 1px solid;
    height: 500px;
    width: 500px;
}

#contentText {
    display: flex;
    justify-content: center;
    align-items: center;
}
```