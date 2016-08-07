# tinder-stalker

Stalking your Facebook friends on Tinder

## Getting Started

### Installing

#### Clone source code

```
git clone https://github.com/nicolas2bert/tinder-stalker.git
```

#### Install js dependencies

Go to the tinder-stalker folder,

```
npm install
```

#### Start your tinder-stalker local server

```
npm start
```

Server is listening on port 8000, go to http://localhost:8000


### Facebook access Token (FACEBOOK_TOKEN) & Facebook id (FACEBOOK_ID)

There are 2 more variables (FACEBOOK_TOKEN and FACEBOOK_ID) that we need to provide to our tinder-stalker server before we can start stalking 

#### How do I get my Facebook access Token (FACEBOOK_TOKEN)?

This link is going to simulate a connection to Tinder using Facebook :
[Click here](https://www.facebook.com/dialog/oauth?client_id=464891386855067&redirect_uri=https://www.facebook.com/connect/login_success.html&response_type=token)

You have 3 seconds to copy past the redirect URL from the link above and extract your FACEBOOK_TOKEN
The URL should look like this:
https://www.facebook.com/connect/login_success.html#access_token=FACEBOOK_TOKEN&expires_in=6761

#### How do I get my Facebook id (FACEBOOK_ID)?

Go to your Facebook profile : https://www.facebook.com/FACEBOOK_ID
and get your FACEBOOK_ID


### Start stalking

Now you are ready to start:

Go to: http://localhost:8000/n2b/FACEBOOK_ID/FACEBOOK_TOKEN

You will see all of your Facebook friend on Tinder

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Nicolas2Bert** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
