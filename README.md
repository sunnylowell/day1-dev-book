Backoffice Next
===============

common backoffice Next ver.

## Installation

```shell
npm ci
```

## Database Migration

데이터베이스는 @day1co/redstone-database-schema 를 사용합니다.

```shell
mysql -uroot -proot -h127.0.0.1 -e "DROP DATABASE fastcampus_test; CREATE DATABASE IF NOT EXISTS fastcampus_test CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
NODE_ENV=test REDSTONE_MYSQL_URL='mysql://root:root@127.0.0.1/fastcampus_test' npm run test:migrate -w server  
```

## Dev

로컬 구동시 아래와 같이 config-repo 의 내용을 Override 해 사용합니다.

```shell
export D1_ENV=development
export D1_SITE=fastcampus
export DATABASE_PRIMARY_HOST=127.0.0.1
export DATABASE_PRIMARY_USER=root
export DATABASE_PRIMARY_PASSWORD=root
export DATABASE_PRIMARY_DATABASE=fastcampus_staging
export DATABASE_PRIMARY_PORT=3306

# 다음중 골라 사용하세요.
export SPRING_CLOUD_CONFIG_URI=http://config.day1co.io
export SPRING_CLOUD_CONFIG_URI=http://localhost:8888 # Config Server Proxy 를 사용하려면 이 설정을 추가해야 합니다.
export SPRING_CLOUD_CONFIG_URI="file:/path/to/json/xxx.json"
npm run dev # npm run dev:client, npm run dev:server, npm run dev:config-server-proxy
```

# Config

Config 는 다음 중 선택해 사용할 수 있습니다.

1. Config Server
1. Config File
1. Config Server Proxy

### Config Server 

```shell
export SPRING_CLOUD_CONFIG_URI=http://config.day1co.io
```

`SPRING_CLOUD_CONFIG_URI` 를 설정하지 하지 않으면 config.day1co.io 를 사용합니다.

### Config File

config server 에서 받아온 파일을 직접 사용합니다.
파일을 사용하기 위해서는 `SPRING_CLOUD_CONFIG_URI` 환경변수에 파일을 지정해야 합니다.

`file: + 절대경로` 형식으로 사용합니다.

```shell
export SPRING_CLOUD_CONFIG_URI=file:/Users/.../xxx.json 
```

### Config Server Proxy

config server 를 proxy 하여 사용합니다. 이 명령은 `npm run dev` 에 포함되어 있습니다.

Proxy 서버를 사용해 config.day1co.io 를 localhost:8888 으로 사용합니다.
이전 요청에서 받은 config 를 미리 저장했두었다 다음 요청에 사용하고, 백그라운드에서 캐시를 갱신합니다.

```shell
npm run dev:config-server-proxy
```

이 캐시 서버를 사용하기 위해서는 환경변수가 설정되어야 합니다.
```shell
export SPRING_CLOUD_CONFIG_URI=http://localhost:8888 # Config Server Proxy 를 사용하려면 이 설정을 추가해야 합니다.
```

# Tools

## Model Generation

데이터베이스로부터 Entity 와 DTO를 생성하고 원하는 모듈디렉터리로 복사합니다.

```shell
# Entity, DTO, Interface 생성
npm run export:model -w tools
# Entity, DTO, Interface 를 원하는 모듈 디렉터리로 복사
npm run export:copy -w tools -- all course-settlement-detail settlements/course-settlement-detail # all, entity, dto, interface
```

### 복사되는 위치
* entity - server/src/모듈/디렉터리/entities/
* dto - server/src/모듈/디렉터리/dto/
* interface - shared/src/모듈/디렉터리/interfaces/

---
may the **SOURCE** be with you...
