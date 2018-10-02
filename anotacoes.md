## Passos iniciais do curso
- Ter Node na máquina
- não morder o amiguinho
- Criar pasta "curso-react" no Desktop
- Baixar o Zip desse repositório:
> https://github.com/caelum/arquivos-js46
- Descompactar e mover para a pasta
"curso-react"


## O que vocês imaginam que o React resolve?
## Alguma lib que vocês ouviram falar?
- Magia Negra
- Facilita o desenvolvimento
- Componentes
- No Native 1 código para as duas plataformas
- Performance
- Apps multi-plataformas
- "Quando você precisa atualizar diversos lugares"
    - Tipo a página do facebook
        - Faz sentido
    - Quando em uma mensagem no chat do face:
        - Notificação no topo
        - A conversa no bate-papo da lateral
        - A conversa no bate-papo se janela estiver aberta
            - Sem caixinha, sem atualização
```js
function atualizaTudo(){
    fn1()
    fn2()
    if() {

        if() {

            fn3()
        }

    }
}
```
- "Simplicidade"
- Um projeto prático
    - Trabalhar com state

## Pontos principais
- Trabalhar com State
- Trabalhar com Componentes


## 01 - visão geral
- Cabeçalho foi o primeiro passo e a estruturação básica de um componente:
```js
class App extends Component {
  
  render() {
    return (
      <div>
        <Cabecalho usuario="omariosouto" />

      </div>
    );
  }
}
```
- Os frameworks ti obrigam a seguir algumas boas práticas

## 02 - Composição de Componentes usando Children
- Favorece o reuso de componentes que recebem valores


## Dicas pra vida:
- https://www.youtube.com/user/BrazilJS

## Por tras do build do react
- https://webpack.js.org/









