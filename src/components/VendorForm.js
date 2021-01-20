import React, {useState} from 'react';

import Header from './component/Header';
import Input from './component/Input';
import "../static/css/vendor-form.css";
import Footer from './component/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorForm = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const submit = () => {
        if(name.length === 0){
            return toast.error('BUSINESS Name',{
                position : toast.POSITION.TOP_RIGHT
            });
        };
        if(email.length === 0){
            return toast.error('Email is please required',{
                position : toast.POSITION.TOP_RIGHT
            });
        };
        const data = JSON.stringify({
            email,
            business_name:name,
            link,
            location,
            description
        })
        fetch('https://jhene-node.herokuapp.com/api/vendors/request',{
            method : 'POST',
            headers :{
                'content-type' : 'application/json'
            },
            body:data
        }).then(data => data.json())
        .then(data => {
            console.log(data)
            if(data.success){
                toast.success('Thank you for asking to be a part of us, we would get back to you very soon',{
                    position : toast.POSITION.TOP_RIGHT
                });
            }else{
                throw new Error(data.msg);
            }
        }).catch(e => {
            toast.error(e.message,{
                position : toast.POSITION.TOP_RIGHT
            })
        });
    };

    return (
        <div>
            <Header />
            <div className="ven-wrapper">
                <h3 className="req-ven">Request Vendor Access</h3>
                <div className="info">
                    <p>
                        To get your business featured on this platform, you have to make a request so we can reach out to you as soon as possible and verify before we add you.
                    </p>
                </div>
                <div className="apply-form">
                    <div className="fill-form">
                        <Input name="Business Name" placeholder="Type your business name" type="text" onChange={name => setName(name)}/>
                        <Input name="Email" placeholder="Type your email" type="email" onChange={email => setEmail(email)}/>
                        <Input name="Location" placeholder="State, Country" type="text" onChange={location => setLocation(location)}/>
                        <Input name="Link to website" placeholder="Type a link" type="url" onChange={link => setLink(link)}/>
                        <Input name="Short description of what you do or sell" placeholder="I Sell Fashion Items" type="text" onChange={desc => setDescription(desc)}/>
                        <div className="submit-access">
                            <button onClick={submit}>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="form-nothing">

                    </div>
                </div>
                <Footer />
            </div>
            <ToastContainer />
        </div>
    )
};

export default VendorForm;
