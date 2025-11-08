import { create } from 'zustand'
import { ICheckoutStore } from '@/src/interface/ICheckout';
import { finishOrderAction } from './actions/finishOrderAction';

const useCheckoutStore = create<ICheckoutStore>((set) => ({
  step: 0,
  userInfo: null,
  payment: null,
  doneSuccessfully: false,
  order_id: null,
  nextStep: () => set((state) => ({ step: (state.step || 0) + 1 })),
  prevStep: () => set((state) => ({ step: (state.step || 1) - 1 })),
  addUserAdd: (address_id) => set({ userInfo: { address_id } }),
  addPayment: (payment) => set({ payment }),
  setOrderId: (order_id) => set({ order_id }),
  setDoneSuccessfully: (doneSuccessfully) => set({ doneSuccessfully }),
  finishOrder: () => finishOrderAction(),

}))

export default useCheckoutStore;