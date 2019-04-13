define(["jquery"],function($){
	class Header {
		constructor () {
			this.init().then(() =>{
				this.login();
			})
		}
		init (){
			return new Promise((resolve,reject) => {
				//可以再加载路径后面写上空格加选择器，只加载部分html
				$("#header-container").load("/html/module/header.html",() =>{
					//回调函数，值得是load加载结束以后执行的代码
					resolve();
				});
			
			})
		}

		login (){
			$("");
		}
	}

	return new Header();
})