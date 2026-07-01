# 🔥 Braseiro — Sistema de Pedidos

Sistema completo de pedidos online para um restaurante fictício (Braseiro), com cardápio navegável, busca, filtros, carrinho de compras, favoritos, cupons de desconto e fluxo completo de finalização de pedido.

🔗 **Acesse online:** https://order-system2.netlify.app/

## ✨ Funcionalidades

- **Cardápio dinâmico** com mais de 20 produtos em 7 categorias (entradas, hambúrgueres, pizzas, massas, carnes, bebidas e sobremesas)
- **Busca** por nome ou descrição do prato
- **Filtros** por categoria, promoções e mais vendidos
- **Ordenação** por relevância, menor preço, maior preço ou melhor avaliação
- **Seção de recomendados**, com os itens mais vendidos
- **Favoritos**, com contador e modal próprio para visualizá-los
- **Carrinho de compras** lateral, com:
  - Adição, remoção e ajuste de quantidade dos itens
  - Cálculo automático de subtotal, taxa de entrega e total
- **Cupons de desconto**, com dois tipos:
  - `BRASA10` — 10% de desconto no subtotal
  - `FRETEGRATIS` — frete grátis
- **Checkout completo**, com formulário de dados do cliente, endereço de entrega e forma de pagamento (PIX, Dinheiro, Cartão de Crédito ou Débito, com campo de troco quando necessário)
- **Confirmação de pedido** com recibo detalhado (itens, valores, pagamento, endereço, data e hora)
- **Histórico de pedidos** salvo localmente
- **Tema claro/escuro** com persistência de preferência
- **Interface responsiva**, com menu mobile próprio
- Toasts de feedback para ações do usuário (adicionar ao carrinho, favoritar, aplicar cupom, etc.)
- Persistência de dados via `localStorage` (produtos, carrinho, favoritos, tema e pedidos)

## 🛠️ Tecnologias

- **HTML5** — estrutura da aplicação
- **CSS3** — estilização, tema claro/escuro e responsividade
- **JavaScript (Vanilla)** — toda a lógica de estado, renderização, carrinho, cupons e checkout
- **LocalStorage** — persistência dos dados no navegador
- **Font Awesome** — ícones
- **Google Fonts (Poppins)** — tipografia

## 📁 Estrutura do projeto

```
sistema-de-pedidos/
├── index.html    # Estrutura da aplicação, carrinho e modais
├── style.css     # Estilos, temas e responsividade
└── script.js     # Lógica de estado, carrinho, cupons e checkout
```

## ▶️ Como executar localmente

Não é necessário nenhuma instalação ou build. Basta:

1. Baixar os três arquivos (`index.html`, `style.css`, `script.js`) mantendo-os na mesma pasta
2. Abrir o arquivo `index.html` no navegador

## 📌 Observações

- Os dados (produtos, carrinho, favoritos, tema e pedidos) ficam salvos localmente no navegador, em chaves como `braseiro_cart`, `braseiro_favorites`, `braseiro_theme` e `braseiro_orders`.
- As imagens dos pratos são carregadas de um serviço externo (Unsplash), portanto é necessária conexão com a internet para exibi-las corretamente.
- O pagamento e a finalização do pedido são simulados — não há integração real com meios de pagamento.

---

Desenvolvido por **Antonio Marques** — 2026
