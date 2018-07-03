export default {
    "proxy": {
        // "/oversea/api": {
        //     "target": "http://jsonplaceholder.typicode.com/",
        //     "changeOrigin": true,
        //     "pathRewrite": { "^/oversea/api" : "" }
        // },
        "/oversea/api":{
            "target": "http://127.0.0.1:5000",
            "changeOrigin": true,
        },
        "/lib":{
            "target": "http://127.0.0.1/",
            "changeOrigin": true
        }
    },
    "publicPath": "/oversea/static/",
    "alias": {
        "Services": __dirname + '/src/services/',
        "Utils": __dirname + '/src/utils/'
    }
}
