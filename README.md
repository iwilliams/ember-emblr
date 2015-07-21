# Ember-emblr

Emblr is an ember-cli addon for developing Tumblr themes that use Ember. Emblr works by using the HTML that Tumblr serves as an API. To develop your theme locally, Emblr hooks into the ember-cli express server to bypass CORS and cosume Tumblr data.

## Installation

* `ember install ember-emblr`
* Add the variable `tumblr: YOUR-TUMBLR-PROFILE-HERE` to `ENV` in your apps `config/environment.js`
* Run `ember build --prod` and copy the contents of `dist/index.html` into the edit window of your tumblr theme. YOU MUST DO THIS STEP TO BEGIN LOCAL DEVELOPMENT.
* For any extra routes you wish to add to your theme, you must also add as a page on Tumblr with the same URL as the route. Make sure to select `Standard Layout` from the drop down and leave the content blank.

## Usage

Emblr injects the service `emblrStore` into your apps routes and controllers. You can then use this service to retrieve posts. There are 3 methods available for retrieving your blogs data. This plugin is still in development, so these are subject to change.

#### `emblrStore.findPage(int page)`
Will retrieve a page of posts, where the number returned is the amount of posts per page you have set in your Tumblr settings. The page index starts at 1, so `emblrStore.getPage(1)` will return an array of posts from the most recent page of your blog.

#### `emblrStore.findPost(int id)`
Will return a post object matching the id supplied.

#### `emblrStore.findNotes(string notesUrl)` returns a promise
This is a helper method for retrieving the notes associated with a post. The argument `notesUrl` is a property of any post object retrieved from the above methods. This method is needed because when you retrieve posts from `findPage()`, they do not come with the notes attached. The method returns a promise with the html string of notes as an argument. This is best used in the `afterModel` hook of a route like so:

```JS
export default Ember.Route.extend({
  model: function(params) {
    return this.emblrStore.findPost(params.post_id);
  },
  afterModel: function(post) {
    if(!post["postNotes"]) {
      return this.emblrStore.findNotes(post["postNotesURL"]).then((data)=>{
        return post["postNotes"] = {"postNotes": data};
      });
    } else {
      return;
    }
  }
});
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Contributing

I am still working on tests etc...
