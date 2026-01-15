import { CategoryFilter, MenuItem } from './types';

export const CATEGORIES: CategoryFilter[] = [
  { id: 'Menu Executivo', label: 'Menu Executivo' },
  { id: 'Drinks Mágicos', label: 'Drinks Mágicos' },
  { id: 'Cafés e Chocolates', label: 'Cafés & Chocolates' },
  { id: 'Sanduíches Artesanais', label: 'Sanduíches' },
  { id: 'Pratos Individuais', label: 'Pratos Individuais' },
  { id: 'Pizzas', label: 'Pizzas' },
  { id: 'Tapiocas', label: 'Tapiocas' },
  { id: 'Cuscuz', label: 'Cuscuz' },
  { id: 'Omeletes e Ovos', label: 'Omeletes & Ovos' },
  { id: 'Pães', label: 'Pães & Salgados' },
  { id: 'Waffles', label: 'Waffles' },
  { id: 'Bolos e Sobremesas', label: 'Sobremesas' },
  { id: 'Milkshakes', label: 'Milkshakes' },
  { id: 'Sucos', label: 'Sucos' },
  { id: 'Refrigerantes', label: 'Refrigerantes' },
  { id: 'Cervejas', label: 'Cervejas' },
];

export const MENU_ITEMS: MenuItem[] = [
  // --- MENU EXECUTIVO ---
  {
    id: 'exec-1',
    name: 'Barbecue do Chefe',
    description: 'Arroz, feijão, batata frita, farofinha, filé mignon suíno com molho barbecue e saladinha da casa.',
    price: 25.00,
    category: 'Menu Executivo',
    magicalIngredients: [
      { name: "Fogo de Dragão Líquido", description: "Molho barbecue defumado artesanalmente" },
      { name: "Pepitas da Mina dos Anões", description: "Batatas fritas douradas e crocantes" },
      { name: "Grãos da Terra Média", description: "Feijão temperado com especiarias secretas" }
    ]
  },
  {
    id: 'exec-2',
    name: 'Franguinho Ollivander',
    description: 'Arroz, feijão, purê de batata, filé de frango ao molho de mostarda e mel e saladinha da casa.',
    price: 25.00,
    category: 'Menu Executivo'
  },
  {
    id: 'exec-3',
    name: 'Nordestino',
    description: 'Arroz cremoso com carne desfiada, muçarela e banana da terra.',
    price: 32.00,
    category: 'Menu Executivo'
  },
  {
    id: 'exec-4',
    name: 'Tilápia da Casa',
    description: 'Arroz com brócolis, purê de batata, tilápia grelhada e saladinha da casa.',
    price: 32.50,
    category: 'Menu Executivo'
  },
  {
    id: 'exec-5',
    name: 'Caserinho',
    description: 'Arroz branco, feijão, batata frita, farofinha, contra filé grelhado e saladinha da casa.',
    price: 34.00,
    category: 'Menu Executivo'
  },

  // --- CUSCUZ ---
  {
    id: 'cuscuz-1',
    name: 'Cuscuz com Ovos e Bacon',
    description: 'Cuscuz tradicional acompanhado com dois ovos, fatias de bacon e manteiga à parte.',
    price: 20.00,
    category: 'Cuscuz'
  },
  {
    id: 'cuscuz-2',
    name: 'Cuscuz Dois Queijos',
    description: 'Cuscuz com recheio de muçarela e requeijão.',
    price: 19.00,
    category: 'Cuscuz'
  },
  {
    id: 'cuscuz-3',
    name: 'Cuscuz de Carne',
    description: 'Cuscuz com recheio de carne desfiada, tomate e requeijão.',
    price: 17.00,
    category: 'Cuscuz'
  },

  // --- PÃES (Including Croissants & Salgados) ---
  {
    id: 'croissant-1',
    name: 'Croissant Quatro Queijos',
    description: 'Croissant recheado com muçarela, gorgonzola, parmesão e requeijão.',
    price: 38.50,
    category: 'Pães'
  },
  {
    id: 'croissant-2',
    name: 'Croissant Nutella e Morangos',
    description: 'Croissant recheado com Nutella e Morangos.',
    price: 38.00,
    category: 'Pães'
  },
  {
    id: 'croissant-3',
    name: 'Croissant Presunto e Queijo',
    description: 'Croissant recheado com Presunto e Queijo.',
    price: 35.00,
    category: 'Pães'
  },
  {
    id: 'pao-1',
    name: 'Pão Na Chapa',
    description: 'Baguete de pão Ciabatta na chapa com manteiga.',
    price: 14.00,
    category: 'Pães'
  },
  {
    id: 'pao-2',
    name: 'Misto Quente Tradicional',
    description: 'Baguete de pão Ciabatta na chapa com presunto e muçarela.',
    price: 18.00,
    category: 'Pães'
  },
  {
    id: 'pao-3',
    name: 'Pão de Queijo',
    description: '03 unidades de pão de queijo caseiro assados na hora.',
    price: 12.00,
    category: 'Pães'
  },
  {
    id: 'salgado-1',
    name: 'Empada de Camarão',
    price: 18.00,
    category: 'Pães'
  },
  {
    id: 'salgado-2',
    name: 'Empada de Frango',
    price: 14.00,
    category: 'Pães'
  },
  {
    id: 'salgado-3',
    name: 'Enroladinho de Queijo',
    description: 'Enroladinho de queijo com calda de leite condensado e coco ralado.',
    price: 18.00,
    category: 'Pães'
  },

  // --- TAPIOCAS ---
  {
    id: 'tapioca-1',
    name: 'Tapioca de Frango e Requeijão',
    description: 'Massa de tapioca artesanal, frango desfiado, requeijão e salsinha.',
    price: 26.00,
    category: 'Tapiocas'
  },
  {
    id: 'tapioca-2',
    name: 'Tapioca com Morango e Nutella',
    description: 'Massa de tapioca artesanal, morango e Nutella.',
    price: 26.00,
    category: 'Tapiocas'
  },
  {
    id: 'tapioca-3',
    name: 'Tapioca Marguerita',
    description: 'Massa de tapioca artesanal, queijo muçarela, tomate e manjericão.',
    price: 26.00,
    category: 'Tapiocas'
  },
  {
    id: 'tapioca-4',
    name: 'Tapioca Ovos Mexidos e Bacon',
    description: 'Massa de tapioca artesanal, ovos e bacon.',
    price: 26.00,
    category: 'Tapiocas'
  },

  // --- OMELETES E OVOS ---
  {
    id: 'omelete-1',
    name: 'Omelete com Frango e Requeijão',
    description: 'Omelete com Frango e Requeijão Cremoso.',
    price: 28.00,
    category: 'Omeletes e Ovos'
  },
  {
    id: 'ovos-1',
    name: 'Ovos Mexidos com Bacon',
    description: 'Ovos mexidos, servido com pão na chapa e bacon.',
    price: 18.00,
    category: 'Omeletes e Ovos'
  },

  // --- BOLOS E SOBREMESAS ---
  {
    id: 'bolo-1',
    name: 'Bolinho Harry Potter',
    price: 18.00,
    category: 'Bolos e Sobremesas',
    highlight: true,
    magicalIngredients: [
      { name: "Pó de Varinha das Trevas", description: "Cacau 100% intenso e misterioso" },
      { name: "Cristais da Profecia", description: "Confeitos coloridos encantados" },
      { name: "Cobertura de Invisibilidade", description: "Ganache suave que derrete na boca" }
    ]
  },
  {
    id: 'bolo-2',
    name: 'Bolinho de Cenoura',
    description: 'Com Calda de Chocolate.',
    price: 16.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'bolo-3',
    name: 'Bolinho de Fubá',
    description: 'Com Calda de Goiabada.',
    price: 16.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'fondue-1',
    name: 'Fondue de Chocolate',
    description: 'Pequeno fondue de chocolate acompanhado de morango, banana, marshmallow e brownie.',
    price: 40.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'doce-1',
    name: 'Brigadeiro',
    price: 3.50,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'doce-2',
    name: 'Ninho',
    price: 3.50,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'torta-1',
    name: 'Torta Holandesa',
    price: 12.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'tartelete-1',
    name: 'Tartelete de Chocolate com Caramelo',
    price: 10.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'tartelete-2',
    name: 'Tartelete de Limão',
    price: 10.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'tartelete-3',
    name: 'Tartelete de Banoffe',
    price: 10.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'brownie-1',
    name: 'Brownie com Sorvete',
    price: 16.00,
    category: 'Bolos e Sobremesas'
  },
  {
    id: 'pocao-doce',
    name: 'Poção da Felicidade',
    description: 'Ganache de chocolate, prestígio, pedacinhos de brownie, morango e granulê.',
    price: 14.50,
    category: 'Bolos e Sobremesas',
    highlight: true,
    magicalIngredients: [
      { name: "Extrato de Alegria Pura", description: "Ganache de chocolate rico" },
      { name: "Pedras Filosofais", description: "Pedacinhos de brownie macio" },
      { name: "Pó de Estrela", description: "Granulê crocante" }
    ]
  },

  // --- WAFFLES ---
  {
    id: 'waffle-1',
    name: 'Waffle com Frutas e Ganache de Nutella',
    description: 'Massa de waffle artesanal, morango, banana e ganache de nutella.',
    price: 28.00,
    category: 'Waffles'
  },
  {
    id: 'waffle-2',
    name: 'Waffle com Frutas e Geléia',
    description: 'Massa de waffle artesanal, morango, banana e geleia de morango caseiro.',
    price: 26.00,
    category: 'Waffles'
  },
  {
    id: 'waffle-3',
    name: 'Waffle com Frutas e Mel',
    description: 'Massa de waffle artesanal, morango, banana e mel.',
    price: 28.00,
    category: 'Waffles'
  },

  // --- SANDUÍCHES ---
  {
    id: 'sand-1',
    name: 'Sanduíche de Frango e Sour Cream',
    description: 'Sour cream artesanal, frango desfiado, cebola roxa em fatias e alface americana.',
    price: 28.00,
    category: 'Sanduíches Artesanais'
  },
  {
    id: 'sand-2',
    name: 'Sanduíche de Rosbife',
    description: 'Maionese defumada artesanal, rosbife de lagarto ao ponto, cebola caramelizada e alface americana.',
    price: 30.00,
    category: 'Sanduíches Artesanais'
  },
  {
    id: 'sand-3',
    name: 'Sanduíche Ollivander',
    description: 'Pão de brioche, 150 gramas de hambúrguer caseiro, queijo prato, bacon, cebola caramelizada e maionese da casa.',
    price: 35.00,
    category: 'Sanduíches Artesanais',
    highlight: true,
    magicalIngredients: [
      { name: "Carne de Dragão Húngaro", description: "Hambúrguer artesanal de 150g" },
      { name: "Lágrimas de Crocodilo", description: "Cebola caramelizada agridoce" },
      { name: "Elixir da Lua Cheia", description: "Maionese da casa secreta" },
      { name: "Escamas de Basilisco", description: "Bacon crocante" }
    ]
  },

  // --- PIZZAS ---
  {
    id: 'pizza-ind-1',
    name: 'Pizza Marguerita (Individual)',
    description: 'Molho de tomate, muçarela, tomate, manjericão e orégano.',
    price: 22.00,
    category: 'Pizzas'
  },
  {
    id: 'pizza-ind-2',
    name: 'Pizza de Frango com Requeijão (Individual)',
    description: 'Molho de tomate, muçarela, frango, requeijão e orégano.',
    price: 28.00,
    category: 'Pizzas'
  },
  {
    id: 'pizza-ind-3',
    name: 'Pizza de Calabresa (Individual)',
    description: 'Molho de tomate, muçarela, calabresa, cebola, orégano.',
    price: 23.00,
    category: 'Pizzas'
  },
  {
    id: 'pizza-gr-1',
    name: 'Pizza Calabresa (Grande)',
    description: 'Molho de tomate, muçarela, calabresa, cebola e orégano.',
    price: 55.00,
    category: 'Pizzas'
  },
  {
    id: 'pizza-gr-2',
    name: 'Pizza Marguerita (Grande)',
    description: 'Molho de tomate, muçarela, tomate, manjericão e orégano.',
    price: 55.00,
    category: 'Pizzas'
  },
  {
    id: 'pizza-gr-3',
    name: 'Pizza Frango com Requeijão (Grande)',
    description: 'Molho de tomate, muçarela, frango, requeijão e orégano.',
    price: 55.00,
    category: 'Pizzas'
  },

  // --- PRATOS INDIVIDUAIS ---
  {
    id: 'prato-1',
    name: 'Arroz ao Limão com Tilápia Grelhada',
    description: 'Arroz cremoso com toque de limão e tilápia grelhada.',
    price: 42.00,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-2',
    name: 'Escondidinho de Carne Desfiada',
    description: 'Purê de batata, carne desfiada com molho de tomate caseiro e muçarela.',
    price: 30.00,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-3',
    name: 'Espaguete a Carbonara',
    description: 'Espaguete, bacon, ovos frescos e queijo parmesão.',
    price: 36.50,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-4',
    name: 'Parmegiana de Frango',
    description: 'Filé de frango empanado na farinha Panko, molho de tomate caseiro, presunto, muçarela, batata frita e arroz branco.',
    price: 38.00,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-5',
    name: 'Strogonoff de Frango',
    description: 'Acompanha arroz branco e batata palha.',
    price: 35.00,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-6',
    name: 'Arroz aos Quatro Queijos com Filé',
    description: 'Arroz ao queijo de muçarela, requeijão, gorgonzola e parmesão. Acompanha medalhão de filé mignon grelhado.',
    price: 75.00,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-7',
    name: 'Espaguete a Bolonhesa',
    description: 'Com molho de tomate caseiro e carne moída.',
    price: 35.50,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-8',
    name: 'Filé Mignon ao Molho de Mostarda',
    description: 'Filé Mignon grelhado ao molho de mostarda, arroz branco e batata frita.',
    price: 54.00,
    category: 'Pratos Individuais'
  },
  {
    id: 'prato-9',
    name: 'Penne ao Sugo com Isca de Filé Mignon',
    description: 'Penne ao molho de tomate caseiro, acompanhado de isca de filé mignon grelhado.',
    price: 38.50,
    category: 'Pratos Individuais'
  },

  // --- CAFÉS E CHOCOLATES ---
  {
    id: 'cafe-1',
    name: 'Café Coado na Mesa',
    description: 'Intensidade média no sabor e aroma. Contém 40 ml.',
    price: 10.50,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-2',
    name: 'Cappuccino do Harry Potter',
    description: 'Café, leite vaporizado, chantilly, Jelly Beans e Nutella.',
    price: 25.00,
    category: 'Cafés e Chocolates',
    highlight: true,
    magicalIngredients: [
      { name: "Feijõezinhos de Todos os Sabores", description: "Jelly Beans coloridos (todos doces, prometemos!)" },
      { name: "Nuvens de Hogwarts", description: "Leite vaporizado extremamente cremoso" },
      { name: "Poção da Energia", description: "Café espresso recém extraído" }
    ]
  },
  {
    id: 'cafe-3',
    name: 'Cappuccino Tradicional',
    description: 'Receita tradicional Italiana de café espresso e leite vaporizado.',
    price: 14.60,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-4',
    name: 'Espresso',
    description: 'Café com alta intensidade no sabor e aroma. Contém 40 ml.',
    price: 12.00,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-5',
    name: 'Café Coado na Prensa Francesa',
    description: 'Baixa intensidade no sabor e aroma. Contém 260 ml.',
    price: 13.50,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-6',
    name: 'Cappuccino com Borda de Nutella',
    description: 'Café, leite vaporizado, chocolate, canela e borda de Nutella.',
    price: 20.00,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-7',
    name: 'Cappuccino Ollivander',
    description: 'Mistura caseira de leite, café e chocolate.',
    price: 11.00,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-8',
    name: 'Chocolate Quente',
    description: 'Chocolate quente da casa, leite vaporizado e marshmallow maçaricado.',
    price: 23.10,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-9',
    name: 'Espresso Duplo',
    description: 'Café com intensidade média. Contém 70ml.',
    price: 13.50,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-gelado-1',
    name: 'Café com Doce de Leite',
    description: 'Café, doce de leite, creme de leite, gelo e chantilly.',
    price: 20.00,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-gelado-2',
    name: 'Café com Caramelo',
    description: 'Café, caramelo, creme de leite, gelo e chantilly.',
    price: 20.00,
    category: 'Cafés e Chocolates'
  },
  {
    id: 'cafe-gelado-3',
    name: 'Chocolate Gelado',
    description: 'Ganache de chocolate, Nutella, creme de leite, gelo e chantilly.',
    price: 20.00,
    category: 'Cafés e Chocolates'
  },

  // --- MILKSHAKES ---
  {
    id: 'milk-1',
    name: 'Milkshake de Café',
    price: 30.00,
    category: 'Milkshakes'
  },
  {
    id: 'milk-2',
    name: 'Milkshake de Nutella',
    price: 30.00,
    category: 'Milkshakes'
  },
  {
    id: 'milk-3',
    name: 'Milkshake de Ovomaltine',
    price: 25.00,
    category: 'Milkshakes'
  },

  // --- DRINKS MÁGICOS ---
  {
    id: 'drink-1',
    name: 'Cerveja Amanteigada',
    description: 'Bebida mais querida de Hogwarts. Espresso, xarope da casa, limão, água com gás, gelo e chantilly.',
    price: 18.00,
    category: 'Drinks Mágicos',
    highlight: true,
    magicalIngredients: [
      { name: "Essência de Ouro Líquido", description: "Xarope de caramelo secreto da casa" },
      { name: "Espuma de Nuvens Alpinas", description: "Chantilly batido com perfeição" },
      { name: "Gelo Eterno", description: "Refrescância duradoura" }
    ]
  },
  {
    id: 'drink-2',
    name: 'Poção Pollisuco',
    description: 'Monin de Maçã Verde, água com gás, gelo.',
    price: 15.00,
    category: 'Drinks Mágicos',
    magicalIngredients: [
      { name: "Extrato de Mandrágora", description: "Xarope concentrado de Maçã Verde" },
      { name: "Água da Fonte da Juventude", description: "Água gaseificada cristalina" },
      { name: "Cristais de Gelo", description: "Cubos de gelo encantados" }
    ]
  },
  {
    id: 'drink-3',
    name: 'Poção do Amor',
    description: 'Monin Toranja, Monin Morango, limão e soda limonada.',
    price: 20.00,
    category: 'Drinks Mágicos',
    highlight: true,
    magicalIngredients: [
      { name: "Suspiros de Afrodite", description: "Monin de Toranja e Morango" },
      { name: "Gotas de Ilusão", description: "Toque cítrico de limão siciliano" },
      { name: "Bolhas de Paixão", description: "Soda limonada efervescente" }
    ]
  },
  {
    id: 'drink-4',
    name: 'Sangue de Unicórnio',
    description: 'Refrigerante de limão, Monin de morango, gliter comestível e gelo.',
    price: 20.00,
    category: 'Drinks Mágicos',
    highlight: true,
    magicalIngredients: [
      { name: "Pó de Fada", description: "Glitter comestível cintilante" },
      { name: "Lágrimas de Prata", description: "Refrigerante de limão refrescante" },
      { name: "Vitalidade Pura", description: "Xarope de morango intenso" }
    ]
  },

  // --- SUCOS ---
  {
    id: 'suco-1',
    name: 'Suco de Abacaxi',
    price: 11.00,
    category: 'Sucos'
  },
  {
    id: 'suco-2',
    name: 'Suco de Cajú',
    price: 11.00,
    category: 'Sucos'
  },
  {
    id: 'suco-3',
    name: 'Suco de Limão (fruta)',
    price: 11.00,
    category: 'Sucos'
  },
  {
    id: 'suco-4',
    name: 'Suco de Morango',
    price: 11.00,
    category: 'Sucos'
  },
  {
    id: 'suco-5',
    name: 'Suco de Abacaxi com Hortelã',
    price: 11.00,
    category: 'Sucos'
  },
  {
    id: 'suco-6',
    name: 'Suco de Laranja (fruta)',
    price: 15.00,
    category: 'Sucos'
  },
  {
    id: 'suco-7',
    name: 'Suco de Maracujá',
    price: 15.00,
    category: 'Sucos'
  },

  // --- REFRIGERANTES ---
  {
    id: 'refri-1',
    name: 'Água com gás',
    price: 6.50,
    category: 'Refrigerantes'
  },
  {
    id: 'refri-2',
    name: 'Água sem gás',
    price: 6.50,
    category: 'Refrigerantes'
  },
  {
    id: 'refri-3',
    name: 'Coca Cola / Zero',
    price: 9.50,
    category: 'Refrigerantes'
  },
  {
    id: 'refri-4',
    name: 'Guaraná / Zero',
    price: 8.00,
    category: 'Refrigerantes'
  },
  {
    id: 'refri-5',
    name: 'Soda',
    price: 8.00,
    category: 'Refrigerantes'
  },
  {
    id: 'refri-6',
    name: 'H2O Limoneto',
    price: 11.00,
    category: 'Refrigerantes'
  },

  // --- CERVEJAS ---
  {
    id: 'cerveja-1',
    name: 'Budweiser long neck',
    price: 12.00,
    category: 'Cervejas'
  },
  {
    id: 'cerveja-2',
    name: 'Heineken long neck',
    price: 14.00,
    category: 'Cervejas'
  }
];