export interface ProductProps {
  id?: string;
  name: string;
  price: number;
  categoryId: string;
  description?: string | null;
  stock?: number;
  imageUrl?: string | null;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product {
  id?: string;
  name: string;
  price: number;
  categoryId: string;
  description: string | null;
  stock: number;
  imageUrl: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(props: ProductProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.categoryId = props.categoryId;
    this.description = props.description ?? null;
    this.stock = props.stock ?? 0;
    this.imageUrl = props.imageUrl ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  // Export product as a plain object
  // toJSON(): ProductProps {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     description: this.description,
  //     price: this.price,
  //     stock: this.stock,
  //     imageUrl: this.imageUrl,
  //     isActive: this.isActive,
  //     categoryId: this.categoryId,
  //     createdAt: this.createdAt,
  //     updatedAt: this.updatedAt,
  //   };
  // }

} 