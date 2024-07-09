# Scaffold-ETH 2로 상태 채널 만들기

## 🚩 Step 0. 상태 채널

이전에 언급했듯이, 이더리움 블록체인은 뛰어난 탈중앙화 및 보안 속성을 가지고 있지만 거래 처리량이 낮고 비용이 비싸다는 고질적인 문제를 가지고 있다.

때문에 기존의 많은 웹 애플리케이션을 블록체인에서 실행하기 위해 사용하는 것이 L2 체인이다. L2 중에는 결제 채널, 상태 채널, 상태 채널 네트워크의 개념이 있다.

<img src='./images/layer.webp' width='300px' />

상태 채널은 고빈도로 서비스 대가를 교환하고자 하는 고정된 참가자 집합의 경우 확장 솔루션으로서 매우 뛰어나다. 정형적인 예는 파일 공유 또는 미디어 스트리밍이다.

우리의 경우, 서비스 제공자는 각 클라이언트에게 즉흥적인 지혜를 제공하며, 제공되는 각 텍스트 문자마다 0.01 ETH의 보상을 받는다.

> 🔥 이번 미션에서는 서비스 이용자가 한 번의 거래로 담보를 온체인에 잠그고, 서비스 제공자와의 상호작용을 완전히 오프체인에서 수행한 후, 두 번째 온체인 거래로 상호작용을 마무리하는 간단한 상태 채널 애플리케이션을 만든다.

---

## 🚩 Step 1. 환경

프로젝트 클론해가기

```sh
git clone https://github.com/scaffold-eth/scaffold-eth-2.git dynamic-nft
cd dynamic-nft
yarn install
```

<br/>

**🪪 배포자 (Deployer) 설정**

`packages/hardhat/.env` 및 `packages/nextjs/.env.local`을 수정한다.

```bash
# .env
ALCHEMY_API_KEY=
DEPLOYER_PRIVATE_KEY=
POLYGONSCAN_API_KEY=
```
본인 계정의 [Alchemy](https://dashboard.alchemy.com/apps) Apps API key와 소유하고 있는 지갑의 프라이빗 키, [Polygonscan](https://polygonscan.com/apis) API Key를 기입한다.

> Metamask 지갑의 경우, 계정 세부 정보로 들어가면 프라이빗 키를 얻을 수 있다.

<br/>

**🪝 컨트랙트 배포하기**

`packages/hardhat/hardhat.config.ts`에서 defaultNetwork를 `polygonAmoy`로 변경한다.

```sh
yarn deploy
```

<br/>

**🏛️ 프론트엔드 배포하기**

`packages/nextjs/scaffold.config.ts`를 아래처럼 변경한다.

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.polygonAmoy],

  // ...

  onlyLocalBurnerWallet: false,
} as const satisfies ScaffoldConfig;
```

NestJS 애플리케이션을 배포한다. [Vercel](https://vercel.com/) 에서 로그인 후 dashboard로 이동해 `Add New -> Project` 를 클릭한 후 GitHub repository를 임포트해온다.

```shell
yarn vercel
```

📱 Vercel이 제공하는 url 로 접속해서 애플리케이션 열기

---

## 🚩 Step 2. 서비스 제공자 (Guru) & 서비스 사용자 (Rube) 세팅하기

<img src='./images/setting_1.png' width='600px' />

### Op1) Polygon Amoy에서 배포한 경우

각 3개의 브라우저 탭을 열어서 하나는 서비스 제공자 (Guru), 나머지는 서비스 사용자 (Rube)로 지갑을 연결한다.

만약 배포자 계정과 컨트랙트 소유자 계정을 다르게 세팅하고 싶다면, `packages/hardhat/deploy/00_deploy_streamer.ts` 에서 아래와 같이 주석을 해제하고 컨트랙트를 소유할 계정의 주소를 넣어 재배포한다.

```solidity
import { Streamer } from "../typechain-types";

const streamer: Streamer = await hre.ethers.getContract("Streamer", deployer);

// Transfer ownership to your front end address
console.log("\n 🤹  Sending ownership to frontend address...\n");
const ownerTx = await streamer.transferOwnership("** 컨트랙트 소유할 계정 주소 **");
console.log("\n       confirming...\n");
const ownershipResult = await ownerTx.wait();
if (ownershipResult) {
  console.log("       ✅ ownership transferred successfully!\n");
}
```

```sh
yarn deploy --reset
```

### Op2) 로컬 환경에서 배포한 경우

로컬 환경에서 배포한 경우 `yarn chain`으로 초기화 된 블록체인에서 제공하는 가상 계정 중 첫 번째 계정이 배포자가 된다.

메타마스크에서 `계정 추가 -> 계정 가져오기 -> 비공개 키 입력` 으로 배포자 계정을 추가한 후 브라우저 우측 상단의 지갑을 메타마스크 계정으로 변경한다.

<img src='./images/setting_2.png' width='400px' />
<img src='./images/setting_3.png' width='200px' />

또는, 브라우저에서 연결된 burner 지갑의 주소로 컨트랙트 소유를 이전하여 재배포한다.

`packages/hardhat/deploy/00_deploy_streamer.ts` 수정 및 `yarn deploy --reset`

---

## 🚩 Step 3. 

- provideService in packages/nextjs/app/streamer/_components/Guru.tsx: Guru가 클라이언트에게 지혜를 전달

- reimburseService in packages/nextjs/app/streamer/_components/Rube.tsx: Rube가 받은 서비스에 대해 바우처를 생성하고 서명한 후 반환

- processVoucher in packages/nextjs/app/streamer/_components/Guru.tsx: 서비스 제공자가 바우처를 받고 저장