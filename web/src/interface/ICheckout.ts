interface ICheckoutUserInfo {
  address_id: string;
}

interface ICheckoutPayment {
  paymentMethod: string;
  cardNumber?: string;
  expirationDate?: string;
  cvv?: string;
  holderName?: string;
}
interface ICheckout {
  step: number | null;
  userInfo: ICheckoutUserInfo | null;
  payment: ICheckoutPayment | null;
}

interface ICheckoutStore extends ICheckout {
  addUserAdd: (address_id: string) => void;
  addPayment: (payment: ICheckoutPayment) => void;
  nextStep: () => void;
  prevStep: () => void;
  finishOrder: () => void;
}

export type { ICheckout, ICheckoutStore }