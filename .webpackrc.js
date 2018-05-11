export default {
    "proxy": {
        "/api":{
            "target": "http://127.0.0.1:5000/",
            "changeOrigin": true,
            "pathRewrite": { "^/api": "" }
        },
        "/lib":{
            "target": "http://127.0.0.1/",
            "changeOrigin": true
        },
    "publicPath": "static/"
    }
}
