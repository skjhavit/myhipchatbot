var Bot = require('../lib/').Bot;

var b = new Bot({
  jid: '669801_4684138@chat.hipchat.com',
  password: 'jan@2017'
});

b.loadPlugin('chuckjokes', require('./plugins/chuckjokes'));
b.loadPlugin('weather', require('./plugins/weather'));
b.connect();

b.onConnect(function() {
  console.log(' -=- > Connect');
  this.join('669801_jcpsupporttestteam@conf.hipchat.com');

  // fetch and print roster contacts (buddy list)
  this.getRoster(function(err, items, stanza) {
    if (err) {
      console.log(' -=- > Error getting roster: ' + err);
      return;
    }
    items.forEach(function(item) {
      console.log(' -=- > Roster contact: ' + item.name);
    });
  });
});

b.onInvite(function(roomJid, fromJid, reason) {
  console.log(' -=- > Invite to ' + roomJid + ' by ' + fromJid + ': ' + reason);
  this.join(roomJid);
});

b.onPing(function() {
  console.log(' -=- > Ping? Pong!');
});

b.onDisconnect(function() {
  console.log(' -=- > Disconnect');
});

b.onError(function(error, text, stanza) {
  console.log(' -=- > Error: ' + error + ' (' + text + ')');
});

b.onMessage(function(channel, from, message) {
  console.log(' -=- > ' + from + '@' + channel + ' said: ' + message);
});

b.onPrivateMessage(function(jid, message) {
  console.log(' -=- > ' + jid + ' pm\'d: ' + message);
});