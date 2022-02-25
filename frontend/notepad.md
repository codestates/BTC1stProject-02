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