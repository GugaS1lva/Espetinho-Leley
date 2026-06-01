import carne from "@/assets/prod-carne.jpg";
import frango from "@/assets/prod-frango.jpg";
import coracao from "@/assets/prod-coracao.jpg";
import linguica from "@/assets/prod-linguica.jpg";
import queijo from "@/assets/prod-queijo.jpg";
import prato from "@/assets/prod-prato.jpg";
import refri from "@/assets/prod-refri.jpg";
import cerveja from "@/assets/prod-cerveja.jpg";
import mocoto from "@/assets/prod-mocoto.jpg";
import tropeiro from "@/assets/prod-tropeiro.jpg";
import maionese from "@/assets/prod-maionese.jpg";
import batata from "@/assets/prod-batata.jpg";
import kafta from "@/assets/prod-kafta.jpg";
import jantinha from "@/assets/prod-jantinha.jpg";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  products: Product[];
};

export const CATEGORIES: Category[] = [
  {
    id: "prato-do-dia",
    name: "Prato do Dia",
    emoji: "🍲",
    products: [
      { id: "mocoto", name: "Mocotó", description: "O clássico da casa: mocotó caprichado, cremoso e bem temperado.", price: 25.0, image: mocoto, badge: "Especial" },
    ],
  },
  {
    id: "jantinhas",
    name: "Jantinhas",
    emoji: "🍽️",
    products: [
      { id: "jantinha-p", name: "Jantinha P", description: "Arroz, molho, farofa e 1 espetinho de sua preferência.", price: 16.0, image: jantinha },
      { id: "jantinha-g", name: "Jantinha G", description: "Arroz, molho, farofa e 1 espetinho de sua preferência. Porção maior.", price: 18.0, image: jantinha, badge: "Mais pedido" },
    ],
  },
  {
    id: "espetinhos",
    name: "Espetinhos",
    emoji: "🍢",
    products: [
      { id: "esp-carne", name: "Espetinho de Carne", description: "Carne bovina temperada na brasa.", price: 12.0, image: carne },
      { id: "esp-misto", name: "Espetinho Misto", description: "Carne com queijo ou bacon, sempre na medida.", price: 12.0, image: carne },
      { id: "esp-frango", name: "Espetinho de Frango", description: "Peito de frango suculento, marinado da casa.", price: 12.0, image: frango },
      { id: "esp-coracao", name: "Espetinho de Coração", description: "Coração de galinha no ponto certo, direto da brasa.", price: 12.0, image: coracao },
      { id: "esp-linguica-fina", name: "Linguiça Fina", description: "Linguiça fininha grelhada, crocante por fora.", price: 12.0, image: linguica },
      { id: "esp-queijo", name: "Espetinho de Queijo", description: "Queijo dourado na brasa, derretendo por dentro.", price: 12.0, image: queijo },
    ],
  },
  {
    id: "espetinhos-especiais",
    name: "Espetinhos Especiais",
    emoji: "🔥",
    products: [
      { id: "esp-kafta", name: "Kafta", description: "Carne moída temperada com especiarias, no ponto certo.", price: 13.0, image: kafta, badge: "Especial" },
      { id: "esp-linguica-recheada", name: "Linguiça Recheada", description: "Linguiça artesanal recheada com queijo.", price: 13.0, image: linguica, badge: "Especial" },
      { id: "esp-medalhao", name: "Medalhão", description: "Medalhão de carne envolto em bacon, suculento.", price: 13.0, image: carne, badge: "Especial" },
    ],
  },
  {
    id: "acompanhamentos",
    name: "Acompanhamentos",
    emoji: "🥣",
    products: [
      { id: "tropeiro-p", name: "Feijão Tropeiro P", description: "Porção pequena do nosso feijão tropeiro caseiro.", price: 6.0, image: tropeiro },
      { id: "tropeiro-g", name: "Feijão Tropeiro G", description: "Porção grande do nosso feijão tropeiro caseiro.", price: 12.0, image: tropeiro },
      { id: "maionese-p", name: "Maionese P", description: "Maionese da casa, cremosa e bem temperada.", price: 5.0, image: maionese },
      { id: "maionese-g", name: "Maionese G", description: "Maionese da casa em porção grande, pra dividir.", price: 10.0, image: maionese },
      { id: "batata-g", name: "Batata Frita G", description: "Porção generosa, sequinha e bem dourada.", price: 25.0, image: batata },
    ],
  },
  {
    id: "bebidas",
    name: "Bebidas",
    emoji: "🥤",
    products: [
      { id: "coca-cacu", name: "Coca-Cola Caçulinha", description: "Lata pequena bem gelada — 220ml.", price: 4.0, image: refri },
      { id: "guaravita", name: "Guaravita", description: "Guaravita geladinha pra acompanhar o espeto.", price: 3.0, image: refri },
      { id: "agua-cg", name: "Água com Gás", description: "500ml gelada.", price: 4.0, image: refri },
      { id: "agua-sg", name: "Água sem Gás", description: "500ml gelada.", price: 3.0, image: refri },
      { id: "flexao", name: "Flexão", description: "Refrigerante Flexão geladinho.", price: 8.0, image: refri },
      { id: "coca-1l5", name: "Coca-Cola 1,5L", description: "Garrafa 1,5L gelada — perfeita pra dividir.", price: 13.0, image: refri },
      { id: "cerveja-latao", name: "Cerveja Latão", description: "Latão 473ml estupidamente gelado.", price: 10.0, image: cerveja },
    ],
  },
];

export const BRAND = {
  name: "Espetinho do Leley",
  tagline: "Sabor que vira tradição. Direto da brasa pro seu WhatsApp.",
  since: "1998",
  phone: "(21) 97437-6984",
  phoneDelivery: "(21) 98914-0203",
  whatsapp: "5521989140203",
  address: "Rua Dr. Mattos, 572 — Centro",
  addressNote: "Filial — atendimento e delivery",
  pix: "leley@espetinho.com.br",
  hoursLunch: "11h às 15h",
  hoursDinner: "17h30 às 23h",
};

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });