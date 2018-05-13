# NuaaOversea-frontend-React
[![Build Status](https://travis-ci.org/LiXuanqi/NuaaOversea-frontend-React.svg?branch=master)](https://travis-ci.org/LiXuanqi/NuaaOversea-frontend-React)
This is the frontend for NuaaOversea.

## CONFIG
### webpack
In `.webpackrc.js`, you should change the config of proxy.
If your backend is deployed at the url like "http:my.backend.com/api", you should do.

```
    "/api":{
        "target": "http:my.backend.com/api",
        "changeOrigin": true,
        "pathRewrite": {
            "^/api": ""
        }
    },
```
### Nginx
NOTICE: you can't ignore `try_files $uri $uri/ /oversea/index.html;`, otherwise, when you refresh your browser, the 404 page will display.
```
    location /oversea {
        alias /Users/lixuanqi/GitHub/NuaaOversea-frontend-React/dist;
	    try_files $uri $uri/ /oversea/index.html;
    }

```
## Get Start
If your html file is not located at root url, you should build with BASE_URL.
For Example, if you want to deploy your website at "http://your.website.com/oversea"
```shell
BASE_URL=/oversea umi build
```
