import React from 'react';

import Header from './component/Header';
import Input from './component/Input';

const VendorForm = () => {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <h3>Request Vendor Access</h3>
                <p>To get your business featured on this platform for free, you have to make a request so we can reach out to you as soon as possible and verify before we add you.</p>
                <div className="apply-form">
                    <Input name="Business Name" placeholder="Type your business name" type="text"/>
                    <Input name="Business Name" placeholder="Type your email" type="email"/>
                    <Input name="Business Name" placeholder="Type a link" type="url"/>
                    <button className="submit-access">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
};

export default VendorForm;
