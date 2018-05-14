# NuaaOversea-frontend-React
[![Build Status](https://travis-ci.org/LiXuanqi/NuaaOversea-frontend-React.svg?branch=master)](https://travis-ci.org/LiXuanqi/NuaaOversea-frontend-React)
This is the frontend for NuaaOversea.

## CONFIG

### For deploy
NOTICE: you can't ignore `try_files $uri $uri/ /oversea/index.html;`, otherwise, when you refresh your browser, the 404 page will display.
```
    location /oversea {
        alias /Users/lixuanqi/GitHub/NuaaOversea-frontend-React/dist;
	    try_files $uri $uri/ /oversea/index.html;
    }

```

### FOR developer
If you just want to deploy this website, there is no need for you to configure the proxy.

In `.webpackrc.js`, you should change the config of proxy.
If your backend is deployed at the url like `http:my.backend.com/oversea/api`, you should do.

```
    "/oversea/api":{
        "target": "http:my.backend.com/",
        "changeOrigin": true,
    },
```

## Get Start
If your website is deployed at `/oversea`, you just need `npm run build`.

If your html file is not located at root url, you should build with BASE_URL.
For Example, if you want to deploy your website at "http://your.website.com/oversea"
```shell
BASE_URL=/oversea umi build
```
