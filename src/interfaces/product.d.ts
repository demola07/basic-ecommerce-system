export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  quantity: number;
  isApproved?: boolean;
  owner: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export type CreateProductPayload = {
  name: string;
  description: string;
  price: string;
  quantity: number;
};
