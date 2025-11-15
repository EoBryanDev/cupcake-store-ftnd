import { IAddress } from "../interface/IAddress";

export const formatAddress = (address: IAddress) => {

  return `${address.receiverName} • ${address.street}, ${address.number}
      ${address.complement && `, ${address.complement}`}, ${address.neighborhood}
      , ${address.city} - ${address.state} • CEP: ${address.zipCode}`;
};