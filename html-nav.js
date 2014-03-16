var trumpet = require('trumpet')

  , HEADERS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
  , HEADER_TO_LEVEL = HEADERS.reduce(function(obj, elm, idx) {
      obj[elm] = idx;
      return obj
    }, {})

  , HtmlNav = function (stream) {
      if (!(this instanceof HtmlNav))
        return new HtmlNav(stream)

      this.tr = trumpet()
      this.stream = stream
      this.tree = []
    }

HtmlNav.prototype._getMetadata = function (elm, callback) {
  elm.getAttribute('id', function (idString) {
    var id = idString.split(' ')[0]
      , title = []

    elm.createReadStream()
      .on('data', function (chunk) {
        title.push(chunk)
      })
      .once('end', function () {
        callback(null, {
            title: title.toString().trim()
          , id: id
          , children: []
        })
      })
  })
}

HtmlNav.prototype.process = function (callback) {
  var that = this

  HEADERS.forEach(function (header) {
    that.tr.selectAll(header, function (elm) {
      that._getMetadata(elm, function (err, data) {
        var list = that.tree
          , level = HEADER_TO_LEVEL[header]
          , i = 0

        for(; i < level; ++i)
          list = that.tree[that.tree.length - 1].children

        list.push(data)
      })
    })
  })

  this.tr.once('end', function () {
    callback(null, that.tree)
  })

  this.stream.pipe(this. tr)
}

module.exports = function (stream, callback) {
  HtmlNav(stream).process(callback)
}
