var h = require('virtual-dom/virtual-hyperscript/svg')
var getUserMedia = require('getusermedia')
var miss = require('mississippi')
var readAudio = require('read-audio')
var vdomRenderStream = require('vdom-render-stream')

var numSamples = 512
var main = document.querySelector('main')

getUserMedia({
  audio: true, video: false
}, function (err, media) {
  // if error getting user media,
  if (err) { throw err } // blow up

  miss.pipe(
    readAudio({
      source: media,
      buffer: numSamples,
      channels: 1
    }),
    vdomRenderStream(render, main),
    // if stream pipeline errors,
    function (err) {
      throw err // blow up
    }
  )
})

function render (audio) {
  return h('svg', {
    width: '100%',
    height: '100%',
    viewBox: '0 -1 '+numSamples+' 2',
    preserveAspectRatio: 'none',
  }, [
    h('polyline', {
      stroke: 'black',
      'stroke-width': '0.005',
      fill: 'transparent',
      points: getPoints(audio).join(' ')
    })
  ])
}

function getPoints(audio) {
  // iterate over single channel audio
  var length = audio.shape[0]
  // var numChannels = audio.shape[1]
  var points = new Array(length)
  for (var t = 0; t < length; ++t) {
    points[t] = t + ',' + audio.data[t]
  }
  return points
}
