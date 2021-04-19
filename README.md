## O que deverá ser desenvolvido?

É isso aí, mais um bloco finalizado! Agora chegamos ao fim do último bloco do nosso módulo de NoSQL e MongoDB. Você viu vários métodos e operadores para executar operações de agregação de dados no **MongoDB**, e vai colocá-los em prática em mais um projeto.

Para esse projeto, diferentemente dos outros, você vai utilizar vários datasets, de forma que possa praticar em vários cenários os diversos operadores e estágios do `aggregation pipeline`.

Vamos trabalhar com dados do **IMDB**, dados sobre empresas aéreas e também dados que contenham registros de deslocamento de pessoas que utilizam bicicletas. Esperamos que você curta muito o projeto e fixe muito bem o que aprendeu até aqui!

Então vamos lá aplicar seu conhecimento nesses cenários muito legais! 😉

---

# Instruções para restaurar o banco de dados `aggregations`

1. Abra o terminal e conecte-se à sua instância local do **MongoDB**. Se você receber uma mensagem de erro com uma mensagem como ***Connection refused***, tente reiniciar sua instância.

2. Agora que você tem certeza de que a sua instância está no ar e que você está conectado a ela, digite `exit`. Você voltará ao terminal para iniciar a importação dos dados.

3. Na raiz do diretório do projeto, execute o seguinte comando que fará a restauração da base de dados `aggregations`:
    ```sh
    DBNAME=aggregations ./scripts/resetdb.sh assets
    ```

  * A execução desse script criará um banco de dados chamado `aggregations` e importará todas as suas coleções.

⚠️ Como tanto esse script quanto o script de execução local dos testes (mostrado na [seção seguinte](#implementações-técnicas)), **restauram a base de dados `aggregations`**, se atente a salvar seu progresso nos arquivos de desafio! ⚠️

---

## Implementações técnicas

Para executar localmente os testes, é preciso escrever o seguinte no seu terminal, estando na raiz do diretório do projeto:
```sh
./scripts/evaluate.sh
```

Esse script passará por **todos os desafios** e imprimirá um relatório indicando se passou ou não para cada desafio.

⚠️ Como na avaliação o banco de dados `aggregations` é restaurado de um teste para outro, **se atente a fazer uso do banco restaurado na hora de fazer um desafio**. ⚠️

---

# Requisitos do projeto

Monte queries para encontrar as informações dos desafios a seguir.

##### Desafio 1

Ajude a Trybe a escolher um filme para a próxima noite! Baseado em uma pesquisa, decidimos que os filmes em potencial devem atender aos seguintes critérios:

* `imdb.rating` deve ser ao menos `7`;
* `genres` não deve conter `Crime` ou `Horror`;
* `rated` deve ser igual a `PG` ou `G`;
* `languages` contém `English` e `Spanish`.

Utilizando a coleção `movies`, faça um _pipeline_ que retorne todos esses filmes.

Sua query deve retornar `41` documentos.

##### Desafio 2

A escolha do filme da noite foi um sucesso, mas infelizmente ficamos com nossa banda de internet quase esgotada, e ainda precisamos de uma nova recomendação de filme. Para diminuir o volume de dados trafegados, utilizando o mesmo _pipeline_ anterior, retorne apenas os campos `title`, `rated`, `imdb.rating`, `imdb.votes` e `year`, modificando seus nomes para `titulo`, `avaliado`, `notaIMDB`, `votosIMDB` e `ano`, respectivamente.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "titulo" : "A Streetcar Named Desire", "avaliado" : "PG", "notaIMDB" : 8.1, "votosIMDB" : 72364, "ano" : 1951 }
// Demais documentos
```

##### Desafio 3

Agora que você tem os campos essenciais, retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e o título por ordem alfabética (nesta ordem de desempate).

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "titulo" : "McFarland, USA", "avaliado" : "PG", "notaIMDB" : 7.5, "votosIMDB" : 14091, "ano" : 2015 }
// Demais documentos
```

##### Desafio 4

Nosso dataset de filmes tem muitos documentos diferentes, alguns com títulos "mais complexos" do que outros. Se quisermos analisar nossa coleção para encontrar títulos de filmes que têm uma só palavra no título, poderíamos buscar todos os filmes do dataset e processar isso na aplicação, mas o `Aggregation Framework` nos permite fazer isso diretamente no lado do banco de dados.

Crie um _pipeline_ que adicione um campo `title_split` contendo a lista de palavras presentes em `title` e retorne apenas o novo campo `title_split` dos filmes com o título composto apenas de uma palavra, ordernando-os por `title` em ordem alfabética. Por exemplo, `"Cinderela"` e `"3-25"` devem entrar nessa contagem, mas `"Cast Away"` não.

Dica: utilize os operadores `$split`, `$size` e `$sort` para te auxiliar.
[Documentação do $split](https://docs.mongodb.com/manual/reference/operator/aggregation/split/)

Sua query deve retornar `8068` documentos.

##### Desafio 5

Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais são seus atores ou atrizes preferidos. Aqui está o resultado:

* Sandra Bullock
* Tom Hanks
* Julia Roberts
* Kevin Spacey
* George Clooney

Para filmes lançados nos Estados Unidos (campo `countries`), com `tomatoes.viewer.rating` maior ou igual a `3`, crie um novo campo chamado `num_favs`, que represente quantos atores ou atrizes da nossa lista de favoritos aparecem no elenco (campo `cast`) do filme.

Ordene os resultados por `num_favs`, `tomatoes.viewer.rating` e `title`, todos em ordem decrescente.

Por fim, utilizando o mesmo _pipeline_, responda: Qual o **título** do vigésimo quinto filme do resultado dessa agregação?

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores como `$size` e [`$setIntersection`](https://docs.mongodb.com/manual/reference/operator/aggregation/setIntersection/index.html).

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "title" : <nome_do_filme> }
```

##### Desafio 6

Vamos explorar mais operadores aritméticos!

Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o **maior valor**, **menor valor**, **média** e o **desvio padrão** das avaliações (campo `imdb.rating`). Para a média e o desvio padrão arredonde os valores para uma casa decimal utilizando o [`$round`](https://docs.mongodb.com/manual/reference/operator/aggregation/round/index.html).

Dica: todos os filmes na coleção, que já ganharam um Oscar, começam com uma sequência de string parecida com essas abaixo, portanto `$regex` é um operador bem-vindo:

```
Won 10 Oscars
Won 1 Oscar
```

Utilizem o [`$stdDevSamp`](https://docs.mongodb.com/manual/reference/operator/aggregation/stdDevSamp/index.html) para calcular o desvio padrão.

O resultado da sua query deve ter o seguinte formato:

```javascript
{
  "maior_rating" : <maior_rating>,
  "menor_rating" : <menor_rating>,
  "media_rating" : <media_rating>,
  "desvio_padrao" : <desvio_padrao>
}
```

##### Desafio 7

Vamos nos aprofundar um pouco mais em nossa coleção de filmes. Queremos contar quantos filmes cada um dos atores e atrizes do elenco (`cast`) já participou e obter uma média do campo `imdb.rating` para cada um desses atores e atrizes.

Traga o nome do ator ou atriz, número de filmes em que participou e a média do imdb desses filmes arredondada para uma casa decimal usando o operador [`$round`](https://docs.mongodb.com/manual/reference/operator/aggregation/round/index.html). Considere somente os membros do elenco de filmes com o idioma inglês (`English`). Exiba a lista em ordem decrescente de documentos pelo número de filmes e nome do ator ou atriz.

Sua query deve retornar `47055` documentos. Cada documento no resultado deve ter o seguinte formato:

```javascript
{ "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }
```

##### Desafio 8

Trocando de contexto, vamos utilizar nosso outro dataset que contém dados de empresas aéreas, suas rotas, seus voos e parcerias.

Liste todas as parcerias da coleção `air_alliances`, que voam rotas com um Boing 747 ou um Airbus A380 (que estão abreviados para `747` e `380` no campo `airplane` na coleção `air_routes`, respectivamente), e descubra qual delas tem o maior número de rotas com esses aviões.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "_id" : <nome_da_alianca>, "totalRotas" : <total_de_rotas> }
```

##### Desafio 9

A partir da coleção `trips`, determine o menor e o maior ano de nascimento. Guarde essa informação, você precisará dela mais tarde.

Não considere documentos com valores vazios (`""`) ou em que o campo não existe!

Para este desafio utilize o operador [`$toInt`](https://docs.mongodb.com/manual/reference/operator/aggregation/toInt/index.html) para converter de string para valor inteiro.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }
```

##### Desafio 10

Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais e a média de viagens ordenada de forma crescente. Para arredondar a média use o [`$round`](https://docs.mongodb.com/manual/reference/operator/aggregation/round/index.html).

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
```

##### Desafio 11

Determine qual o dia da semana com maior número de viagens iniciadas.

Dica: Utilize o operador [`$dayOfWeek`](https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/index.html) para extrair o dia da semana como um número de uma data.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }
```

##### Desafio 12

Agora que você já sabe o dia com mais viagens, determine qual estação tem o maior número de viagens nesse dia da semana. Mas, para isso, adicione o que for necessário ao _pipeline_ anterior. Exiba apenas o nome da estação e o total de viagens.

Dica: Utilize o operador [`$dayOfWeek`](https://docs.mongodb.com/manual/reference/operator/aggregation/dayOfWeek/index.html) para extrair o dia da semana como um número de uma data.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }
```

##### Desafio 13

Determine a duração média das viagens iniciadas no dia `10/03/2016`, em minutos. Arredonde o resultado para cima.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
```

##### Desafio 14

Baseado na duração média das viagens, determine quais são as `5` bicicletas que foram mais utilizadas. Exiba o resultado em minutos arredondados para cima e em ordem decrescente.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
```

---
