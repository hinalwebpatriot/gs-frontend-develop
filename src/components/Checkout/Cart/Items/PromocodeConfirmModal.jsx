import React from "react";
import ModalWrapper from "../../../_common/Wrappers/ModalWrapper";
import {Preloader, PreloaderImg} from "../../../_common/Preloader";
import ReactDOM from 'react-dom';
import notification from "../../../../utils/notification";
import api from "../../../../config/api";

export default class PromocodeConfirmModal extends React.Component {
    constructor(props) {
        super(props);

        // ifi1 - inputFirst
        this.ifir1 = React.createRef();
        this.isec2 = React.createRef();
        this.ithi3 = React.createRef();
        this.ifou4 = React.createRef();
        this.ifiv5 = React.createRef();
        this.isix6 = React.createRef();

        this.state = {
            errors: {},
            status: "none",
            isValid: "none", //none, false, true
            inputs: [{name: 'ifir1', value: "", ref: this.ifir1},
                {name: 'isec2', value: "", ref: this.isec2},
                {name: 'ithi3', value: "", ref: this.ithi3},
                {name: 'ifou4', value: "", ref: this.ifou4},
                {name: 'ifiv5', value: "", ref: this.ifiv5},
                {name: 'isix6', value: "", ref: this.isix6}]
        };
    }

    componentDidMount() {
        this.ifir1.current.focus();
    }

    componentWillUnmount() {
        this.setState({
            errors: {},
            status: "none",
            inputs: [{name: 'ifir1', value: "", ref: this.ifir1},
                {name: 'isec2', value: "", ref: this.isec2},
                {name: 'ithi3', value: "", ref: this.ithi3},
                {name: 'ifou4', value: "", ref: this.ifou4},
                {name: 'ifiv5', value: "", ref: this.ifiv5},
                {name: 'isix6', value: "", ref: this.isix6}]
        });
    }

    handleConfirm = () => {
        const { promoCode, handleModal, isConfirmed } = this.props;
        const { inputs } = this.state;
        let confirmCode = "";
        inputs.forEach((el) => confirmCode += el.value);

        this.setState({status: "request"});
        const formData = new FormData();
        formData.append("code", promoCode);
        formData.append("confirm_code", confirmCode);

        api.cart.checkPromocode(formData)
            .then((res) => {
                notification('success', res.data.data.message)
                this.setState({
                    status: "success",
                }, () => {
                    isConfirmed(true);
                    handleModal();
                })
            })
            .catch((err) => {
                const { errors } = err.response.data;
                this.setState({
                    status: "failure",
                    errors
                })
            })

    };

    handleChangeInputs = (e) => {
        const { name: elName, value: elValue } = e.currentTarget;

        if(elValue.length === 2) return;

        this.setState(({inputs}) => {
            const cloneInputs = inputs.map(el => {
                if(el.name === elName){
                  return {...el, value: elValue}
                }
                return el;
            });
            return {
                inputs: cloneInputs
            }
        }, () => {
                const { inputs } = this.state;
                const cloneInputs = inputs.map(el => ({...el}));
                const index = cloneInputs.findIndex(({name}) => name === elName);
                if(elValue.length === 1){
                 if(cloneInputs[cloneInputs.length - 1].value !== "") return;
                    cloneInputs[(index + 1) % cloneInputs.length].ref.current.focus();
                    return;
                }
                if(elValue.length === 0 && elName !== cloneInputs[0].name){
                    cloneInputs[(index + cloneInputs.length - 1) % cloneInputs.length].ref.current.focus();
                }
        });
    };

    handleKeyPress = e => {
        if (e.key === "Enter") {
            e.preventDefault();
            this.handleConfirm();
        }
    };


    render() {
        const {handleModal} = this.props;

        const { errors, inputs, status } = this.state;
        const isDisabled = status === "request";
        const template = (
            <ModalWrapper handleModal={handleModal}>
                <p className="cust-modal__title cust-modal__title--type2">Confirm code</p>
                {status === "request" ? (
                    <Preloader />
                ) : (
                    <div className="cred-form" onKeyPress={this.handleKeyPress}>
                        <div className="promocode-modal-body">
                            <p className="title">
                                Enter the code sent to your email to activate promocode
                            </p>
                            <div className="confirm-code-inputs">
                                {inputs.map(({name, value, ref}) => (
                                        <input
                                            ref={ref}
                                            key={name}
                                            type="text"
                                            name={name}
                                            value={value}
                                            placeholder="-"
                                            onChange={this.handleChangeInputs}
                                            className="confirm-code-input"
                                        />
                                    ))}
                            </div>
                            <div className="confirm-code-inputs__error">
                                {errors && <div className="confirm-code-error-text">{errors.confirm_code}</div>}
                            </div>

                            <div className="cred-btn">
                                <button
                                    disabled={isDisabled}
                                    onClick={this.handleConfirm}
                                    className="theme-btn theme-btn--type2 theme-btn--full-width"
                                >
                                    {isDisabled ? <PreloaderImg height="40px" /> : "Confirm"}
                                </button>
                            </div>
                            {/*<div className="receive-email">*/}
                            {/*    <span className="cred-extra">*/}
                            {/*        Did’nt receive email?*/}
                            {/*    </span>*/}
                            {/*    <div className="receive-email__btn">*/}
                            {/*        <button className="resend-email-btn">Resend email</button>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                )}
            </ModalWrapper>
        );

        return ReactDOM.createPortal(template, document.getElementById("root"));
    }
}
