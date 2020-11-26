# Especificação do Trabalho 2
Este trabalho consiste em estudar e fazer uso de frameworks e APIs para o desenvolvimento de uma aplicação Web. Essa aplicação é voltada para realizar algumas funcionalidades voltadas para o usuário-fim (por exemplo, em um e-commerce, o usuário-fim seria o cliente). Os tipos de frameworks utilizados no segundo trabalho são Frameworks Front-end (CSS e JS) e Microframeworks. O uso de APIs também é fundamental nesse trabalho.

## Instruções Gerais

O trabalho consiste em desenvolver uma aplicação Web voltada para realizar funcionalidades para o usuário-fim. Exemplos de funcionalidades podem ser: venda de produtos (e-commerce), realizar empréstimo (biblioteca), etc. Essa aplicação deve ser desenvolvida utilizando APIs de terceiros e três tipos de frameworks: Frameworks Front-end CSS, Frameworks Front-end JS e Microframeworks (Back-end). O aluno poderá escolher quais frameworks pretende trabalhar, mas deverá justificar adequadamente.

A aplicação definida deve contemplar uma Single Page Application (SPA) e deve utilizar um ou mais Microframeworks para o Back-end (para desenvolver as APIs) e para a aplicação Front-end deve utilizar um Framework CSS e um Framework JS (ou biblioteca). Essa aplicação também deverá utilizar APIs de terceiros.

## As funcionalidades a serem desenvolvidas são:

1) Visualização de entidades de negócio: no trabalho 1, foram definidos negócios para manipular uma entidade de negócio. Nesse trabalho, consiste em mostrar através de uma Grid as entidades cadastradas no sistema. Um exemplo poderia ser apresentar produtos, onde cada produto poderia ter relação com várias outras informações: marca, tipo, fornecedor, etc..

2) Pesquisa: consiste em uma barra de pesquisa que permite filtrar as entidades visualizadas (funcionalidade 1). Esse filtro pode ser definido por vários atributos ou relacionamentos da entidade.

3) Funcionalidade de negócio: consiste em uma funcionalidade para auxiliar o usuário na realização do negócio em si. Por exemplo, no caso do e-commerce, a funcionalidade de negócio poderia ser venda de produtos representado por um carrinho de compras. 

4) Auto cadastro de usuários-fim e Login: todos os usuários devem fazer login para realizar as funcionalidades. Qualquer pessoa pode acessar o sistema para realizar o auto cadastro. As informações necessárias para o usuário se cadastrar são pelo menos: usuário e senha. Mas sugere-se também: RG, nome, e-mail, endereço (preferencialmente completo, inclusive com CEP) e telefone. Os usuários cadastrados poderão editar seu perfil.

5) Acesso a APIs de terceiros: o sistema deve acessar alguma(s) API(s) de terceiros para auxiliar a criar novas funcionalidades para o trabalho. O aluno pode utilizar diferentes tipos de APIs (pode escolher), desde que mostre de forma adequada a sua utilização.

## Avaliação

O conceito desse trabalho será baseado de acordo com as funcionalidades da aplicação e com os conceitos dos frameworks empregados no trabalho. Abaixo segue a relação dos requisitos a serem realizados no trabalho:

Conceito C:

 - [ ] Aplicação inicial, realizando a funcionalidades 1;
 - [ ] Acesso a uma API de terceiro;
 - [ ] Persistência de dados;
 - [ ] Utilização razoável de todos os Frameworks.

Conceito B:

 - [ ] Realização das funcionalidades para o conceito C;
 - [ ] Acesso a uma API de terceiro utilizando de forma correta e adequada ao contexto do trabalho;
 - [ ] Aplicação praticamente funcional sem relacionar o usuário - realizando as funcionalidades 1 a 3;
 - [x] Utilização correta dos Frameworks e seus recursos;
 - [x] Suporte responsivo através do Framework CSS.

Conceito A:

 - [ ] Realização das funcionalidades para o conceito B;
 - [ ] Acesso a mais de uma API de terceiro utilizando de forma correta e adequada ao contexto do trabalho;
 - [ ] Aplicação totalmente funcional, com as funcionalidades 1 a 4 realizadas completamente;
 - [ ] Utilização de JWT e segurança tanto no front-ent quanto no back-end;
 - [ ] A funcionalidade 1 deve ter suporte à imagem dos produtos e ser disposta em Grids Responsivas (ou trabalhar com Mapas);
 - [ ] Utilização de um sistema de controle de versão (ex: git) e de um ambiente de colaboração e gerenciamento de código baseado nesse controle de versão (ex: github, bitbucket).

´´´ bash
Exercício
Especificação do Trabalho 1
Este trabalho consiste em estudar e fazer uso de frameworks para desenvolvimento de uma aplicação Web. Essa aplicação é voltada para realizar um módulo administrativo de um sistema com o tema definido pelo aluno. O framework que deve ser utilizados neste trabalho para esta aplicação é um Frameworks Back-end Fullstack.

Instruções Gerais

Essa aplicação deve ser desenvolvida utilizando um Framework Back-end Fullstack. O aluno poderá escolher qual framework pretende trabalhar, mas deverá justificar adequadamente.

O trabalho consiste em desenvolver uma aplicação com funcionalidades administrativas para um sistema escolhido pelo aluno. Por exemplo, suponhamos que o aluno tenha escolhido um sistema de vendas comerciais como escopo, esse módulo do sistema será responsável por cadastros (produtos, categorias, marca, fornecedores), compra de produtos, controle de estoque e cadastro de usuários administrativos (outros funcionários), além do próprio login.

Seguindo essa ideia, sugere-se que sejam definidas as seguintes funcionalidades com persistência de dados:

Cadastros de Entidades: consiste em um CRUD (Create-Retrieve-Update-Delete) de uma determinada entidade (no exemplo acima seria produtos, categorias, etc). Uma dica importante é relacionar identificadores (“id”) para essas entidades. Pelo menos dois tipos de cadastros são obrigatórios.
Funcionalidades de negócio: consiste em funcionalidades que aplicam operações ou regras de negócio específicas no sistema. Por exemplo, a funcionalidade “controle de estoque” aplicam operações e regras de negócio para fazer esse controle. Pelo menos um tipo de regra de negócio é obrigatório.
Autenticação e controle de usuário: todos os usuários administrativos devem realizar um login para acessar o sistema. Inicialmente, o sistema deve conter apenas um usuário admin. Esse usuário poderá cadastrar novos usuários, informando o CPF, nome, cargo na empresa, e-mail e username. A senha pode estar inicialmente no cadastro do novo usuário, mas o ideal é enviar por e-mail para o novo usuário com um link para este usuário cadastrar a senha. Os usuários cadastrados poderão editar seu perfil.
Avaliação

O conceito desse trabalho será baseado de acordo com as funcionalidades da aplicação e com os conceitos dos frameworks empregados no trabalho. Abaixo segue a relação dos requisitos a serem realizados no trabalho:

Conceito C:

Aplicação inicial, realizando pelo menos dois cadastros;
Realização apenas do login – contemplar apenas o usuário admin.
Persistência de dados;
Utilização adequada do Framework Back-end.
Conceito B:

Realização das funcionalidades para o conceito C;
Aplicação praticamente funcional - realizando os cadastros e a funcionalidade de negócio;
Cadastros simples de usuários, edição de perfil e realização do login;
Interface gráfica adequada;
Utilização de um sistema de controle de versão (ex: git) e de um ambiente de colaboração e gerenciamento de código baseado nesse controle de versão (ex: github, bitbucket).
 Conceito A:

Realização das funcionalidades para o conceito B;
Aplicação totalmente funcional, com o controle de usuário (e login) realizado completamente, incluindo enviar e-mail para cadastrar/recadastrar senha;
Utilização de alguma funcionalidade diferenciada: testes unitários, técnicas de caching, técnicas de segurança ou outras (ver com o professor);
Implantação do sistema na nuvem ou em um serviço de hospedagem.
´´´