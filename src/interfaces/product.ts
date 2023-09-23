export default interface Product {
  id: number;
  name: string;
  inventedBy: string;
  imageLink: string;
  price: number;
  currency: string;
  qty: number;
  physicsConcept?: string;
  multipleUses?: string[];
}
