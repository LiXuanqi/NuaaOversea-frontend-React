export default {
    "proxy": {
        // "/api": {
        //     "target": "http://jsonplaceholder.typicode.com/",
        //     "changeOrigin": true,
        //     "pathRewrite": { "^/api" : "" }
        // },
        "/api":{
            "target": "http://server.lixuanqi.me/oversea/api",
            "changeOrigin": true,
            "pathRewrite": {
                "^/api": ""
            }
        },
        "/lib":{
            "target": "http://127.0.0.1/",
            "changeOrigin": true
        }
    },
    "publicPath": "/oversea/static/"
}
