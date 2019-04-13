require(["require.config"], () => {
  require(["jquery", "shopItem","url","template", "header", "footer"], ($, ShopItem, url,template) => {
    function List() {
      this.init();
      this.priceDesc();
      this.event();
    }
    $.extend(List.prototype, {
      init() {
        new ShopItem($(".list-main"), url.baseUrl + "list/get");
      },
      priceDesc() {
        // 降序
        $("#pricedown").on("click", function () {
          // 请求原始数据，然后降序排列，再去渲染列表
          new Promise(resolve => {
            $.get(url.baseUrl + "list/get", res => {
              if (res.res_code === 1) {
                resolve(res.res_body.data.list);
              }
            })
          }).then(list => {
            // 排序
            list = list.sort((a, b) => {
              return b.price - a.price;
            })
            new ShopItem($(".list-main"), "", list);
          })

        })

      },
      event() {
        // 获取id，然后请求数据
        let id = location.search.slice(4);
        // 带着id请求详情页数据
        $.ajax({
          url: url.baseUrl + "caty?id="+id,
          method: "GET",
          dataType: "json",
          success: res => {
            console.log(res);
            this.res=res;
            if (res.res_code === 1) {
              // 保存当前商品数据
              this.list = res.res_body.list;
              // 由于rap2返回的id都一样，所以要手动的修改当前数据的id，真实开发中不用写这行代码
              this.list.id = id;

              // 渲染详情页
              this.render(res.res_body.list);
            }
          }
        })
      },
      render(data) {
        console.log(1)
        var html = template("wrap-2", {cont:this.res.res_body.list});
        console.log({cont:this.res.res_body.list})
        $("#nav-cont").html(html);
        // 绑定事件
       

      }
    })
    new List();
  })
})