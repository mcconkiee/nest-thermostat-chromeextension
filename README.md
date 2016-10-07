#setup
you will need to add your own credentials from both Google and Nest:

###Google Developer Account
1. [create your developer account](https://chrome.google.com/webstore/developer/dashboard)
2. add a product
3. note the `Item ID` as you will need this for the nest developer call back url

###Nest Developer Account

1. create your developer account
2. add a product
3. note the details
![](http://i.imgur.com/lR4Wju9l.png)
4. add your `Redirect URI` - `https://{your_GOOGLE_ItemID}.chromiumapp.org/provider_cb`

###Update the source

1. in `/app/manifest.js`, update the specifics to your google app product
1. in the `/index.js` file, update your nest product id and secret

```
var app = {
	KEY_ACCESS_TOKEN : "access_token",
	PRODUCT_ID: "XXX_",
	SECRET: "XXX_",
    firebase: new Firebase('wss://developer-api.nest.com')
}
```

## install something to watch less when compiled
* `npm install`
* cd to root of project
* `watch-less -d app/css/ -e .css` - watches for less
* open another shell
* `npm start` - watches for browserify

[Install in chrome as a developers extension](https://developer.chrome.com/extensions/getstarted#unpacked)
