import React from "react";
import {Link} from "react-router-dom";
import ReactDOM from 'react-dom';
import DiscountModalWrapper from "../_common/Wrappers/DiscountModalWrapper";
import DiscountModalValidation from "./DiscountModalValidation";

import keyImg from '../../img/discount-modal-key.png';

import api from "../../config/api";
import { Preloader } from "../_common/Preloader";
import formatBackendValidation from "../../utils/formatBackendValidation";
import notification from "../../utils/notification";
import TextInputField from "../_common/TextInputField";
import routing from "../../config/routing";

export default class DiscountModal extends React.Component {

    constructor(props) {
        super(props);
        this.first_name = React.createRef();
        this.last_name = React.createRef();
        this.email = React.createRef();
        this.code = React.createRef();

        this.state = {
            modalData: null,
            isLoading: false,
            error: false,
            status: "none",
            isValid: "none", // none, false, true
            backendErrors: {},
            errors: {},
            input: {
                first_name: "",
                last_name: "",
                email: "",
                code: "",
            }
        }
    }

    componentDidMount = () => {
        this.getModalDataRequest();
    }

    getModalDataRequest = async () => {
        this.setState({isLoading: true});
        try {
            const res = await api.discountModal.getContent();
            this.setState({
                isLoading: false,
                modalData: res.data.data,
            })
        } catch (e) {
            this.setState({error: true, isLoading: false})
            console.log(e)
        }
    }

    handleSubmitConfirmationCode = () => {
        const code = this.code.current.value;
        const input = { code };
            const discountUserData = JSON.parse(localStorage.getItem("discountUserData")) ;
                if(discountUserData){
                    const { email, first_name, last_name } = discountUserData;
                    this.setState(
                        {
                            input
                        },
                        () => this.handleRequest({ email, first_name, last_name, code})
                    );
                }
    }

    handleSubmitDiscount = () => {
        const email = this.email.current.value;
        const first_name = this.first_name.current.value;
        const last_name = this.last_name.current.value;
        const input = { email, first_name, last_name };
        const { isValid, errors } = DiscountModalValidation(input);

        if (isValid) {
            const userData = { email, first_name, last_name }
            this.setState(
                {
                    isValid,
                    errors,
                    input
                },
                () => this.handleRequest(userData)
            );
        } else {
            this.setState({
                isValid,
                errors
            });
        }
    }

    handleRequest = payload => {
        const discountUserData = JSON.parse(localStorage.getItem("discountUserData")) ;

        this.setState({
            status: "request"
        });
        api.discountModal
            .registerUser(payload)
            .then(res => {
                if (res.status === 200) {
                    if(discountUserData){
                        localStorage.removeItem('discountUserData');
                    } else {
                        localStorage.setItem('discountUserData', JSON.stringify(payload));
                    }

                    this.setState({
                        status: "success",
                        isValid: "none",
                    });
                    notification("success", res.data.message);
                    if(payload.code){
                        this.props.handleModal();
                    }
                }
            })
            .catch(e => {
                if (e.response.status === 400) {
                    this.setState({
                        status: "failure",
                        backendErrors: formatBackendValidation(e.response.data.message),
                        isValid: "none",
                    });
                } else if(e.response.status === 422) {
                    this.setState({
                        status: "failure",
                        errors: e.response.data.errors,
                        isValid: false,
                    });
                    notification("error", e.response.data.errors.code);
                } else {
                    this.setState({
                        status: "failure"
                    });
                    notification("error", e.response.statusText);
                }
            });
    };


    handleKeyPress = e => {
        const discountUserData = JSON.parse(localStorage.getItem("discountUserData")) ;
        if(discountUserData){
            if (e.key === "Enter") {
                e.preventDefault();
                this.handleSubmitConfirmationCode();
            }
        } else  {
            if (e.key === "Enter") {
                e.preventDefault();
                this.handleSubmitDiscount();
            }
        }


        if (e.key === "Escape") {
            this.props.handleModal();
        }
    };

    render() {
        const discountUserData = JSON.parse(localStorage.getItem("discountUserData")) ;
        const { isValid, errors, input, status, modalData, isLoading, error } = this.state
        const { handleModal } = this.props

        const showConfirmationCodeField = status === "success" || discountUserData;


        const template = (
            <DiscountModalWrapper handleModal={handleModal}>
                {isLoading && <Preloader />}
                {modalData && (<div className="discount-modal-content">
                    <div className="modal-content-image">
                        <img src={keyImg} className="discount-modal-img" alt="key"/>
                    </div>
                    <div className="modal-content-info">
                        <div className="modal-content-info__title" dangerouslySetInnerHTML={{__html: modalData.header }} />


                        <div className="modal-content-info__description" dangerouslySetInnerHTML={{__html: modalData.preview }} />

                        <div className="modal-content-info-form">
                            <div onKeyPress={this.handleKeyPress}>
                                {
                                    showConfirmationCodeField ? (
                                        <div className="confirmation-code-box">
                                            <p className="additional-message">We have sent confirmation code on your e-mail</p>
                                            <div className="confirmation-code-field">
                                                <div className="confirmation-code-field-item">
                                                    <TextInputField
                                                        type="text"
                                                        name="code"
                                                        placeholder="code"
                                                        forwardRef={this.code}
                                                        defaultValue={input.code}
                                                        error={errors.code}
                                                        isValid={isValid}
                                                        isDiscountModalInput={true}
                                                        style={{
                                                            border: '1px solid #000000',
                                                            background: '#efefef',
                                                        }}
                                                    />
                                                </div>

                                                <div className="btn-box">
                                                    <button type="button" className="discount-submit-btn" onClick={this.handleSubmitConfirmationCode}>
                                                        submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    ) : (<>
                                        <div className="text-field">
                                            <div className="text-field-item">
                                                <TextInputField
                                                    type="text"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    forwardRef={this.first_name}
                                                    defaultValue={input.first_name}
                                                    error={errors.first_name}
                                                    isValid={isValid}
                                                    isDiscountModalInput={true}
                                                    style={{
                                                        border: '1px solid #000000',
                                                        background: '#efefef',
                                                    }}
                                                />
                                            </div>
                                            <div className="text-field-item">
                                                <TextInputField
                                                    type="text"
                                                    name="last_name"
                                                    placeholder="Last name"
                                                    forwardRef={this.last_name}
                                                    defaultValue={input.last_name}
                                                    error={errors.last_name}
                                                    isValid={isValid}
                                                    isDiscountModalInput={true}
                                                    style={{
                                                        border: '1px solid #000000',
                                                        background: '#efefef',
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        <div className="email-field">
                                            <div className="email-field-item">
                                                <TextInputField
                                                    type="text"
                                                    name="email"
                                                    placeholder="Your email"
                                                    forwardRef={this.email}
                                                    defaultValue={input.email}
                                                    error={errors.email}
                                                    isValid={isValid}
                                                    isDiscountModalInput={true}
                                                    style={{
                                                        border: '1px solid #000000',
                                                        background: '#efefef',
                                                    }}
                                                />
                                            </div>

                                            <div className="btn-box">
                                                <button type="button" className="discount-submit-btn" onClick={this.handleSubmitDiscount}>
                                                    submit
                                                </button>
                                            </div>
                                        </div>
                                    </>)
                                }

                            </div>

                        </div>
                        <div className="modal-content-info__secondary-text">
                            <span>By signing up you agree to our Privacy policy. </span>
                            <Link to={routing().privacyPolicy} onClick={handleModal}>
                                View Privacy Policy.
                            </Link>
                        </div>
                    </div>
                </div>)}
                {error && (<div className="discount-modal-content">
                    <div className="modal-content-image">
                        <img src={keyImg} className="discount-modal-img" alt="key"/>
                    </div>
                    <div className="modal-content-info">
                        <div className="modal-content-info__title">
                            <div>
                                Congrats!&nbsp;
                                <br/>You're unlocked your first discount.
                            </div>
                        </div>
                        <div className="modal-content-info__description">
                            <div>Register for exclusive offers and only useful information.
                                <br/>
                                As a token&nbsp; of our gratitude&nbsp;
                                we will reward you with&nbsp;
                                <br/>
                                <strong>$50 discount </strong>
                                on your next purchase!
                            </div>
                        </div>
                        <div className="modal-content-info-form">
                            <div onKeyPress={this.handleKeyPress}>
                                {
                                    showConfirmationCodeField ? (
                                        <div className="confirmation-code-box">
                                            <p className="additional-message">We have sent confirmation code on your e-mail</p>
                                            <div className="confirmation-code-field">
                                                <div className="confirmation-code-field-item">
                                                    <TextInputField
                                                        type="text"
                                                        name="code"
                                                        placeholder="code"
                                                        forwardRef={this.code}
                                                        defaultValue={input.code}
                                                        error={errors.code}
                                                        isValid={isValid}
                                                        isDiscountModalInput={true}
                                                        style={{
                                                            border: '1px solid #000000',
                                                            background: '#efefef',
                                                        }}
                                                    />
                                                </div>

                                                <div className="btn-box">
                                                    <button type="button" className="discount-submit-btn" onClick={this.handleSubmitConfirmationCode}>
                                                        submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    ) : (<>
                                        <div className="text-field">
                                            <div className="text-field-item">
                                                <TextInputField
                                                    type="text"
                                                    name="first_name"
                                                    placeholder="First Name"
                                                    forwardRef={this.first_name}
                                                    defaultValue={input.first_name}
                                                    error={errors.first_name}
                                                    isValid={isValid}
                                                    isDiscountModalInput={true}
                                                    style={{
                                                        border: '1px solid #000000',
                                                        background: '#efefef',
                                                    }}
                                                />
                                            </div>
                                            <div className="text-field-item">
                                                <TextInputField
                                                    type="text"
                                                    name="last_name"
                                                    placeholder="Last name"
                                                    forwardRef={this.last_name}
                                                    defaultValue={input.last_name}
                                                    error={errors.last_name}
                                                    isValid={isValid}
                                                    isDiscountModalInput={true}
                                                    style={{
                                                        border: '1px solid #000000',
                                                        background: '#efefef',
                                                    }}
                                                />
                                            </div>

                                        </div>
                                        <div className="email-field">
                                            <div className="email-field-item">
                                                <TextInputField
                                                    type="text"
                                                    name="email"
                                                    placeholder="Your email"
                                                    forwardRef={this.email}
                                                    defaultValue={input.email}
                                                    error={errors.email}
                                                    isValid={isValid}
                                                    isDiscountModalInput={true}
                                                    style={{
                                                        border: '1px solid #000000',
                                                        background: '#efefef',
                                                    }}
                                                />
                                            </div>

                                            <div className="btn-box">
                                                <button type="button" className="discount-submit-btn" onClick={this.handleSubmitDiscount}>
                                                    submit
                                                </button>
                                            </div>
                                        </div>
                                    </>)
                                }

                            </div>

                        </div>
                        <div className="modal-content-info__secondary-text">
                            <span>By signing up you agree to our Privacy policy. </span>
                            <Link to={routing().privacyPolicy} onClick={handleModal}>
                                View Privacy Policy.
                            </Link>
                        </div>
                    </div>
                </div>)}

            </DiscountModalWrapper>
        )
        return ReactDOM.createPortal(template, document.getElementById("root"));
    }
}