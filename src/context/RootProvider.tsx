export { RootProvider }

import { PropsWithChildren } from 'react'

import { Web3ModalProvider } from './index'
import { cookieToInitialState } from 'wagmi'
import { wagmiConfig } from '@/config'
import { headers } from 'next/headers'

const RootProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie')
  )
  return (
    <Web3ModalProvider initialState={initialState}>
      {children}
    </Web3ModalProvider>
  )
}
