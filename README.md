# Lash Academy — Plataforma Educacional Gamificada

Plataforma web (SPA) para formação de Lash Designers, com aulas gratuitas e pagas, XP, níveis, medalhas, catálogo de cílios, calculadora de secagem de cola, certificado e **cobrança Pix automática** (QR Code + copia e cola) que libera o acesso sozinha assim que o pagamento é confirmado.

## Estrutura de arquivos

```
lashacademy/
├── index.html                        → estrutura da página e layout
├── netlify.toml                       → configuração de publicação e das funções serverless
├── css/
│   └── style.css                      → identidade visual (cores, tipografia, componentes)
├── js/
│   ├── data.js                        → conteúdo editável: aulas, quizzes, catálogo, níveis, medalhas, preço
│   ├── illustrations.js               → ilustrações SVG animadas de aplicação de cílios
│   └── app.js                         → lógica do app: roteamento, XP, quiz, certificado, fluxo do Pix
├── netlify/
│   └── functions/
│       ├── create-pix.js              → cria a cobrança Pix no Mercado Pago
│       └── check-pix.js               → consulta se o pagamento já foi aprovado
└── README.md
```

## ⚠️ Por que isso não é mais "um arquivo só para arrastar"

Gerar um Pix de verdade (QR Code + copia-e-cola) e confirmar automaticamente quando o dinheiro cai exige chamar a API de um banco/processador de pagamento (aqui, o Mercado Pago) usando uma **chave secreta de acesso**. Essa chave nunca pode aparecer no código que roda no navegador — qualquer pessoa que abrir o "Ver código-fonte" da página a veria e poderia usá-la.

Por isso, a cobrança acontece em duas **funções serverless** (`netlify/functions/create-pix.js` e `check-pix.js`), que rodam no servidor da Netlify, não no navegador. Isso significa que:

- **Netlify Drop (arrastar e soltar) não funciona mais** para este projeto — ele só publica arquivos estáticos, sem rodar funções.
- É preciso publicar via **Netlify CLI** ou conectando um **repositório Git** (GitHub/GitLab/Bitbucket) à Netlify. Veja o passo a passo abaixo.

## Passo a passo — configurar o Pix (Mercado Pago)

1. **Crie uma conta no Mercado Pago** (ou use a que já tem para receber pagamentos): mercadopago.com.br
2. Acesse o Painel de Desenvolvedores (mercadopago.com.br/developers/panel) → **Suas integrações** → crie uma aplicação (pode chamar de "Lash Academy").
3. Dentro da aplicação, vá em **Credenciais de produção** e copie o **Access Token** (começa com `APP_USR-...`). Para testar sem cobrar de verdade, use antes as **Credenciais de teste** (começa com `TEST-...`) e os usuários de teste do Mercado Pago, que simulam o pagamento Pix completo sem gastar dinheiro real.
4. **Habilite o Pix** na sua conta Mercado Pago, caso ainda não esteja ativo (Configurações → Meios de recebimento).

## Passo a passo — publicar na Netlify com as funções ativas

### Opção A — Netlify CLI (mais rápido, sem precisar de Git)
1. Instale a CLI (requer Node.js): `npm install -g netlify-cli`
2. Na pasta do projeto: `cd lashacademy`
3. Faça login: `netlify login`
4. Publique: `netlify deploy --prod`
5. No painel da Netlify (site criado), vá em **Site configuration → Environment variables** e adicione:
   - Nome: `MP_ACCESS_TOKEN`
   - Valor: o Access Token copiado do Mercado Pago (teste ou produção)
6. Rode `netlify deploy --prod` novamente para a variável entrar em vigor.

### Opção B — Conectando um repositório Git (recomendado para manter atualizando)
1. Suba a pasta `lashacademy` para um repositório novo no GitHub.
2. Em app.netlify.com, clique em **Add new site → Import an existing project** e conecte o repositório.
3. Build command: deixe em branco. Publish directory: `.` (a raiz do repositório) — o `netlify.toml` já configura isso automaticamente.
4. Após o primeiro deploy, vá em **Site configuration → Environment variables** e adicione `MP_ACCESS_TOKEN` com o valor do seu Access Token.
5. Toda vez que você der `git push`, a Netlify republica o site sozinha.

> A Vercel também hospeda funções serverless gratuitamente, mas usa uma estrutura de pastas diferente (`api/` em vez de `netlify/functions/`) — se preferir a Vercel, avise que adapto os arquivos.

## Como testar sem cobrar de verdade

Use o **Access Token de teste** (`TEST-...`) na variável `MP_ACCESS_TOKEN` e um dos usuários de teste do Mercado Pago como "comprador". No ambiente de teste, o Mercado Pago simula a aprovação do Pix (geralmente em poucos segundos) sem envolver dinheiro real — assim dá para ver a tela "Pagamento confirmado!" e o acesso sendo liberado automaticamente antes de trocar para o token de produção.

## Alterando o preço

O valor cobrado é definido em **dois lugares que precisam ficar iguais**:
- `netlify/functions/create-pix.js` → constante `PRECO_FORMACAO_COMPLETA` (este é o valor que é realmente cobrado — o servidor nunca confia em um valor vindo do navegador, por segurança).
- `js/data.js` → `COURSE_DATA.formacao.preco` (este é só o valor exibido na tela para a aluna).

## Como editar o conteúdo pedagógico

Todo o conteúdo (aulas, textos, quizzes, catálogo de cílios, níveis e medalhas) está em `js/data.js`, em formato de objeto JavaScript. Basta editar esse arquivo — nenhuma outra parte do código precisa mudar.

## Progresso do aluno

O progresso (XP, aulas concluídas, quizzes aprovados, certificado emitido, acesso pago) é salvo no `localStorage` do navegador do próprio dispositivo. Isso é suficiente para uso pessoal ou turmas pequenas testando no próprio aparelho; para várias alunas com login e progresso sincronizado entre dispositivos, será necessário um backend com banco de dados (ex.: Supabase, Firebase) no futuro — o pagamento via Mercado Pago já dá o primeiro passo nessa direção.
