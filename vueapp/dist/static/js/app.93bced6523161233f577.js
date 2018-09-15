webpackJsonp([1],{"0d5x":function(t,n){},"4bxL":function(t,n){},AzAs:function(t,n){},NHnr:function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=r("7+uW"),a={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},staticRenderFns:[]};var o=r("VU/8")({name:"App"},a,!1,function(t){r("huTw")},null,null).exports,s=r("/ocq"),c=r("mtWM"),i={name:"Stripe",props:{centsCharged:Number},data:function(){return{card:null,error:"",stripe:null,submitting:!1,success:!1}},methods:{submit:function(){var t=this;this.submitting=!0,this.success=!1,this.stripe.createToken(this.card).then(function(n){n.error?(t.error=n.error.message,t.submitting=!1):c.post("https://coz-store.herokuapp.com/api/transactions",{cents_charged_total:t.centsCharged,stripe_token:n.token}).then(function(n){t.success=!0}).catch(function(n){t.error=n}).finally(function(){t.submitting=!1})})}},mounted:function(){var t=this;this.stripe=Stripe("pk_test_SJaYyjJ2DRXChbLqHGD6YYA6");var n=this.stripe.elements();this.card=n.create("card",{style:{base:{fontSize:"16px",color:"#32325d"}}}),this.card.mount("#card-element"),this.card.addEventListener("change",function(n){t.error=n.error?n.error.message:""})}},u={render:function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",[r("h4",[t._v("Credit Card Input (won't charge for realsies yet)")]),t._v(" "),r("div",{attrs:{id:"card-element"}}),t._v(" "),t.error?r("div",{staticClass:"error"},[t._v("\n    "+t._s(t.error)+"\n  ")]):t._e(),t._v(" "),r("button",{on:{click:function(n){t.submit()}}},[t._v("Submit payment")])])},staticRenderFns:[]};var d={name:"Cart",components:{Stripe:r("VU/8")(i,u,!1,function(t){r("pvB3")},null,null).exports},props:{cart:Array},computed:{centsCharged:function(){for(var t=0,n=0;n<this.cart.length;n++)t+=this.cart[n].cents;return t}},methods:{centsToDollars:function(t){return"$"+(t/100).toFixed(2)}}},v={render:function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"cart container"},[r("h2",[t._v("Cart")]),t._v(" "),t.cart.length?r("div",[t._l(t.cart,function(n){return r("div",{staticClass:"cart-product"},[r("div",[r("a",{staticClass:"remove",attrs:{tabindex:"0"},on:{click:function(r){t.$emit("remove-from-cart",n)}}},[t._v("\n          (x)\n        ")]),t._v("\n        "+t._s(n.name)+"\n      ")]),t._v(" "),r("div",[t._v("\n        "+t._s(t.centsToDollars(n.cents))+"\n      ")])])}),t._v(" "),r("hr"),t._v(" "),r("div",{staticClass:"total"},[t._v("\n      Total: "+t._s(t.centsToDollars(t.centsCharged))+"\n    ")]),t._v(" "),r("hr"),t._v(" "),r("Stripe",{attrs:{centsCharged:t.centsCharged}})],2):r("div",[t._v("\n    Your cart is empty.\n  ")])])},staticRenderFns:[]};var l=r("VU/8")(d,v,!1,function(t){r("Pw2c")},"data-v-ee0f2f36",null).exports,p={name:"Nav",props:{itemsInCart:Number}},h={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"nav"},[n("div",{staticClass:"container"},[n("h3",[this._v("Citizen of Zion Store")]),this._v(" "),n("h3",[this._v("Cart: "+this._s(this.itemsInCart))])])])},staticRenderFns:[]};var f=r("VU/8")(p,h,!1,function(t){r("U33U")},"data-v-c1ceb04a",null).exports,m={name:"Product",props:{product:Object},computed:{cost:function(){return"$"+(this.product.cents/100).toFixed(2)}}},_={render:function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"product"},[r("h4",[t._v(t._s(t.product.name))]),t._v(" "),r("div",[t._v(t._s(t.product.description))]),t._v(" "),r("h4",[t._v(t._s(t.cost))]),t._v(" "),r("button",{on:{click:function(n){t.$emit("add-to-cart")}}},[t._v("\n    Add to cart\n  ")])])},staticRenderFns:[]};var C=r("VU/8")(m,_,!1,function(t){r("0d5x")},"data-v-55fa5f4e",null).exports,g=r("mtWM"),b={name:"ProductList",components:{Product:C},data:function(){return{error:!1,forceShowLoading:!0,loading:!0,products:[]}},computed:{showLoading:function(){return this.forceShowLoading||this.loading}},mounted:function(){var t=this;setTimeout(function(){t.forceShowLoading=!1},1e3),g.get("https://coz-store.herokuapp.com/api/products").then(function(n){t.products=n.data.products}).catch(function(n){t.error=!0}).finally(function(){t.loading=!1})}},x={render:function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"container"},[r("h2",[t._v("Product List")]),t._v(" "),r("div",{staticClass:"product-list-container"},[t.showLoading?r("h3",[t._v("Loading...")]):t._l(t.products,function(n){return r("Product",{key:n.id,attrs:{product:n},on:{"add-to-cart":function(r){t.$emit("add-to-cart",n)}}})})],2)])},staticRenderFns:[]};var w={name:"MainPage",components:{Cart:l,Nav:f,ProductList:r("VU/8")(b,x,!1,function(t){r("AzAs")},"data-v-41f3aeb2",null).exports},data:function(){return{cart:[]}},methods:{addToCart:function(t){this.cart.push(t)},removeFromCart:function(t){this.cart.splice(this.cart.indexOf(t),1)}}},L={render:function(){var t=this,n=t.$createElement,r=t._self._c||n;return r("div",{staticClass:"main"},[r("Nav",{attrs:{itemsInCart:t.cart.length}}),t._v(" "),r("h1",[t._v("Main Page")]),t._v(" "),r("ProductList",{on:{"add-to-cart":t.addToCart}}),t._v(" "),r("Cart",{attrs:{cart:t.cart},on:{"remove-from-cart":t.removeFromCart}})],1)},staticRenderFns:[]};var P=r("VU/8")(w,L,!1,function(t){r("4bxL")},null,null).exports;e.a.use(s.a);var $=new s.a({routes:[{path:"/",name:"MainPage",component:P}]});e.a.config.productionTip=!1,new e.a({el:"#app",router:$,components:{App:o},template:"<App/>"})},Pw2c:function(t,n){},U33U:function(t,n){},huTw:function(t,n){},pvB3:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.93bced6523161233f577.js.map