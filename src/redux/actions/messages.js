export const DISPLAY_BOT_MESSAGE = 'display_bot_message';
export const DISPLAY_BOT_RECOMMENDATION = 'display_bot_recommendation';
export const DISPLAY_BOT_ERROR = 'display_bot_error';
export const INITIALIZE_MESSAGE = 'initialize_message';
export const MY_MESSAGE = 'my_message';
export const SHOW_OPTIONS = 'show_options';
export const CONVERT_OPTIONS = 'convert_options';
export const CLEAR_MESSAGES = 'clear_messages';

export const displayBotMessage = payload => {
    return {
        type : DISPLAY_BOT_MESSAGE,
        payload
    }
};

export const clearMessages = () => {
    return {
        type: CLEAR_MESSAGES
    }
}

export const displayBotRecommendation = payload => {
    return {
        type : DISPLAY_BOT_RECOMMENDATION,
        payload
    }
};

export const displayBotError = payload => {
    return {
        type : DISPLAY_BOT_ERROR,
        payload
    }
}

export const myMessage = message => {
    return {
        type : MY_MESSAGE,
        payload : {
            bot : false,
            message,
            context : '',
        }
    }
}

const showOption = payload => {
    return {
        type : SHOW_OPTIONS,
        payload
    }
}

export const initialiseMessage =() => {
    return {
        type : INITIALIZE_MESSAGE,
        payload : {
            bot : true,
            loading : true,
            context : '',
            message : ''
        }
    }
}

const convertOptions = payload => {
    return {
        type : CONVERT_OPTIONS,
        payload
    }
}

export const clickButton = ({option,requirements,answers,questions,context,answering}) => {
    return (dispatch) => {
        answers[answering] = option;
        var new_requirements = requirements.filter(i => i !== answering);
        dispatch(convertOptions({option,new_requirements,answers,forNumber:true}));
        if(window.sessionStorage.getItem("verification") && window.sessionStorage.getItem("verifying") === "confirmNumber"){
            dispatch(myMessage(option.toLowerCase() === "no" ? "No" : "Yes"));
            dispatch(initialiseMessage());
            if(option.toLowerCase() === "no"){
                window.sessionStorage.setItem("verifying","number");
                return dispatch(displayBotMessage({message:"Please Input your Whatsapp Number P.S: a verification code will be sent to this number via whatsapp"}));
            }else{
                let escrow = JSON.parse(window.sessionStorage.getItem("escrow"));
                let number = window.sessionStorage.getItem("confirmNumber");
                window.sessionStorage.setItem("verifying","amount");
                window.sessionStorage.setItem("escrow",JSON.stringify({...escrow,number}));
                window.sessionStorage.setItem("verifying","amount");
                return dispatch(displayBotMessage({message:"Please enter an amount you want to pay the vendor"})); 
            }
        }
        dispatch(myMessage(option));
        dispatch(initialiseMessage());
        if(requirements.length <= 1){
            const from_context = context;
            const data = {
                from_context,
                message : "",
                answers,
                more_info : true,
                location : ""
            }
            fetch(`https://api.jhene.co/send_message`,{
                method : 'POST',
                headers : {
                    'Content-type' : 'application/json'
                },
                body:JSON.stringify(data)
            })
            .then(data => {
                if(data.ok){
                    return data.json()
                }
                throw new Error(data.msg)
            })
            .then(data => {
                dispatch(displayBotMessage(data));
            }).catch(e => {
                const data = {
                    message : e.message
                }
                dispatch(displayBotMessage(data));
            });
        }else{
            dispatch(showOption({questions,requirements:new_requirements,answers,context}));
        }    
    }
}

export const sendMessage = (message,ads=[],tips=[],location='',message_send=null) => {
    return async (dispatch) => {
        dispatch(myMessage(message));
        dispatch(initialiseMessage());

        var botVerification = window.sessionStorage.getItem("verification");

        switch (message.toLowerCase()) {
            case "escrow":
                window.sessionStorage.setItem("verification","escrow");
                window.sessionStorage.setItem("verifying","vendorcode");
                return dispatch(displayBotMessage({message:'Please Input the code for Vendor',escrow:true}));
            case "next":
                return dispatch(displayBotMessage({message:'Still gathering vendors'}));
            case "yes":
                return dispatch(displayBotMessage({message:'awn, what do you need'}));
            case "yup":
                return dispatch(displayBotMessage({message:'awn, what do you need'}));
            case "yeah":
                return dispatch(displayBotMessage({message:'awn, what do you need'}));
            case "no":
                return dispatch(displayBotMessage({message:'Thank you for using Jhene'}));
            case "nope":
                return dispatch(displayBotMessage({message:'Thank you for using Jhene'}));
            case "nah":
                return dispatch(displayBotMessage({message:'Thank you for using Jhene'}));
            default:
                break;
        }

        if(botVerification){
            var verifying = window.sessionStorage.getItem("verifying"); 
            switch (verifying) {
                case "vendorcode":
                    //send the code to endpoint
                    // const senderEmail = window.localStorage.getItem("email") ?? "0";
                    // const res = await fetch(`url/api/?email=${senderEmail}`);
                    // const resJson = await res.json();
                    // if(!res.ok){
                        //return dispatch(displayBotError({message:resJson.message}))
                    // }
                    // var {
                    //     vendor,
                    //     sender
                    // } = resJson.data

                    let sender = {
                        number: "09093029102"
                    };
                    let vendor = {
                        _id:"trash",
                        businessName: "Roy's Pami Ventures",
                        code:"827UX"
                    }
                    if(message === vendor.code){
                        dispatch(displayBotMessage({message:`This code belongs to ${vendor.businessName}`}));
                        dispatch(initialiseMessage());
                        //check the number
                        window.sessionStorage.setItem("escrow",JSON.stringify({vendorcode:message}));
                        let number = sender.number ?? window.localStorage.getItem("userNumber");
                        if(number){
                            if(!window.localStorage.getItem("userNumber")) window.localStorage.setItem("userNumber",number);
                            window.sessionStorage.setItem("verifying","confirmNumber");
                            window.sessionStorage.setItem("confirmNumber",number);
                            return dispatch(showOption({message:`Confirm if this is your number ${number}`,questions:{"confirmNumber":["Yes","No"]},answers:{"confirmNumber" : [number,"Not"]},context:"escrow",requirements:["confirmNumber"]}));
                        }else{
                            window.sessionStorage.setItem("verifying","number");
                            return dispatch(displayBotMessage({message:"Please Input your Whatsapp Number P.S: a verification code will be sent to this number via whatsapp"}));
                        }
                    }else{
                        //think of widening the response later
                        return dispatch(displayBotMessage({message:"Incorrect Vendor Code provided, Please try again"}));
                    }
                case "number":
                    const validateNo = validateNumber(message);
                    if(!validateNo) return dispatch(displayBotMessage({message:"Invalid Number Format Provided"}));
                    //endpoint /submit/number
                    window.sessionStorage.setItem("verifying","otp");
                    window.sessionStorage.setItem("confirmNumber",message);
                    return dispatch(displayBotMessage({message:"Please enter the otp sent to your number via whatsapp"}));
                case "otp":
                    let number = window.sessionStorage.getItem("confirmNumber");
                    //send number to the endpoint
                    let otp = "190291";
                    if(otp !== message){
                        return dispatch(displayBotMessage({message:"Wrong otp code provided, please try again"}));
                    }
                    switch (botVerification) {
                        case "escrow":
                            window.sessionStorage.setItem("verifying","amount");
                            let escrow = JSON.parse(window.sessionStorage.getItem("escrow"));
                            window.sessionStorage.setItem("escrow",JSON.stringify({...escrow,number}));
                            window.localStorage.setItem("userNumber",number);
                            return dispatch(displayBotMessage({message:"Your Number is Verified, Please enter an amount you want to pay the vendor"}));
                        case "priceRequest":
                            // const message = window.sessionStorage.getItem("currentMessage");
                            //send a request to the endpoint with the number and message
                            window.sessionStorage.removeItem("verifying");
                            window.sessionStorage.removeItem("verification");
                            return dispatch(displayBotMessage({message:"Your Number is now verified, Once vendors reach out to us, we will contact you"}));
                        default:
                            window.sessionStorage.removeItem("verifying")
                            return dispatch(displayBotMessage({message:"Thank You for verifying Your number with us"}));
                    }
                case "amount":
                    if(!Number(message)){
                        return dispatch(displayBotMessage({message: "Please enter a valid amount in digits, don't add commas or currency"}));
                    }
                    //send endpoint containing amount, vendorcode, senderNumber
                    //receive Monify Account balance
                    let mdt = {
                        totalAmount: 1000,
                        fee: 100,
                        bank: "Wema Bank",
                        bankAccount: "0213052815"
                    }
                    window.sessionStorage.removeItem("verifying");
                    window.sessionStorage.removeItem("verification");
                    return dispatch(displayBotMessage({message:`Please pay a total amount of N${Number(message) + mdt.fee} including the fee of N${mdt.fee} into the bank Bank:${mdt.bank} Account: ${mdt.bankAccount}`}));
                default:
                    return dispatch(displayBotMessage({message:"I did not understand"}));
            }
        }

        const isPriceRequest = forPricing(message.toLowerCase());

        if(isPriceRequest){
            //send a request to a node.js endpoint that sends a request to the sendMessage endpoint and distributes to vendors
            dispatch(displayBotMessage({message:"We are reaching out to vendors that sell what you want, we will reach out to you via whatsapp once we get a reply"}));
            let number = window.localStorage.getItem("userNumber");
            if(number){
                //send the request to the endpoint now
                return;
            }else{
                dispatch(initialiseMessage());
                window.sessionStorage.setItem("verification","priceRequest");
                window.sessionStorage.setItem("currentMessage",message);
                window.sessionStorage.setItem("verifying","number");
                return dispatch(displayBotMessage({message:"Please Input your Whatsapp Number P.S: a verification code will be sent to this number via whatsapp"}));
            }
        }

        const send = message_send ? message_send : message;

        const from_context = '';
        const data = {
            message : send,
            from_context,
            answers : {},
            more_info : false,
            location
        }

        console.log(data);
        fetch(`https://api.jhene.co/send_message`,{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body:JSON.stringify(data)
        })
        .then(data => {
            if(data.ok){
                return data.json()
            }
            if(data.status === 500 || data.status === 404){
                throw new Error("server");
            }
            throw new Error(data.msg);
        })
        .then(data => {
            if(data.more_info){
                //edit data to taste
                dispatch(showOption(data));
            }else{
                dispatch(displayBotMessage(data));
                // const email = window.localStorage.getItem('email');
            }
        }).catch(e => {
            console.log(e);
            var data;
            if(e.message === 'server'){
                data = {
                    message : "I am currently down, please try again later"
                }
            }
            else{
                data = {
                    message : "You cannot currently reach me, seem to be a network issue"
                }
            }
            dispatch(displayBotMessage(data));
        });
    }
};

export const userWelcome = (email) => {
    return (dispatch) => {
        dispatch(initialiseMessage());
        var data = email ? JSON.stringify({email}) : JSON.stringify({email : ''});
        
        fetch(`https://api-node.jhene.co/api/fetch/user`,{
            method : "POST",
            body:data,
            headers : {
                'content-type' : 'application/json'
            }
        }).then(data => data.json())
        .then(data => {
            if(data.success){
                const name = email ? data.name.split(' ')[0] : 'there';
                const message = `Hi ${name}, how can I help you today?`;
                const context = '';
                const vendor = false;
                const payload = {
                    message,
                    context,
                    vendor
                };
                dispatch(displayBotMessage(payload));
                
            }else{
                const data = {message : 'Hola, how can I help you?'}
                dispatch(displayBotMessage(data));
            }
        }).catch(e => {
            const data = {message : 'Hi there, How can I be of help'}
            dispatch(displayBotMessage(data));
        });
    }
};

export const getVendorByCode = async (code) => {
    const response = await fetch("https://api-node.jhene.co/api/fetch/vendor/:code");
    if(response.ok){
        const vendor = response.json().vendor;
        let payload = {
            message: `Please confirm if this is the name of the ${vendor.name}`,
            
        }
        displayBotMessage(payload);
    }
}

export const informNumber = (data) => {
    if(data.number){
        window.sessionStorage.setItem("verifying","confirmNumber");
        displayBotMessage({message:'',with_option:true,options:[`Confirm That this is your number ${data.number}`,'Incorrect Number Provided']});
    }else{
        window.sessionStorage.setItem("verifying","number");
        displayBotMessage({message:'Please, we do not have your whatsapp number, can you verify the number'});
    }

};



// const makeRecommendations = (data) => {
//     if(data.ads.length > 0 || data.tips.length > 0){
//         //pick a random choice out of four
//         const choice = ['tip','ad','tip','none','ad','none','ad','tip'];
//         var n = Math.floor(Math.random() * 8);
//         if(choice[n] !== 'none'){
//             if(choice[n] === 'ad' && data.ads.length === 0){
//                 return
//             }
//             if(choice[n] === 'tip' && data.tips.length === 0){
//                 return
//             }
//             // dispatch(initialiseMessage());
//             const recommendation = choice[n] === 'ad' ? data.ads[0] : data.tips[0];
//             const ads = choice[n] === 'ad' ? data.ads.slice(1) : data.ads;
//             const tips = choice[n] === 'ad' ? data.tips :  data.tips.slice(1);
//             const payload = {
//                 recommendation,
//                 ads,
//                 tips
//             };
//             // dispatch(displayBotRecommendation(payload));
//         }
//     }
// }

const validateNumber = (no) => {
    var noWithoutPlus = no.replace("+","");
    return noWithoutPlus.length === 11 || noWithoutPlus.length === 13;
}

const forPricing = (message) => {
    return message.match("price") || message.match("cost") || message.match("how much");
};