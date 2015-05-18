Single-page project
==============================

Framework for a single page project, though it could be multiple pages. Just less complex than our immersive-template setup

## Steps when you set up a project


* use `package.json` and `npm install`
* use `bower.json` and `bower install`
* use a public folder for the published files:
	* assets: images and other accces
	* dist: where js and css is compiled
	* fonts: for font-awesome
	* includes: files for metrics, advertising and other includes
* use a src for build components
	* js: for project specific files
	* less: for less css source files.
* use ftpush grunt task to publish public.
	* The path is in `Gruntfile.js`. Add the username/password into a file called .ftppass as per [ftpush docs](https://www.npmjs.com/package/grunt-ftpush). Make sure that file is in the .gitignore.

## Configuratios

### ftpush

You'll need an .ftppass file with credentials for publishing.

```
{
  "key": {
    "username": "username",
    "password": "password"
  }
}
```

### slack msg

Need a .slack file with the Webhook URL from Slack configurations.

