<template>
  <div>
    <TextInput
      key="first-name"
      label="First Name"
      v-bind:val.sync="firstName"
      v-bind:error="errorFirstName"
      v-bind:forceShowError="hasSubmitted" />
    <TextInput
      key="last-name"
      label="Last Name"
      v-bind:val.sync="lastName"
      v-bind:error="errorLastName"
      v-bind:forceShowError="hasSubmitted" />
    <TextInput
      key="email"
      label="Email"
      v-bind:val.sync="email"
      v-bind:error="errorEmail"
      v-bind:forceShowError="hasSubmitted" />
    <br>
    <div
      v-if="showShippingMethods">
      Shipping method:
      <br>
      <input
        type="radio"
        id="input-orangeville"
        value="orangeville"
        v-model="shippingMethod" />
      <label for="input-orangeville">
        Pick up in Orangeville
      </label>
      <br>
      <input
        type="radio"
        id="input-waterloo"
        value="waterloo"
        v-model="shippingMethod" />
      <label for="input-waterloo">
        Pick up in Waterloo
      </label>
      <br>
      <input
        type="radio"
        id="input-mail"
        value="mail"
        v-model="shippingMethod" />
      <label for="input-mail">
        Mail
        <span v-if="shippingCost">
          (+{{ shippingCost }})
        </span>
      </label>
      <br>
      <div
        v-if="errorShippingMethod"
        class="error">
        {{ errorShippingMethod }}
      </div>
      <br>
    </div>
    <div
      v-if="showAddressFields">
      <TextInput
        key="address-line-1"
        label="Address Line 1"
        v-bind:val.sync="addressLine1"
        v-bind:error="errorAddressLine1"
        v-bind:forceShowError="hasSubmitted" />
      <TextInput
        key="address-line-2"
        label="Address Line 2"
        v-bind:val.sync="addressLine2"
        v-bind:error="errorAddressLine2"
        v-bind:forceShowError="hasSubmitted" />
      <TextInput
        key="city"
        label="City"
        v-bind:val.sync="city"
        v-bind:error="errorCity"
        v-bind:forceShowError="hasSubmitted" />
      <label for="input-province">Province</label>
      <select
        id="input-province"
        v-model="province">
        <option value="">Select a province</option>
        <option value="AB">Alberta</option>
        <option value="BC">British Columbia</option>
        <option value="MB">Manitoba</option>
        <option value="NB">New Brunswick</option>
        <option value="NL">Newfoundland</option>
        <option value="NS">Nova Scotia</option>
        <option value="ON">Ontario</option>
        <option value="PE">PEI</option>
        <option value="QC">Québec</option>
        <option value="SK">Saskatchewan</option>
        <option value="NT">Northwest Territories</option>
        <option value="NU">Nunavut</option>
        <option value="YT">Yukon</option>
      </select>
      <div
        v-if="errorProvince"
        class="error">
        You must select a province.
      </div>
      <TextInput
        key="postal-code"
        label="Postal Code"
        v-bind:val.sync="postalCode"
        v-bind:error="errorPostalCode"
        v-bind:forceShowError="hasSubmitted" />
      <br>
    </div>
    <div
      v-else-if="isMailSelected">
      If you'd like to order more than four items, you can select a "Pick up" method, or contact us at (EMAIL) if you would like a bulk order shipped to you.
      <br><br>
    </div>
    <div
      v-else-if="shippingMethod">
      We will email you details about how to pick up your order once the order has been shipped to us.
      <br><br>
    </div>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';

export default {
  name: 'CartForm',
  components: {
    TextInput
  },
  props: {
    isSubmitting: Boolean,
    shippingCost: String,
    weight: Number
  },
  data: function() {
    return {
      addressLine1: '',
      addressLine2: '',
      city: '',
      email: '',
      error: '',
      firstName: '',
      hasSubmitted: false,
      lastName: '',
      postalCode: '',
      province: '',
      shippingMethod: null,
      validationsAddressLine1: [
        {
          isValid: this.required,
          message: 'You must enter an address.'
        }, {
          isValid: this.lessThan(255),
          message: 'Address is too long.'
        }
      ],
      validationsAddressLine2: [
        {
          isValid: function(val) {
            return this.val ? this.val.length < 255 : true;
          },
          message: 'Address line 2 is too long.'
        }
      ],
      validationsCity: [
        {
          isValid: this.required,
          message: 'You must enter a city.'
        }, {
          isValid: this.lessThan(32),
          message: 'City is too long.'
        }
      ],
      validationsEmail: [
        {
          isValid: this.required,
          message: 'You must enter an email address.'
        }, {
          isValid: this.lessThan(255),
          message: 'Email is too long.'
        }, {
          // emailregex.com
          isValid: function(val) {
            return val ? val.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) : false;
          },
          message: 'Email is not valid.'
        }
      ],
      validationsFirstName: [
        {
          isValid: this.required,
          message: 'You must enter a first name.'
        }, {
          isValid: this.lessThan(32),
          message: 'First name is too long.'
        }
      ],
      validationsLastName: [
        {
          isValid: this.required,
          message: 'You must enter a last name.'
        }, {
          isValid: this.lessThan(32),
          message: 'Last name is too long.'
        }
      ],
      validationsPostalCode: [
        {
          isValid: this.required,
          message: 'You must enter a postal code.'
        }, {
          isValid: function(val) {
            return val ? !!val.toUpperCase().match(/^[A-Z]\d[A-Z][ ]*\d[A-Z]\d\s*$/gm) : false;
          },
          message: 'Postal code is not valid.'
        }
      ]
    }
  },
  computed: {
    errorAddressLine1: function() {
      return this.getErrorMessage(this.addressLine1, this.validationsAddressLine1);
    },
    errorAddressLine2: function() {
      return this.getErrorMessage(this.addressLine2, this.validationsAddressLine2);
    },
    errorCity: function() {
      return this.getErrorMessage(this.city, this.validationsCity);
    },
    errorEmail: function() {
      return this.getErrorMessage(this.email, this.validationsEmail);
    },
    errorFirstName: function() {
      return this.getErrorMessage(this.firstName, this.validationsFirstName);
    },
    errorLastName: function() {
      return this.getErrorMessage(this.lastName, this.validationsLastName);
    },
    errorPostalCode: function() {
      return this.getErrorMessage(this.postalCode, this.validationsPostalCode);
    },
    errorProvince: function() {
      return this.showAddressFields && !this.province && this.hasSubmitted;
    },
    errorShippingMethod: function() {
      if (this.showShippingMethods && !this.shippingMethod && this.hasSubmitted) {
        return 'A shipping method must be selected.'
      }
    },
    formData: function() {
      if (this.hasErrors) {
        return;
      }
      const data = {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName
      };
      if (this.showAddressFields) {
        data.address_line_1 = this.addressLine1;
        data.address_line_2 = this.addressLine2;
        data.city = this.city;
        data.province = this.province;
        data.postal_code = this.postalCode;
      } else if (this.showShippingMethods) {
        data.pickup_location = this.shippingMethod;
      }
      return data;
    },
    hasErrors: function() {
      let hasAddressErrors = false;
      if (this.showAddressFields) {
        hasAddressErrors = this.errorAddressLine1 ||
          this.errorAddressLine2 ||
          this.errorCity ||
          this.errorProvince ||
          this.errorPostalCode;
      }
      return hasAddressErrors ||
        this.errorEmail ||
        this.errorFirstName ||
        this.errorLastName ||
        this.errorShippingMethod;
    },
    isMailSelected: function() {
      return this.shippingMethod === 'mail';
    },
    showAddressFields: function() {
      return this.showShippingMethods &&
        this.isMailSelected &&
        (this.weight < 700);
    },
    showShippingMethods: function() {
      return this.weight > 0;
    }
  },
  methods: {
    getErrorMessage: function(val, validations) {
      const invalid = validations.find((validation) => {
        return !validation.isValid(val);
      });
      if (invalid) {
        return invalid.message;
      }
    },
    lessThan: function(length) {
      return function(val) {
        return val ? val.length < length : false;
      };
    },
    required: function(val) {
      return val ? val.length > 0 : false;
    },
    submit: function() {
      this.hasSubmitted = true;
      if (this.isMailSelected && !this.showAddressFields) {
        this.$emit('cancel-submit', 'If you want to order in bulk, you must select a pickup location, or contact us at (EMAIL).');
      } else if (this.hasErrors) {
        this.$emit('cancel-submit');
      } else {
        this.$emit('set-cart-form-data', this.formData);
      }
    }
  },
  watch: {
    isSubmitting: function(val) {
      if (val) {
        this.submit();
      }
    },
    isMailSelected: function(val) {
      this.$emit('set-is-mailing', val);
    },
    weight: function(val) {
      if (!val) {
        this.shippingMethod = null;
      }
    }
  }
}
</script>
