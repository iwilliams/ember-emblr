# Ember-emblr

Emblr is an ember-cli addon for developing Tumblr themes that use Ember. Emblr works by using the HTML that Tumblr serves as an API. To develop your theme locally, Emblr hooks into the ember-cli express server to bypass CORS and cosume Tumblr data.

## Installation

* `ember install ember-emblr`
* Add the variable `tumblr: YOUR-TUMBLR-PROFILE-HERE` to `ENV` in your apps `config/environment.js`
* Run `ember build --prod` and copy the contents of `dist/index.html` into the edit window of your tumblr theme. YOU MUST DO THIS STEP TO BEGIN LOCAL DEVELOPMENT.
* For any extra routes you wish to add to your theme, you must also add as a page on Tumblr with the same URL as the route. Make sure to select `Standard Layout` from the drop down and leave the content blank.

## Usage

Emblr injects the service `emblrStore` into your apps routes and controllers. You can then use this service to retrieve posts. There are 3 methods available for retrieving your blogs data. This plugin is still in development, so these are subject to change.

#### `emblrStore.getPage(int pageNumber)`
Will retrieve a page of posts, where the number returned is the amount of posts per page you have set in your Tumblr settings. The page index starts at 1, so `emblrStore.getPage(1)` will return an array posts from the most recent page of your blog.

#### `emblrStore.getPost(int postId)`
Will return a post object matching the id supplied.

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Contributing

I am still working on tests etc...
