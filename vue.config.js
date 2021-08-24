module.exports = {
	// 关闭 eslintrc 语法检查
	lintOnSave: false,
	// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
	// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
	outputDir: 'dist',
	//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
	assetsDir: '',
	//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
	indexPath: 'index.html',
	// 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
	lintOnSave: process.env.NODE_ENV !== 'production',
	chainWebpack: config => {
		config.when(process.env.NODE_ENV === 'production', config => {
			config.entry('app').clear().add('./src/main-prod.js')
			config.set('externals', {
				vue: 'Vue',
				axios: 'axios',
			})
			config.plugin('html').tap(args => {
				args[0].isProd = true
				return args
			})
		});
		config.when(process.env.NODE_ENV === 'development', config => {
			config.entry('app').clear().add('./src/main-dev.js')
			config.plugin('html').tap(args => {
				args[0].isProd = false
				return args
			})
		});
	}
}
