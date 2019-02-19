# WorseYouTube

## Information

I used the vue project generator (vue-cli). What's mine is everything within the `src/` and `test/` folders. I also added a few node packages (jade for jade templates, less instead of sass, and moment for fancy time formatting). The reason I used a generator, rather than set everything up from scratch, is since this is a UI position I figured I didn't want to spend a lot of time on getting a build chain setup for vue files and what not. The generator gave me all that, plus a very simple web server, which really sped things up for me!

[Here's a link](http://vuejs-templates.github.io/webpack/) to the vue-cli generator that I used :)

## TODO

- Write tests
- Possibly move favorites out of localStorage to Firebase or something. If so, need to add auth.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
