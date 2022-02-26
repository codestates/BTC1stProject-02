# Local Test Network

---

# Docker 로 우분투 실행

### 1. avax_ubuntu 이름의 컨테이너 생성

```jsx
$ docker create -it --name avax_ubuntu ubuntu
```

### 2. avax_ubuntu 컨테이너 실행

```jsx
$ docker start avax_ubuntu
```

### 3. 실행중인 컨테이너 목록 확인

```jsx
$ docker ps
```

### 4. 터미널에서 컨테이너 연결

```jsx
$ docker exec -it avax_ubuntu /bin/bash
```

### 5. 컨테이너 셋팅

```jsx
$ apt update -y && apt install -y software-properties-common
```

```jsx
$ apt-get install vim -y
$ apt update -y
$ apt-get install git -y
$ apt-get install wget
$ apt-get install -y curl
```

---

# 로컬 테스트 네트워크 생성

[Ref #verifying-nodes-are-connected](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network/#verifying-nodes-are-connected)

### 1. go install

소스에서 node를 빌드하기 위해서는 Go 1.16.8 이상을 설치해야 합니다. 

```jsx
$ wget https://golang.org/dl/go1.17.7.linux-amd64.tar.gz
$ tar -C /usr/local -xzf go1.17.7.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin
$ source $HOME/.profile
```

![go version 확인](Local%20Test%202fc3d/Untitled.png)

go version 확인

### 2. AvalancheGo 저장소 다운로드

```jsx
$ git clone https://github.com/ava-labs/avalanchego.git
$ cd avalanchego
```

### 3. AvalancheGo Build

```jsx
$ ./scripts/build.sh
```

### 4. Node 생성 및 연결

5개의 터미널을 이용해서 5개의 노드를 생성합니다.

```
./build/avalanchego --public-ip=127.0.0.1 --http-port=9650 --staking-port=9651 --db-dir=db/node1 --network-id=local --bootstrap-ips= --staking-tls-cert-file=$(pwd)/staking/local/staker1.crt --staking-tls-key-file=$(pwd)/staking/local/staker1.key
```

```
./build/avalanchego --public-ip=127.0.0.1 --http-port=9652 --staking-port=9653 --db-dir=db/node2 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker2.crt --staking-tls-key-file=$(pwd)/staking/local/staker2.key
```

```
./build/avalanchego --public-ip=127.0.0.1 --http-port=9654 --staking-port=9655 --db-dir=db/node3 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker3.crt --staking-tls-key-file=$(pwd)/staking/local/staker3.key
```

```
./build/avalanchego --public-ip=127.0.0.1 --http-port=9656 --staking-port=9657 --db-dir=db/node4 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker4.crt --staking-tls-key-file=$(pwd)/staking/local/staker4.key
```

```
./build/avalanchego --public-ip=127.0.0.1 --http-port=9658 --staking-port=9659 --db-dir=db/node5 --network-id=local --bootstrap-ips=127.0.0.1:9651 --bootstrap-ids=NodeID-7Xhw2mDxuDS44j42TCB6U5579esbSt3Lg --staking-tls-cert-file=$(pwd)/staking/local/staker5.crt --staking-tls-key-file=$(pwd)/staking/local/staker5.key
```

### 5. 노드 연결 확인**[](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network/#verifying-nodes-are-connected)**

노드가 시작되면 **네트워크 동기화**를 위해 bootstrap을 해야합니다. 주어진 체인이 부트스트랩을 완료하면 다음과 같은 로그가 보여집니다.

`INFO [02-23|22:27:35.787] <X Chain> snow/engine/avalanche/transitive.go#306: bootstrapping finished with 0 vertices in the accepted frontier`

`[info.isBootstrapped](https://docs.avax.network/build/avalanchego-apis/info/#infoisbootstrapped)` 를 이용해 **bootstrapping**이 완료됐는지 확인합니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.isBootstrapped",
    "params": {
        "chain":"X"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "isBootstrapped":true
   },
   "id":1
}
```

[`info.peers`](https://docs.avax.network/build/avalanchego-apis/info/#infopeers) 를 사용해 **node 연결**을 확인합니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"info.peers"
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/info
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "numPeers":"4",
      "peers":[
         {
            "ip":"127.0.0.1:50630",
            "publicIP":"127.0.0.1:9653",
            "nodeID":"NodeID-MFrZFVCXPv5iCn6M9K6XduxGTYp891xXZ",
            "version":"avalanche/1.7.5",
            "lastSent":"2022-02-24T20:07:31+09:00",
            "lastReceived":"2022-02-24T20:07:31+09:00",
            "benched":[
               
            ],
            "observedUptime":"100",
            "trackedSubnets":[
               "11111111111111111111111111111111LpoYY"
            ]
         },
         {
            "ip":"127.0.0.1:50632",
            "publicIP":"127.0.0.1:9655",
            "nodeID":"NodeID-NFBbbJ4qCmNaCzeW7sxErhvWqvEQMnYcN",
            "version":"avalanche/1.7.5",
            "lastSent":"2022-02-24T20:07:34+09:00",
            "lastReceived":"2022-02-24T20:07:34+09:00",
            "benched":[
               
            ],
            "observedUptime":"100",
            "trackedSubnets":[
               "11111111111111111111111111111111LpoYY"
            ]
         },
         {
            "ip":"127.0.0.1:50638",
            "publicIP":"127.0.0.1:9657",
            "nodeID":"NodeID-GWPcbFJZFfZreETSoWjPimr846mXEKCtu",
            "version":"avalanche/1.7.5",
            "lastSent":"2022-02-24T20:07:30+09:00",
            "lastReceived":"2022-02-24T20:07:31+09:00",
            "benched":[
               
            ],
            "observedUptime":"100",
            "trackedSubnets":[
               "11111111111111111111111111111111LpoYY"
            ]
         },
         {
            "ip":"127.0.0.1:50644",
            "publicIP":"127.0.0.1:9659",
            "nodeID":"NodeID-P7oB2McjBGgW2NXXWVYjV8JEDFoW9xDE5",
            "version":"avalanche/1.7.5",
            "lastSent":"2022-02-24T20:07:30+09:00",
            "lastReceived":"2022-02-24T20:07:25+09:00",
            "benched":[
               
            ],
            "observedUptime":"100",
            "trackedSubnets":[
               "11111111111111111111111111111111LpoYY"
            ]
         }
      ]
   },
   "id":1
}
```

---

# 트랜잭션 생성

### 1. 노드에서 keystore 사용자 생성

[Ref #keystoreexportuser](https://docs.avax.network/build/avalanchego-apis/keystore/#keystoreexportuser)

모든 노드에는 내장 키 저장소가 있습니다. 클라이언트는 블록체인과 상호작용할 때 사용할 ID 역할을 하는 키 저장소에 사용자를 만듭니다. 노드에 사용자를 생성하면 해당 노드에만 존재합니다.

`password`는 최소 8자 이상, 대문자/소문자/숫자 및 기호를 모두 포함해야합니다.

```
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"user",
        "password":"1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "success":true
   },
   "id":1
}
```

### 2. 사용자 정보 가져오기

```
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.exportUser",
    "params" :{
        "username":"user",
        "password":"1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/keystore
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "user":"114V6CEePAJDptE58pTUXGbZA1KtG3PBb3dKpgyFJu7tAyzjnrPkVEvzDM6rfRNeSCcmF9b6FRME9xt",
      "encoding":"cb58"
   },
   "id":1
}
```

### 3. Address 생성

[Ref #avmcreateaddress](https://docs.avax.network/build/avalanchego-apis/x-chain/#avmcreateaddress)

사용자가 제어하는 새 주소를 생성합니다. 

```
$ curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username": "user",
        "password": "1q2w!Q@W"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "address":"X-local1lcrchgn57gmvflzqnzfm3gee8mvuqazx356793"
   },
   "id":1
}
```

### 4. AVAX 얻기 (P-Chain → X-Chain으로 자산 가져오기)

네트워크를 실행할 때 AVAX를 가져올 수 있는 [사전 자금 지원](https://docs.avax.network/build/tutorials/platform/create-a-local-test-network#getting-avax) X-Chain 개인 키가 있습니다. 

**개인 키** : `PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN`

노드에서 Keystore 사용자를 생성 후 `[avm.importKey](https://docs.avax.network/build/avalanchego-apis/x-chain/#avmimportkey)` 를 통해 이 키가 보유한 자금을 가져올 수 있습니다.

```
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.importKey",
    "params" :{
        "username": "user",
        "password": "1q2w!Q@W",
        "privateKey":"PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"
    }
}'
```

출력

```
{
    "jsonrpc": "2.0",
    "result": {
        "address": "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
    },
    "id": 1
}
```

 X-Chain에서 `X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u`주소에 300m AVAX의 잔액이 있는지 확인합니다

```
curl --location --request POST '127.0.0.1:9650/ext/bc/X' \
--header 'Content-Type: application/json' \
--data-raw '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u",
      "assetID": "AVAX"
  }
} '
```

출력

```
{
    "jsonrpc": "2.0",
    "result": {
        "balance": "300000000000000000",
        "utxoIDs": [
            {
                "txID": "2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                "outputIndex": 1
            }
        ]
    },
    "id": 1
}
```

### 5. 트랜잭션 생성 (토큰 전송)

`[avm.send](https://docs.avax.network/build/avalanchego-apis/x-chain/#avmsend)`를 이용해 자산을 주소로 전송합니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10000,
        "to"        : "X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m",
        "from"      : ["X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"],
        "changeAddr": "",
        "memo"      : "hi, Bitumb!",
        "username"  : "user",
        "password"  : "1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력

```
{
   "jsonrpc":"2.0",
   "result":{
      "txID":"sdxmR3JCUxAfmudDwSpFRtTHRHWLYApWE6y8HzeW5znWGptmP",
      "changeAddr":"X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
   },
   "id":1
}
```

`[avm.getTx](https://docs.avax.network/build/avalanchego-apis/x-chain/#avmgettx)`를 이용해 지정한 트랜잭션 확인합니다. 

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTx",
    "params" :{
        "txID":"sdxmR3JCUxAfmudDwSpFRtTHRHWLYApWE6y8HzeW5znWGptmP",
        "encoding": "json"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력

```
{
   "jsonrpc":"2.0",
   "result":{
      "tx":{
         "unsignedTx":{
            "networkID":12345,
            "blockchainID":"2eNy1mUFdmaxXNj1eQHUe7Np4gju9sJsEtWQ4MX3ToiNKuADed",
            "outputs":[
               {
                  "assetID":"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                  "fxID":"spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                  "output":{
                     "addresses":[
                        "X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m"
                     ],
                     "amount":10000,
                     "locktime":0,
                     "threshold":1
                  }
               },
               {
                  "assetID":"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                  "fxID":"spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                  "output":{
                     "addresses":[
                        "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
                     ],
                     "amount":299999999998990000,
                     "locktime":0,
                     "threshold":1
                  }
               }
            ],
            "inputs":[
               {
                  "txID":"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                  "outputIndex":1,
                  "assetID":"2fombhL7aGPwj3KH4bfrmJwW6PVnMobf9Y2fn9GwxiAAJyFDbe",
                  "fxID":"spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
                  "input":{
                     "amount":300000000000000000,
                     "signatureIndices":[
                        0
                     ]
                  }
               }
            ],
            "memo":"0x68692c20426974756d6221"
         },
         "credentials":[
            {
               "fxID":"spdxUxVJQbX85MGxMHbKw1sHxMnSqJ3QBzDyDYEP3h6TLuxqQ",
               "credential":{
                  "signatures":[
                     "0xd5a67c17c094c887830dfaaf2aab387dd088980e51682b6715f0ad53f2d77cef367a6654308affe1d315bd16d534300b467e4f0117323c4a4eed31d7c046938b00"
                  ]
               }
            }
         ]
      },
      "encoding":"json"
   },
   "id":1
}
```

`[avm.getTxStatus](https://docs.avax.network/build/avalanchego-apis/x-chain/#avmgettxstatus)`을 통해 트랜잭션 상태를 확인합니다.

- ID로 `트랜잭션 상태`를 가져옵니다.
    
    `Committed` : 트랜잭션이 모든 노드에서 수락(또는 수락)됩니다.
    
    `Processing` : : 트랜잭션이 이 노드에 의해 투표되고 있습니다.
    
    `Droppedreason` : 네트워크의 어떤 노드에서도 트랜잭션을 수락하지 않습니다.
    
    `Unknown` : 이 노드에서 트랜잭션을 보지 못했습니다.
    

```
curl -X POST --data '{                                                                        "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.getTxStatus",
    "params" :{
        "txID":"sdxmR3JCUxAfmudDwSpFRtTHRHWLYApWE6y8HzeW5znWGptmP"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력

```
{
   "jsonrpc":"2.0",
   "result":{
      "status":"Accepted"
   },
   "id":1
}
```

`[avm.getBalance](https://docs.avax.network/build/avalanchego-apis/x-chain/#avmgetbalance)`을 통해 전송한 자산이 지정 주소로 전송 되었는지 확인합니다.

```
curl -X POST --data '{
  "jsonrpc":"2.0",
  "id"     : 1,
  "method" :"avm.getBalance",
  "params" :{
      "address":"X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m",
      "assetID": "AVAX"
  }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력

```
{
   "jsonrpc":"2.0",
   "result":{
      "balance":"10000",
      "utxoIDs":[
         {
            "txID":"sdxmR3JCUxAfmudDwSpFRtTHRHWLYApWE6y8HzeW5znWGptmP",
            "outputIndex":0
         }
      ]
   },
   "id":1
}
```

---

# 두개의 node 간의 트랜잭션 확인

### 1. 위의 과정 처럼 keystore 사용자를 생성한다.

127.0.0.1:`9652`  노드에 keysotre user를 생성한다.

```
$ curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"keystore.createUser",
    "params" :{
        "username":"user02",
        "password":"1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9652/ext/keystore
```

Address 생성

```
curl -X POST --data '{
    "jsonrpc": "2.0",
    "method": "avm.createAddress",
    "params": {
        "username": "user02",
        "password": "1q2w!Q@W"
    },
    "id": 1
}' -H 'content-type:application/json;' 127.0.0.1:9652/ext/bc/X
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "address":"X-local1c00puf4s6zhshmdf4venpslrlxjgyvhngfxz2h"
   },
   "id":1
}
```

### 2. 자산 전송

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.send",
    "params" :{
        "assetID"   : "AVAX",
        "amount"    : 10,
        "to"        : "X-local1c00puf4s6zhshmdf4venpslrlxjgyvhngfxz2h",
        "from"      : ["X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m"],
        "changeAddr": "",
        "memo"      : "hi, Bitumb!",
        "username"  : "user",
        "password"  : "1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "txID":"cujQdTpEqYQxqpKq8GG4pmP1n67Z6ErRnCe9tm2EyYumgBTwF",
      "changeAddr":"X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m"
   },
   "id":1
}
```

---

# Cross-Chain Transfer

AVAX 토큰은 거래가 가능한 X-Chain, Primary Network를 검증할 때 지분으로 제공될 수 있는 P-Chain, 스마트 계약에 사용할 수 있는 C-Chain에 존재합니다. 이 거래는 가스 비용을 지불하고 이루어집니다.

## X-Chain ↔ C-Chain 간 AVAX 정송

해당 내용은 API 호출을 통해 X-Chain에서 C-Chain으로 전송하는 방법을 보여줍니다.

교차 체인 전송은 두 가지 트랜잭션을 수행해야합니다.

- X-Chain에서 AVAX 내보내기
- AVAX를 C-Chain으로 가져오기

토근 전송 전후의 자산을 비교해보세요.

### 1. X-Chain 에서 C-Chain으로 AVAX 전송

X-Chain은 Bech32 주소를 사용하고, C-Chain은 16진 EVM주소를 사용합니다. 주소는 모두 단방향 암호화 기능을 사용하는 개인키에서 파생되므로 한 형식에서 다른 형식으로 주소를 변환할 수 있는 방법이 없습니다.

이 문제를 해결하기 위해 X-Chain에서 개인 키를 내보낸 다음 C-Chain으로 가져올 수 있습니다. 

이 방법을 통해 X-Chain 주소를 사용하고 ‘X-’ 접두사를 ‘C-’ 접두사로 변경하여 C-Chain에 사용할 Bech32 주소를 얻을 수 있습니다.

- X-Chain의 개인키를 가져옵니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.exportKey",
    "params" :{
        "username" :"user",
        "password":"1q2w!Q@W",
        "address": "X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "privateKey":"PrivateKey-9wLyQzhob3YQ8j8E9GMT56ENRPQ7xmnW5PWoN9o9tbsqXaSEe"
   },
   "id":1
}
```

- X-Chain의 개인키를 C-Chain으로 가져옵니다.

```
curl -X POST --data '{  
    "jsonrpc":"2.0",    
    "id"     :1,    
    "method" :"avax.importKey", 
    "params" :{ 
        "username" :"user",   
        "password":"1q2w!Q@W",    
        "privateKey":"PrivateKey-9wLyQzhob3YQ8j8E9GMT56ENRPQ7xmnW5PWoN9o9tbsqXaSEe"    
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "address":"0xD2eaBE72D124306e10ce58c329aEF45F0662C33C"
   },
   "id":1
}
```

응답에는 16진수로 인코딩된 EVM 주소가 포함됩니다.

- x-chain 토큰을 c-chain으로 전송
    
    내보낸 개인 키에 해당하는 주소(`local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m`)를 사용하여 `avm.export`를 호출하여 ‘C-’접두사를 사용하도록 전환합니다.
    

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.export",
    "params" :{
        "to":"C-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m",
        "amount": 10000000,
        "assetID": "AVAX",
        "from":["X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m"],
        "changeAddr":"",
        "username":"user",
        "password":"1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "txID":"2RXjHC4tQmcxCQoaHD44jUni72dKR8pDwDkuwtxCkMQT8nmUPL",
      "changeAddr":"X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m"
   },
   "id":1
}
```

수출입 거래 모두 거래 수수료를 부과하므로 수출 금액이 거래 수수료를 초과하는지 확인하십시오.

### 2. AVAX를 C-Chain으로 가져오기

전송을 완료하기 위해 avm.import 호출합니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,    
    "method" :"avax.import",
    "params" :{ 
        "to":"0xD2eaBE72D124306e10ce58c329aEF45F0662C33C",  
        "sourceChain":"X",  
        "username":"user",    
        "password":"1q2w!Q@W" 
    }   
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

출력값 

```
{
   "jsonrpc":"2.0",
   "result":{
      "txID":"2d7gQvXxp567Rm5ZfVwjEmAVarqTgB3T3Vv7sZ71RepRm9PKrk"
   },
   "id":1
}
```

### 3. C-Chain으로 전송받은 토큰 확인

```
curl --location --request POST 'localhost:9650/ext/bc/C/rpc' --header 'Content-Type: application/json' --data-raw '{
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
        "0xD2eaBE72D124306e10ce58c329aEF45F0662C33C",
        "latest"
    ],
    "id": 1
}'
```

출력값

```
{
   "jsonrpc":"2.0",
   "id":1,
   "result":"0x18b22cd1401a00"
}
```

### 4. C-Chain 에서 X-Chain으로 AVAX 전송

C-Chain에서 X-Chain으로 자산을 내보내기 위해 `avax.export` 메서드를 호출합니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avax.export",
    "params" :{
        "to":"X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m",
        "amount": 500,
        "assetID": "AVAX",
        "username":"user",
        "password":"1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/C/avax
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "txID":"2Fy3MaTnYhcYQ5wnnTLZXwqv9vvyD9d496uq1WF6F1gLQWAfxk"
   },
   "id":1
}
```

X-Chain으로의 자산 이전을 완료하기 위해 `avm.import` 메서드를 호출합니다.

```
curl -X POST --data '{
    "jsonrpc":"2.0",
    "id"     :1,
    "method" :"avm.import",
    "params" :{
        "to":"X-local1vxsmdjp2w7myjucvx5tz8y7y4ltv6ajykyzc5m",
        "sourceChain":"C",
        "username":"user",
        "password":"1q2w!Q@W"
    }
}' -H 'content-type:application/json;' 127.0.0.1:9650/ext/bc/X
```

출력값

```
{
   "jsonrpc":"2.0",
   "result":{
      "txID":"2REmvsEX3Ybo7T4WYdxzW2oEixGh6gS7gGDLeJbgr1k5Bygepy"
   },
   "id":1
}
```

---

# 아발란체 로컬 네트워크 이미지 다운로드

[Docker Image](https://www.notion.so/Docker-Image-505846b8e00e44298afbb29e531786de)