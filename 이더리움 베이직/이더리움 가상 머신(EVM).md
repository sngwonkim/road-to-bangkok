# 이더리움 가상머신(EVM)

코드를 실행할 수 있도록 특정 환경이 에뮬레이트된 이더리움 가상 머신(EVM)은 월드 컴퓨터인 이더리움 프로토콜의 핵심요소라고 할 수 있습니다. 이번 모듈에서 이더리움의 상태와 관련하여 EVM에 대해 자세히 알아보겠습니다.

## 1. 이더리움 상태

네트워크 상에서 트랜잭션이 발생하면 이에 대한 신뢰 여부를 참여자들에게 묻고 과반수가 합의할 경우 해당 트랜잭션은 처리됩니다. 이렇게 합의된 트랜잭션은 어카운트의 상태 변화를 가져오는데, 이더리움 플랫폼의 이해를 위해 먼저 상태 변화 과정에 대해 알아보도록 하겠습니다.

예를 들어, A의 계좌에는 20만원이 있습니다. B에게 10만원을 송금하려 하고 송금에 필요한 수수료는 1만원입니다. 이런 A의 송금 요청은 은행에 전달되고, 은행은 은행 원장의  A계좌에서 10만원과 수수료 1만원을 차감한 뒤 B의 계좌에 10만원을 더합니다. 그 결과, A의 계좌 잔고는 9만원으로 줄고, B의 계좌 잔고엔 10만원이 더해집니다.

이렇게 다른 사람의 계좌로 송금하는 것 같이 계좌의 **상태 전이(state transition)**를 유발하는 행위를 **트랜잭션** 이라 하고, 모든 변화와 관련된 정보를 은행의 원장에 기록하게 됩니다.

이더리움 또한 위의 예시처럼 상태 전이 과정을 기반으로 작동합니다. 특정 시점의 현재 상태(S)가 상태 변이 함수(Y())에 의해 다른 상태(S’)로 전이되는 것을 말합니다.

**>Y(S, T)= S'**

어카운트(account)는 이더리움에서 실행 주체이자 기본 단위로, 중복되지 않는 식별자로 특정 주소를 부여 받습니다. 잔액이나 트랜잭션, 데이터 저장을 위한 저장공간을 가지고 있는데 이러한 모든것을 **어카운트 상태(state)**라고 하고, **이더리움의 전체 상태는 전체 어카운트의 상태**를 말한다고 할 수 있습니다.

어카운트는 상태 변이 함수에 의해 전이됩니다. 상태 변이 함수는 송금같은 트랜잭션이 될 수도 있고, 스마트 계약이 될 수도 있습니다. 어카운트의 특정 시점의 한 상태는 **단일 상태(single state)**로만 전이되는데, 만약 여러개의 상태로 전이된다면 사람들은 어떤 상태가 맞는지 합의할 수 없게 됩니다. 블록체인은 이런 변이 과정에 관련된 트랜잭션과 정보를 **하나의 블록으로 구성하여 시간순으로 연결함**으로써 단일 상태를 유지합니다.

이런 이더리움의 상태 전이는 바이트 코드를 실행하는 스택 기반의 가상머신인 EVM에 의해 처리됩니다. 

## 2. EVM 이란?

**이더리움 가상 머신(Ethereum Virtual Machine)**은 모든 이더리움 노드에서 일관되고 안전하게 코드를 실행할 수 있게 하는 탈중앙화된 가상 환경을 말합니다. 어떤 OS에서든지 독립적인 환경을 만들어 이더리움 플랫폼 위에 프로그램을 실행시킬 수 있는 환경을 제공합니다.

![출처 : [https://ethereum.org/en/developers/docs/evm/](https://ethereum.org/en/developers/docs/evm/)](%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A5%E1%84%85%E1%85%B5%E1%84%8B%E1%85%AE%E1%86%B7%20%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A5%E1%84%89%E1%85%B5%E1%86%AB(EVM)%20097892b7d0064473927abad65dbd7e2e/Untitled.png)

출처 : [https://ethereum.org/en/developers/docs/evm/](https://ethereum.org/en/developers/docs/evm/)

## 3. EVM 의 구조

EVM은 프로그램 카운터, 프로그램 영역, 스택, 콜 데이터, 로그, 스토리지, 메모리 영역으로 구성됩니다.

- **스택(Stack)**
연산에 필요한 데이터를 저장하기 위한 공간입니다. 256비트의 단어 크기로 동작하며 최대 크기는 1024개로 제한되어 있습니다. 1024개를 초과한 스택을 사용하면 예외가 발생되어 계약 실행이 종료됩니다.
- **메모리(Memory)**
함수 호출이나 메모리 연산처럼 프로그램의 실행을 위해 임시로 사용되는 영역입니다. 휘발성으로 호출이 발생할 때 초기화되어 계약 실행에 사용됩니다.
- **스토리지(Storage)**
블록체인에 영구적으로 기록하기 위한 저장 공간입니다. 이더리움의 모든 어카운트는 별도의 스토리지를 독자적으로 보유하고 있으며, 다른 어카운트의 스토리지에서 데이터를 읽어오거나 기록할 수 없습니다.
- **콜 데이터(Call Data)**
트랜잭션을 요청했을 때 전송되는 데이터들의 기록 공간입니다. 메모리와 동일한 방식으로 배치되고 동작합니다.
- **로그(Log)**
스마트 계약이 실행될 때 부가적인 정보를 기록하기 위한 공간입니다. web3.js를 이용하여 해당 영역의 데이터를 조회하거나 검색할 수 있습니다.
- **프로그램 영역**
EVM이 실행할 스마트 계약의 EVM명령어 목록을 보관할 떄 사용됩니다.
- **프로그램 카운터(Program Counter)**
다음 차례에 실행할 EVM명령어의 위치를 가리킵니다.

![출처 : [https://ethereum.org/en/developers/docs/evm/](https://ethereum.org/en/developers/docs/evm/)](%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A5%E1%84%85%E1%85%B5%E1%84%8B%E1%85%AE%E1%86%B7%20%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A5%E1%84%89%E1%85%B5%E1%86%AB(EVM)%20097892b7d0064473927abad65dbd7e2e/Untitled%201.png)

출처 : [https://ethereum.org/en/developers/docs/evm/](https://ethereum.org/en/developers/docs/evm/)

## 4. EVM 의 실행

이더리움 스마트 계약은 주로 **솔리디티(Solidity)**라는 언어로 작성됩니다. 작성된 코드는 컴파일러를 통해 기계가 이해할 수 있는 **바이트 코드(Bytecode)**로 컴파일되고, 바이트코드는 수행할 명령어를 나타내는 부호인 **[연산코드(Opcode)](https://ethereum.org/ko/developers/docs/evm/opcodes/)**에 매칭되어 실행됩니다. 

![출처 : [https://cypherpunks-core.github.io/ethereumbook/13evm.html](https://cypherpunks-core.github.io/ethereumbook/13evm.html)](%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A5%E1%84%85%E1%85%B5%E1%84%8B%E1%85%AE%E1%86%B7%20%E1%84%80%E1%85%A1%E1%84%89%E1%85%A1%E1%86%BC%E1%84%86%E1%85%A5%E1%84%89%E1%85%B5%E1%86%AB(EVM)%20097892b7d0064473927abad65dbd7e2e/Untitled%202.png)

출처 : [https://cypherpunks-core.github.io/ethereumbook/13evm.html](https://cypherpunks-core.github.io/ethereumbook/13evm.html)

위의 다이어그램을 통해 EVM의 아키텍처와 실행 흐름을 살펴볼 수 있습니다. 트랜잭션 호출자(caller)가 트랜잭션을 전송하면 EVM에서 실행을 위해 입력(input)트랜잭션을 수신하고 저장소를 업데이트 하는 동시에 스택에 인수를 저장합니다.  그런 다음 스택과 스마트 계약의 바이트코드가 EVM에 실행되어 opcode를 통해 가스비(수수료)가 책정됩니다. 

프로그래밍 언어 중 어떤 종류의 프로그램이라도 실행할 수 있다면 그 언어는 **튜링 완전한 언어**라고 부릅니다. 튜링 완전함에는 주의사항이 있는데 **일부 프로그램이 영원이 실행될 수 있다는 점**입니다. 중요한 건 이 프로그램이 영원히 실행될지 정상 수행되어 종료될지 판별할 수 없다는 것입니다. 프로그램이 실행되면 결과가 어떻게 될지 기다려야 하는데 만약 영원히 실행된다면 계속 기다려야 하겠죠. 이것을 **정지 문제(halting problem)**이라고 부르며 이더리움의 큰 문제가 될 수 있습니다. 

네트워크에 무한 루프를 실행하는 코드가 사고에 의해서든 악의에 의해서든 실행된다면, 단일 스레드 머신처럼 동작하는 **이더리움의 전체 네트워크를 사용할 수 없게 됩니다.** 이러한 문제가 발생되지 않도록 이더리움은 **가스(gas)**를 도입하였습니다. 가스는 **계산의 각 단계를 수행하는데 필요한 자원을 측정하는 단위**입니다. 

 EVM은 스마트 계약이 EVM명령어를 실행하거나 데이터 저장 공간을 소비할 때마다 가스를 지급하도록 설계되어 있습니다. 미리 지정된 최대 계산량을 수행한 후에 실행이 종료되지 않으면 EVM에 의해 중단됩니다.

스마트 계약을 실행하는 트랜잭션을 요청할 때, 트랜잭션이 사용할 최대 가스량을 사용자가 지정하면, EVM은 스마트 계약의 EVM명령어를 실행할 때마다 가스를 차감해 나갑니다. 실행하다 가스가 0이 되면(run out of gas) 가스 없음(out of gas)으로 예외가 발생하여 작업이 종료됩니다.

참고

EVM

[https://ethereum.org/ko/developers/docs/evm/](https://ethereum.org/ko/developers/docs/evm/)

[https://contents.premium.naver.com/digitalasset/digitalassetpro/contents/231031104220069dr](https://contents.premium.naver.com/digitalasset/digitalassetpro/contents/231031104220069dr)

[https://www.techopedia.com/kr/definition/ethereum-virtual-machine-evm](https://www.techopedia.com/kr/definition/ethereum-virtual-machine-evm)

[https://upbitcare.com/academy/education/coin/291](https://upbitcare.com/academy/education/coin/291)

[https://learnweb3.io/degrees/ethereum-developer-degree/sophomore/demystifying-the-ethereum-virtual-machine-evm/](https://learnweb3.io/degrees/ethereum-developer-degree/sophomore/demystifying-the-ethereum-virtual-machine-evm/)
[https://cypherpunks-core.github.io/ethereumbook/13evm.html](https://cypherpunks-core.github.io/ethereumbook/13evm.html)

메모리

[https://favoriteblockchain.medium.com/evm-memory-9f393ca0d635](https://favoriteblockchain.medium.com/evm-memory-9f393ca0d635)

옵코드

[https://en.wikipedia.org/wiki/Opcode](https://en.wikipedia.org/wiki/Opcode)

[https://ethereum.org/en/developers/docs/evm/opcodes/](https://ethereum.org/en/developers/docs/evm/opcodes/)
