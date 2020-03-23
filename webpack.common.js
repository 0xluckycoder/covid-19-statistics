module.exports = {
     module: {
       rules: [
         {
           test: /\.css$/,
           use: [
             'style-loader',
             'css-loader',
           ],
         },
         {
           test: /\.(png|svg|jpg|gif|JPG)$/,
           use: [
             'file-loader',
           ],
         },
         {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader',
          ],
         },
       ],
     },
    };