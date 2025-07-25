## 🚀 개발 시작하기

### Volta 설치하기

- volta를 설치하기 전에 설치된 Node.js를 제거하는 것을 권장합니다.

[문서 따르기](https://docs.volta.sh/guide/getting-started#windows-installation)

```bash
winget install Volta.Volta
```

### 개발서버 시작하기

```bash
# 1. 클론
git clone https://github.com/GreenWiNit/GreenWiNit-FE.git

# 2. 패키지 설치
cd GreenWiNit-FE
npm install

# 3. 개발 서버 실행
npm run dev
```

## 🤝 기여 방법

1. 브랜치를 생성합니다.
2. 기능을 개발하거나 수정합니다.
3. 커밋 메시지를 명확하게 작성합니다.
4. Pull Request를 요청합니다.

### 커밋메시지 / Branch / PR / Merge

- 커밋메시지 규칙은 적용하지 않았습니다. 더 나은 메시지를 작성하는데 관심있다면 [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716), [Conventional Commits](https://www.conventionalcommits.org/ko) 같은 글을 읽어보시는 걸 추천합니다.

- 모든 작업은 **브랜치 기반**으로 진행합니다. `main` 브랜치에서 직접 작업하지 마세요.
- Pull Request(PR)는 **작성자 외 팀원의 리뷰**와 **리더의 병합 승인**을 통해 `main`에 병합됩니다.
- PR은 작성자 외 팀원들이 내용을 확인하고 **동의(Approve)** 한 후 병합합니다.
- 가능하면 서로 **리뷰를 주고받는 문화**를 통해 코드 품질과 팀원의 성장 모두를 추구합니다.
- 리뷰 시에는 단순 승인보다는, 코드의 목적/구현/대안 등을 이해하고 질문하거나 개선 아이디어를 나눠주세요.

#### 브랜치 이름

| 브랜치명    | 설명                    |
| ----------- | ----------------------- |
| `main`      | 실제 라이브 서비스      |
| `feature/*` | 개별 기능 개발용 브랜치 |
| `fix/*`     | 버그 수정 브랜치        |

Q. 알 수 없는 이유로 커밋이 실패합니다.
A1. CLI 출력을 확인했을 때 "husky - pre-commit script failed" 같은 것이 확인된다면 커밋하기전에 실행되는 스크립트의 실패입니다.
린트, 포맷을 실행하는데 실패했는지 다시 확인해주세요.
A2. vscode로 커밋하는 경우 알럿팝업에서 "Open Git Log"나 "Show Command Output"을 눌러서 eslint output을 확인합니다. A1 답변 참고

### 코딩 규칙, 가이드라인, 개발 컨벤션

CODING_GUIDELINES.md를 참조해주세요.
