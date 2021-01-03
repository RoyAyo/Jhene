export const refreshTokenSetup = (res) => {
    var refreshTiming = (res.tokenObj.expires_in || (3600 - 5 * 60)) * 1000;
    
    const refreshToken = async () => {
        const newAuthRes = await res.reloadAuthResponse();
        refreshTiming = (newAuthRes.expires_in || (3600 - 5 * 60)) * 1000;
        
        console.log('newAuth', newAuthRes);
        
        window.localStorage.setItem('token',newAuthRes._id.token);
        
        setTimeout(refreshToken,refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
};