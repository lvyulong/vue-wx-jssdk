var path = require('path');

module.exports = {
    mode:'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output:{
        path:path.resolve(__dirname,'dist'),
        libraryTarget: "umd",
        filename: "index.js"
    },
    module:{
        rules:[
            // es6语法编译
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
        ]
    }

}
