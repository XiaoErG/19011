require(['./require.config'],()=>{
  require(["jquery", "url", "template", "header", "footer"],($, url, template,header)=>{
    class Cart{
      constructor(){
        this.str="";
       
        this.init().calTotal();
        this.structure();
        this.arr=JSON.parse(localStorage.getItem("cart"));
      }
      init(){
        this.tBody = $("tbody");
        this.container=$(".cart-box")
        return this;
      
      }
  
        structure(){
          let cart=localStorage.getItem("cart");
            if(cart){
              this.arr=JSON.parse(cart);
            
              $.each(this.arr,(index,item)=>{
                this.str+=` 
                <tr class="cart-shop" data-id=${item.id}>
                <td>
                    <input type="checkbox"  class="check-some"/>
                </td>
                <td style="position:relative;">
                    <a href="/html/product.html?id=" class="cart-a-style"><img src="/img/details/y2.jpg"/></a>
                    <p class="cart-p-style" style="left:60px;"><a href="/html/product.html?id=&type=" style="color: #03234c;">${item.title}</a></p>
                  <p class="cart-p-style" style="float:left;left: 50px;top:15px;">
                    <span class="cart-span-style">颜色：<i>${item.color}</i></span>
                    <span class="cart-span-style">尺码：<i>${item.size}</i></span>
                  </p>
                </td>
                <td >￥<a style="font-weight:bold;" id="goodprice">${item.price}</a></td>
                <td>
                    <span class="cart-count-span minus">-</span>
                    <input type="text" value="${item.num}" class="cart-count-input" id="goodnumber"/>
                    <span class="cart-count-span plus">+</span>
                    
                   
                </td>
                <td>
                    <span >￥<a style="font-weight:bold;" class="shop_sub">${(item.num*item.price).toFixed(2)}</a></span><br>
                </td>
                <td>
                    <a href="javascript:0" class="del">删除</a>
                </td>
            </tr>`;
              });
               this.tBody.html(this.str)
            
            }else{
              //空购物车的样式显示
            }
            this.addCartListener();
            // this.modifyAmountHandler();
            // this.totalNumber();
        }
        addCartListener(){
          //删除
          $("tbody.cart-info-box").on("click",".del",this.delCartShop.bind(this));
          //全选
          $("input.check-all").on("click",this.checkAll.bind(this));
          //单选
          $("input.check-some").on("click",this.checkSome.bind(this));
          //清空
          $("button.cart-button1-style").on("click",this.clearCart.bind(this));
          //结算
          $(".cart-button2-style").on("click",function(){  location.href="/"});
          //加减
        //  $("tbody.cart-info-box").on("click",".minus, .plus",this.modifyAmountHandler.bind(this))
         $(".cart-info-box").on("click",".minus, .plus",this.totalNumber.bind(this))
         
          
      }
      totalNumber(e){
        // let sum=Number($(e).$("#goodprice").text()*$("#goodnumber").val());
      //   console.log(sum);
      const $tr =$(e.target).parents("tr");
     
      const id =$tr.data("id"); 
      
      const item= this.arr.find(curr => curr.id == id)
     
    if($(e.target).is(".plus")){
      
      item.num +=1;
      this.calTotal()
    }else if($(e.target).is(".minus")){
      if(item.num <=1)
      return;
       item.num -=1
       this.calTotal()
      }
      localStorage.setItem("cart",JSON.stringify(this.arr));
  
        $tr.find("#goodnumber").val(item.num);
      $tr.find(".shop_sub").text((item.num*item.price-78).toFixed(2));
    }
      
      delCartShop(e){
        let $tr = $(e.target).parents("tr");
        let id =$tr.data("id");
        let arr=JSON.parse(localStorage.getItem("cart"));
        let index;
        arr.some(function(item,i){
          index=i;
          return item.id==id;
        });
        
      if(confirm("确定删除么?")){
        arr.splice(index,1);
        localStorage.setItem("cart",JSON.stringify(arr));
         $tr.remove();
      
        }
        
    }
    
  
        checkAll(event){
          let all=$(event.target).prop("checked");
          $("input.check-some").prop("checked",all);
          this.calTotal();
  
      }
        checkSome(event){
          let arr=JSON.parse(localStorage.getItem("cart"));
          $("input.check-all").prop("checked",$("input.check-some:checked").length==arr.length);
          this.calTotal();
      }
        calTotal(){
          let sum=0;
          let count=0;
          let len=$("input.check-some:checked").length;
          
          $(".style-num").text(len);
          $("input.check-some:checked").each((index,ele)=>{
              sum+=Number($(ele).parents("tr").find(".shop_sub").text());
              count+=Number($(ele).parents("tr").find(".cart-count-input").val());
          });
          $(".good-totalPrice").text(sum.toFixed(2));
          $(".good-num").text(count);
          return this;
      }
      clearCart(e){
        let arr=JSON.parse(localStorage.getItem("cart"));
        localStorage.removeItem("cart",arr);
        
        let $tr = $(e.target).parent("tr");
        location.reload();
        console.log($tr);
        return this
        }
        
        
    }
     new Cart();
  });
  });