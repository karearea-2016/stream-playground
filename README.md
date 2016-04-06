# stream-playground

playground for learning [node streams](https://nodejs.org/api/stream.html) with audio and [virtual dom](http://jbi.sh/what-is-virtual-dom/)

## get started

```
npm install
npm start
```

## read the source

reading the source of any module is the best way to understand what it is doing. let's check out the [source code of our playground](./play/index.js). :)

[`mississippi`](https://github.com/maxogden/mississippi) is a grab bag of utility modules for writing better code using streams. so far, we're using `miss.pipe` provided by [`pump`](https://github.com/mafintosh/pump) for constructing pipelines of streams, as by default `.pipe` will not propagate streams closing or throwing errors. other available utilities include: [`each`](https://github.com/maxogden/mississippi#each), [`pipeline`](https://github.com/maxogden/mississippi#pipeline), [`duplex`](https://github.com/maxogden/mississippi#duplex), [`through`](https://github.com/maxogden/mississippi#through), [`from`](https://github.com/maxogden/mississippi#from), [`to`](https://github.com/maxogden/mississippi#to), [`concat`](https://github.com/maxogden/mississippi#concat), and [`finished`](https://github.com/maxogden/mississippi#finished). :)

[`read-audio`](https://github.com/livejs/read-audio) is a [readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable) which produces [n-dimensional arrays](https://github.com/scijs/ndarray) of audio, or [`ndsamples`](https://github.com/livejs/ndsamples).

[`vdom-render-stream`](https://github.com/ahdinosaur/vdom-render-stream) is a [writable stream](https://nodejs.org/api/stream.html#stream_class_stream_writable) which consumes data to be rendered via [virtual dom element creation, diff computation, and patch operations](https://www.npmjs.com/package/virtual-dom).

## play with code

here are some ideas for [how one might play with this code](https://rawgit.com/ahdinosaur/svg-oscilloscope/gh-pages/index.html).

- brighten or darken the background color based on the overall volume of the audio
- read keyboard input and display in random positions on the page
- allow user to switch between visualization modes
- create a fun [VU meter](https://en.wikipedia.org/wiki/VU_meter) that goes up and down with the volume (bonus points for being smooth by normalizing the values)

### write better visuals

update our `render` function to do something cooler, like display rainbows and unicorns! :3

### transform audio

we could add some transform streams in-between our readable and writable streams.

for example:

- [ndsamples-frequencies](https://github.com/ahdinosaur/ndsamples-frequencies): do [frequency analysis](https://en.wikipedia.org/wiki/Fast_Fourier_transform) on audio samples
  - `require('ndsamples-frequencies/stream')` returns a transform stream
  - this module is pulled from [@substack's `frequency-viewer`](https://github.com/substack/frequency-viewer/blob/master/index.js) for use in <http://studio.substack.net>, see his code for how he visualizes the result.
- [node-audio-rms](https://github.com/livejs/node-audio-rms): [root mean square analysis](https://en.wikipedia.org/wiki/Root_mean_square) (almost like volume) on a audio samples
  - `require('node-audio-rms')` returns a transform stream
  - use this for the VU meter idea

if you want to pass multiple values through the streams, maybe both raw and processed audio, just return multiple objects nested within a larger object into the callback.

### read fresh data

we could read from other sources of data, such as:

- [`quay`](https://www.npmjs.com/package/quay): produces key press events
- [`rainbow-pixels@3.0.0`](https://github.com/ahdinosaur/rainbow-pixels/tree/00efd66db7ef3a44cc695898b313102392a727bc): produces `{ h, s, l }` [`ndpixels`](https://github.com/livejs/ndpixels)
- [`simple-get`](https://github.com/feross/simple-get): do http requests using the underlying node streams

## see also

- [stream-handbook](https://github.com/substack/stream-handbook)
- [stream-adventure](https://github.com/substack/stream-adventure)
- [audio-lab](https://github.com/audio-lab)
- [web-audio-school](https://github.com/mmckegg/web-audio-school)
