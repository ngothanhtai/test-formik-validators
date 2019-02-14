import React, { Component } from 'react';
import { getIn, withFormik } from 'formik'
import validator, { required } from 'formik-validators'

const renderInput = ({ name, placeholder, props }) => {
  const error = getIn(props.errors, name);
  const touched = getIn(props.touched, name);

  return (
    <div>
      <input
        type={'text'}
        name={name}
        placeholder={placeholder}
        onChange={props.handleChange}
        onBlur={props.handleBlur}
        value={getIn(props.values, name)}
      />
      <div>error: {error}</div>
      <div>touched: {touched ? 'true' : 'false'}</div>
      <div style={{ marginBottom: 8 }} />
    </div>
  );
};

class App extends Component {
  render() {
    console.log({ errors: this.props.errors, values: this.props.values });
    return (
      <div className="App">
        <form onSubmit={this.props.handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          {renderInput({ name: 'name', props: this.props, placeholder: 'name'})}
          {renderInput({ name: 'address.street', props: this.props, placeholder: 'street'})}
          {renderInput({ name: 'address.city', props: this.props, placeholder: 'city'})}
          {renderInput({ name: 'item.checkbox.text', props: this.props, placeholder: 'checkbox.text'})}
          {renderInput({ name: 'item.checkbox.value', props: this.props, placeholder: 'checkbox.value'})}

          <fieldset>
            <legend>Identities</legend>
            {
              this.props.values.identities.map((identity, index) => {
                const identityId = `identities[${index}].id`;
                const identityName = `identities[${index}].name`;

                return (
                  <div key={identityId}>
                    {renderInput({ name: identityId, props: this.props, placeholder: `identities id ${index}`})}
                    {renderInput({ name: identityName, props: this.props, placeholder: `identities name ${index}`})}
                  </div>
                )
              })
            }
          </fieldset>


          <fieldset>
            <legend>Items</legend>
          {
            this.props.values.items.map((item, index) => {
              const checkboxText = `items[${index}].checkbox.text`;
              const checkboxValue = `items[${index}].checkbox.value`;

              return (
                <div key={checkboxText}>
                  {renderInput({ name: checkboxText, props: this.props, placeholder: `checkbox text ${index}`})}
                  {renderInput({ name: checkboxValue, props: this.props, placeholder: `checkbox value ${index}`})}
                </div>
              )
            })
          }
          </fieldset>

          <fieldset>
            <legend>validItems</legend>
          {
            this.props.values.validItems.map((validItem, index) => {
              const name = `validItems[${index}].name`;
              return (
                <div key={name}>
                  {renderInput({
                    name,
                    props: this.props,
                    placeholder: `valid items name ${index}`
                  })}
                </div>
              )
            })
          }
          </fieldset>

          <button type={'submit'}>
            submit
          </button>
        </form>
      </div>
    );
  }
}
const formikConfig = {
  mapPropsToValues: (props) => {
    return {
      name: '',
      address: {
        street: '',
        city: ''
      },
      item: {
        checkbox: {
          text: '',
          value: ''
        }
      },
      identities: [
        {
          id: '',
          name: ''
        },
        {
          id: '',
          name: ''
        }
      ],
      items: [
        {
          checkbox: {
            text: '',
            value: ''
          }
        }
      ],
      validItems: [
        {
          name: 'Tai'
        },
        {
          name: 'Walter'
        }
      ]
    }
  },
  validate: validator({
    name: [required('please enter name')],
    address: {
      street: [required('please enter street')],
    },
    item: {
      checkbox: {
        text: [required('please enter item.checkbox.text')],
        value: [required('please enter item.checkbox.value')]
      }
    },
    identities: {
      id: [required('please enter identities id')],
      name: [required('please enter identities name')]
    },
    items: {
      checkbox: {
        text: [required('please enter items checkbox.text')],
        value: [required('please enter items checkbox.value')]
      }
    },
    validItems: {
      name: [required('please enter name for validItems')],
    }
  }),
  handleSubmit: (values, formikBag) => {
    console.log('handleSubmit', { values });
  }
}

export default withFormik(formikConfig)(App);
