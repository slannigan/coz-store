webpackJsonp([1],{"28pX":function(t,e,i){t.exports=i.p+"static/img/fl-live-mp3s.36a3719.png"},"2BD2":function(t,e){},"4J6h":function(t,e,i){t.exports=i.p+"static/img/fl-live-cd.9b850c3.png"},"4S+j":function(t,e){},"8FyB":function(t,e,i){t.exports=i.p+"static/img/fl-live-dvd-mp3s.23d9054.png"},C41T:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=i("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=i("VU/8")({name:"App"},s,!1,function(t){i("C41T")},null,null).exports,n=i("/ocq"),a=i("mvHQ"),c=i.n(a),l={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"content-container main-content-container"},[e("div",{staticClass:"content-inner-container"},[e("h3",{attrs:{id:"about"}},[this._v("Our Story")]),this._v("\n    CoZ was born out of an intense passion to create something of musical significance and of eternal value. “If we could only ever produce one album, what would we want to leave behind as our footprint on this world? More than just a catchy riff or a memorable lyric, we want to leave behind Truth, Love and Hope. And if we could only ever produce one album, we humbly realized that we were going to attempt to put the most life altering, history changing and artistically beautiful subject matter chronologically to music...the Bible.”\n    "),e("br"),e("br"),this._v("\n    What came next can only be described as an inspired and emotional writing frenzy. Chris’ father had just tragically passed away and he therapeutically immersed himself completing the bulk of the original music and lyrics in a few short months.\n    "),e("br"),e("br"),this._v("\n    Quickly realizing the impossible magnitude of attempting Scripture in its entirety, the album, now called Foreshadowing Light, started to take shape as a unique music production which weaves scripture and biblical events together through a dramatic story-line. This allowed us to coherently narrow in on biblical events with a specific focus and purpose.\n    "),e("br"),e("br"),this._v("\n    As artists we were deeply humbled and inspired at attempting to bring scriptural events to life through song and it is our earnest prayer that God would receive all glory as we strive to spread His message of life and redemption with the world He so loves.\n    "),e("br"),e("br"),this._v("\n    Thank you so much for all of your love and prayers! Through your support we will be able to take the next steps of professionally recording the album and take the production wherever God opens doors.\n  ")])])}]},d=i("VU/8")(null,l,!1,null,null,null).exports,u={name:"AlertModal",props:{text:String},methods:{close:function(){this.$emit("close")},sink:function(t){t.stopPropagation()}}},h={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-container"},[i("div",{staticClass:"modal",on:{click:t.sink}},[i("div",{staticClass:"center",domProps:{innerHTML:t._s(t.text)}},[t._v("\n      "+t._s(t.text)+"\n    ")]),t._v(" "),i("button",{on:{click:t.close}},[t._v("\n      OK\n    ")])])])},staticRenderFns:[]};var p=i("VU/8")(u,h,!1,function(t){i("y19j")},"data-v-0b0afa1e",null).exports,m={name:"TextInput",props:{error:String,forceShowError:Boolean,label:String,val:String},data:function(){return{hasHadFocus:!1}},computed:{showError:function(){return this.error&&(this.forceShowError||this.hasHadFocus)}},methods:{setHasHadFocus:function(t){this.hasHadFocus=!0}}},v={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"text-input"},[i("div",[i("label",[t._v(t._s(t.label))]),t._v(" "),i("div",{staticClass:"input-container"},[i("input",{class:{"has-error":t.showError},attrs:{type:"text"},domProps:{value:t.val},on:{input:function(e){t.$emit("update:val",e.target.value)},blur:t.setHasHadFocus}})])]),t._v(" "),t.showError?i("div",{staticClass:"error-container"},[i("div",{staticClass:"error"},[t._v("\n      "+t._s(t.error)+"\n    ")])]):t._e()])},staticRenderFns:[]};var f=i("VU/8")(m,v,!1,function(t){i("wz/7")},"data-v-b4158370",null).exports,g={name:"CartForm",components:{TextInput:f},props:{isSubmitting:Boolean,shippingCost:String,weight:Number},data:function(){return{addressLine1:"",city:"",email:"",error:"",firstName:"",hasSubmitted:!1,lastName:"",postalCode:"",province:"",shippingMethod:null,validationsAddressLine1:[{isValid:this.required,message:"You must enter an address."},{isValid:this.lessThan(255),message:"Address is too long."},{isValid:this.usesLegalLettersOrNumbers,message:"Can only use letters, numbers, commas, colons, periods, #, or spaces."}],validationsCity:[{isValid:this.required,message:"You must enter a city."},{isValid:this.lessThan(32),message:"City is too long."},{isValid:this.usesLegalLettersOrNumbers,message:"Can only use letters, numbers, commas, colons, periods, #, or spaces."}],validationsEmail:[{isValid:this.required,message:"You must enter an email address."},{isValid:this.lessThan(255),message:"Email is too long."},{isValid:function(t){return!!t&&t.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)},message:"Email is not valid."}],validationsFirstName:[{isValid:this.required,message:"You must enter a first name."},{isValid:this.lessThan(32),message:"First name is too long."},{isValid:this.usesLegalLetters,message:"Can only use letters, commas, periods, or spaces."}],validationsLastName:[{isValid:this.required,message:"You must enter a last name."},{isValid:this.lessThan(32),message:"Last name is too long."},{isValid:this.usesLegalLetters,message:"Can only use letters, commas, periods, or spaces."}],validationsPostalCode:[{isValid:this.required,message:"You must enter a postal code."},{isValid:function(t){return!!t&&!!t.toUpperCase().match(/^[A-Z]\d[A-Z][ ]*\d[A-Z]\d\s*$/gm)},message:"Postal code is not valid."}]}},computed:{errorAddressLine1:function(){return this.getErrorMessage(this.addressLine1,this.validationsAddressLine1)},errorCity:function(){return this.getErrorMessage(this.city,this.validationsCity)},errorEmail:function(){return this.getErrorMessage(this.email,this.validationsEmail)},errorFirstName:function(){return this.getErrorMessage(this.firstName,this.validationsFirstName)},errorLastName:function(){return this.getErrorMessage(this.lastName,this.validationsLastName)},errorPostalCode:function(){return this.getErrorMessage(this.postalCode,this.validationsPostalCode)},errorProvince:function(){return this.showAddressFields&&!this.province&&this.hasSubmitted},errorShippingMethod:function(){if(this.showShippingMethods&&!this.shippingMethod&&this.hasSubmitted)return"A shipping method must be selected."},formData:function(){if(!this.hasErrors){var t={email:this.email,first_name:this.firstName,last_name:this.lastName};return this.showAddressFields&&(t.address_line_1=this.addressLine1,t.city=this.city,t.province=this.province,t.postal_code=this.postalCode),this.showShippingMethods&&(t.pickup_location=this.shippingMethod),t}},hasErrors:function(){var t=!1;return this.showAddressFields&&(t=this.errorAddressLine1||this.errorCity||this.errorProvince||this.errorPostalCode),t||this.errorEmail||this.errorFirstName||this.errorLastName||this.errorShippingMethod},isMailSelected:function(){return"mail"===this.shippingMethod},showAddressFields:function(){return this.showShippingMethods&&this.isMailSelected&&this.weight<700},showShippingMethods:function(){return this.weight>0}},methods:{getErrorMessage:function(t,e){var i=e.find(function(e){return!e.isValid(t)});if(i)return i.message},lessThan:function(t){return function(e){return!!e&&e.length<t}},required:function(t){return!!t&&t.length>0},submit:function(){this.hasSubmitted=!0,this.isMailSelected&&!this.showAddressFields?this.$emit("cancel-submit","If you want to order in bulk, you must select a pickup location, or contact us at support@citizenofzion.com."):this.hasErrors?this.$emit("cancel-submit"):this.$emit("set-cart-form-data",this.formData)},usesLegalLetters:function(t){return!t||t.match(/^([a-zA-Z]+[\., ]*)+$/)},usesLegalLettersOrNumbers:function(t){return!t||t.match(/^(#*[a-zA-Z\d]+[\.,: ]*)+$/)}},watch:{isSubmitting:function(t){t&&this.submit()},isMailSelected:function(t){this.$emit("set-is-mailing",t)},weight:function(t){t||(this.shippingMethod=null)}}},_={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"cart-form"},[i("h3",[t._v("General Information")]),t._v(" "),i("TextInput",{key:"first-name",attrs:{label:"First Name",val:t.firstName,error:t.errorFirstName,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.firstName=e}}}),t._v(" "),i("TextInput",{key:"last-name",attrs:{label:"Last Name",val:t.lastName,error:t.errorLastName,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.lastName=e}}}),t._v(" "),i("TextInput",{key:"email",attrs:{label:"Email",val:t.email,error:t.errorEmail,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.email=e}}}),t._v(" "),i("br"),i("br"),t._v(" "),t.showShippingMethods?i("div",[i("h3",[t._v("Shipping Method")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.shippingMethod,expression:"shippingMethod"}],attrs:{type:"radio",id:"input-orangeville",value:"orangeville"},domProps:{checked:t._q(t.shippingMethod,"orangeville")},on:{change:function(e){t.shippingMethod="orangeville"}}}),t._v(" "),i("label",{attrs:{for:"input-orangeville"}},[t._v("\n      Pick up in Orangeville\n    ")]),t._v(" "),i("br"),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.shippingMethod,expression:"shippingMethod"}],attrs:{type:"radio",id:"input-waterloo",value:"waterloo"},domProps:{checked:t._q(t.shippingMethod,"waterloo")},on:{change:function(e){t.shippingMethod="waterloo"}}}),t._v(" "),i("label",{attrs:{for:"input-waterloo"}},[t._v("\n      Pick up in Waterloo\n    ")]),t._v(" "),i("br"),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:t.shippingMethod,expression:"shippingMethod"}],attrs:{type:"radio",id:"input-mail",value:"mail"},domProps:{checked:t._q(t.shippingMethod,"mail")},on:{change:function(e){t.shippingMethod="mail"}}}),t._v(" "),i("label",{attrs:{for:"input-mail"}},[t._v("\n      Mail\n      "),t.shippingCost?i("span",[t._v("\n        (+"+t._s(t.shippingCost)+")\n      ")]):t._e()]),t._v(" "),i("br"),t._v(" "),t.errorShippingMethod?i("div",{staticClass:"error"},[t._v("\n      "+t._s(t.errorShippingMethod)+"\n    ")]):t._e(),t._v(" "),i("br"),i("br")]):t._e(),t._v(" "),t.showAddressFields?i("div",[i("h3",[t._v("Shipping Address")]),t._v(" "),i("TextInput",{key:"address-line-1",attrs:{label:"Address",val:t.addressLine1,error:t.errorAddressLine1,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.addressLine1=e}}}),t._v(" "),i("TextInput",{key:"city",attrs:{label:"City",val:t.city,error:t.errorCity,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.city=e}}}),t._v(" "),i("label",{staticClass:"select-label",attrs:{for:"input-province"}},[t._v("\n      Province\n    ")]),t._v(" "),i("select",{directives:[{name:"model",rawName:"v-model",value:t.province,expression:"province"}],attrs:{id:"input-province"},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.province=e.target.multiple?i:i[0]}}},[i("option",{attrs:{value:""}},[t._v("Select a province")]),t._v(" "),i("option",{attrs:{value:"AB"}},[t._v("Alberta")]),t._v(" "),i("option",{attrs:{value:"BC"}},[t._v("British Columbia")]),t._v(" "),i("option",{attrs:{value:"MB"}},[t._v("Manitoba")]),t._v(" "),i("option",{attrs:{value:"NB"}},[t._v("New Brunswick")]),t._v(" "),i("option",{attrs:{value:"NL"}},[t._v("Newfoundland")]),t._v(" "),i("option",{attrs:{value:"NS"}},[t._v("Nova Scotia")]),t._v(" "),i("option",{attrs:{value:"ON"}},[t._v("Ontario")]),t._v(" "),i("option",{attrs:{value:"PE"}},[t._v("PEI")]),t._v(" "),i("option",{attrs:{value:"QC"}},[t._v("Québec")]),t._v(" "),i("option",{attrs:{value:"SK"}},[t._v("Saskatchewan")]),t._v(" "),i("option",{attrs:{value:"NT"}},[t._v("Northwest Territories")]),t._v(" "),i("option",{attrs:{value:"NU"}},[t._v("Nunavut")]),t._v(" "),i("option",{attrs:{value:"YT"}},[t._v("Yukon")])]),t._v(" "),t.errorProvince?i("div",{staticClass:"select-error-container"},[i("div",{staticClass:"error select-error"},[t._v("\n        You must select a province.\n      ")])]):t._e(),t._v(" "),i("TextInput",{key:"postal-code",attrs:{label:"Postal Code",val:t.postalCode,error:t.errorPostalCode,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.postalCode=e}}}),t._v(" "),i("br"),i("br")],1):t.isMailSelected?i("div",[t._v('\n    If you\'d like to order more than four items, you can select a "Pick up" method, or contact us at '),i("a",{attrs:{href:"mailto:support@citizenofzion.com"}},[t._v("support@citizenofzion.com")]),t._v(" if you would like a bulk order shipped to you.\n    "),i("br"),i("br"),i("br")]):t.shippingMethod?i("div",[t._v("\n    We will email you details about how to pick up your order in December once it's ready.\n    "),i("br"),i("br"),i("br")]):t._e()],1)},staticRenderFns:[]};var C=i("VU/8")(g,_,!1,function(t){i("kWiF")},null,null).exports,b=i("mtWM"),S={name:"PromoCodeModal",components:{TextInput:f},props:{promoCode:Object},data:function(){return{apiError:"",hasSubmitted:!1,isCallingAPI:!1,promoCodeText:""}},computed:{error:function(){if(!this.promoCodeText)return"Must enter a promo code."}},methods:{cancel:function(t){this.isCallingAPI||this.$emit("cancel-edit")},sink:function(t){t.stopPropagation()},submit:function(){var t=this;if(this.hasSubmitted=!0,!this.error){if(this.isCallingAPI)return;this.apiError=null,this.isCallingAPI=!0,b.get("https://www.citizenofzion.com/api/promo_codes/"+this.promoCodeText).then(function(e){e.data?(t.$emit("set-promo-code",e.data),t.$emit("cancel-edit")):t.apiError="That promo code does not exist.",t.isCallingAPI=!1}).catch(function(e){t.apiError="An unknown error occurred. Please try again later.",t.isCallingAPI=!1})}}}},w={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-container",on:{click:t.cancel}},[i("div",{staticClass:"modal",on:{click:t.sink}},[i("TextInput",{attrs:{label:"Enter promo code:",val:t.promoCodeText,error:t.error,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.promoCodeText=e}}}),t._v(" "),t.apiError?i("div",{staticClass:"error"},[t._v("\n      "+t._s(t.apiError)+"\n    ")]):t._e(),t._v(" "),t.isCallingAPI?i("button",{attrs:{disabled:""}},[t._v("\n      Loading...\n    ")]):i("button",{on:{click:function(e){t.submit()}}},[t._v("\n      Submit\n    ")])],1)])},staticRenderFns:[]},y=i("VU/8")(S,w,!1,null,null,null).exports,P={name:"Stripe",props:{isSubmitting:Boolean},data:function(){return{card:null,error:"",stripe:null}},methods:{submit:function(){var t=this;this.error="",this.stripe.createToken(this.card).then(function(e){e.error?(t.error=e.error.message,t.$emit("cancel-submit")):t.$emit("set-stripe-token",e.token)})}},mounted:function(){var t=this;this.stripe=Stripe("pk_live_DSicF99spVK6xYwZnFvGruxu");var e=this.stripe.elements();this.card=e.create("card",{style:{base:{fontSize:"16px",color:"#32325d"}}}),this.card.mount("#card-element"),this.card.addEventListener("change",function(e){t.error=e.error?e.error.message:""})},watch:{isSubmitting:function(t){t&&this.submit()}}},E={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"stripe-container"},[i("h3",[t._v("Credit Card")]),t._v(" "),i("div",{staticClass:"card-element stripe-input",class:{"has-error":t.error},attrs:{id:"card-element"}}),t._v(" "),t._m(0),t._v(" "),t.error?i("div",{staticClass:"error"},[t._v("\n    "+t._s(t.error)+"\n  ")]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"stripe-info"},[this._v("\n    Payments processed securely and confidentially by "),e("a",{attrs:{href:"https://stripe.com/ca",target:"_blank",rel:"noopener"}},[this._v("Stripe")]),this._v(".\n  ")])}]};var k=i("VU/8")(P,E,!1,function(t){i("Q4P7")},null,null).exports,M=i("mtWM"),T={name:"Cart",components:{AlertModal:p,CartForm:C,PromoCodeModal:y,Stripe:k},data:function(){return{cartFormData:null,error:"",isEditingPromoCode:!1,isLocalStorageAvailable:!1,isMailing:!1,isSendingToAPI:!1,isSubmitting:!1,promoCode:null,hasPurchasedDownload:!1,hasPurchasedNeedsPickup:!1,hasPurchasedNeedsShipping:!1,showSuccessModal:!1,successEmail:"",stripeToken:null}},props:{cart:Array,products:Array},computed:{chargedShippingCost:function(){return this.isMailing&&this.shippingCost||0},hasEditButton:function(){return!!this.cart.find(function(t){return!t.cents})},productsCost:function(){return this.cart.reduce(function(t,e){return t+e.cents_charged},0)},productsCostNoDonations:function(){return this.cart.reduce(function(t,e){return"donation"===e.slug?t:t+e.cents_charged},0)},promoCodeBtnText:function(){return this.promoCode?"Change promo code":"Apply promo code"},promoCodeCentsOff:function(){if(this.promoCode){var t=this.promoCode.percent_off/100;return this.promoCode.product_slug?this.promoCodeProduct?Math.floor(this.promoCodeProduct.cents_charged*t):0:Math.floor(this.productsCostNoDonations*t)}},promoCodeProduct:function(){var t=this;if(this.promoCode&&this.promoCode.product_slug)return this.products.find(function(e){return e.slug===t.promoCode.product_slug})},shippingCost:function(){var t=this.weight;if(t&&!(t>600)){var e=Math.ceil(295*1.13),i=Math.ceil(470*1.13);return 150===t?100+e:300===t?100+i:450===t?200+e+i:600===t?200+2*i:void 0}},successAlertMessage:function(){if(this.successEmail){var t="Your payment has been received! A receipt has been sent to "+this.successEmail+".";return this.hasPurchasedNeedsPickup&&(t+="<br><br>Bring your receipt when picking up your items."),(this.hasPurchasedNeedsShipping||this.hasPurchasedNeedsPickup)&&(t+="<br><br>Your order will arrive in December."),this.hasPurchasedDownload&&(t+="<br><br>An email with a link to your download will be sent in December, when the download is ready."),t}},totalCost:function(){return this.productsCost-(this.promoCodeCentsOff||0)+(this.chargedShippingCost||0)},weight:function(){for(var t=0,e=0;e<this.cart.length;e++)t+=this.cart[e].grams;return t}},methods:{attemptSubmit:function(){!this.isSendingToAPI&&this.isSubmitting&&this.stripeToken&&this.cartFormData&&this.submit()},cancelEditPromoCode:function(){this.isEditingPromoCode=!1},cancelSubmit:function(t){this.isSubmitting=!1,this.isSendingToAPI=!1,this.stripeToken=null,this.cartFormData=null,this.error=t||""},centsToDollars:function(t){if(t)return"$"+(t/100).toFixed(2)},closeSuccessMessage:function(){this.showSuccessModal=!1},editPromoCode:function(){this.isEditingPromoCode=!0},setCartFormData:function(t){this.isSubmitting&&(this.cartFormData=t,this.attemptSubmit())},setIsMailing:function(t){this.isMailing=t},setPromoCode:function(t){t&&t.code?this.promoCode=t:this.promoCode=null,this.updateLocalStorage()},setStripeToken:function(t){this.isSubmitting&&(this.stripeToken=t,this.attemptSubmit())},submit:function(){var t=this;this.isSendingToAPI||(this.isSendingToAPI=!0,M.post("https://www.citizenofzion.com/api/transactions",{address_line_1:this.cartFormData.address_line_1,cart:this.cart,cents_charged_shipping:this.chargedShippingCost,cents_charged_total:this.totalCost,city:this.cartFormData.city,email:this.cartFormData.email,first_name:this.cartFormData.first_name,last_name:this.cartFormData.last_name,pickup_location:this.cartFormData.pickup_location,postal_code:this.cartFormData.postal_code,promo_code:this.promoCodeCentsOff?this.promoCode.code:null,province:this.cartFormData.province,stripe_token_id:this.stripeToken.id}).then(function(e){var i=t.cartFormData.email,s=!!t.cart.find(function(t){return t.slug.indexOf("mp3s")>-1}),o=!!t.weight&&"mail"===t.cartFormData.pickup_location,n=!!t.weight&&!o;t.showSuccessModal=!0,t.$emit("clear-cart"),t.cancelSubmit(),t.setPromoCode(),t.isMailing=!1,r.a.nextTick(function(){t.successEmail=i,t.hasPurchasedDownload=s,t.hasPurchasedNeedsPickup=n,t.hasPurchasedNeedsShipping=o,t.showSuccessModal=!0})}).catch(function(e){t.cancelSubmit(e.response.data||e.response.statusText)}))},triggerSubmit:function(){this.cancelSubmit();var t=this.cart.find(function(t){return"donation"===t.slug});if(t&&t.cents_charged>1e4&&!confirm("$"+(t.cents_charged/100).toFixed(2)+" is a generous donation! Click OK to confirm."))return;this.isSubmitting=!0},updateLocalStorage:function(){this.isLocalStorageAvailable&&localStorage.setItem("promoCode",c()(this.promoCode))}},watch:{cart:function(){this.successEmail=null,this.hasPurchasedDownload=!1,this.hasPurchasedNeedsPickup=!1,this.hasPurchasedNeedsShipping=!1}},mounted:function(){try{localStorage.setItem("test","test"),localStorage.removeItem("test"),this.isLocalStorageAvailable=!0}catch(t){}var t=localStorage.getItem("promoCode");t&&(this.promoCode=JSON.parse(t))}},F={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"cart content-container main-content-container"},[i("div",{staticClass:"content-inner-container"},[i("h3",{attrs:{id:"cart"}},[t._v("Cart")]),t._v(" "),t.cart.length?i("div",[t._l(t.cart,function(e){return i("div",{staticClass:"cart-product"},[i("div",{staticClass:"left"},[i("div",{staticClass:"buttons-container",class:{"has-edit-button":t.hasEditButton}},[e.cents?t._e():i("button",{on:{click:function(i){t.$emit("edit-product",e)}}},[t._v("\n              Edit\n            ")]),t._v(" "),i("button",{on:{click:function(i){t.$emit("remove-from-cart",e)}}},[t._v("\n              x\n            ")])]),t._v(" "),i("div",[t._v("\n            "+t._s(e.name)+"\n          ")])]),t._v(" "),i("div",{staticClass:"cents-charged"},[t._v("\n          "+t._s(t.centsToDollars(e.cents_charged))+"\n        ")])])}),t._v(" "),t.promoCode?i("div",{staticClass:"cart-product"},[i("div",{staticClass:"left"},[i("div",{staticClass:"buttons-container",class:{"has-edit-button":t.hasEditButton}},[i("button",{on:{click:t.setPromoCode}},[t._v("\n              x\n            ")])]),t._v(" "),i("div",[t._v("\n            "+t._s(t.promoCode.code.toUpperCase())+": "+t._s(t.promoCode.percent_off)+"% off "+t._s(t.promoCode.product_slug?t.promoCodeProduct&&t.promoCodeProduct.name||t.promoCode.product_slug:"")+"\n          ")])]),t._v(" "),i("div",[t._v("\n          -"+t._s(t.centsToDollars(t.promoCodeCentsOff)||"$0.00")+"\n        ")])]):t._e(),t._v(" "),t.chargedShippingCost?i("div",{staticClass:"cart-product"},[i("div",{staticClass:"left"},[i("div",{staticClass:"buttons-container",class:{"has-edit-button":t.hasEditButton}}),t._v(" "),i("div",[t._v("\n            Shipping:\n          ")])]),t._v(" "),i("div",[t._v("\n          "+t._s(t.centsToDollars(t.chargedShippingCost))+"\n        ")])]):t._e(),t._v(" "),i("hr"),t._v(" "),i("div",{staticClass:"total"},[i("h4",[t._v("Total: "+t._s(t.centsToDollars(t.totalCost)))]),t._v(" "),i("button",{on:{click:t.editPromoCode}},[t._v("\n          "+t._s(t.promoCodeBtnText)+"\n        ")])]),t._v(" "),i("br"),t._v(" "),i("CartForm",{attrs:{weight:t.weight,isSubmitting:t.isSubmitting,shippingCost:t.centsToDollars(t.shippingCost)},on:{"cancel-submit":t.cancelSubmit,"set-cart-form-data":t.setCartFormData,"set-is-mailing":t.setIsMailing}}),t._v(" "),i("Stripe",{attrs:{isSubmitting:t.isSubmitting},on:{"cancel-submit":t.cancelSubmit,"set-stripe-token":t.setStripeToken}}),t._v(" "),i("br"),t._v(" "),t.error.length?i("div",[i("div",{staticClass:"error"},[t._v("\n          "+t._s(t.error)+"\n        ")]),t._v(" "),i("br")]):t._e(),t._v(" "),i("div",{staticClass:"submitting-container"},[t.isSubmitting?i("button",{attrs:{disabled:""}},[t._v("\n          Submitting...\n        ")]):i("button",{on:{click:function(e){t.triggerSubmit()}}},[t._v("\n          Submit payment ("+t._s(t.centsToDollars(t.totalCost))+")\n        ")])])],2):t.successAlertMessage?i("div",{domProps:{innerHTML:t._s(t.successAlertMessage)}},[t._v("\n      "+t._s(t.successAlertMessage)+"\n    ")]):i("div",[t._v("\n      Your cart is empty.\n    ")])]),t._v(" "),t.showSuccessModal?i("AlertModal",{attrs:{text:t.successAlertMessage},on:{close:t.closeSuccessMessage}}):t._e(),t._v(" "),t.isEditingPromoCode?i("PromoCodeModal",{attrs:{promoCode:t.promoCode},on:{"cancel-edit":t.cancelEditPromoCode,"set-promo-code":t.setPromoCode}}):t._e()],1)},staticRenderFns:[]};var x=i("VU/8")(T,F,!1,function(t){i("4S+j")},null,null).exports,A={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content-container main-content-container"},[i("div",{staticClass:"content-inner-container"},[i("h3",{attrs:{id:"contact"}},[t._v("Contact Us")]),t._v("\n    If you have any business inquiries, contact us through "),i("a",{attrs:{href:"https://www.facebook.com/COZ-Citizen-of-Zion-351745441591589/",target:"_blank",rel:"noopener"}},[t._v("our Facebook page")]),t._v(", or at "),i("a",{attrs:{href:"mailto:chris@citizenofzion.com"}},[t._v("chris@citizenofzion.com")]),t._v(".\n    "),i("br"),i("br"),t._v("\n    If you have any problems, contact us at "),i("a",{attrs:{href:"mailto:support@citizenofzion.com"}},[t._v("support@citizenofzion.com")]),t._v(".\n  ")])])}]},N=i("VU/8")(null,A,!1,null,null,null).exports,L={name:"EditModal",components:{TextInput:f},props:{product:Object},data:function(){return{hasSubmitted:!1,tempCentsCharged:""}},computed:{error:function(){var t=this.tempCentsCharged;if(!t||!t.match(/^\s*\$?\d+(\.\d{0,2})?\s*$/))return"Must be a valid dollar amount."}},methods:{cancel:function(t){this.$emit("done-edit")},sink:function(t){t.stopPropagation()},submit:function(){if(this.hasSubmitted=!0,!this.error){var t=this.tempCentsCharged.trim(),e=0===t.indexOf("$")?t.slice(1):t,i=100*parseFloat(e);this.$emit("done-edit",i)}}},mounted:function(){this.product.cents_charged&&(this.tempCentsCharged=(this.product.cents_charged/100).toFixed(2))}},$={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"modal-container",on:{click:t.cancel}},[i("div",{staticClass:"modal",on:{click:t.sink}},[i("TextInput",{attrs:{label:"Set amount to donate:",val:t.tempCentsCharged,error:t.error,forceShowError:t.hasSubmitted},on:{"update:val":function(e){t.tempCentsCharged=e}}}),t._v(" "),i("button",{on:{click:function(e){t.submit()}}},[t._v("\n      Submit\n    ")])],1)])},staticRenderFns:[]},I=i("VU/8")(L,$,!1,null,null,null).exports,D={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"footer"},[this._v("\n  © 2018 Citizen of Zion\n")])},staticRenderFns:[]};var V=i("VU/8")({name:"Footer"},D,!1,function(t){i("S46l")},"data-v-7523f2b3",null).exports,z={name:"Nav",props:{itemsInCart:Number}},O={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"nav-wrapper"},[e("div",{staticClass:"nav"},[e("div",{staticClass:"container"},[this._m(0),this._v(" "),this._m(1),this._v(" "),e("h3",[e("a",{attrs:{href:"#cart"}},[this._v("Cart ("+this._s(this.itemsInCart)+")")])])])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("h3",[e("a",{attrs:{href:"#about"}},[this._v("Our Story")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h3",[e("a",{attrs:{href:"#shop"}},[this._v("Shop")])])}]};var U=i("VU/8")(z,O,!1,function(t){i("rjTm")},"data-v-6de4ea4a",null).exports,B={name:"Product",data:function(){return{justClicked:!1}},props:{product:Object,products:Array},computed:{cost:function(){return"$"+(this.product.cents/100).toFixed(2)},imgSrc:function(){var t=i("4J6h"),e=i("8FyB"),r=i("hW/m"),s=i("U5Y5"),o=i("28pX");switch(this.product.slug){case"fl-live-mp3s":return o;case"fl-live-cd":return t;case"fl-live-dvd":return s;case"fl-live-dvd-mp3s":return e;case"donation":return r}return t},strikethroughPrice:function(){if("fl-live-cd-dvd"===this.product.slug){var t=this.products.find(function(t){return"fl-live-cd"===t.slug}),e=this.products.find(function(t){return"fl-live-dvd"===t.slug});if(t&&e)return"$"+((t.cents+e.cents)/100).toFixed(2)}}},methods:{addToCart:function(){var t=this;this.$emit("add-to-cart"),"donation"!==this.product.slug&&(this.justClicked=!0,setTimeout(function(){t.justClicked=!1},1e3))}}},R={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"product content-container"},[i("div",[i("h3",[t._v(t._s(t.product.name))]),t._v(" "),i("div",[t._v(t._s(t.product.description))])]),t._v(" "),i("div",[i("div",[i("img",{attrs:{src:t.imgSrc}})]),t._v(" "),i("div",{staticClass:"cost-container"},[t.product.cents?i("h4",[t.strikethroughPrice?i("span",[i("span",{staticClass:"strikethrough-price"},[t._v(t._s(t.strikethroughPrice))]),i("br")]):t._e(),t._v("\n        "+t._s(t.cost)+"\n      ")]):t._e()]),t._v(" "),t.justClicked?i("div",{staticClass:"added"},[t._v("\n      Added!\n    ")]):i("button",{on:{click:t.addToCart}},[t._v("\n      Add to cart\n    ")])])])},staticRenderFns:[]};var j=i("VU/8")(B,R,!1,function(t){i("uWTD")},"data-v-6f564f9e",null).exports,H=i("mtWM"),W={name:"ProductList",components:{Product:j},data:function(){return{error:!1,forceShowLoading:!0,loading:!0}},props:{products:Array},computed:{showLoading:function(){return this.forceShowLoading||this.loading}},mounted:function(){var t=this;setTimeout(function(){t.forceShowLoading=!1},1e3),H.get("https://www.citizenofzion.com/api/products").then(function(e){t.$emit("set-products",e.data.products),t.loading=!1}).catch(function(e){t.error=!0,t.loading=!1})}},Y={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"container"},[i("div",{staticClass:"product-list-container",attrs:{id:"shop"}},[t.showLoading?i("h3",{staticClass:"empty-container content-container"},[t._v("Loading...")]):t.error?i("h3",{staticClass:"empty-container content-container"},[t._v("\n      An error occurred. Please try again later, or contact us at support@citizenofzion.com if problems continue.\n    ")]):t._l(t.products,function(e){return i("Product",{key:e.id,attrs:{product:e,products:t.products},on:{"add-to-cart":function(i){t.$emit("add-to-cart",e)}}})})],2)])},staticRenderFns:[]};var Z={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"video-container"},[e("iframe",{staticStyle:{border:"none",overflow:"hidden"},attrs:{src:"https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F351745441591589%2Fvideos%2F249324349090933%2F&show_text=0&width=560",width:"400",height:"280",scrolling:"no",frameborder:"0",allowTransparency:"true",allowFullScreen:"true",autoplay:"true"}})])}]};var q={name:"MainPage",components:{About:d,Cart:x,Contact:N,EditModal:I,Footer:V,Nav:U,ProductList:i("VU/8")(W,Y,!1,function(t){i("Zv4G")},"data-v-69f8defa",null).exports,Video:i("VU/8")(null,Z,!1,function(t){i("hWTR")},null,null).exports},data:function(){return{cart:[],isLocalStorageAvailable:!1,products:[],productToEdit:null}},methods:{addToCart:function(t){if("donation"===t.slug){var e=this.cart.find(function(e){return e.id===t.id});return this.productToEdit=e?e:t}if(t.cents_charged=t.cents,"fl-live-mp3s"===t.slug||"fl-live-dvd"===t.slug){var i="fl-live-mp3s"===t.slug?"fl-live-dvd":"fl-live-mp3s",r=this.cart.find(function(t){return t.slug===i});if(r){var s=this.cart.indexOf(r);this.cart.splice(s,1);var o=this.products.find(function(t){return"fl-live-dvd-mp3s"===t.slug});return void this.addToCart(o)}}this.cart.push(t),this.updateLocalStorage()},doneEdit:function(t){if(t){var e=this.cart.indexOf(this.productToEdit)>-1;this.$set(this.productToEdit,"cents_charged",t),e||this.cart.push(this.productToEdit),this.updateLocalStorage()}this.productToEdit=null},editProduct:function(t){this.productToEdit=t},clearCart:function(){for(;this.cart.length;)this.cart.pop();this.updateLocalStorage()},removeFromCart:function(t){this.cart.splice(this.cart.indexOf(t),1),this.updateLocalStorage()},setProducts:function(t){this.products=t},updateLocalStorage:function(){this.isLocalStorageAvailable&&localStorage.setItem("cart",c()(this.cart))}},mounted:function(){try{localStorage.setItem("test","test"),localStorage.removeItem("test"),this.isLocalStorageAvailable=!0}catch(t){}var t=localStorage.getItem("cart");t&&(this.cart=JSON.parse(t))}},G={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"main"},[i("Nav",{attrs:{itemsInCart:t.cart.length}}),t._v(" "),i("img",{staticClass:"logo",attrs:{src:"/static/img/logo-large.png"}}),t._v(" "),i("Video"),t._v(" "),i("h2",[t._v("Select Items for Preorder")]),t._v(" "),i("ProductList",{attrs:{products:t.products},on:{"set-products":t.setProducts,"add-to-cart":t.addToCart}}),t._v(" "),i("hr"),t._v(" "),i("Cart",{attrs:{products:t.products,cart:t.cart},on:{"clear-cart":t.clearCart,"remove-from-cart":t.removeFromCart,"edit-product":t.editProduct}}),t._v(" "),i("hr"),t._v(" "),i("About"),t._v(" "),i("Contact"),t._v(" "),i("Footer"),t._v(" "),t.productToEdit?i("EditModal",{attrs:{product:t.productToEdit},on:{"done-edit":t.doneEdit}}):t._e()],1)},staticRenderFns:[]};var Q=i("VU/8")(q,G,!1,function(t){i("2BD2")},null,null).exports;r.a.use(n.a);var J=new n.a({mode:"history",routes:[{path:"/",name:"MainPage",component:Q}]});r.a.config.productionTip=!1,new r.a({el:"#app",router:J,components:{App:o},template:"<App/>"})},Q4P7:function(t,e){},S46l:function(t,e){},U5Y5:function(t,e,i){t.exports=i.p+"static/img/fl-live-dvd.215f8d0.png"},Zv4G:function(t,e){},"hW/m":function(t,e,i){t.exports=i.p+"static/img/donation.5ffcf45.png"},hWTR:function(t,e){},kWiF:function(t,e){},rjTm:function(t,e){},uWTD:function(t,e){},"wz/7":function(t,e){},y19j:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.678917a593776b416794.js.map