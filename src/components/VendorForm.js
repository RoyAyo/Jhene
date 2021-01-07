import React from 'react';

import Header from './component/Header';
import Input from './component/Input';
import "../static/css/vendor-form.css";
import Footer from './component/Footer';

const VendorForm = () => {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <h3 className="req-ven">Request Vendor Access</h3>
                <div className="info">
                    <p>
                        To get your business featured on this platform for free, you have to make a request so we can reach out to you as soon as possible and verify before we add you.
                    </p>
                </div>
                <div className="apply-form">
                    <div className="fill-form">
                        <Input name="Business Name" placeholder="Type your business name" type="text"/>
                        <Input name="Email" placeholder="Type your email" type="email"/>
                        <Input name="Link to website or Social media" placeholder="Type a link" type="url"/>
                        <div className="submit-access">
                            <button>
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="form-nothing">

                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
};

export default VendorForm;
