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
    const [loading,setLoading] = useState('Submit');

    const submit = () => {
        if(name.length === 0){
            return toast.error('Business name is required please',{
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
            short_desc:description
        });
        setLoading('Loading...');
        fetch('http://localhost:8080/api/vendors/request',{
            method : 'POST',
            headers :{
                'content-type' : 'application/json'
            },
            body:data
        }).then(data => data.json())
        .then(data => {
            if(data.success){
                toast.success('Thank you for asking to be a part of us, we would get back to you very soon',{
                    position : toast.POSITION.TOP_RIGHT
                });
                setEmail('');
                setLocation('');
                setName('');
                setLink('');
                setDescription('');
                setLoading('Submit');
            }else{
                throw new Error(data.msg);
            }
        }).catch(e => {
            toast.error(e.message,{
                position : toast.POSITION.TOP_RIGHT
            });
            setLoading('Submit');
        });
    };

    return (
        <div>
            <Header />
            <div className="ven-wrapper">
                <h3 className="req-ven">Request Vendor Access</h3>
                <div className="info">
                    <p>
                        To get your business featured on this platform, make a request below
                    </p>
                </div>
                <div className="apply-form">
                    <div className="fill-form">
                        <Input name="Business Name" placeholder="Type your business name" type="text" onChange={name => setName(name)}/>
                        <Input name="Email" placeholder="Type your email" type="email" onChange={email => setEmail(email)}/>
                        <Input name="Location" placeholder="State, Country" type="text" onChange={location => setLocation(location)}/>
                        <Input name="Link to website/Social Media" placeholder="Type a link" type="url" onChange={link => setLink(link)}/>
                        <Input name="Short description of what you do or sell" placeholder="I Sell Fashion Items" type="text" onChange={desc => setDescription(desc)}/>
                        <div className="submit-access">
                            <button onClick={submit}>
                                {loading}
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
