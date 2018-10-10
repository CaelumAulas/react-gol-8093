import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const stateInicialDosTweets = { listaDeTweets: [], tweetAtivo: {} }
function tweetsReducer(stateDaApp = stateInicialDosTweets, acaoDisparada) {
    if(acaoDisparada.type === 'CARREGA_TWEETS') {
        return {
            ...stateDaApp,
            listaDeTweets: acaoDisparada.tweets
        }
    }
    if(acaoDisparada.type === 'ADD_TWEET') {
        return {
            ...stateDaApp,
            listaDeTweets: [acaoDisparada.tweet, ...stateDaApp.listaDeTweets]
        }
    }

    if(acaoDisparada.type === 'REMOVE_TWEET') {
        const idDoTweetQueVaiSumir = acaoDisparada.tweetId
        const listaDeTweetsAtualizada = stateDaApp.listaDeTweets.filter((tweetAtual) => {
            return tweetAtual._id !== idDoTweetQueVaiSumir
        })
        return {
            ...stateDaApp,
            listaDeTweets: listaDeTweetsAtualizada
        }
    }

    if(acaoDisparada.type === 'OPEN_MODAL') {
        return {
            ...stateDaApp,
            tweetAtivo: acaoDisparada.tweetQueVaiNoModal
        }
    }

    if(acaoDisparada.type === 'CLOSE_MODAL') {
        return {
            ...stateDaApp,
            tweetAtivo: {}
        }
    }

    return stateDaApp
}

const store = createStore(
    tweetsReducer,
    applyMiddleware(thunk)
)
window.store = store
export default store






















// Sempre que executar um dispatch() o reducer é executado
// Sempre pegamos o state atual por meio do store.getState()


// 1 - Fazemos um subscribe de uma função
    // 1.1 - Essa função tem que executar um getState em um setState
// 2 - chama o dispatch() (executa todos os subscribers)
// const createStore = (reducer) => { // Observer
//     let state
//     const subscribers = []
//     function dispatch(acaoDisparada) {
//         if(typeof acaoDisparada === 'function') {
//             acaoDisparada(dispatch)
//         } else {
//             state = reducer(state, acaoDisparada)
//             subscribers.forEach((funcaoAtual) => {
//                 funcaoAtual()
//             })
//         }
//     }
//     function subscribe(funcao) {
//         subscribers.push(funcao)
//     }
//     return {
//         getState: () => state, // Auto return
//         dispatch,
//         subscribe
//     }
// }