define(["jquery"], $ => {
	class Nav {
		constructor (){
			this.init().then(() =>{
				this.bottom();
			});
		}
		init(){
			return new Promise(resolve => {
				$("#nav-container").load("/html/module/nav.html",() =>{
					resolve();
				})

			})
		}

		bottom(){
		} 
	}

	return new Nav();
})