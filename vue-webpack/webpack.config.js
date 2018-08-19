const path=require('path')
const webpack=require('webpack')
const HTMLPlugin=require('html-webpack-plugin')
const ExtractPlugin=require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

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
              name:'[name]-qqq.[ext]'
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
    new ExtractPlugin('styles.[chunkhash:8].css')
  )
}

module.exports=config