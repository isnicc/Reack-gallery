const path=require('path')
const webpack=require('webpack')
const HTMLPlugin=require('html-webpack-plugin')
const ExtractPlugin=require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin')//清除build重复的文件

const isDev=process.env.NODE_ENV === 'development'

const config={
  target:'web',
  entry:path.join(__dirname,'src/index.js'),
  output:{
    publicPath:'/',
    filename:'bundle.[hash:8].js',
    path:path.join(__dirname,'dist/')
  },
  module:{
    rules:[
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test:/\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ]
      },
      {
        test:/\.(jpg|jpeg|gif|png|svg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:1024,
              name:'[name]-[hash:3].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new webpack.DefinePlugin({
      'process.env':{
        NODE_ENV:isDev?'"development"':'"production"'
      }
    }),
    new HTMLPlugin(),
    new VueLoaderPlugin()
  ]
}

if(isDev){
  config.devtool ='eval'//'source-map'
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  })
  config.devServer={
    port:8000,
    host: 'localhost',//0.0.0.0 不可以直接访问，但支持用localhost,127.0.0.0等方式打开
    overlay:{
      errors:true
    },
    hot:true,//热替换
    // https:true,//启用https
    open:true
  }
  config.mode='development'
}else{
  config.mode='production'
  config.entry={
    app:path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  //单独打包库文件
  config.optimization={
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
            name: "vendor",
              chunks: "all"
        }
      }
    }
  }
  config.output.filename='[name].[chunkhash:8].js'
  //拆分css样式单独打包
  config.module.rules.push({
    test:/\.styl$/,
    use:ExtractPlugin.extract({
      fallback:'style-loader',
      use:[
        'css-loader',
        {
          loader:'postcss-loader',
          options:{
            sourceMap:true
          }
        },
        'stylus-loader'
      ]
    })
  })
  config.plugins.push(
    new ExtractPlugin('styles.[chunkhash:8].css'),
    new CleanWebpackPlugin(
      ['dist/main.*.js', 'dist/styles.*.css','*.png','app.*.js'],　 //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    )
  )
}

module.exports=config