#Implementação.

### 1. Realizar a autenticação
A autenticação foi feita com a biblioteca [hello.js](https://adodson.com/hello.js/).
Após termos o hello.js no head do html, declaramos uma variavel que contêm o google client id ([Para saber como obter o google client id](https://developers.google.com/identity/sign-in/web/devconsole-project)). Inicializamos a função com o hello.init, passamos como primeiro parâmetro o google: GOOGLE_CLIENT_ID, como segundo parâmetro passamos a url de redirecionamento após a autenticação o escopo, no caso quais apis queremos pedir permissão de uso.
```
var GOOGLE_CLIENT_ID = 'your google client ID';
hello.init({google: GOOGLE_CLIENT_ID},
  {
    redirect_uri:'index.html',
    scope: 'https://www.googleapis.com/auth/webmasters'
  }
);
```
### 2. Realizar Login para autenticação do Google e pegar o token para o consumo da api
Esta função está atrelada em um botão no HTML para realizar o Login. Esta função recebe um nome qualquer, no caso googleLogin e dentro dela chamamos a ação para a realização do login no google e armazenamos o token de acesso em uma variavel chamada token.
```
function googleLogin(){
  hello( 'google' ).login( function() {
    token = hello( 'google' ).getAuthResponse().access_token;
  });
};
```
### 3. Realizar o Logout no Google
Da mesma forma criamos a função atrelada a um botão no HTML para realizar o Logout. A função recebem um nome qualquer, que no caso googleLogout e junto utilizamos algumas funções de callback para alertar o usuário do sucesso ou erro da função 
```
function googleLogout(){
  hello('google').logout().then(function() {
    Materialize.toast('Desconectado', 3000, 'rounded')
  }, function(e) {
    Materialize.toast('Signed out error: ' + e.error.message, 3000, 'error')
  });
}
```
### 4. Consumindo a api Google Search Console
Criei uma função simples para retorno de todos os sites do Search Console apenas para caso de estudos para mais services da api pode consultar [AQUI](https://developers.google.com/apis-explorer/?hl=pt_BR#p/webmasters/v3/) para testar. Da mesma forma utilizamos uma função qualquer em um botão HTML no qual criamos um array para armazenar os sites e um variavel count. Optei por criar o get com jQuery pela facilidade passando o token de acesso junto, o retorno da requisição é um aquivo json. Logo após inseri em uma ul com o id request.
```
function retornaListaDeSites(){
  var sites = [];
  var count = -1;
  $.get("https://www.googleapis.com/webmasters/v3/sites?access_token=" + hello.getAuthResponse('google').access_token, function(data){
      for(var i = 0; i < data.siteEntry.length; i++){
        count++;
        sites.push(data.siteEntry[i].siteUrl);
      document.getElementById('request').innerHTML +=
        "<li>" +
          "<div class='collapsible-header'>" +
          sites[count] +
          "</div><div class='collapsible-body'><p>Lorem</p></div></li>";
    }
  });
};
```
