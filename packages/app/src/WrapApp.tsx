import { ethereums } from '@phala/app-config'
import { Provider as AppStoreProvider } from '@phala/app-store'
import { MobileToastContextProvider } from '@phala/react-components'
import { Provider as LibProvider } from '@phala/react-libs'
import React, { useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from 'styled-components'
import './fonts.css'
import './ReactToastify.css'
import theme from './theme'
import './tooltip.css'

const WrapApp: React.FC = ({ children }) => {
  const client = useRef(new QueryClient())

  return (
    <LibProvider ethereumGraphEndpoint={ethereums['1']?.graph.endpoint || ''}>
      <ThemeProvider theme={theme}>
        <MobileToastContextProvider>
          <QueryClientProvider contextSharing={true} client={client.current}>
            <AppStoreProvider>{children}</AppStoreProvider>
          </QueryClientProvider>
        </MobileToastContextProvider>
      </ThemeProvider>
    </LibProvider>
  )
}

export default WrapApp
