import Ember from 'ember';

export function tumblrParser(html) {
  var posts = [];

  var domPosts = Ember.$(Ember.$(html).filter("#tumblr-posts").html()).filter(".post")

  function parse(obj, element) {
    Ember.$(element).children().each(function(index, attr) {
      var dataParent = Ember.$(attr).attr("data-parent");
      var dataAttr = Ember.$(attr).attr("data-attr");
      var dataFormat = Ember.$(attr).attr("data-format") || false;
      if(!dataParent) {
        if(dataFormat === "js") {
          var str = Ember.$(attr).html().trim();
          obj[dataAttr] = eval(str);
        } else {
          obj[dataAttr] = Ember.$(attr).html().trim();
        }
      } else if (dataParent === "obj") {
        if(Array.isArray(obj)) {
          var tempObj = {};
          parse(tempObj, attr);
          obj.push(tempObj);
        } else {
          obj[dataAttr] = {};
          parse(obj[dataAttr], attr);
        }
      } else if (dataParent === "arr") {
        obj[dataAttr] = [];
        parse(obj[dataAttr], attr);
      }
    });
  }

  domPosts.each(function(index, domPost) {
    var post = {};
    parse(post, domPost);
    post.postId = "post-" + post.id;
    posts.push(Ember.Object.create(post));
  });

  if(posts.length > 1) {
    return posts;
  } else {
    return posts[0];
  }
}

