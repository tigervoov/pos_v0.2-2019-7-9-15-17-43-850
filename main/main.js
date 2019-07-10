'use strict';
//const loadAllItems=require('../test/fixtures')

function printReceipt(barcodesArray){
  var cartItems=formatItemObject(barcodesArray)
  var headerStr="***<没钱赚商店>收据***\n"
  var cartItemStr=''
  var totalStr=''
  if(cartItems=='Error'){
      return 'Error';
  }else{
      var totalPrice=null
      for(let cartItem of cartItems){
          cartItemStr+="名称："+cartItem.name+"，数量："+cartItem.quantity+cartItem.unit+"，单价："+cartItem.price.toFixed(2)+"(元)，"+"小计："+(cartItem.quantity*cartItem.price).toFixed(2)+"(元)\n"
          totalPrice+=parseFloat(cartItem.price)*parseFloat(cartItem.quantity)
      }
      cartItemStr+="----------------------\n"
      totalStr="总计："+totalPrice.toFixed(2)+"(元)\n"+"**********************"
  }
  console.log(headerStr+cartItemStr+totalStr)
}
function formatItemObject(barcodesArray){
  var database=loadAllItems()
  var itemQuantity=colculateItemQuantity(barcodesArray)
  var cartItem=[]
  if(itemQuantity!=null){
      for(let item of Object.keys(itemQuantity)){
          for(let dbItem of database)
          if(dbItem.barcode==item)
          {
              let objItem={}
              objItem.barcode=dbItem.barcode;
              objItem.name=dbItem.name;
              objItem.unit=dbItem.unit;
              objItem.price=dbItem.price;
              objItem.quantity=itemQuantity[item]
              cartItem.push(objItem) 
          }
      }
  }else{
      return 'Error'
  }
  
  return cartItem;
}
function colculateItemQuantity(barcodesArray){
  var objItem={}
  for(let item of barcodesArray){
      objItem[item]=(objItem[item])+1||1
  }
  return objItem
}


//printReceipt(barcodesArray)