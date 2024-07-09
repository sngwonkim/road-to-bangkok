import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
// import { InjectedConnector } from 'wagmi/connectors/injected'
import { Profile, useLogin, useProfilesManaged } from '@lens-protocol/react-web';

const WalletBtn = ({text}) => {
//   const { connect, connector, error: connectError, isConnecting } = useConnect({
//     connector: new InjectedConnector(),
//   });

//   // 1) address 얻기
//   const { execute, loading: loginLoading } = useLogin();

//   // 2) profiles 얻기
//   const { data: profiles, loading: profilesLoading } = useProfilesManaged({
//     for: "0x4f210933EEeE8631D50105935bdEf4279eEee220",
//     includeOwned: true,
//   });

//   const [profileId, setProfileId] = useState(null);

//   // 3) 첫 번째 profile의 id를 셋
//   useEffect(() => {
//     if (profiles && profiles.length > 0) {
//       setProfileId(profiles[0].id);
//     }
//   }, [profiles]);


// if (profilesLoading || loginLoading || isConnecting) return <p>Loading...</p>;
  return (
    <>
      {/* <div>
        {!isConnected ? (
          <button onClick={() => connect(connectors[0])}>
            Connect Wallet
          </button>
        ) : (
          <div onClick={handleLogin}>
            {text}
          </div>
        )}
        {connectError && <p>Error connecting: {connectError.message}</p>}
      </div> */}
    </>
  )
}

export default WalletBtn
