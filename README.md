#Getting Started

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
   root /home/developer/src/csgodirect/csgodirect-frontend;

   # Make site accessible from http://localhost/
   server_name localhost;
   location / {
     index index.html;
     try_files $uri /index.html;
   }

```
