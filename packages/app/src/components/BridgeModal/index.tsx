import { Modal } from '@phala/react-components'
import React from 'react'
import BridgeProcess from '../bridge/BridgeProcess'

type Props = {
  visible: boolean
  onClose: () => void
}

const BridgeModal: React.FC<Props> = (props) => {
  const { visible, onClose } = props

  return (
    <Modal visible={visible} title="Bridge Modal">
      <BridgeProcess onDone={onClose}></BridgeProcess>
    </Modal>
  )
}

export default BridgeModal
