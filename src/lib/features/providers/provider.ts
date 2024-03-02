import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'


export interface AccountState {
  account : any,
  signer : any
}

const initialAccountState: AccountState = {
  account : null ,
  signer : null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState : initialAccountState,
  reducers: {
    getAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload
    },
    getSigner: (state, action: PayloadAction<any>) => {
      state.signer = action.payload
    },
  }
})

export const { getAccount , getSigner } = accountSlice.actions

export const selectAccount = (state: RootState) => state.account.account;
export const selectSigner = (state: RootState) => state.account.signer;

export default accountSlice.reducer;