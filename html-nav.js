var Cornet = require('cornet')
  , domutils = require('domutils')
  , Parser = require("htmlparser2").WritableStream

  , HEADERS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  , HEADER_TO_LEVEL = HEADERS.reduce(function(obj, elm, idx) {
      obj[elm] = idx;
      return obj
    }, {})

  , HtmlNav = function (input) {
      this.cornet = new Cornet()
      this.input = input
      this.tree = []

      this.input.pipe(new Parser(this.cornet))
    }

HtmlNav.prototype.process = function (callback) {
  var that = this

  HEADERS.forEach(function (header) {
    that.cornet.select(header, function (elm) {
      var data = {
              id: elm.attribs.id.split(' ')[0]
            , title: domutils.getText(elm)
            , children: []
          }
        , list = that.tree
        , level = HEADER_TO_LEVEL[header]
        , i = 0

      for(; i < level; ++i)
        list = that.tree[that.tree.length - 1].children

      list.push(data)
    })
  })

  this.input.once('end', function () {
    callback(null, that.tree)
  })
}

module.exports = function (input, callback) {
  new HtmlNav(input).process(callback)
}
