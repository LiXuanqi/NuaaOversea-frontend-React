export default {
    "proxy": {
        "/api":{
            "target": "http://127.0.0.1:5000/",
            "changeOrigin": true,
            "pathRewrite": { "^/api": "" }
        },
        "/sso-v2":{
            "target": "http://127.0.0.1/",
            "changeOrigin": true
        },
        "/lib":{
            "target": "http://127.0.0.1/",
            "changeOrigin": true
        }
    }
}
