//utilização hello.js
var GOOGLE_CLIENT_ID = '611275993102-idvh1njskl8pa1tkcl5cfpdpjph66uso.apps.googleusercontent.com';
hello.init({google: GOOGLE_CLIENT_ID},
  {
    redirect_uri:'index.html',
    scope: 'https://www.googleapis.com/auth/webmasters'
  }
);

//função para realizar login no google e pegar o token para utilização da api
function googleLogin(){
  hello( 'google' ).login( function() {
    token = hello( 'google' ).getAuthResponse().access_token;
  });
};
//função para realizar o logout
function googleLogout(){
  hello('google').logout().then(function() {
    Materialize.toast('Desconectado', 3000, 'rounded')
  }, function(e) {
    Materialize.toast('Signed out error: ' + e.error.message, 3000, 'error')
  });
}
//retornar a lista de sites do search console
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
