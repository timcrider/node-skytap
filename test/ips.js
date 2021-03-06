var chai        = require('chai')
  , expect      = chai.expect
  , Skytap      = require('../lib/skytap')
  , nockspect   = require('./util/nockspect')
  , _           = require('underscore');

describe('Skytap.ips', function () {
  var skytap = Skytap.init({ username: 'foo', token: 'bar' });

  describe('.list', function () {
    it('requests a list of public ips', function () {
      return nockspect(function (nock) {
        nock.get('/ips').reply(200);
        return _.bind(skytap.ips.list, skytap.ips);
      });
    });

    it('takes optional parameters', function () {
      return nockspect(function (nock) {
        nock.get('/ips?foo=bar').reply(200);
        return _.bind(skytap.ips.list, skytap.ips, {
          foo: 'bar'
        });
      });
    });
  });

  describe('.attach', function () {
    it('requests to attach a public ip to a vm', function () {
      return nockspect(function (nock) {
        nock.post('/vms/1/interfaces/2/ips', { ip: 3 }).reply(200);
        return _.bind(skytap.ips.attach, skytap.ips, {
          vm_id: 1,
          interface_id: 2,
          ip: 3
        });
      });
    });
  });

  describe('.detach', function () {
    it('requests to detach a public ip from a vm', function () {
      return nockspect(function (nock) {
        nock.post('/vms/1/interfaces/2/ips/3/detach').reply(200);
        return _.bind(skytap.ips.detach, skytap.ips, {
          vm_id: 1,
          interface_id: 2,
          ip: 3
        });
      });
    });
  });
});
