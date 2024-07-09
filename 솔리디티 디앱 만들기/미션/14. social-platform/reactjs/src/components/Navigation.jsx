import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import WalletBtn from './Wallet'
import { useLogin, useProfilesManaged } from '@lens-protocol/react-web'

// styled
const NavigationContainer = styled.div`
    width: 100vw; height: 6vh;
    background-color: aliceblue;
    display: flex; justify-content: center; align-items: center;
`

const Navigation = () => {

    return (
        <NavigationContainer>
            <Button text={'Posts'} path={'/'} />
            <Button text={'Profiles'} path={'/profile'} />
            {/* <WalletBtn text={'Login'} /> */}
        </NavigationContainer>
    )
}

export default Navigation
