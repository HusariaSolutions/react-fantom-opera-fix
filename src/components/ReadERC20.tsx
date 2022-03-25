import { Text } from '@chakra-ui/react'
import { Contract } from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { StakeOneABI as abi } from 'abi/StakeOneABI'
import React, { useState } from 'react'
import useSWR from 'swr'

interface Props {
  addressContract: string
}

const fetcher =
  (library: Web3Provider | undefined, abi: any) =>
  (...args: any) => {
    if (!library) return

    const [arg1, arg2, ...params] = args
    const address = arg1
    const method = arg2
    const contract = new Contract(address, abi, library)
    console.log('🚀 ~ file: ReadERC20.tsx ~ line 23 ~ contract', contract)
    return contract[method].call(...params)
  }

export default function ReadERC20(props: Props) {
  const addressContract = '0xe44d075c8f993ac5da7bdef9046785b6686776ce'

  const { account, active, library } = useWeb3React<Web3Provider>()

  const { data: last_vested_native_ftm, mutate } = useSWR([addressContract, 'last_vested_native_ftm', account], {
    fetcher: fetcher(library, abi),
  })
  console.log('🚀 ~ file: ReadERC20.tsx ~ line 35 ~ ReadERC20 ~ last_vested_native_ftm', last_vested_native_ftm)

  return (
    <div>
      <Text> Contract: {addressContract}</Text>
      <Text my={4}>last_vested_native_ftm:{last_vested_native_ftm?.toNumber()}</Text>
    </div>
  )
}
