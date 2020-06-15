<p align="center">
  <img  src="./git_assets/ecoleta.gif">
</p>
<h3 align="center"> Ecoleta - Seu marketplace de coleta de resíduos.</h3>
<p>
<p>

## :pushpin: DEMO:
Acesse [aqui](https://nlw-2020-web.herokuapp.com/) para testar a versão web desta aplicação online.

## Sobre:
Aplicação mobile desenvolvida durante a Next Level Week da [RocketSeat](https://rocketseat.com.br/).  
Neste projeto criamos uma aplicação onde é possível realizar cadastros (pelo front-end web) de pontos de coleta de resíduos e buscarmos (pelo mobile/web) esses pontos filtrando por tipo de coleta e localidade.  
  
Veja aqui o [Back-end](https://github.com/muriloportugal/nlw-2020-server) desta aplicação e aqui o desenvolvimento [Front-end](https://github.com/muriloportugal/nlw-2020-web).  


  
## :checkered_flag: Como utilizar:

Pode ser baixado e instalado o [apk](./git_assets/ecoleta-7d484e2b0adc49ca94463727208d425e-signed.apk) diretamente no seu aparelho, ou instalar o app do [expo](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) e por ele escanear o QR code da página [ecoleta](https://expo.io/@mportgal/ecoleta).  
Depois de instalado, informar a UF e cidade que deseja procurar os pontos de coleta será exibido no mapa os pontos que coletam os itens conforme forem selecionados.

## :computer: Dev:
Este aplicativo foi desenvolvido utilizando [expo](https://docs.expo.io/), poder ser instalado com o comando abaixo.  
```bash
npm install --global expo-cli
```

Para utilizar localmente será necessário já ter o [Back-end](https://github.com/muriloportugal/nlw-2020-server) rodando em seu computador.  

Faça o download ou o clone deste repositório para o seu computador. Entre na pasta "mobile" e rode o comando abaixo para que sejam instaladas as dependências:
```bash
npm install
```  
  
Edite o arquivo [api.ts](./src/services/api.ts) apontando para o back-end da sua aplicação.  

Depois de instalar as dependências pode executar o comando abaixo para iniciar o serviço, uma página com o QR code será aberta automaticamente em seu navegador, pode escanea-lo com o aplicativo do expo em seu celular.
```bash
npm start
```
___
## :robot: Tecnologias:
- Expo
- React Native

---
## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
