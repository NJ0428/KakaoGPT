# KakaoGPT

## 1. 프로젝트 소개

카카오톡 스타일의 GPT 기반 채팅 웹앱입니다. Node.js 백엔드와 React 프론트엔드로 구성되어 있으며, 실시간 채팅 및 다양한 채팅방 기능을 제공합니다.

## 2. 주요 기능

- 카카오톡 스타일의 채팅 UI
- 채팅방 선택 및 생성
- 메시지 입력 및 전송
- 서버와의 연동(백엔드: Node.js)

## 3. 설치 및 실행 방법

### 1) 의존성 설치

```bash
npm install
```

### 2) 개발 서버 실행

```bash
npm start
```

### 3) 접속 방법

- 브라우저에서 `http://localhost:3000` 접속

## 4. 폴더 구조

```
KakaoGPT/
├── img.jpg
├── package.json
├── package-lock.json
├── public/
│   ├── img.jpg
│   └── index.html
├── README.md
├── server.js           # Node.js 백엔드 서버
└── src/
    ├── App.js          # 메인 React 컴포넌트
    ├── App.css         # 전체 스타일
    ├── index.js        # 엔트리 포인트
    └── components/
        ├── ChatInput.js        # 채팅 입력창 컴포넌트
        ├── ChatMessage.js      # 채팅 메시지 컴포넌트
        ├── ChatRoom.js         # 채팅방 컴포넌트
        ├── ChatSelection.js    # 채팅방 선택 컴포넌트
        └── ChatSelection.css   # 채팅방 선택 스타일
```

## 5. 기여 방법

1. 이슈 또는 PR을 통해 자유롭게 의견을 남겨주세요.
2. 코드 수정 시, 기능별로 커밋 메시지를 작성해 주세요.
