webpackJsonp([1],{"0d5x":function(t,r){},"4bxL":function(t,r){},AzAs:function(t,r){},NHnr:function(t,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=n("7+uW"),a={render:function(){var t=this.$createElement,r=this._self._c||t;return r("div",{attrs:{id:"app"}},[r("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"App"},a,!1,function(t){n("huTw")},null,null).exports,c=n("/ocq"),i=n("mtWM"),o={name:"Stripe",props:{cart:Array,centsCharged:Number},data:function(){return{card:null,error:"",stripe:null,submitting:!1,success:!1}},methods:{submit:function(){var t=this;this.error="",this.submitting=!0,this.success=!1,this.stripe.createToken(this.card).then(function(r){r.error?(t.error=r.error.message,t.submitting=!1):i.post("https://coz-store.herokuapp.com/api/transactions",{cart:t.cart,cents_charged_total:t.centsCharged,stripe_token:r.token}).then(function(r){t.success=!0}).catch(function(r){t.error=r}).finally(function(){t.submitting=!1})})}},mounted:function(){var t=this;this.stripe=Stripe("pk_test_SJaYyjJ2DRXChbLqHGD6YYA6");var r=this.stripe.elements();this.card=r.create("card",{style:{base:{fontSize:"16px",color:"#32325d"}}}),this.card.mount("#card-element"),this.card.addEventListener("change",function(r){t.error=r.error?r.error.message:""})}},u={render:function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",[n("h4",[t._v("Credit Card Input (won't charge for realsies yet)")]),t._v(" "),n("div",{attrs:{id:"card-element"}}),t._v(" "),t.error?n("div",{staticClass:"error"},[t._v("\n    "+t._s(t.error)+"\n  ")]):t._e(),t._v(" "),t.submitting?n("div",[t._v("Submitting...")]):t.success?n("div",{staticClass:"success"},[t._v("Success!")]):n("button",{on:{click:function(r){t.submit()}}},[t._v("Submit payment")])])},staticRenderFns:[]};var d={name:"Cart",components:{Stripe:n("VU/8")(o,u,!1,function(t){n("XjNt")},null,null).exports},props:{cart:Array},computed:{centsCharged:function(){for(var t=0,r=0;r<this.cart.length;r++)t+=this.cart[r].cents;return t}},methods:{centsToDollars:function(t){return"$"+(t/100).toFixed(2)}}},v={render:function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"cart container"},[n("h2",[t._v("Cart")]),t._v(" "),t.cart.length?n("div",[t._l(t.cart,function(r){return n("div",{staticClass:"cart-product"},[n("div",[n("a",{staticClass:"remove",attrs:{tabindex:"0"},on:{click:function(n){t.$emit("remove-from-cart",r)}}},[t._v("\n          (x)\n        ")]),t._v("\n        "+t._s(r.name)+"\n      ")]),t._v(" "),n("div",[t._v("\n        "+t._s(t.centsToDollars(r.cents))+"\n      ")])])}),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"total"},[t._v("\n      Total: "+t._s(t.centsToDollars(t.centsCharged))+"\n    ")]),t._v(" "),n("hr"),t._v(" "),n("Stripe",{attrs:{cart:t.cart,centsCharged:t.centsCharged}})],2):n("div",[t._v("\n    Your cart is empty.\n  ")])])},staticRenderFns:[]};var l=n("VU/8")(d,v,!1,function(t){n("uSJr")},"data-v-5cdf8de4",null).exports,h={name:"Nav",props:{itemsInCart:Number}},p={render:function(){var t=this.$createElement,r=this._self._c||t;return r("div",{staticClass:"nav"},[r("div",{staticClass:"container"},[r("h3",[this._v("Citizen of Zion Store")]),this._v(" "),r("h3",[this._v("Cart: "+this._s(this.itemsInCart))])])])},staticRenderFns:[]};var f=n("VU/8")(h,p,!1,function(t){n("U33U")},"data-v-c1ceb04a",null).exports,m={name:"Product",props:{product:Object},computed:{cost:function(){return"$"+(this.product.cents/100).toFixed(2)}}},_={render:function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"product"},[n("h4",[t._v(t._s(t.product.name))]),t._v(" "),n("div",[t._v(t._s(t.product.description))]),t._v(" "),n("h4",[t._v(t._s(t.cost))]),t._v(" "),n("button",{on:{click:function(r){t.$emit("add-to-cart")}}},[t._v("\n    Add to cart\n  ")])])},staticRenderFns:[]};var g=n("VU/8")(m,_,!1,function(t){n("0d5x")},"data-v-55fa5f4e",null).exports,C=n("mtWM"),b={name:"ProductList",components:{Product:g},data:function(){return{error:!1,forceShowLoading:!0,loading:!0,products:[]}},computed:{showLoading:function(){return this.forceShowLoading||this.loading}},mounted:function(){var t=this;setTimeout(function(){t.forceShowLoading=!1},1e3),C.get("https://coz-store.herokuapp.com/api/products").then(function(r){t.products=r.data.products}).catch(function(r){t.error=!0}).finally(function(){t.loading=!1})}},x={render:function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"container"},[n("h2",[t._v("Product List")]),t._v(" "),n("div",{staticClass:"product-list-container"},[t.showLoading?n("h3",[t._v("Loading...")]):t._l(t.products,function(r){return n("Product",{key:r.id,attrs:{product:r},on:{"add-to-cart":function(n){t.$emit("add-to-cart",r)}}})})],2)])},staticRenderFns:[]};var S={name:"MainPage",components:{Cart:l,Nav:f,ProductList:n("VU/8")(b,x,!1,function(t){n("AzAs")},"data-v-41f3aeb2",null).exports},data:function(){return{cart:[]}},methods:{addToCart:function(t){this.cart.push(t)},removeFromCart:function(t){this.cart.splice(this.cart.indexOf(t),1)}}},L={render:function(){var t=this,r=t.$createElement,n=t._self._c||r;return n("div",{staticClass:"main"},[n("Nav",{attrs:{itemsInCart:t.cart.length}}),t._v(" "),n("h1",[t._v("Main Page")]),t._v(" "),n("ProductList",{on:{"add-to-cart":t.addToCart}}),t._v(" "),n("Cart",{attrs:{cart:t.cart},on:{"remove-from-cart":t.removeFromCart}})],1)},staticRenderFns:[]};var w=n("VU/8")(S,L,!1,function(t){n("4bxL")},null,null).exports;e.a.use(c.a);var $=new c.a({routes:[{path:"/",name:"MainPage",component:w}]});e.a.config.productionTip=!1,new e.a({el:"#app",router:$,components:{App:s},template:"<App/>"})},U33U:function(t,r){},XjNt:function(t,r){},huTw:function(t,r){},uSJr:function(t,r){}},["NHnr"]);
//# sourceMappingURL=app.970a5f5628488dae614e.js.map