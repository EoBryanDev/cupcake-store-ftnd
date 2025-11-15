# Desenvolvimento inicial do frontend

- **Status:** Aceito ~~| Proposto | Depreciado | Substituído~~~
- **Data:** 2025/11/15
- **Criado por:** Bryan

## Contexto

A ideia do projeto atual era que fosse desenvolvido uma web aplicação para realizar a compra, venda e gerenciamento de itens. O caráter do projeto era educacional, portanto ele foi desenvolvido para suportar acesso experimental, com no máximo 100 usuários simultâneos. Como é um projeto educacional, o uso das plataformas de operação é no seu tier free.

## Decisão

Escolhi o desenvolvimento no idioma inglês para entendimento globalizado.

Tendo isso em mente a linguaguem utilizada foi o Javascript com o Superset Typescript devido ao domínio anterior da linguagem pelo desenvolvedor. O framework para entregar a aplicação foi o NextJS pois por se tratar de um ecommerce a mistura do SSR e o SGP fez ser uma boa opção, bem como o roteamento por pastas. Além do domínio prévio pelo desenvolvedor. Foi idealizado também que o desenvolvimento seguisse boas práticas atreladas aos fundamentos do SOLID e de componentização.

A arquitetura utilizada foi de app e api, aonde as páginas desenvolvidas com o React estavam dentro do app e o api contempla a chamada ao backend publicado em outra plataforma. Decidi dividir o frontend e backend para fins de prática eduacional e por poder reutilizar o código para escalar de outras formas posteriormente. Além disso, devido a utilização do Next, a publicação foi feita na Vercel, levando um alto acomplamento a plataforma devido a algumas funcionalidades. Isso também explicou a segregação de backend.

Como cliente http utilizei o React Query para me ajudar na exibição do lado do cliente as informações vinda do backend. Escolhi ele devido a sua facilidade e gerenciamento de cache.

Para gerenciamento de estados escolhi o Zustand devido a sua simplicidade de uso. O grande uso da ferramenta foi para carrinho e para o processo de checkout. Eu escolhi utiliza-lo ao invés de consistir esses pontos no banco devido a economia de banda ao fazer requisições ao backend na nuvem e menos uso de leitura e escrita no banco.

Como no momento do desenvolvimento do projeto não havia equipe especializada em UI/UX, utilizei a lib de shadcn e seus componentes para guiar os padrões de design da plataforma. Bem como o uso do tailwindcss para agilizar no processo de estilização da aplicação.

A segurança envolvida na aplicação está ligada ao uso do middleware que ajuda nas permissões de acesso a determinado conteúdo mediante a autenticação. Nesse primeiro momento, para facilitar as coisas, fiz a autenticação via e-mail e senha para não aumentar a complexidade do projeto desnecessariamente.

## Consequências

As consequencias das minhas escolhas foram:

- Utilizar a stack JS para o desenvolvimento aumentando a chance de mais pessoas conseguirem ajudar no projeto devido a sua popularidade.
- Utilizar o shadcn pode levar na alta dependecia a biblioteca e suas vulnerabilidades, mas em contra partida agilizar o processo de desenvolvimento atual.
- Publicar a production na Vercel, pode levar a custos e limitações inesperados devido ao tier da conta vinculado ao projeto. Mas entendendo que a publicação em outros lugares como provedores de cloud poderiam aumentar a complexidade e talvez custo e a forma de desenvolvimento devido a ferramenta next
- Fazer o frontend responsivo a dispositivos mobiles pois a primeira vista não vejo a necessidade do desenvolvimento para uma outra plataforma.
- Fazer a área administrativa não responsivo a mobile por se tratar de operações administrativas que muitas vezes é realizada em ambiente desktop.
- Entregar a aplicação com suas funcionalidades essenciais, implicando em modificações posteriores.

---

# Initial Frontend Development

- **Status:** Accepted ~~| Proposed | Deprecated | Superseded~~
- **Date:** 2025/11/15
- **Created by:** Bryan

## Context

The idea for the current project was to develop a web application for purchasing, selling, and managing items. The project's nature was educational, so it was developed to support experimental access, with a maximum of 100 simultaneous users. As it is an educational project, the operating platforms are used on their free tier.

## Decision

I've chosed english language to have a global understanding.

With this in mind, the language used was Javascript with the Typescript superset due to the developer's previous mastery of the language. The framework to deliver the application was NextJS because, for an e-commerce site, the mix of SSR and SSG was a good option, as well as the folder-based routing, in addition to the developer's prior experience. It was also envisioned that the development would follow good practices linked to the fundamentals of SOLID and componentization.

The architecture used was app and api, where the pages developed with React were inside the app and the api handles the call to the backend published on another platform. I decided to divide the frontend and backend for educational practice purposes and to be able to reuse the code to scale in other ways later. In addition, due to the use of Next, the publication was made on Vercel, leading to a high coupling with the platform due to some functionalities. This also explained the segregation of the backend.

As an HTTP client, I used React Query to help me display information from the backend on the client side. I chose it because of its ease of use and cache management.

For state management, I chose Zustand because of its simplicity. The tool was mainly used for the shopping cart and checkout process. I chose to use it instead of handling these points in the database because of the bandwidth savings from making requests to the cloud-based backend and the reduced database read and write traffic.

As there was no specialized UI/UX team at the time of the project's development, I used the shadcn library and its components to guide the platform's design standards, as well as the use of tailwindcss to speed up the application's styling process.

The security involved in the application is linked to the use of middleware that helps with access permissions to certain content upon authentication. At this initial moment, to simplify things, I implemented authentication via email and password to not unnecessarily increase the project's complexity.

## Consequences

The consequences of my choices were:

- Using the JS stack for development, increasing the chance of more people being able to help with the project due to its popularity.
- Using shadcn can lead to high dependency on the library and its vulnerabilities, but on the other hand, it speeds up the current development process.
- Publishing the production on Vercel may lead to unexpected costs and limitations due to the account tier linked to the project. But understanding that publishing in other places like cloud providers could increase complexity and possibly cost and the development method due to the Next tool.
- Making the frontend responsive to mobile devices because at first glance I don't see the need for development for another platform.
- Making the administrative area not responsive to mobile as it involves administrative operations that are often performed in a desktop environment.
- Delivering the application with its essential functionalities, implying subsequent modifications.
