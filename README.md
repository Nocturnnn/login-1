# Calm Access Login

Interface de login desenvolvida com Next.js, React e Tailwind CSS, com foco em uma experiencia visual mais suave, organizada e confortavel. O projeto apresenta uma tela de acesso moderna com validacoes locais e interacoes que deixam o fluxo mais claro para o usuario.

## Visao geral

Este projeto foi estruturado como uma pagina de login responsiva, com layout refinado e um formulario mais funcional. A interface combina:

- fundo com gradientes suaves e elementos visuais leves
- organizacao em duas areas: apresentacao e formulario
- formulario com feedback visual e estados de interacao
- base pronta para futura integracao com autenticacao real

## Funcionalidades

- login com email ou usuario
- validacao local dos campos
- mostrar e ocultar senha
- indicador de forca da senha
- alerta de Caps Lock ativo
- opcao de lembrar acesso com `localStorage`
- modo de recuperacao de senha
- feedback de erro, informacao e sucesso
- preenchimento rapido com conta demo

## Conta demo

Use as credenciais abaixo para testar a experiencia:

- Email: `demo@aurora.app`
- Senha: `CalmLogin123`

## Tecnologias

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React
- Motion

## Estrutura principal

- `app/page.tsx`: layout principal da tela
- `components/LoginForm.tsx`: formulario e logica de interacao do login
- `app/globals.css`: identidade visual global e estilos do fundo
- `app/layout.tsx`: metadata e configuracao base da aplicacao

## Como rodar o projeto

```bash
npm install
npm run dev
```

Depois, abra `http://localhost:3000`.

## Scripts disponiveis

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Estado atual

O fluxo de login esta simulado no frontend, com validacao local e comportamento visual pronto para ser conectado a uma API de autenticacao real.
