import {Helmet} from 'react-helmet'
import styled from 'styled-components'
import {up} from 'styled-breakpoints'
import MainTable from '../components/Delegate/DelegateTable'
import Banner from '../components/Delegate/Banner'
import StatusBar from '../components/StatusBar'

const Wrapper = styled.div`
  ${up('md')} {
    margin: 30px;
    margin-top: 10px;
    flex: 1;
  }
`

const Block = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: #fff;
`

export const Delegate = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Delegate</title>
      </Helmet>

      <Wrapper>
        <StatusBar />
        <Banner></Banner>

        <Block>
          <MainTable></MainTable>
        </Block>
      </Wrapper>
    </>
  )
}
