export interface MagicalIngredient {
  name: string;
  description: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: Category;
  highlight?: boolean;
  image?: string;
  magicalIngredients?: MagicalIngredient[];
}

export type Category = 
  | 'Cafés e Chocolates'
  | 'Drinks Mágicos'
  | 'Sanduíches Artesanais'
  | 'Pratos Individuais'
  | 'Pizzas'
  | 'Tapiocas'
  | 'Cuscuz'
  | 'Omeletes e Ovos'
  | 'Pães'
  | 'Waffles'
  | 'Bolos e Sobremesas'
  | 'Milkshakes'
  | 'Sucos'
  | 'Refrigerantes'
  | 'Cervejas'
  | 'Menu Executivo';

export interface CategoryFilter {
  id: Category;
  label: string;
}