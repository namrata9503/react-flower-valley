import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {

        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },

            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your ZIPCODE'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched:false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },

            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'FASTEST' },
                        { value: 'cheapest', displayValue: 'CHEAPEST' }
                    ]
                },
                value: 'fastest',
                validation:{},
                valid: true

            },
        },
        formIsValid : false,
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();


        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            flowers: this.props.flowers,
            price: this.props.price,
            orderData: formData

        }
        axios.post('/orders.json', order)
            .then(resp => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }
    checkValidity(value, rules) {
      let  isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        return isValid;

    }
    inputChangeHandler = (e, inputIdentifier) => {
        const updateForm = {
            ...this.state.orderForm
        }
        const updateFormElement = {
            ...updateForm[inputIdentifier]
        }
        updateFormElement.value = e.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updateFormElement.touched = true;
        updateForm[inputIdentifier] = updateFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updateForm){
            formIsValid= updateForm[inputIdentifier].valid && formIsValid
        }
        this.setState({ orderForm: updateForm, formIsValid:formIsValid });
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangeHandler(event, formElement.id)}
                    />
                ))}

                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4 className={classes.Heading}>Enter Your Contact Data..!!!</h4>
                {form}
            </div>
        );
    }

}

export default ContactData;