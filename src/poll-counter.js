var xhr = require('xhr');

var URI_ROOT = 'https://us-central1-poll-counters.cloudfunctions.net/';
var GROUP_ERROR = 'A group name is required to create a Client';
var QUERY_ERROR = 'Missing query parameter';

function request(path, cb) {
  xhr(
    {
      method: 'get',
      uri: URI_ROOT + path,
      json: true
    },
    function(err, resp, body) {
      cb && cb(err, body);
    }
  );
}

function Client(group) {
  if (!(this instanceof Client)) {
    return new Client(group);
  }

  if (!group) {
    throw new Error(GROUP_ERROR);
  }

  this.group = group;
}

Client.prototype.get = function(query, cb) {
  if (typeof query === 'function') {
    cb = query;
  }

  if (typeof query !== 'object') {
    query = {};
  }

  request(
    'get?group=' +
      this.group +
      (query.question ? '&question=' + query.question + (query.answer ? '&answer=' + query.answer : '') : ''),
    cb
  );
};

Client.prototype.increment = function(query, cb) {
  if (typeof query !== 'object' || !query.question || !query.answer) {
    throw new Error(QUERY_ERROR);
  }

  request('increment?group=' + this.group + '&question=' + query.question + '&answer=' + query.answer, cb);
};

module.exports.Client = Client;
