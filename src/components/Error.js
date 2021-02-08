import React from 'react'
import {withRouter} from 'react-router-dom';

const Error = props => {
    return (
        <div style={{display:'flex',height:'100vh',width:'100%',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
            <h3 style={{color:'purple',fontFamily:'Poppins',fontSize:'80px',fontWeight:'700',marginBottom:'15px',textShadow:'2px 2px 8px #FF0000;'}}>Oops!</h3>
            <h4 style={{fontFamily:'DM SANS',fontSize:'18px',fontWeight:'450',marginBottom:'25px',color:'grey'}}>Page Not Found</h4>
            <button onClick={() => props.history.push('/')} style={{border:'1px solid transparent',borderRadius:'40px',color:'white', backgroundColor:'lightcoral',padding:'25px 60px',cursor:'pointer',fontFamily:'DM SANS',fontSize:'16px',fontWeight:'bold'}}> Go To HomePage </button>
        </div>
    );
};

export default withRouter(Error);