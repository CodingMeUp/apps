import {useMemo, useState, VFC} from 'react'
import {Input} from 'baseui/input'
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {FormControl} from 'baseui/form-control'
import {useDelegableBalance} from '../../hooks/useDelegableBalance'
import Decimal from 'decimal.js'
import {formatCurrency} from '@phala/utils'
import useWaitSignAndSend from '../../hooks/useWaitSignAndSend'
import {
  useApiPromise,
  useDecimalJsTokenDecimalMultiplier,
} from '@phala/react-libs'
import {Skeleton} from 'baseui/skeleton'
import {StakePool} from '.'
import {Block} from 'baseui/block'
import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'

const DelegateModalBody: VFC<
  {
    stakePool: Pick<StakePool, 'pid'> &
      Partial<Pick<StakePool, 'remainingStake'>>
  } & Pick<ModalProps, 'onClose'>
> = ({stakePool, onClose}) => {
  const {pid, remainingStake} = stakePool
  const {api} = useApiPromise()
  const delegableBalance = useDelegableBalance()
  const [amount, setAmount] = useState('')
  const waitSignAndSend = useWaitSignAndSend()
  const decimals = useDecimalJsTokenDecimalMultiplier(api)
  const onConfirm = () => {
    waitSignAndSend(extrinsic, (status) => {
      if (status.isReady) {
        onClose?.({closeSource: 'closeButton'})
      }
    })
  }

  const extrinsic = useMemo(() => {
    if (api && amount && decimals) {
      return api.tx.phalaStakePool?.contribute?.(
        pid,
        new Decimal(amount).times(decimals).floor().toString()
      )
    }
  }, [api, pid, amount, decimals])

  if (remainingStake === undefined) return null

  const remaining = remainingStake
    ? `${formatCurrency(remainingStake)} PHA`
    : '∞'

  return (
    <>
      <ModalHeader>Delegate</ModalHeader>
      <ModalBody>
        <FormControl label="Pid">
          <ParagraphSmall as="div">{pid}</ParagraphSmall>
        </FormControl>
        <FormControl
          label="Amount"
          caption={
            <>
              Pool Remaining: {remaining}
              <br />
              Delegable Balance:{' '}
              {delegableBalance && decimals ? (
                `${formatCurrency(delegableBalance.div(decimals))} PHA`
              ) : (
                <Skeleton
                  animation
                  rows={1}
                  width="96px"
                  overrides={{
                    Root: {
                      style: {display: 'inline-block', verticalAlign: 'middle'},
                    },
                  }}
                />
              )}
            </>
          }
        >
          {/* FIXME: add amount validation */}
          <Input
            size="compact"
            autoFocus
            type="number"
            endEnhancer="PHA"
            min={0}
            onChange={(e) => setAmount(e.currentTarget.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton disabled={!amount} onClick={onConfirm}>
            Confirm
          </ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

export default DelegateModalBody
