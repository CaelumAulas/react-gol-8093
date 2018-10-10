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



## 03 - Pegar o restante do projeto
(Capitulo 07)
1 - Renomear a pasta ./src para ./_oldsrc
2 - Arrastar a pasta src de:
    - ./arquivos-js46-master/curso/02-srcDoProjetoAtualizada/src
    - Para: ./twitelum/

## 04 - Como o React funciona?
- Otimizando a pixel pipeline a cada setState:
    - https://developers.google.com/web/fundamentals/performance/rendering/images/intro/frame-full.jpg

- "React ajuda o browser a fazer as atualizações do DOM de forma mais performática"

## 05 - Validando antes de criar um tweet
# Quais são as condições

## Usuário
- Clica na caixa de texto
- Digita o conteúdo do Tweet
    - Enquanto o usuário digitar a validação vai ocorrer


## Dev
- Monitorar o valor do textarea...
    - Devemos adicionar um evento no elemento html
- Ter mais de um caracter;
- Quantidade máxima de 140;

- Salvar o Tweet;


## 06 - Fazendo listas aparecerem na tela com React

- Sempre usa o map!

function forEach(funcao) {
    const array = this
    for(item of array) {
        funcao(item)
    }
}

function map(funcao) {
    const array = this
    const novoArray = []
    for(item of array) {
        const retorno = funcao(item)
        novoArray.push(retorno)
    }
    return novoArray
}



## Componentes comuns:
### Fazer na mão:
- https://www.felipefialho.com/css-components/#component-tooltip
### Não fazer na mão:
- https://codepen.io/davidchin/full/GpNvqw

## Coisas do Redux:
- Flux: https://facebook.github.io/flux/docs/in-depth-overview.html#content
    - Curiar essa lib: https://www.npmjs.com/package/pubsub-js
    - Mais exemplos de como trabalhar com Redux e o que acontefce por debaixo dos panos: https://docs.google.com/presentation/d/1KEL1RqzsHcZ6MuJ-cGf1fOs_7GxSvEWTe32s_ehHVrQ/edit?usp=sharing

- Função que retorna funcao
```js
function adicionaTweet(novoTweet) {
	return function() {
		console.log('Valor do novo tweet:', novoTweet)
	}
}

adicionaTweet('valor')()
```