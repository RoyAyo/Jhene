fetch(`https://api-node.jhene.co/api/recommend/getAd`,{
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
                setLoading(false);
                chatWrapRef.current.addEventListener('click',() => {
                    setDisplayModal('none');
                });
                if(data.ads.length > 0 || data.tips.length > 0){
                    //pick a random choice out of four
                    const choice = ['tip','ad','tip','none','ad','none','ad','tip'];
                    var n = Math.floor(Math.random() * 8);
                    if(choice[n] !== 'none'){
                        if(choice[n] === 'ad' && data.ads.length === 0){
                            return
                        }
                        if(choice[n] === 'tip' && data.tips.length === 0){
                            return
                        }
                        dispatch(initialiseMessage());
                        const recommendation = choice[n] === 'ad' ? data.ads[0] : data.tips[0];
                        const ads = choice[n] === 'ad' ? data.ads.slice(1) : data.ads;
                        const tips = choice[n] === 'ad' ? data.tips :  data.tips.slice(1);
                        const payload = {
                            recommendation,
                            ads,
                            tips
                        };
                        dispatch(displayBotRecommendation(payload));
                    }
                }
            }else{
                const data = {message : 'Hola, how can I help you?'}
                dispatch(displayBotMessage(data));
                setLoading(false);
                chatWrapRef.current.addEventListener('click',() => {
                    setDisplayModal('none');
                });
            }
        }).catch(e => {
            const data = {message : 'Hi there, How can I be of help'}
            dispatch(displayBotMessage(data));
            setLoading(false);
            chatWrapRef.current.addEventListener('click',() => {
                setDisplayModal('none');
            });
        });