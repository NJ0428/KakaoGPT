# KakaoGPT React 챗봇

OpenAI GPT API를 사용한 KakaoTalk 스타일의 채팅 인터페이스입니다. 바닐라 JavaScript에서 React로 리팩토링되었습니다.

## 🚀 주요 기능

- 📱 KakaoTalk과 유사한 UI/UX
- 🤖 OpenAI GPT-4 Turbo와의 실시간 채팅
- ⚡ React hooks를 활용한 현대적인 상태 관리
- 📱 반응형 디자인
- 🎨 깔끔하고 직관적인 인터페이스

## 🛠️ 기술 스택

- **React 18** - 최신 React 버전
- **OpenAI API** - GPT-4 Turbo 모델
- **CSS3** - 커스텀 스타일링
- **JavaScript ES6+** - 최신 JavaScript 문법

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. OpenAI API 키 설정

`src/App.js` 파일에서 다음 부분을 찾아 실제 API 키로 변경하세요:

```javascript
const openai = new OpenAI({
  apiKey: "Your api key", // 여기에 실제 OpenAI API 키 입력
  dangerouslyAllowBrowser: true,
});
```

### 3. 개발 서버 실행

```bash
npm start
```

브라우저에서 `http://localhost:3000`을 열어 애플리케이션을 확인할 수 있습니다.

### 4. 프로덕션 빌드

```bash
npm run build
```

## 📂 프로젝트 구조

```
KakaoGPT/
├── public/
│   ├── index.html          # HTML 템플릿
│   └── img.jpg            # 프로필 이미지
├── src/
│   ├── components/
│   │   ├── ChatMessage.js  # 개별 메시지 컴포넌트
│   │   └── ChatInput.js   # 입력 필드 컴포넌트
│   ├── App.js             # 메인 앱 컴포넌트
│   ├── App.css           # 스타일시트
│   └── index.js          # React 엔트리 포인트
├── package.json          # 의존성 및 스크립트
└── README.md            # 프로젝트 문서
```

## 🎯 주요 컴포넌트

### App.js

- 메인 애플리케이션 컴포넌트
- 메시지 상태 관리
- OpenAI API 호출 로직
- 전체 레이아웃 관리

### ChatMessage.js

- 개별 채팅 메시지 렌더링
- 사용자/AI 메시지 구분
- 프로필 이미지 표시

### ChatInput.js

- 메시지 입력 필드
- 전송 버튼
- 엔터 키 지원
- 로딩 상태 처리

## 🔧 커스터마이징

### 스타일 변경

`src/App.css` 파일에서 색상, 크기, 레이아웃을 수정할 수 있습니다.

### API 설정 변경

`src/App.js`에서 OpenAI API 파라미터를 조정할 수 있습니다:

- `model`: 사용할 GPT 모델
- `temperature`: 응답의 창의성 (0-1)
- `max_tokens`: 최대 응답 길이

## 📝 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
