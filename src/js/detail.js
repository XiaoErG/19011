require(["require.config"], () => {
  require(["jquery", "url", "template", "header", "footer"], ($, url, template) => {
    class Detail {
      constructor () {
        this.init();
      }

      init () {
        
        let id = location.search.slice(4);
        
        $.ajax({
          url: url.baseUrl+"/detail",
          method: "GET",
          dataType: "json",
          success :  res => {
            console.log(res)
            if(res.res_code === 1){
            
              this.detail = res.res_body.detail;
              
              this.detail.id = id;
            console.log(this.detail);
              this.render(res.res_body.detail);
            }else{
              console.log("false");
            }
          }
        })
      }
      render (data) {
        console.log(data);
        var html = template("detail-template", {data});
        console.log(data);
        $("#detail-right").html(html);     
     
      this.addToCart()
      }
      addToCart () {
        
        $("#by1").on("click", () => {
          
          let cart = localStorage.getItem("cart");
          if(cart){
           
            cart = JSON.parse(cart);
            
            let index;
            if(cart.some((item, i) => {
              index = i;
              return item.id == this.detail.id;
            })){
            
              cart[index].num++;
             if(confirm("加入成功,是否跳转页面?")){
               location.href="/html/cart.html";
             }
            }else{
           
              
              cart.push({...this.detail, num : 1});
              
            }
            localStorage.setItem("cart" , JSON.stringify(cart));
          }else{
            localStorage.setItem("cart", JSON.stringify([
              {...this.detail, num : 1}
              
            ]
            )
            );
            if(confirm("商品成功+1")){
              location.href="/html/cart.html";
            }
          }
        //  console.log(JSON.parse(localStorage.getItem("cart")));
        })
      }
    }
    new Detail();
  })
})