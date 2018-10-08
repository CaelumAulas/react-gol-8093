// import { createStore } from 'redux'

// 1 - Fazemos um subscribe de uma função
    // 1.1 - Essa função tem que executar um getState em um setState
// 2 - chama o dispatch() (executa todos os subscribers)
const createStore = (reducer) => { // Observer
    let state
    const subscribers = []
    function dispatch(acaoDisparada) {
        state = reducer(state, acaoDisparada)
        subscribers.forEach((funcaoAtual) => {
            funcaoAtual()
        })
    }
    function subscribe(funcao) {
        subscribers.push(funcao)
    }
    return {
        getState: () => state, // Auto return
        dispatch,
        subscribe
    }
}

const stateInicialDosTweets = []
function tweetsReducer(stateDaApp = stateInicialDosTweets, acaoDisparada) {
    if(acaoDisparada.type === 'CARREGA_TWEETS') {
        return acaoDisparada.tweets
    }
    return stateInicialDosTweets
}
console.log('store.js',window)
const store = createStore(tweetsReducer)
window.store = store
// Sempre que executar um dispatch() o reducer é executado
// Sempre pegamos o state atual por meio do store.getState()
