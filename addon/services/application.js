import Ember from 'ember';
import {tumblrParser} from 'ember-emblr/utils/utility-emblr';

export default Ember.Object.extend({
  findPost: function(id) {
    return Ember.$.ajax({
      url: this.get("queryBase") + "post/" + id,
      type: "get"
    })
    .then(function(data) {
      return tumblrParser(Ember.$(data));
    });
  },
  findPage: function(page) {
    return Ember.$.ajax({
      url: this.get("queryBase") + "page/" + page,
      type: "get"
    })
    .then(function(data) {
      return tumblrParser(Ember.$(data));
    });
  },
  findNotes: function(notesUrl) {
    return Ember.$.ajax({
      url: this.get("queryBase") + "notes" + notesUrl.split('notes')[1],
      type: "get"
    });
  }
});
