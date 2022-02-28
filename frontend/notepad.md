0x36d40D09050001f6b8d9AffC376990452947045E
0xd19973e42503b7f6ace6f693bba435e2925d9733aee77a28b29c38943b308cc5

### 점검
1. 노드 실행 명령어
2. 설치 과정 비교
3. 고랭 버전(amd / arm)

---

로그인 상태 / 에셋 페이지에서 보내기 버튼 눌러서 페이지 이동 후
뒤로 버튼으로 에셋 페이지로 돌아오면 화면이 제대로 안나옴
---
1. 패키지 다운
- backend 디렉토리로 이동하여 `npm i` 입력
- frontend 디렉토리로 이동하여 `npm i` 입력

2. 데이터베이스 생성
- mysql에서 btc_avax 데이터베이스 생성
```sh
$ mysql -u root -p
(비밀번호 입력)

$ create database btc_avax
```

3. backend/config/config.json 파일 내 development에 데이터베이스 패스워드를 입력합니다.
```json
{
    "development": {
        "username": "root",
        "password": "비밀번호",
        "database": "btc_avax",
        ...
    },
  ...
}
```

4. DB 테이블 생성
backend 디렉토리로 이동하여 `npx sequelize-cli db:migrate` 를 입력

5. 백엔드 실행 (4000 포트)
`npx nodemon index.js`

6. 프론트엔드 실행 (3000 포트)
frontend 디렉토리로 이동하여 `npm run dev`

7. 데몬 실행
backend 디렉토리로 이동하여 `node daemon.js` 입력
중지하지 않는 한 계속 실행됩니다.

지갑하고 익스플로러 보시려면 localhost:3000 으로 접속하시면 됩니다.
지갑은 생성하고 나면 localStorage 에 저장됩니다. 
저장된 지갑을 삭제하고 다시 생성하고 싶으시면 브라우저에서 개발자도구 여시고 localstorage 지워주시고 다시 생성하시면 됩니다.




{
  blockHash: '0x99013db6a6b9ec3728725f3323b9b78e6013002acadf4c18d753246e4d68618a',
  blockNumber: 6594112,
  contractAddress: null,
  cumulativeGasUsed: 352279,
  effectiveGasPrice: 25000000000,
  from: '0x702aac7c54d8db46132735aef409bd88226a5860',
  gasUsed: 21000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0xe542889cc1fefd4d4ea488d1805427ebdac6461e',
  transactionHash: '0xc56bbc5d141866a9af3d8b66f63757d64febcc5b4b2680df526f99464dfd94a7',
  transactionIndex: 3,
  type: '0x0'
}

{
  blockHash: '0x99013db6a6b9ec3728725f3323b9b78e6013002acadf4c18d753246e4d68618a',
  blockNumber: 6594112,
  contractAddress: null,
  cumulativeGasUsed: 352279,
  effectiveGasPrice: 25000000000,
  from: '0x702aac7c54d8db46132735aef409bd88226a5860',
  gasUsed: 21000,
  logs: [],
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  status: true,
  to: '0xe542889cc1fefd4d4ea488d1805427ebdac6461e',
  transactionHash: '0xc56bbc5d141866a9af3d8b66f63757d64febcc5b4b2680df526f99464dfd94a7',
  transactionIndex: 3,
  type: '0x0'
}




address: 0x45f77Fa0E7C3B4417479AeB0e43Bd4C102a4DF9B
pk: 0x2ddaea20e5f6db78af503a23662c32141931aea2513a995dd887b7d6c0cf0559
## 잠금
잠금 버튼을 누르면 로컬스토리지 accessToken 제거
password로 인증하도록 설정

## 지갑 생성
web3.eth.accounts.create();
- 비밀번호 입력
- address 반환
- pk 반환

로컬 스토리지에 address 저장
pk는 db에 양방향 암호화(AES256)해서 저장 (단방향 암호화하면 트랜잭션 보낼 때 pk로 서명을 할 수가 없으니)
password 별도 저장

User 테이블
- address
- pk(aes256 암호화)
- salt
- password


## 시나리오
### 1. 지갑을 생성해서 사용하는 시나리오

### 2. 기존의 PK를 import해서 사용하는 시나리오

### 3. 1 or 2번을 통해서 한 번 지갑을 사용한 적이 있는 경우 
로컬 스토리지에 address를 저장해놓고 비밀번호를 입력받아서 lock 풀기


## 라우팅
### (User가 null || User.locked === true) => login.js
### (User.locked === false) => asset.js