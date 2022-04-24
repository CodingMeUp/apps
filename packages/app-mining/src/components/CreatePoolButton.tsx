import {PhalaStakePoolTransactionFeeLabel} from '@phala/react-components'
import {useApiPromise} from '@phala/react-libs'
import {Block} from 'baseui/block'
import {Button} from 'baseui/button'
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from 'baseui/modal'
import {ParagraphSmall} from 'baseui/typography'
import {useMemo, useState} from 'react'
import useWaitSignAndSend from '../hooks/useWaitSignAndSend'

const Body = ({onClose}: Pick<ModalProps, 'onClose'>) => {
  const {api} = useApiPromise()
  const waitSignAndSend = useWaitSignAndSend()
  const onConfirm = () => {
    waitSignAndSend(extrinsic, (status) => {
      if (status.isReady) {
        onClose?.({closeSource: 'closeButton'})
      }
    })
  }

  const extrinsic = useMemo(() => {
    if (api) {
      return api.tx.phalaStakePool?.create?.()
    }
  }, [api])

  return (
    <>
      <ModalHeader>Create Pool</ModalHeader>
      <ModalBody>
        <ParagraphSmall>You will create a new stake pool.</ParagraphSmall>
      </ModalBody>
      <ModalFooter>
        <Block
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <PhalaStakePoolTransactionFeeLabel action={extrinsic} />
          <ModalButton onClick={onConfirm}>Confirm</ModalButton>
        </Block>
      </ModalFooter>
    </>
  )
}

const CreatePoolButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const onClose = () => setIsOpen(false)
  return (
    <>
      <Button
        kind="secondary"
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Create Pool
      </Button>
      <Modal onClose={onClose} isOpen={isOpen}>
        <Body onClose={onClose} />
      </Modal>
    </>
  )
}

export default CreatePoolButton
