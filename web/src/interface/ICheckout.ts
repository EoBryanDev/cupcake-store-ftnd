interface ICheckoutUserInfo {
  address_id: string;
}
interface ICheckout {
  step: number | null;
  userInfo: ICheckoutUserInfo | null;
}

interface ICheckoutStore extends ICheckout {
  addUserAdd: (address_id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  finishOrder: () => void;
}

export type { ICheckout, ICheckoutStore }