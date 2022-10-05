export interface IUser {
  id: number;
  username?: string;
  password?: string;
  avatar?: string;
  name?: any;
  lastname?: any;
  role?: string;
  cellphone?: string;
  superAdmin?: boolean;
  phone?: string;
  email?: string;
  image?: string;
  token?: string;
  parentId?: IUser;
  canCancel?: boolean;
  canCancelReservation?: boolean;
  canCreateClients?: boolean;
  canEditPrices?: boolean;
  canEditUsers?: boolean;
  canPay?: boolean;
  canSetPrices?: boolean;
  canListUser?: boolean;
  sendMail?: boolean;
}

export interface IClient {
  id?: number;
  name?: string;
  lastname?: string;
  image?: string;
  username?: string;
  password?: string;
  phone?: string;
  email?: string;
}
