App = Ember.Application.create();

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return EmberFire.Array.create({
      ref: new Firebase("https://burning-fire-5298.firebaseio.com")
    });
  }
});

App.IndexController = Ember.ArrayController.extend({
  sentence_text: null,
  sentence_author: null,
  actions: {
    addSentence: function() {
      if(this.get("sentence_text").trim().length > 10){
        this.pushObject({author: this.get("sentence_author").trim(), text: this.get("sentence_text").trim()});
        this.set("sentence_text", null);
      }else{
        alert('Please write a correct sentence');
      }
    }
  }
});

Handlebars.registerHelper('formatSentence', function() {
  if(!this || !this.text) return;
  var newText = this.text;
  if(['.','!','?',','].indexOf(newText.substr(-1)) == -1){
    newText += '.';
  }
  newText += '&nbsp;';
  newText = newText.substr(0,1).toUpperCase() + newText.substr(1);
  return newText;
});

Ember.TextSupport.reopen({  
    attributeBindings: ["required"]  
}) 