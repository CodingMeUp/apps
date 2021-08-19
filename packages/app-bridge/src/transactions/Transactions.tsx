import { useTransactionsInfoAtom } from '@phala/app-store'
import { Backdrop } from '@phala/react-components'
import { useClickAway } from '@phala/react-hooks'
import { useEthereumGraphQL } from '@phala/react-libs'
import React, { useRef, useState } from 'react'
import { down } from 'styled-breakpoints'
import styled from 'styled-components'
import ClearButton from './ClearButton'
import TransactionsHeader from './Header'
import TransactionsList from './List/List'

const TransactionsRoot = styled.div`
  position: fixed;
  width: 210px;
  height: 44px;
  right: 48px;
  bottom: 48px;
  transform: translate3d(0, 0, 0);
  background: #ffffff;
  border: 1px solid #000000;
  box-sizing: border-box;
  z-index: 1000;
  transition: all 0.2s ease;

  ${down('sm')} {
    right: 0;
    bottom: 0;
    border: none;
  }

  &.active {
    width: 420px;
    height: 191px;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);

    ${down('sm')} {
      width: 100vw;
    }
  }
`

const Transactions: React.FC = () => {
  const [active, setActive] = useState(false)
  const rootRef = useRef(null)
  const [transactionsInfo, setTransactionsInfo] = useTransactionsInfoAtom()
  const { client } = useEthereumGraphQL()

  console.log('client', client)

  useClickAway(rootRef, () => {
    setActive(false)
  })

  if (transactionsInfo?.length === 0) {
    return null
  }

  return (
    <>
      <Backdrop visible={active} />
      <TransactionsRoot ref={rootRef} className={active ? 'active' : ''}>
        <TransactionsHeader
          active={active}
          onClickHeader={() => setActive((prev) => !prev)}
        />

        {active && (
          <>
            <ClearButton onClick={() => setTransactionsInfo([])}>
              Clear
            </ClearButton>
            <TransactionsList
              transactions={transactionsInfo.map((transactionInfo) => {
                return {
                  transactionInfo,
                  status: 'success',
                }
              })}
            />
          </>
        )}
      </TransactionsRoot>
    </>
  )
}

export default Transactions