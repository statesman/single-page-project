Single-page project
==============================

Framework for a single page project, though it could be multiple pages. Just less complex than our immersive-template setup.

This template require PHP be available on the server, so for use with our cmgdtcpxahost.cmg.int server. We favor publishing to S3 these days, which does not support PHP.

## Steps when you set up a project

* Use `package.json` and run `npm install`
* You need the `.ftppass` and `.slack` files described below.
* Update the `slug` and `projectsDirectory` variables in `Gruntfile.js`.
* Update the `thumbnail` and `url` variables at the top of `index.php`.
* Run the default `grunt` task.

(At one point we used bower to pull in font-awesome, bootstrap and jquery, but these are now pulled in through npm.)

### Public folder
There is a `public` folder that has the published files:
* assets: images and other accces
* dist: where js and css is compiled
* fonts: for font-awesome
* includes: files for metrics, advertising and other includes

### Metrics
You'll need to update the `cmg-head-metadata.inc` include.
- [AAS BigJ Metadata attribues for data-bakery](https://docs.google.com/spreadsheets/d/1_jJAlKcxF_QviB3lK29l3LG2cnYUYM-sEJttRJ5HPYA/edit#gid=0) has explanations of all the metatags.
- [Big J Documentation Supplement: Newspaper Categories List](https://docs.google.com/spreadsheets/d/19Jtbqyp1WI5TJa8F2l_FvKZF78_xZvIJqeUzz6F8l90/edit#gid=1188551864) has site-specific info for cmg:siteSection, cmg:category and cmg:mainSection.

### Src folder
The `src` folder is for components that are used by grunt tasks and copied into the `public/dist` folder:
* js: for project specific files. `main.js` will get minified into the dist folder.
* less: for less css source files, based on [bootstrap](http://getbootstrap.com/getting-started/).


## Configurations

### ftpush

The path is in `Gruntfile.js`. Add the username/password into a file called `.ftppass` as per [ftpush docs](https://www.npmjs.com/package/grunt-ftpush). Make sure that file is in the .gitignore.


```
{
  "key": {
    "username": "username",
    "password": "password"
  }
}
```

### slack msg

The `grunt-slack-hook` plugin let's us publish finished url to slack as part of ftpush. Needs a .slack file with the Webhook URL from Slack configurations. Just a single line with that url and no return.


### editorconfig

The `.editorconfig` file defines indentation and text editor styles. Install [editorconfig-sublime](https://github.com/sindresorhus/editorconfig-sublime) to use in SublimeText or `apm install editorconfig` to use in Atom. Read more about editorconfig [here](http://editorconfig.org/).
