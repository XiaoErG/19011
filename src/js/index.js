require(["require.config"], function () {
	require(["jquery","header", "url", "template", "Swiper", "shopItem", "side", "footer"], function ($, header, url, template, Swiper,ShopItem, side) {
		
		// 搜索功能
		class Index {
			constructor (){
				this.textfield = $("#textfield");
				this.searchContainer = $("#search_result_search_fm");
				this.search();
				this.caty();
				this.swiper();
				this.parse();
				side.load().then(function () {
					console.log($("#sidebarcartnum"));
				});
			}
			search () {
				let _this = this;
				this.textfield.on("keyup", function () {
					let keyWord = $(this).val().trim();
					// 内容不为空才请求
					if(keyWord !== ""){
						// getJSON可以完成jsonp跨域，数据返回了自动调用后面的回调
						$.getJSON("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?&wd="+keyWord, res => {
							let list = res.s;
							console.log(list);
							let ul = $("<ul>");
							list.forEach( function(item, index) {
								$("<li>").html(item).appendTo(ul);
							});
							_this.searchContainer.empty().show().append(ul);
						})
					}else{
						// 把上一次请求渲染出来的container隐藏
						_this.searchContainer.hide();
					}

					
				})

				this.textfield.on("blur", function () {
					setTimeout(() => {
						_this.searchContainer.hide();
					},200);
					
				})

				this.searchContainer.on("click", "li", function (e) {
					_this.textfield.val($(this).html());
					_this.searchContainer.hide();
				})
			}

			caty() {
				// 请求分类数据
				new ShopItem($("#catyListContainer"), url.baseUrl + "/caty");


				// $.ajax({
				// 	url : url.baseUrl + "/caty",
				// 	method : "GET",
				// 	dataType: "json",
				// 	success : function (res) {
				// 		if(res.res_code === 1){
				// 			let list = res.res_body.list;
				// 			// template 是模块提供的方法，用它来渲染模板引擎
				// 			// 第一个参数是模板引擎的script标签的id名（不用加#）
				// 			// 第二个参数是个对象，传模板里需要的数据
				// 			var html = template("catyList", { list });
				// 			// console.log(html);
				// 			$("#catyListContainer").html(html);
				// 		}
						
				// 	}
				// })
			}

			swiper () {
				new Swiper ('.swiper-container', {
					// direction: 'vertical', // 垂直切换选项
					loop: true, // 循环模式选项
					
					// 如果需要分页器
					pagination: {
						el: '.swiper-pagination',
					},
					
					// 如果需要前进后退按钮
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					
					// 如果需要滚动条
					scrollbar: {
						el: '.swiper-scrollbar',
					},
				}) 
}
				parse(){
					if(localStorage.getItem("login")){
					  console.log(localStorage.getItem("login"))
					  $("#Login").hide();
					  $("#Register").hide();
					  $("#Hello").show();
					  $("#Back").show();
					  $("#UserName").html(JSON.parse(localStorage.getItem("login")).username)
					}
				}
			
		}

		new Index();

	})
})