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
  doneSuccessfully: boolean;
  order_id: string | null;
}

interface ICheckoutStore extends ICheckout {
  addUserAdd: (address_id: string) => void;
  addPayment: (payment: ICheckoutPayment) => void;
  nextStep: () => void;
  prevStep: () => void;
  setOrderId: (order_id: string) => void;
  setDoneSuccessfully: (doneSuccessfully: boolean) => void;
  finishOrder: () => void;
}

export type { ICheckout, ICheckoutStore }