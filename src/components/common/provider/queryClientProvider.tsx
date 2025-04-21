'use client'
import { GlobalStyles } from '@/styles/globalStyle'
import {
  QueryClient,
  QueryClientProvider as GuessMeWhatProvider,
} from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

interface Props {
  children: ReactNode
}

const QueryClientProvider = ({ children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 0,
          },
        },
      })
  )

  return (
    <GuessMeWhatProvider client={queryClient}>
      <GlobalStyles />
      {children}
    </GuessMeWhatProvider>
  )
}

export default QueryClientProvider
