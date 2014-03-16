var htmlNav = require('./html-nav')

  , stream = new require('stream').PassThrough()

stream.write('<h1 id="foo">Hello</h1>\n')
stream.write('<p id="bar">Beep boop')
stream.write('<span id="foo">woop woop!</span>')
stream.write('</p>\n')
stream.write('<h2 id="foo2">OMG!</h2>\n')
stream.write('<h1 id="foo3">Some more foo</h1>')
stream.end()

htmlNav(stream, function (err, tree) {
  console.log(JSON.stringify(tree, null, '  '))
})