const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	productionSourceMap: false, //打包不生成map
}
