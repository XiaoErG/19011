define(["jquery", "template"], ($, template) => {
    function ShopItem (container, url, listData) {
      // 模块的容器盒子
      console.log(container)
      this.container = container;
      this.url = url;
      this.listData = listData;
      this.load();
    }
    
    // jquery提供的用来合并对象的方法
    // Object.assign
    $.extend(ShopItem.prototype, {
      load : function () {
        this.container.load("/html/module/shopItem.html", () => {
          // 判断listData是否有数据
          if(this.listData) {
            this.render(this.listData);
          }else{
            this.getData();
          }
          
        })
        
      },
      getData : function () {
        // 请求列表数据
        $.get(this.url,  res => {
          if(res.res_code === 1){
            this.render(res.res_body.data.list);
          }
          
        })
      },
      render : function (data) {
        // 渲染列表
        this.container.html(template("shop-list", {list: data}));
      }
    });
    return ShopItem;
  })