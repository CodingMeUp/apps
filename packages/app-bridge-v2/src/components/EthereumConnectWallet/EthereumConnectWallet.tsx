import {useEthereumAccountAtom} from '@phala/app-store'
import {useAccountsQuery, useEthereumWeb3, useEthers} from '@phala/react-libs'
import {Button} from 'baseui/button'
import {FC, useEffect} from 'react'

export interface EthereumConnectWalletProps {
  hidden?: boolean
}

export const EthereumConnectWallet: FC<EthereumConnectWalletProps> = (
  props
) => {
  const {hidden = false} = props

  const {data: accounts = []} = useAccountsQuery()
  const {ethereumWeb3connect} = useEthereumWeb3()
  const {readystate: readyState} = useEthers()
  const isReady = readyState === 'connected'
  const [, setEthereumAccount] = useEthereumAccountAtom()

  useEffect(() => {
    const [account] = accounts
    if (!accounts || !isReady) {
      return
    }

    setEthereumAccount({
      name: account,
      address: account || '',
    })
  }, [accounts, isReady, setEthereumAccount])

  if (hidden) return null

  return (
    <Button
      overrides={{
        BaseButton: {
          style: {
            width: '160px',
            lineHeight: '16px',
            height: '28px',
            borderTopLeftRadius: '14px',
            borderTopRightRadius: '14px',
            borderBottomLeftRadius: '14px',
            borderBottomRightRadius: '14px',
            fontSize: '16px',
            /* Gn 001 */
            backgroundColor: '#D1FF52',
            /* Bk 001 */
            color: '#111111',

            ':hover': {
              backgroundColor: '#dcff7b',
              color: '#111111',
            },
          },
        },
      }}
      onClick={ethereumWeb3connect}
    >
      Connect Wallet
    </Button>
  )
}
