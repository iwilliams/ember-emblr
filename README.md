# Ember-emblr

Emblr is an ember-cli addon for developing Tumblr themes that use Ember. Emblr works by using the HTML that Tumblr serves as an API. To develop your theme locally, Emblr hooks into the ember-cli express server to bypass CORS and cosume Tumblr data.

## Why?

Developing a Tumblr theme is a painful process. Historically it has been difficult to develop themes locally and in collaboration with other developers. Emblr aims to smooth over this process by allowing you to develop your theme locally within in Ember framework.

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

## The Post object
Emblr works by parsing HTML output from Tubmlr's proprietary templating engine and turning it into an Ember Object. The properties are adapted from [the tumblr theme guide](https://www.tumblr.com/docs/en/custom_themes#posts) converted to camelCase. Any property unique to a post type can be found under the parent index `data` and then converted to camelCase. Here is an example of what a multi photo post object looks like after parsing:

```JSON
{
  "id": "117481234823",
  "postType": "photo",
  "component": "post-photo",
  "permalink": "http://ianawill.tumblr.com/post/117481234823",
  "shortURL": "http://tmblr.co/Z1zchk1jQRM67",
  "postNotesURL": "http://ianawill.tumblr.com/notes/117481234823/NRhk3QNdF",
  "likeButton": "<div class=\"like_button\" data-post-id=\"117481234823\" id=\"like_button_117481234823\"><iframe id=\"like_iframe_117481234823\" src=\"http://assets.tumblr.com/assets/html/like_iframe.html?_v=1af0c0fbf0ad9b4dc38445698d099106#name=ianawill&amp;post_id=117481234823&amp;rk=YlHt5OPE\" scrolling=\"no\" width=\"20\" height=\"20\" frameborder=\"0\" class=\"like_toggle\" allowtransparency=\"true\" name=\"like_iframe_117481234823\"></iframe></div>",
  "reblogButton": "<a href=\"https://www.tumblr.com/reblog/117481234823/YlHt5OPE\" class=\"reblog_button\" style=\"display: block;width:20px;height:20px;\"><svg width=\"100%\" height=\"100%\" viewBox=\"0 0 21 21\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#ccc\"><path d=\"M5.01092527,5.99908429 L16.0088498,5.99908429 L16.136,9.508 L20.836,4.752 L16.136,0.083 L16.1360004,3.01110845 L2.09985349,3.01110845 C1.50585349,3.01110845 0.979248041,3.44726568 0.979248041,4.45007306 L0.979248041,10.9999998 L3.98376463,8.30993634 L3.98376463,6.89801007 C3.98376463,6.20867902 4.71892527,5.99908429 5.01092527,5.99908429 Z\"></path><path d=\"M17.1420002,13.2800293 C17.1420002,13.5720293 17.022957,14.0490723 16.730957,14.0490723 L4.92919922,14.0490723 L4.92919922,11 L0.5,15.806 L4.92919922,20.5103758 L5.00469971,16.9990234 L18.9700928,16.9990234 C19.5640928,16.9990234 19.9453125,16.4010001 19.9453125,15.8060001 L19.9453125,9.5324707 L17.142,12.203\"></path></svg></a>",
  "data": {
    "photoset": "<div id=\"photoset_117481234823\" class=\"html_photoset\">    <iframe id=\"photoset_iframe_117481234823\" class=\"photoset\" scrolling=\"no\" frameborder=\"0\" height=\"-5\" width=\"100%\" style=\"border:0px; background-color:transparent; overflow:hidden;\" src=\"http://ianawill.tumblr.com/post/117481234823/photoset_iframe/ianawill/tumblr_nng0r28VE41uu2inm/0/false\" name=\"photoset_iframe_117481234823\"></iframe></div>",
    "photoset700": "<div id=\"photoset_117481234823\" class=\"html_photoset\">    <iframe id=\"photoset_iframe_117481234823\" class=\"photoset\" scrolling=\"no\" frameborder=\"0\" height=\"1055\" width=\"700\" style=\"border:0px; background-color:transparent; overflow:hidden;\" src=\"http://ianawill.tumblr.com/post/117481234823/photoset_iframe/ianawill/tumblr_nng0r28VE41uu2inm/700/false\" name=\"photoset_iframe_117481234823\"></iframe></div>",
    "photoset500": "<div id=\"photoset_117481234823\" class=\"html_photoset\">    <iframe id=\"photoset_iframe_117481234823\" class=\"photoset\" scrolling=\"no\" frameborder=\"0\" height=\"755\" width=\"500\" style=\"border:0px; background-color:transparent; overflow:hidden;\" src=\"http://ianawill.tumblr.com/post/117481234823/photoset_iframe/ianawill/tumblr_nng0r28VE41uu2inm/500/false\" name=\"photoset_iframe_117481234823\"></iframe></div>",
    "photoset400": "<div id=\"photoset_117481234823\" class=\"html_photoset\">    <iframe id=\"photoset_iframe_117481234823\" class=\"photoset\" scrolling=\"no\" frameborder=\"0\" height=\"605\" width=\"400\" style=\"border:0px; background-color:transparent; overflow:hidden;\" src=\"http://ianawill.tumblr.com/post/117481234823/photoset_iframe/ianawill/tumblr_nng0r28VE41uu2inm/400/false\" name=\"photoset_iframe_117481234823\"></iframe></div>",
    "photoset250": "<div id=\"photoset_117481234823\" class=\"html_photoset\">    <iframe id=\"photoset_iframe_117481234823\" class=\"photoset\" scrolling=\"no\" frameborder=\"0\" height=\"380\" width=\"250\" style=\"border:0px; background-color:transparent; overflow:hidden;\" src=\"http://ianawill.tumblr.com/post/117481234823/photoset_iframe/ianawill/tumblr_nng0r28VE41uu2inm/250/false\" name=\"photoset_iframe_117481234823\"></iframe></div>",
    "photoCount": "3",
    "photosetLayout": "12",
    "jsPhotosetLayout": "[\"1\",\"2\"]",
    "photos": [
      {
        "photoURL": "http://40.media.tumblr.com/0ee66b3d01b64d34a9930bb84ef6da2e/tumblr_nng0r28VE41uu2inmo1_400.png",
        "photoWidth500": "500",
        "photoHeight500": "500",
        "photoWidth400": "400",
        "photoHeight400": "400",
        "photoURL250": "http://41.media.tumblr.com/0ee66b3d01b64d34a9930bb84ef6da2e/tumblr_nng0r28VE41uu2inmo1_250.png",
        "photoWidth250": "250",
        "photoHeight250": "250",
        "photoURL100": "",
        "photoWidth100": "100",
        "photoHeight100": "100",
        "photoURL75sq": "",
        "photoURLHighRes": "http://41.media.tumblr.com/0ee66b3d01b64d34a9930bb84ef6da2e/tumblr_nng0r28VE41uu2inmo1_1280.png",
        "photoURL1280": "http://41.media.tumblr.com/0ee66b3d01b64d34a9930bb84ef6da2e/tumblr_nng0r28VE41uu2inmo1_1280.png",
        "photoWidth1280": "670",
        "photoHeight1280}": "670",
        "photoWidthHighRes": "670",
        "photoHeightHighRes": "670"
      },
      {
        "photoURL": "http://41.media.tumblr.com/05d0b9303d604740ecca31c317173e3a/tumblr_nng0r28VE41uu2inmo2_400.jpg",
        "photoWidth500": "500",
        "photoHeight500": "510",
        "photoWidth400": "400",
        "photoHeight400": "408",
        "photoURL250": "http://40.media.tumblr.com/05d0b9303d604740ecca31c317173e3a/tumblr_nng0r28VE41uu2inmo2_250.jpg",
        "photoWidth250": "250",
        "photoHeight250": "255",
        "photoURL100": "",
        "photoWidth100": "100",
        "photoHeight100": "102",
        "photoURL75sq": "",
        "photoURLHighRes": "http://40.media.tumblr.com/05d0b9303d604740ecca31c317173e3a/tumblr_nng0r28VE41uu2inmo2_1280.jpg",
        "photoURL1280": "http://40.media.tumblr.com/05d0b9303d604740ecca31c317173e3a/tumblr_nng0r28VE41uu2inmo2_1280.jpg",
        "photoWidth1280": "717",
        "photoHeight1280}": "731",
        "photoWidthHighRes": "717",
        "photoHeightHighRes": "731"
      },
      {
        "photoURL": "http://36.media.tumblr.com/41f000b6970904a222d7085404b10217/tumblr_nng0r28VE41uu2inmo3_250.jpg",
        "photoWidth500": "184",
        "photoHeight500": "184",
        "photoWidth400": "184",
        "photoHeight400": "184",
        "photoURL250": "http://36.media.tumblr.com/41f000b6970904a222d7085404b10217/tumblr_nng0r28VE41uu2inmo3_250.jpg",
        "photoWidth250": "184",
        "photoHeight250": "184",
        "photoURL100": "",
        "photoWidth100": "100",
        "photoHeight100": "100",
        "photoURL75sq": ""
      }
    ]
  },
  "postId": "post-117481234823"
}
```

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Contributing

I am still working on tests etc...
