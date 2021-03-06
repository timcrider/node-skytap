var chai      = require('chai')
  , expect    = chai.expect
  , Skytap    = require('../lib/skytap')
  , nockspect = require('./util/nockspect')
  , _         = require('underscore');

describe('Skytap.vpns', function () {
  var skytap = Skytap.init({ username: 'foo', token: 'bar' });

  describe('.list', function () {
    it('requests a list of vpns', function () {
      return nockspect(function (nock) {
        nock.get('/vpns').reply(200);
        return _.bind(skytap.vpns.list, skytap.vpns);
      });
    });

    it('takes optional parameters', function () {
      return nockspect(function (nock) {
        nock.get('/vpns?foo=bar').reply(200);
        return _.bind(skytap.vpns.list, skytap.vpns, {
          foo: 'bar'
        });
      });
    });
  });

  describe('.get', function () {
    it('requests details of a vpn', function () {
      return nockspect(function (nock) {
        nock.get('/vpns/1').reply(200);
        return _.bind(skytap.vpns.get, skytap.vpns, {
          vpn_id: 1
        });
      });
    });
  });

  describe('.attach', function () {
    it('requests to attach a vpn to a network in an environment', function () {
      var body = {
        vpn_id: 3
      };

      return nockspect(function (nock) {
        nock.post('/configurations/1/networks/2/vpns', body).reply(200);
        return _.bind(skytap.vpns.attach, skytap.vpns, _.extend({
          configuration_id: 1,
          network_id: 2
        }, body));
      });
    });
  });

  describe('.detach', function () {
    it('requests to detach a vpn from a network in an environment', function () {
      return nockspect(function (nock) {
        nock.delete('/configurations/1/networks/2/vpns/3').reply(200);
        return _.bind(skytap.vpns.detach, skytap.vpns, {
          configuration_id: 1,
          network_id: 2,
          vpn_id: 3
        });
      });
    });
  });

  describe('.connect', function () {
    it('requests to connect a vpn to a network in an environment', function () {
      return nockspect(function (nock) {
        nock.put('/configurations/1/networks/2/vpns/3', { connected: true }).reply(200);
        return _.bind(skytap.vpns.connect, skytap.vpns, {
          configuration_id: 1,
          network_id: 2,
          vpn_id: 3
        });
      });
    });
  });

  describe('.disconnect', function () {
    it('requests to disconnect a vpn from a network in an environment', function () {
      return nockspect(function (nock) {
        nock.put('/configurations/1/networks/2/vpns/3', { connected: false }).reply(200);
        return _.bind(skytap.vpns.disconnect, skytap.vpns, {
          configuration_id: 1,
          network_id: 2,
          vpn_id: 3
        });
      });
    });
  });
});
