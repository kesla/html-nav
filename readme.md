# html-nav

Create a JSON-tree based on header-elements (e.g h1) to be used in navigation

## Installation

```
npm install html-nav
```

## Example

### Input

```javascript
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
```

### Output

```
[
  {
    "title": "Hello",
    "id": "foo",
    "children": [
      {
        "title": "OMG!",
        "id": "foo2",
        "children": []
      }
    ]
  },
  {
    "title": "Some more foo",
    "id": "foo3",
    "children": []
  }
]
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

