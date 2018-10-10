// Nesse arquivo, ficam os carinhas que criam ações vulgo Actions Creators

// Thunk Action 
export function carregaTweets(dispatch) {
    fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
    .then((dadosDoServidor) => {
        return dadosDoServidor.json()
    })
    .then((tweetsVindosDoServidor) => {
        dispatch({ type:'CARREGA_TWEETS', tweets: tweetsVindosDoServidor })
        // this.setState({
        //     tweets: tweetsVindosDoServidor
        // })
    })
}

export function adicionaTweet(novoTweet) {
    return function(dispatch) {
        if(novoTweet.length > 0 || novoTweet.length <= 140) {   
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ conteudo: novoTweet })
            })
            .then((respostaDoServer) => {
                return respostaDoServer.json()
            })
            .then((tweetVindoDoServidor) => {
                dispatch({ type: 'ADD_TWEET', tweet: tweetVindoDoServidor })
            })
        }
    }
}

export function removeTweet(tweetId) {
    return function(dispatch) {
        const idDoTweetQueVaiSumir = tweetId
        
        fetch(`https://twitelum-api.herokuapp.com/tweets/${idDoTweetQueVaiSumir}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
            method: 'DELETE'
        })
        .then((reponseDoServer) => { return reponseDoServer.json() })
        .then((reponseDoServer) => {
            console.log('Tweet removido com sucessinhos!')
            dispatch(
                { type: 'REMOVE_TWEET', tweetId: idDoTweetQueVaiSumir }
            )
        })
    }
}


export function abreModal(tweetQueVaiNoModal) {
    return function(dispatch) {
        console.log('Abre modal')
        dispatch(
            { type: 'OPEN_MODAL',
            tweetQueVaiNoModal: tweetQueVaiNoModal
        })
    }
}

export function fechaModal(dispatch) {
    dispatch({
        type: 'CLOSE_MODAL'
    })
}