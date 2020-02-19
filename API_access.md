# Getting access to the Reddit API

## Set up your account to have an app associated with it
Go here: [Reddit app setup](https://www.reddit.com/prefs/apps) ->
create another app... ->
give it a name and a redirect URI, use 'personal use script'

### Use the information above and an existing Reddit account, get the bearer access token
Secret SECRET
App client id (CLIENTID)
Username (USERNAME)
Password (PASSWORD)
App name from above (APP_NAME)
Version (VERSION, default 0.1)

curl -X POST -d 'grant_type=password&username=USERNAME&password=PASSWORD' --user 'CLIENTID:SECRET' -A "APP_NAME/VERSION by USERNAME" https://www.reddit.com/api/v1/access_token
This will return a JSON object containing an "access_token"


### Using the information above and the bearer access token, query the API
Using access token (ACCESS_TOKEN):
curl -H "Authorization: bearer ACCESS_TOKEN" -A "APP_NAME/VERSION by USERNAME" https://oauth.reddit.com/api/v1/me

You have now queried the /me page of the API

More details here:
[OAuth2 Quick Start Example](https://github.com/reddit-archive/reddit/wiki/OAuth2-Quick-Start-Example)
