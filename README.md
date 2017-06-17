
# An abandoned, simple frontend to an integration platform as a service

A project I worked on several months ago, released for educational purposes. Documentation coming soon.
See also [url]https://github.com/sbryant31/nativesync-backend[/url]



# Getting Started

if heroku starts caching shit and is misbehaving try this:

heroku config:set NODE_MODULES_CACHE=false
git commit -am 'rebuild' --allow-empty
git push heroku master
heroku config:unset NODE_MODULES_CACHE
```npm install```

Copy example.env to .env. It will eventually contain environment variables specific to api server.
```

```

#Build for Release

```npm run build```

This creates a file called /public/app.js
Serve index.html in the project root

#Start Server for Development

```npm start```

Then visit localhost:9966.  This will watch for changes to source, rebuild and serve page.

#Watch for source changes and build

```npm run watch```

This will continually build the public/app.js source without serving the file.

#NGINX
Example nginx config. This makes sure the url gets pushed to the app, which its tricky.

```
server {
   listen 9090 default_server;
   listen [::]:9090 default_server ipv6only=on;
   root /home/developer/src/nativesync/nativesync-frontend;

   # Make site accessible from http://localhost/
   server_name localhost;
   location / {
     index index.html;
     try_files $uri /index.html;
   }

```

#About
Anyone working with this code should be familiar with the following libraries:

React https://facebook.github.io/react/docs/
Blueprintjs http://blueprintjs.com/docs/
FlexboxGrid http://flexboxgrid.com/
Browserify https://github.com/substack/node-browserify
