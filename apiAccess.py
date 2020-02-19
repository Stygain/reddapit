import requests
import requests.auth

username = input("Enter your Reddit username: ")
password = input("Enter your Reddit password: ")
reddit_secret = input("Enter your Reddit Secret: ")
app_client_id = input("Enter your Reddit App Client ID: ")
app_name = input("Enter your Reddit App Name: ")
app_version = input("Enter your Reddit App Version: ")

client_auth = requests.auth.HTTPBasicAuth(app_client_id, reddit_secret)
post_data = {"grant_type": "password", "username": username, "password": password}
headers = {"User-Agent": (app_name + "/" + app_version + " by " + username)}
response = requests.post("https://www.reddit.com/api/v1/access_token", auth=client_auth, data=post_data, headers=headers)
response.json()

responseJson = response.json()
print("Response")
print(responseJson)

if (responseJson["access_token"] != ""):
    print("Success!")

    print("Your access token to access the API: ")
    print(responseJson["access_token"])

    headers = {"Authorization": ("bearer " + responseJson["access_token"]), "User-Agent": (app_name + "/" + app_version + " by " + username)}
    response = requests.get("https://oauth.reddit.com/api/v1/me", headers=headers)

    responseJson2 = response.json()
    print("Response")
    print(responseJson2)

    print("Name: ")
    print(responseJson2["name"])
    print("Comment karma: ")
    print(responseJson2["comment_karma"])
    print("Link karma: ")
    print(responseJson2["link_karma"])
