define(['jquery'], function($) {
  class Side {
    constructor () {

    }
    load () {
      return new Promise(resolve => {
        $("#side-container").load("/html/module/side.html", () => {
          this.calcCartNum();
          resolve();
        })
      })
      
    }

    calcCartNum () {
      // 计算购物车的初始数量
      let cart = localStorage.getItem("cart");
      if(cart) {
        cart = JSON.parse(cart);
        // 第一种显示购物车种类 ，cart.length
        // 第二种显示总数量
        this.num = cart.reduce(function (num, prod) {
          num += prod.num;
          return num;
        }, 0);
        $("#sidebarcartnum").html(this.num);
      }
    }
  }
  return new Side();
});