import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'


export interface AccountState {
  account : any
}

const initialAccountState: AccountState = {
  account : null
}

export const accountSlice = createSlice({
  name: 'account',
  initialState : initialAccountState,
  reducers: {
    getAccount: (state, action: PayloadAction<any>) => {
      state.account = action.payload
    },
  }
})

export const { getAccount } = accountSlice.actions

export const selectAccount = (state: RootState) => state.account.account;

export default accountSlice.reducer;