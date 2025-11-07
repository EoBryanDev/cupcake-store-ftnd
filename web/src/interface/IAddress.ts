interface IAddress {
  shippingAddrId: string;
  receiverName: string;
  street: string;
  number: string;
  complement: string;
  referencePoint: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phoneNumber: string;
  mainAddress: boolean;
  createdAt: string
}
interface IAddressResponse {
  data: IAddress[] | null;
  error: string;
};

export type { IAddress, IAddressResponse }
