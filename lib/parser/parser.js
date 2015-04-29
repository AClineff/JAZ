var Navigation = require('../../lib/actions/navigation');
var Out = require('../output/output');
var _ = require('underscore');

var Parser = {
    verbs : {
        n : function(dir, jaz){Navigation.navigateInDirection(dir, jaz)},
        north : function(dir, jaz){Navigation.navigateInDirection(dir, jaz)},
        s : function(dir, jaz){Navigation.navigateInDirection(dir, jaz)},
        south : function(dir, jaz){Navigation.navigateInDirection(dir, jaz)},
        look : function(verb, jaz){Navigation.look(jaz)},
        l : function(verb, jaz){Navigation.look(jaz)},
        quicklook : function(verb, jaz){Navigation.quicklook(jaz)},
        ql : function(verb, jaz){Navigation.quicklook(jaz)}
    },

    parseMessage : function(msg, jaz){
        var words = msg.split(' ');
        if(!_.isUndefined(this.verbs[words[0]])){
            var response = this.verbs[words[0]](words[0], jaz);
        }
        else {
            Out.sendMessageToUser(['What was that?'], jaz.user, jaz.io);
        }
    }
}

module.exports = Parser;