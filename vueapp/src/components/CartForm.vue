<template>
  <div class='cart-form'>
    <h3>General Information</h3>
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
    <br><br>
    <div
      v-if="showShippingMethods">
      <h3>Shipping Method</h3>
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
      <br><br>
    </div>
    <div
      v-if="showAddressFields">
      <h3>Shipping Address</h3>
      <TextInput
        key="address-line-1"
        label="Address"
        v-bind:val.sync="addressLine1"
        v-bind:error="errorAddressLine1"
        v-bind:forceShowError="hasSubmitted" />
      <TextInput
        key="city"
        label="City"
        v-bind:val.sync="city"
        v-bind:error="errorCity"
        v-bind:forceShowError="hasSubmitted" />
      <label
        for="input-province"
        class="select-label">
        Province
      </label>
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
        class='select-error-container'>
        <div class="error select-error">
          You must select a province.
        </div>
      </div>
      <TextInput
        key="postal-code"
        label="Postal Code"
        v-bind:val.sync="postalCode"
        v-bind:error="errorPostalCode"
        v-bind:forceShowError="hasSubmitted" />
      <br><br>
    </div>
    <div
      v-else-if="isMailSelected">
      If you'd like to order more than four items, you can select a "Pick up" method, or contact us at <a href='mailto:support@citizenofzion.com'>support@citizenofzion.com</a> if you would like a bulk order shipped to you.
      <br><br><br>
    </div>
    <div
      v-else-if="shippingMethod">
      We will email you details about how to pick up your order in December once it's ready.
      <br><br><br>
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
        }, {
          isValid: this.usesLegalLettersOrNumbers,
          message: 'Can only use letters, numbers, commas, colons, periods, #, or spaces.'
        }
      ],
      validationsCity: [
        {
          isValid: this.required,
          message: 'You must enter a city.'
        }, {
          isValid: this.lessThan(32),
          message: 'City is too long.'
        }, {
          isValid: this.usesLegalLettersOrNumbers,
          message: 'Can only use letters, numbers, commas, colons, periods, #, or spaces.'
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
        }, {
          isValid: this.usesLegalLetters,
          message: 'Can only use letters, commas, periods, or spaces.'
        }
      ],
      validationsLastName: [
        {
          isValid: this.required,
          message: 'You must enter a last name.'
        }, {
          isValid: this.lessThan(32),
          message: 'Last name is too long.'
        }, {
          isValid: this.usesLegalLetters,
          message: 'Can only use letters, commas, periods, or spaces.'
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
        data.city = this.city;
        data.province = this.province;
        data.postal_code = this.postalCode;
      }
      if (this.showShippingMethods) {
        data.pickup_location = this.shippingMethod;
      }
      return data;
    },
    hasErrors: function() {
      let hasAddressErrors = false;
      if (this.showAddressFields) {
        hasAddressErrors = this.errorAddressLine1 ||
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
        this.$emit('cancel-submit', 'If you want to order in bulk, you must select a pickup location, or contact us at support@citizenofzion.com.');
      } else if (this.hasErrors) {
        this.$emit('cancel-submit');
      } else {
        this.$emit('set-cart-form-data', this.formData);
      }
    },
    usesLegalLetters: function(val) {
      return !val || val.match(/^([a-zA-Z]+[\., ]*)+$/);
    },
    usesLegalLettersOrNumbers: function(val) {
      return !val || val.match(/^(#*[a-zA-Z\d]+[\.,: ]*)+$/);
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

<style>
.cart-form {
  margin: 0 auto;
  max-width: 500px;
  text-align: left;
}

.text-input label,
.select-label {
  display: inline-block;
  text-align: right;
  width: 40%;
}

.text-input,
.text-input .input-container {
  text-align: left;
}

.text-input .input-container,
.text-input .error,
.select-error {
  width: calc(60% - 0.5rem);
}

.error.select-error {
  display: inline-block;
  margin: 0.25rem 0 1rem;
}

.select-error-container {
  text-align: right;
}

.text-input input {
  max-width: 100%;
  width: 100%;
}

.cart-form h3 {
  margin: 0 0 1rem;
  padding: 0;
}

input[type=radio] {
  margin-left: 25%;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
