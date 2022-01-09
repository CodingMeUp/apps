export type TransactionInfoItem = {
  address: string
  amount: number
  network: string
  type: string
  blockchainType: string
}

export type TransactionInfo = {
  from: TransactionInfoItem
  to: TransactionInfoItem
  hash?: string
}

export type TransactionRecords = TransactionRecord[]

export type TransactionRecord = {
  amount: string
  depositor?: string
  destinationChainId?: number
  destinationRecipient: string
  nonce: string
  resourceId: string
  transaction: string
  hash?: string
}
