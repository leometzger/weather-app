# App de previsão do tempo

![undraw_Weather_re_qsmd](https://user-images.githubusercontent.com/15220162/101334102-2db34b80-3856-11eb-8add-1bc4ed9367f4.png)

## Instruções

Para rodar é necessário seguir os seguintes passsos:

1. Adicionar a chave de acesso a API no arquivo `.env`:

```
VUE_APP_RAPIDAPI_KEY=
VUE_APP_N_DAYS_BACK=4
```

Opcionalmente alterar o valor da variável `VUE_APP_N_DAYS_BACK` para
não ter problema com limites de requisição. Essa variável é utilizada
para configurar o número de dias que será buscado para atrás a temperatura.
Recomendo utilizar no máximo 2 se estiver no free tier.

2. Instalar as dependências:

`npm install`

3. E rodar a aplicação:

```
npm run serve
```

Acessar [http://localhost:8080](http://localhost:8080)

4: Dados do login:

```
username: `weather`
password: `weather`
```

## Informações

Os dados cadastrados (Cidades e Países) ficam salvos IndexedDB
no local storage do navegador

### License

```
MIT
```
