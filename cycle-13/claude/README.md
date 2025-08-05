# Claude Code, SuperClaude, 그리고 Claudia 완벽 가이드

## 목차
1. [클로드 코드, 슈퍼 클로드, 그리고 클로디아 소개](#1-클로드-코드-슈퍼-클로드-그리고-클로디아-소개)
2. [Cursor와의 비교](#2-cursor와의-비교)
3. [설치 가이드](#3-설치-가이드)
   - [클로드 코드 설치 (macOS)](#클로드-코드-설치-macos)
   - [IDE 플러그인 설치](#ide-플러그인-설치)
   - [슈퍼 클로드 설치](#슈퍼-클로드-설치)
   - [클로디아(Claudia) 설치](#클로디아claudia-설치)
4. [기본 사용법](#4-기본-사용법)
   - [클로드 코드 시작하기](#클로드-코드-시작하기)
   - [슈퍼 클로드 명령어](#슈퍼-클로드-명령어-sc-명령어들)
   - [터미널 통합 및 단축키](#터미널-통합-및-단축키)
5. [고급 기능 활용](#5-고급-기능-활용)
   - [페르소나(Personas) 활용법](#페르소나personas-활용법)
   - [플래그(Flags) 사용법](#플래그flags-사용법)
   - [MCP(Model Context Protocol) 통합](#mcpmodel-context-protocol-통합)
   - [워크플로우 자동화](#워크플로우-자동화)
   - [Git 워크플로우 자동화](#git-워크플로우-자동화)
6. [실전 예제](#6-실전-예제)
   - [프로젝트별 활용 사례](#프로젝트별-활용-사례)
   - [코드 분석, 디버깅, 리팩토링](#코드-분석-디버깅-리팩토링-예제)
   - [팀 협업 시나리오](#팀-협업-시나리오)
7. [팁과 트러블슈팅](#7-팁과-트러블슈팅)
   - [자주 묻는 질문](#자주-묻는-질문)
   - [일반적인 오류 해결법](#일반적인-오류-해결법)
   - [성능 최적화 팁](#성능-최적화-팁)
   - [고급 설정](#고급-설정)

---

## 1. 클로드 코드, 슈퍼 클로드, 그리고 클로디아 소개

### 클로드 코드(Claude Code)란?

**클로드 코드**는 Anthropic이 2024-2025년에 출시한 공식 터미널 기반 AI 코딩 어시스턴트입니다. 개발자가 터미널에서 자연어로 명령을 내려 코딩 작업을 수행할 수 있게 해주는 혁신적인 도구입니다.

#### 주요 특징
- **깊은 코드베이스 이해**: 전체 프로젝트 구조와 의존성을 파악하여 맥락에 맞는 제안 제공
- **직접적인 파일 조작**: 파일 편집, 터미널 명령 실행, Git 워크플로우 처리를 직접 수행
- **IDE 통합**: VS Code, JetBrains 등과 원활하게 통합
- **에이전틱 검색**: 수백만 줄의 코드베이스를 즉시 검색하고 분석
- **멀티파일 편집**: 여러 파일에 걸친 복잡한 수정사항을 한 번에 처리

#### 기반 모델
- **Claude Opus 4**: 복잡한 추론과 장시간 작업에 특화 (SWE-bench 72.5% 달성)
- **Claude Sonnet 4**: 일상적인 개발 작업에 최적화된 균형잡힌 모델

### 슈퍼 클로드(SuperClaude)란?

**슈퍼 클로드**는 Claude Code의 기능을 확장하는 오픈소스 프레임워크입니다. 크게 두 가지 주요 프로젝트가 있습니다:

#### SuperClaude Framework
- 19개의 전문 명령어 제공 (`/sc:implement`, `/sc:analyze` 등)
- 9개의 인지 페르소나 (architect, frontend, backend, security 등)
- 토큰 사용량 70% 절감으로 비용 효율성 극대화
- Git 체크포인트로 워크플로우 관리

#### SuperClaude GitHub Tool
- 스마트 커밋 메시지 자동 생성
- 인텔리전트 체인지로그 생성
- 자동 문서화 및 코드 리뷰

### 클로디아(Claudia)란?

**클로디아**는 Claude Code를 위한 GUI(그래픽 사용자 인터페이스) 애플리케이션입니다. 터미널 기반의 Claude Code에 시각적 인터페이스를 제공하여 더 직관적인 사용 경험을 제공합니다.

#### 주요 기능
- **시각적 프로젝트 관리**: GUI를 통한 프로젝트 및 세션 관리
- **커스텀 에이전트 생성**: 특정 작업에 특화된 AI 에이전트 설정
- **MCP 서버 관리**: 그래픽 인터페이스로 MCP 서버 추가/제거
- **사용량 대시보드**: 토큰 사용량과 비용을 실시간 시각화
- **크로스 플랫폼 지원**: macOS, Linux, Windows에서 동작

### 주요 차이점

| 항목 | Claude Code | SuperClaude | Claudia |
|------|-------------|-------------|---------|
| 개발사 | Anthropic (공식) | 오픈소스 커뮤니티 | 오픈소스 (getAsterisk) |
| 목적 | 기본 AI 코딩 어시스턴트 | Claude Code 기능 확장 | Claude Code GUI 인터페이스 |
| 인터페이스 | 터미널 (CLI) | 터미널 (CLI) | 그래픽 (GUI) |
| 설치 | 독립적으로 설치 | Claude Code 필요 | Claude Code와 함께 사용 |
| 비용 | Pro $17/월, Max $100/월 | 무료 (오픈소스) | 무료 (오픈소스) |
| 토큰 효율성 | 기본 | 70% 절약 | Claude Code 설정 따름 |
| 주요 특징 | AI 코딩 어시스턴트 | 전문 명령어, 페르소나 | 시각적 관리, 에이전트 |

### 왜 사용해야 하는가?

**개발 생산성 향상**
- 복잡한 리팩토링이 며칠에서 몇 시간으로 단축
- 전체 코드베이스를 이해하고 일관된 변경사항 적용
- 이슈에서 PR까지 전체 워크플로우 자동화

**AI 코딩 어시스턴트로서의 가치**
- GitHub Copilot보다 높은 코드 정확도
- 최대 7시간 연속 독립적 코딩 수행 가능
- 멀티모달 능력: 이미지, 그래프에서 코드 생성

**비용 효율성** (SuperClaude 사용 시)
- 토큰 사용량 70% 감소
- 체계적인 소프트웨어 엔지니어링 접근
- 자동화된 문서화로 시간 절약

**사용성 개선** (Claudia 사용 시)
- GUI를 통한 직관적인 프로젝트 관리
- 시각적 사용량 모니터링으로 비용 관리
- 커스텀 에이전트로 반복 작업 자동화
- 팀원 간 에이전트 공유로 협업 효율성 증대

---

## 2. Cursor와의 비교

### Claude Code + SuperClaude + Claudia vs Cursor 활용성 비교

| 비교 항목 | Claude Code + SuperClaude                                   | Cursor                                 | 활용성 우위 |
|-----------|-------------------------------------------------------------|----------------------------------------|------------|
| **AI 모델 선택** | Claude Opus 4 / Sonnet 4 자유 전환<br>작업별 최적 모델 자동 선택           | GPT-4, Claude 등 다중 모델<br>수동 전환 필요      | Claude Code ✓ |
| **전문가 페르소나** | 9개 전문 페르소나 (architect, security, frontend 등)<br>상황별 자동 활성화  | 단일 AI 어시스턴트<br>전문성 구분 없음               | Claude Code ✓✓ |
| **프로젝트 컨텍스트** | CLAUDE.md 계층적 메모리<br>Git 체크포인트 시스템                          | 프로젝트 인덱싱<br>세션 간 연속성 제한                | Claude Code ✓ |
| **토큰 효율성** | 70% 토큰 절약 (초압축 모드)<br>비용 최적화 자동화                            | 일반적인 토큰 사용<br>수동 최적화 필요                | Claude Code ✓✓ |
| **터미널 통합** | 네이티브 터미널 환경<br>직접 명령 실행                                     | IDE 내장 터미널<br>간접 실행                    | Claude Code ✓ |
| **커스텀 명령어** | 프로젝트별 슬래시 명령어<br>팀 공유 가능                                    | 기본 명령어 세트<br>제한적 확장                    | Claude Code ✓ |
| **증거 기반 코딩** | 공식 문서 자동 조회 (C7)<br>환각 방지 CRITICAL 규칙                       | AI 추천 의존<br>검증 수동 수행                   | Claude Code ✓✓ |
| **워크플로우 자동화** | 페르소나 체인 워크플로우<br>병렬 에이전트 실행                                 | 단일 스레드 작업<br>순차적 처리                    | Claude Code ✓ |
| **IDE 통합** | VS Code, JetBrains 플러그인<br>터미널 우선 설계                        | VS Code 포크<br>완전 통합 환경                 | Cursor ✓ |
| **GUI 인터페이스** | Claudia로 시각적 관리 가능<br>프로젝트/에이전트 GUI 관리                    | 기본 IDE UI만 제공<br>추가 GUI 도구 없음         | Claude Code ✓ |
| **초보자 친화성** | Claudia GUI로 접근성 개선<br>터미널과 GUI 선택 가능                      | 직관적 UI<br>즉시 사용 가능                     | 동등 |
| **설치 및 설정** | 다단계 설치 과정<br>Claudia는 추가 빌드 필요                             | 원클릭 설치<br>즉시 사용                        | Cursor ✓✓ |
| **가격** | 사용량 기반 과금<br>SuperClaude/Claudia 무료<br>opus 모델은 $100이상의 max 요금부터 가능 | 월 $20 고정 요금<br>opus 모델은 $200이상의 요금제 필요 | 사용량에 따라 다름 |

### 활용성 종합 평가

**Claude Code + SuperClaude + Claudia가 유리한 경우:**
- 대규모 프로젝트나 복잡한 아키텍처 작업
- 팀 협업이 중요한 환경 (Claudia의 에이전트 공유)
- 비용 최적화가 필요한 경우 (시각적 모니터링)
- 터미널과 GUI를 모두 활용하고 싶은 경우
- 전문적이고 체계적인 개발 프로세스
- 커스텀 AI 에이전트를 만들어 사용하고 싶은 경우

**Cursor가 유리한 경우:**
- 빠른 프로토타이핑
- 개인 프로젝트나 소규모 개발
- IDE 통합 환경 선호
- 즉시 시작하고 싶은 초보자
- 단순하고 직관적인 도구 선호

전문 개발팀이나 복잡한 프로젝트에서는 Claude Code + SuperClaude + Claudia의 강력한 기능과 유연성이 빛을 발하며, 개인 개발자나 빠른 개발이 필요한 상황에서는 Cursor의 간편함이 장점으로 작용합니다. Claudia를 추가로 사용하면 터미널이 익숙하지 않은 개발자도 Claude Code의 강력한 기능을 GUI를 통해 쉽게 활용할 수 있습니다.

---

## 3. 설치 가이드

### 시스템 요구사항
- **운영체제**: macOS 10.15 이상 (Apple Silicon 네이티브 지원)
- **하드웨어**: 최소 4GB RAM (8GB 이상 권장)
- **소프트웨어**: Node.js 18+ 
- **네트워크**: 안정적인 인터넷 연결 필요
- **지원 IDE**: 
  - VS Code (및 Cursor, Windsurf 등의 포크)
  - JetBrains IDE (WebStorm, IntelliJ IDEA, PyCharm 등)

### 클로드 코드 설치 (macOS)

#### 방법 1: Homebrew를 사용한 설치 (권장)

**1단계: Homebrew 설치 확인**
```bash
# Homebrew가 설치되어 있는지 확인
brew --version

# 없다면 설치
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**2단계: Node.js 설치**
```bash
# Node.js 20.x 설치 (최신 LTS 버전)
brew install node

# 설치 확인
node --version  # v20.x.x 이상
npm --version   # 10.x.x 이상
```

**3단계: Claude Code 설치**
```bash
# npm을 사용한 전역 설치
npm install -g @anthropic-ai/claude-code

# 또는 네이티브 설치 스크립트 사용 (더 빠름)
curl -fsSL https://claude.ai/install.sh | bash

# 설치 확인
claude --version
```

#### 방법 2: 직접 다운로드 설치

```bash
# Claude Code 바이너리 직접 다운로드 (Apple Silicon 네이티브)
curl -L https://releases.anthropic.com/claude-code/latest/darwin-arm64.tar.gz -o claude-code.tar.gz

# 압축 해제 및 설치
tar -xzf claude-code.tar.gz
sudo mv claude /usr/local/bin/

# 실행 권한 부여
sudo chmod +x /usr/local/bin/claude
```

#### Apple Silicon 호환성 확인

```bash
# 네이티브 ARM64 바이너리 확인
file $(which claude)
# 출력: Mach-O 64-bit executable arm64

# Rosetta 2 없이 실행되는지 확인
# Activity Monitor에서 claude 프로세스가 'Apple' 종류로 표시되어야 함
```

### 초기 설정 및 환경 구성

#### API 키 설정
```bash
# 환경 변수로 설정 (권장)
export ANTHROPIC_API_KEY="your-api-key-here"

# 영구 설정 (zsh 사용)
echo 'export ANTHROPIC_API_KEY="your-api-key-here"' >> ~/.zshrc
source ~/.zshrc

# 또는 .env 파일 사용
echo "ANTHROPIC_API_KEY=your-api-key-here" > ~/.claude/.env
```

#### macOS 보안 설정
```bash
# 처음 실행 시 보안 경고가 나타날 경우
xattr -d com.apple.quarantine /usr/local/bin/claude

# 또는 시스템 환경설정에서 허용
# 시스템 환경설정 → 보안 및 개인정보 보호 → 일반 → "확인 없이 열기" 클릭
```

#### 프로젝트 초기화
```bash
# 프로젝트 디렉토리로 이동
cd your-project

# Claude Code 시작
claude

# CLAUDE.md 파일 생성 (프로젝트 컨텍스트)
/init
```

### IDE 플러그인 설치

#### VS Code 확장 설치

**방법 1: VS Code 내에서 설치**
1. VS Code에서 Extensions 패널 열기 (⌘+Shift+X)
2. "Claude Code" 검색
3. Anthropic의 공식 "Claude Code" 확장 설치
4. VS Code 재시작

**방법 2: 터미널에서 자동 설치**
```bash
# 프로젝트에서 Claude Code 실행
claude

# VS Code가 열려있는 상태에서 자동으로 확장 설치됨
# IDE 통합이 자동으로 감지되면 "VS Code integration detected" 메시지 표시
```

**VS Code 확장 기능**
- **⌘+Esc**: VS Code에서 바로 Claude Code 실행
- **인라인 편집**: 변경사항이 VS Code diff viewer에 직접 표시
- **파일 참조 단축키**: ⌘+Option+K로 파일 참조 삽입 (@file#L1-99)
- **선택 영역 공유**: 현재 선택한 코드가 자동으로 Claude Code와 공유
- **진단 정보 공유**: 린트 오류, 구문 오류 등이 자동으로 전달

#### WebStorm (JetBrains IDE) 플러그인 설치

**방법 1: IDE 마켓플레이스에서 설치**
1. WebStorm 실행
2. **Preferences** → **Plugins** (⌘+,)
3. Marketplace 탭에서 "Claude Code [Beta]" 검색
4. Install 클릭
5. IDE 재시작 (여러 번 재시작이 필요할 수 있음)

**방법 2: 터미널에서 자동 설치**
```bash
# WebStorm의 내장 터미널에서
cd your-project
claude

# 플러그인이 자동으로 설치되며 "JetBrains integration detected" 메시지 표시
```

**WebStorm 플러그인 기능**
- **⌘+Esc**: WebStorm에서 바로 Claude Code 실행
- **인라인 diff 뷰어**: 변경사항이 IDE의 diff 뷰어에 표시
- **파일 참조 단축키**: ⌘+Option+K (Mac)
- **현재 탭/선택 영역 자동 공유**
- **진단 정보 자동 전달**

**JetBrains Remote Development 설정**
```bash
# 원격 호스트에서 플러그인 설치 필요
# Settings → Plugins (Host) 에서 설치
```

#### IDE 통합 설정

**통합 상태 확인**
```bash
# Claude Code에서
/ide

# 출력 예시:
# ✓ VS Code integration active
# ✓ WebStorm integration active
```

**Diff 도구 설정**
```bash
# 자동 감지 모드 (권장)
/config
# diff_tool을 'auto'로 설정

# 또는 특정 IDE 지정
/config set diff_tool vscode
/config set diff_tool jetbrains
```

**문제 해결**
```bash
# IDE 통합이 작동하지 않을 때
1. IDE와 Claude Code 모두 재시작
2. 프로젝트 루트에서 claude 실행 확인
3. 플러그인이 활성화되어 있는지 확인
4. /ide 명령으로 상태 확인
```

#### VS Code 터미널 통합 설정
```bash
# VS Code 설정 파일 열기
code ~/Library/Application\ Support/Code/User/settings.json

# 다음 설정 추가
{
  "terminal.integrated.env.osx": {
    "ANTHROPIC_API_KEY": "your-api-key-here"
  },
  "terminal.integrated.defaultProfile.osx": "zsh",
  "claude.autoInstallExtension": true,
  "claude.showDiffInEditor": true
}
```

### 슈퍼 클로드 설치

#### 기본 설치 (Git 방법)
```bash
# 리포지토리 클론
git clone https://github.com/NomenAK/SuperClaude.git
cd SuperClaude

# 설치 스크립트 실행
chmod +x install.sh
./install.sh

# 설치 확인
ls -la ~/.claude/
```

#### 빠른 설치 (curl)
```bash
# 안정 버전 설치
curl -fsSL https://raw.githubusercontent.com/NomenAK/SuperClaude/main/install.sh | bash

# zsh 설정 자동 업데이트
source ~/.zshrc
```

#### macOS 특화 설정
```bash
# 자동 완성 활성화
echo 'source ~/.claude/completions/claude.zsh' >> ~/.zshrc

# 별칭 설정 (선택사항)
echo 'alias sc="claude --superclaude"' >> ~/.zshrc
source ~/.zshrc
```

#### 설치 후 구조
```
~/.claude/
├── CLAUDE.md          # 메인 구성 파일
├── RULES.md          # 운영 규칙
├── PERSONAS.md       # 9개 인지 페르소나
├── MCP.md           # Model Context Protocol
└── commands/        # 19개 전문 명령어
```

### 클로디아(Claudia) 설치

#### 클로디아란?

**Claudia**는 Claude Code를 위한 강력한 GUI 애플리케이션 및 툴킷입니다. 터미널 기반의 Claude Code에 시각적 인터페이스를 제공하여 더 직관적이고 편리한 개발 경험을 제공합니다.

**주요 특징**
- **시각적 프로젝트 관리**: GUI를 통한 프로젝트 및 세션 관리
- **커스텀 에이전트**: 특정 작업에 특화된 AI 에이전트 생성 및 관리
- **MCP 서버 통합**: GUI에서 MCP 서버를 쉽게 추가하고 관리
- **사용량 대시보드**: 토큰 사용량과 비용을 시각적으로 모니터링
- **크로스 플랫폼**: macOS, Linux, Windows 지원

#### 시스템 요구사항

**공통 요구사항**
- Git (소스 코드 클론용)
- Rust 1.70+ (Tauri 백엔드)
- Bun 1.0+ (JavaScript 런타임)
- Node.js 18+ (일부 의존성)

**macOS 추가 요구사항**
- macOS 10.15 이상
- Xcode Command Line Tools
- Apple Silicon 네이티브 지원

**Linux 추가 요구사항**
- GTK3, WebKitGTK 등 GUI 라이브러리

#### 클로디아 설치 과정

**1단계: 필수 도구 설치**

```bash
# Git 설치 (macOS)
brew install git

# Git 설치 (Ubuntu/Debian)
sudo apt install git

# Rust 설치
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source ~/.cargo/env

# Bun 설치
curl -fsSL https://bun.sh/install | bash
```

**2단계: 플랫폼별 의존성 설치**

macOS:
```bash
# Xcode Command Line Tools
xcode-select --install

# 추가 도구 (선택사항)
brew install pkg-config
```

Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install -y \
  libwebkit2gtk-4.1-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev \
  patchelf \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libxdo-dev \
  libsoup-3.0-dev \
  libjavascriptcoregtk-4.1-dev
```

**3단계: 클로디아 소스 코드 클론 및 빌드**

```bash
# 리포지토리 클론
git clone https://github.com/getAsterisk/claudia.git
cd claudia

# 의존성 설치
bun install

# 개발 모드 실행
bun run tauri dev

# 프로덕션 빌드
bun run tauri build

# macOS 유니버설 바이너리 빌드
bun run tauri build --target universal-apple-darwin
```

#### 클로디아 주요 기능

**1. CC Projects (프로젝트 관리)**
```
프로젝트 선택 → 세션 보기 → 재개 또는 새로 시작
```
- Claude Code 세션을 GUI로 관리
- 프로젝트별 대화 히스토리 저장
- 여러 프로젝트 간 빠른 전환

**2. CC Agents (AI 에이전트 관리)**
```
에이전트 생성 → 구성 → 실행
```
- 커스텀 시스템 프롬프트 설정
- 모델 선택 (Opus/Sonnet/Haiku)
- 권한 관리 (파일 읽기/쓰기, 네트워크 접근)
- 에이전트 설정 내보내기/가져오기

**3. MCP Manager (MCP 서버 관리)**
```
메뉴 → MCP 매니저 → 서버 추가 → 구성
```
- GUI에서 MCP 서버 추가/제거
- 서버 상태 실시간 모니터링
- 환경 변수 및 설정 관리

**4. Usage Dashboard (사용량 분석)**
```
메뉴 → 사용량 대시보드 → 분석 보기
```
- 토큰 사용량 시각화
- 비용 추적 및 예측
- 모델별 사용 통계

#### 클로디아 프로젝트 구조

```
claudia/
├── src/                   # React 프론트엔드
│   ├── components/        # UI 컴포넌트
│   ├── lib/               # API 클라이언트 및 유틸리티
│   └── assets/            # 정적 자산
├── src-tauri/             # Rust 백엔드
│   ├── src/
│   │   ├── commands/      # Tauri 명령 핸들러
│   │   ├── sandbox/       # 보안 샌드박싱
│   │   └── checkpoint/    # 타임라인 관리
│   └── tests/             # Rust 테스트 스위트
└── public/                # 공개 자산
```

#### 에이전트 설정 형식

```json
{
  "version": 1,
  "exported_at": "2025-01-23T14:29:58.156063+00:00",
  "agent": {
    "name": "프론트엔드 전문가",
    "icon": "bot",
    "model": "sonnet",
    "system_prompt": "당신은 React와 TypeScript 전문가입니다...",
    "default_task": "React 컴포넌트 개발 및 최적화",
    "sandbox_enabled": true,
    "enable_file_read": true,
    "enable_file_write": true,
    "enable_network": false
  }
}
```

#### 클로디아 개발 워크플로우

**개발 명령어**
```bash
# 개발 서버 시작
bun run tauri dev

# 프론트엔드만 실행
bun run dev

# 타입 체크
bunx tsc --noEmit

# Rust 테스트
cd src-tauri && cargo test

# 코드 포맷팅
cd src-tauri && cargo fmt

# 디버그 빌드
bun run tauri build --debug
```

**실행 파일 직접 실행**
```bash
# Linux/macOS
./src-tauri/target/release/claudia

# Windows
./src-tauri/target/release/claudia.exe
```

#### 클로디아와 Claude Code 통합

**1. 클로디아에서 Claude Code 실행**
- 프로젝트 선택 후 "터미널에서 열기" 클릭
- 자동으로 해당 디렉토리에서 `claude` 명령 실행
- GUI와 터미널 간 원활한 전환

**2. 에이전트 활용**
```bash
# 클로디아에서 만든 에이전트를 Claude Code에서 사용
claude --agent "프론트엔드 전문가"

# 또는 에이전트 설정 파일 직접 로드
claude --agent-config ./agents/frontend-expert.json
```

**3. MCP 서버 공유**
- 클로디아에서 설정한 MCP 서버가 Claude Code에서도 사용 가능
- 통합된 설정 관리로 일관성 유지

#### 클로디아 활용 시나리오

**1. 멀티 프로젝트 관리**
```
1. 클로디아 실행
2. 여러 프로젝트 등록
3. 프로젝트 간 빠른 전환
4. 각 프로젝트별 세션 히스토리 관리
```

**2. 팀 에이전트 공유**
```
1. 팀 표준 에이전트 생성
2. JSON 파일로 내보내기
3. Git에 커밋하여 팀 공유
4. 팀원들이 가져와서 사용
```

**3. 비용 모니터링**
```
1. Usage Dashboard 열기
2. 일별/주별/월별 사용량 확인
3. 비용 알림 설정
4. 최적화 포인트 식별
```

---

## 4. 기본 사용법

### 클로드 코드 시작하기

#### 기본 실행
```bash
# 프로젝트 디렉토리에서
claude

# 초기 프롬프트와 함께 시작
claude "explain this project"

# 최근 대화 계속
claude -c
```

#### 주요 내장 명령어
| 명령어 | 설명 |
|--------|------|
| `/help` | 도움말 표시 |
| `/clear` | 대화 히스토리 초기화 |
| `/model` | AI 모델 변경 (Opus/Sonnet) |
| `/cost` | 토큰 사용량 및 비용 확인 |
| `/init` | CLAUDE.md 파일 생성 |
| `/review` | 코드 리뷰 수행 |
| `/status` | 현재 상태 확인 |

### 추가 내장 명령어

| 명령어 | 설명 | 사용 예시 |
|--------|------|----------|
| `/resume` | 이전 대화 세션 재개 | `/resume` |
| `/memory` | 프로젝트/사용자 메모리 설정 | `/memory add "프로젝트는 React 18 사용"` |
| `/diff` | 변경사항 표시 방식 설정 | `/diff unified` |
| `/permissions` | 파일 조작 권한 설정 | `/permissions` |
| `/terminal-setup` | 터미널 통합 설정 | `/terminal-setup` |
| `/compact` | 대화 내역 압축 | `/compact "로그인 기능 완료"` |
| `/export` | 대화 내역 내보내기 | `/export markdown` |
| `/mcp` | MCP 서버 목록 확인 | `/mcp list` |
| `/theme` | 터미널 테마 변경 | `/theme dark` |
| `/ide` | IDE 통합 상태 확인 | `/ide` |
| `/config` | 설정 값 확인/변경 | `/config set auto_save true` |
| `/checkpoint` | 현재 상태 저장 | `/checkpoint "v1.0 완료"` |
| `/rollback` | 이전 체크포인트로 복원 | `/rollback v1.0` |
| `/stats` | 세션 통계 확인 | `/stats` |
| `/search` | 프로젝트 내 검색 | `/search "TODO"` |
| `/log` | 작업 로그 확인 | `/log --last 10` |
| `/alias` | 명령어 별칭 생성 | `/alias dc "docker-compose"` |
| `/env` | 환경 변수 관리 | `/env set NODE_ENV production` |
| `/task` | 작업 목록 관리 | `/task add "API 문서화"` |
| `/timer` | 작업 시간 측정 | `/timer start "버그 수정"` |

### 고급 명령어 옵션

**파일 조작 관련**
```bash
/edit file.js --line 10-20  # 특정 라인만 편집
/create --template react     # 템플릿으로 파일 생성
/delete --confirm           # 확인 후 삭제
```

**대화 관리**
```bash
/clear --keep-memory        # 메모리는 유지하고 대화만 초기화
/export --format json       # JSON 형식으로 내보내기
/compact --aggressive       # 공격적 압축 모드
```

**디버깅 지원**
```bash
/debug --trace             # 상세 추적 모드
/profile --memory          # 메모리 프로파일링
/benchmark "code block"    # 성능 벤치마크
```

### 슈퍼 클로드 명령어 (/sc 명령어들)

#### 개발 명령어
```bash
# 기능 구현
/sc:implement user-authentication

# 프로젝트 빌드
/sc:build --react --magic --tdd

# 시스템 설계
/sc:design --api --ddd
```

#### 분석 명령어
```bash
# 코드 분석
/sc:analyze src/ --focus security

# 문제 해결
/sc:troubleshoot "database connection error"

# 코드 설명
/sc:explain complex-algorithm.js
```

#### 품질 관리
```bash
# 코드 개선
/sc:improve --performance

# 테스트 생성
/sc:test --coverage 80%

# 코드 정리
/sc:cleanup --unused-imports
```

### 터미널 통합 및 단축키

#### 효율적인 단축키 (macOS)
- **Shift+Tab**: 모드 전환 (기본 → 자동 → 계획)
- **Escape**: Claude 중단
- **Escape (2번)**: 이전 메시지로 이동
- **Shift+Return**: 새 줄 추가
- **Tab**: 파일명 자동완성
- **⌘+K**: 터미널 클리어
- **⌘+C**: 현재 작업 중단

#### 파일 참조
```bash
# @ 기호로 파일 참조
"@src/index.js의 버그를 수정해주세요"

# 여러 파일 참조
"@package.json과 @tsconfig.json을 확인하고..."
```

---

## 5. 고급 기능 활용

### 페르소나(Personas) 활용법

#### 페르소나란?

**개념 이해**
페르소나는 Claude Code에게 특정 전문가의 역할을 부여하는 기능입니다. 마치 프로젝트에 다양한 전문가를 고용하는 것과 같습니다. 각 페르소나는 고유한:
- 사고방식과 접근 방법
- 우선순위와 관심사
- 선호하는 도구와 기법
- 커뮤니케이션 스타일

을 가지고 있습니다.

**작동 원리**
```bash
# 페르소나 활성화
/persona:architect

# 이제 Claude는:
# - 장기적 관점에서 사고
# - 확장성과 유지보수성 우선시
# - 다이어그램과 패턴 중심 설명
# - Sequential과 C7 도구 적극 활용
```

#### 9개 전문 페르소나 상세 가이드

**1. Architect (시스템 설계자)**
```bash
/persona:architect

# 핵심 특성
- 신념: "시스템은 변화를 위해 설계되어야 한다"
- 질문: "이것이 어떻게 확장될 것인가?"
- 도구: Sequential(복잡한 시스템 분석), C7(패턴 연구)

# 사용 예시
"마이크로서비스 아키텍처로 전환하는 로드맵을 작성해주세요"
```

**2. Frontend (UI/UX 개발자)**
```bash
/persona:frontend

# 핵심 특성
- 신념: "사용자 경험이 제품을 결정한다"
- 질문: "사용자가 이것을 어떻게 느낄까?"
- 도구: Magic(UI 컴포넌트), Puppeteer(브라우저 테스트)

# 사용 예시
"모바일 반응형 네비게이션 컴포넌트를 만들어주세요"
```

**3. Backend (서버 개발자)**
```bash
/persona:backend

# 핵심 특성
- 신념: "신뢰성이 최우선이다"
- 질문: "이것이 얼마나 안정적인가?"
- 도구: Sequential(성능 분석), C7(API 패턴)

# 사용 예시
"데이터베이스 연결 풀 최적화 방안을 제시해주세요"
```

**4. Security (보안 전문가)**
```bash
/persona:security

# 핵심 특성
- 신념: "모든 입력은 위협이다"
- 질문: "무엇이 잘못될 수 있는가?"
- 도구: Sequential(위협 분석), C7(보안 모범 사례)

# 사용 예시
"이 API의 보안 취약점을 분석하고 개선안을 제시해주세요"
```

**5. Analyzer (문제 해결사)**
```bash
/persona:analyzer

# 핵심 특성
- 신념: "모든 증상에는 근본 원인이 있다"
- 질문: "증거가 무엇을 말하는가?"
- 도구: 모든 MCP 도구 활용

# 사용 예시
"프로덕션에서 간헐적으로 발생하는 메모리 누수를 추적해주세요"
```

**6. QA (품질 보증 전문가)**
```bash
/persona:qa

# 핵심 특성  
- 신념: "테스트되지 않은 코드는 버그다"
- 질문: "엣지 케이스는 무엇인가?"
- 도구: Puppeteer(E2E 테스트), Sequential(테스트 시나리오)

# 사용 예시
"결제 프로세스의 종합적인 테스트 계획을 수립해주세요"
```

**7. Performance (성능 전문가)**
```bash
/persona:performance

# 핵심 특성
- 신념: "밀리초가 중요하다"
- 질문: "병목 지점은 어디인가?"
- 도구: Sequential(성능 프로파일링)

# 사용 예시
"React 앱의 초기 로딩 시간을 50% 단축하는 방법을 찾아주세요"
```

**8. Refactorer (코드 품질 전문가)**
```bash
/persona:refactorer

# 핵심 특성
- 신념: "깨끗한 코드는 빠른 코드다"
- 질문: "이것을 더 간단하게 만들 수 있을까?"
- 도구: Sequential(코드 분석)

# 사용 예시
"레거시 jQuery 코드를 현대적인 React로 마이그레이션해주세요"
```

**9. Mentor (교육자)**
```bash
/persona:mentor

# 핵심 특성
- 신념: "이해가 해결책보다 중요하다"
- 질문: "왜 이렇게 작동하는가?"
- 도구: C7(문서), Sequential(단계별 설명)

# 사용 예시
"React Hooks의 작동 원리를 초보자도 이해할 수 있게 설명해주세요"
```

#### 페르소나 조합 전략

**순차적 페르소나 체인**
```bash
# 새 기능 개발 워크플로우
/persona:architect
"사용자 알림 시스템 설계"

/persona:backend  
"알림 API 구현"

/persona:frontend
"알림 UI 컴포넌트 구현"

/persona:security
"구현된 시스템의 보안 검토"

/persona:qa
"통합 테스트 작성"
```

**자동 페르소나 활성화**
```bash
# 파일 확장자 기반
*.tsx, *.jsx → frontend 자동 활성화
*.sql, *.go → backend 자동 활성화

# 키워드 기반
"버그", "오류" → analyzer 자동 활성화
"보안", "취약점" → security 자동 활성화
```

### 플래그(Flags) 사용법

#### MCP 서버 제어
```bash
# Context7 문서 조회
/sc:analyze --c7

# Sequential 복잡한 분석
/sc:troubleshoot --seq

# Magic UI 생성
/sc:build --magic

# 모든 MCP 서버 활성화
/sc:implement --all-mcp
```

#### 작업 제어 플래그
```bash
# 자동 위임
/sc:implement feature --delegate auto

# 반복적 개선
/sc:improve --loop

# 안전 모드
/sc:refactor --safe-mode

# 미리보기
/sc:cleanup --preview
```

### MCP(Model Context Protocol) 통합

#### MCP란?

**개념 이해**
MCP는 Claude Code가 외부 도구와 데이터 소스에 접근할 수 있게 해주는 프로토콜입니다. 마치 스마트폰의 앱처럼, Claude Code에 다양한 기능을 추가할 수 있습니다.

**작동 원리**
```
Claude Code <--> MCP Protocol <--> External Tools
                                    ├── Databases
                                    ├── APIs
                                    ├── File Systems
                                    └── Custom Services
```

#### SuperClaude의 4대 MCP 서버

**1. Context7 (C7) - 문서 연구 도구**
```bash
# 활성화
/sc:analyze --c7

# 기능
- 공식 문서 자동 검색
- API 레퍼런스 조회
- 라이브러리 사용법 연구
- 베스트 프랙티스 수집

# 사용 예시
"--c7 플래그로 React 18의 새로운 기능들을 조사해주세요"
```

**2. Sequential - 심층 분석 도구**
```bash
# 활성화
/sc:troubleshoot --seq

# 기능
- 복잡한 로직 단계별 분석
- 시스템 아키텍처 매핑
- 성능 병목 지점 추적
- 의존성 그래프 생성

# 사용 예시
"--seq 플래그로 이 재귀 함수의 시간 복잡도를 분석해주세요"
```

**3. Magic - UI 생성 도구**
```bash
# 활성화
/sc:build --magic

# 기능
- UI 컴포넌트 자동 생성
- 디자인 시스템 통합
- 반응형 레이아웃 구성
- 애니메이션 효과 추가

# 사용 예시
"--magic 플래그로 대시보드 위젯을 만들어주세요"
```

**4. Puppeteer - 브라우저 자동화**
```bash
# 활성화
/sc:test --play

# 기능
- E2E 테스트 자동화
- 스크린샷 캡처
- 성능 메트릭 수집
- 크로스 브라우저 테스트

# 사용 예시
"--play 플래그로 체크아웃 프로세스를 테스트해주세요"
```

#### MCP 서버 관리

**서버 추가 및 설정**
```bash
# 기본 MCP 서버 추가
claude mcp add my-database-server /path/to/server

# 환경 변수와 함께 추가
claude mcp add postgres-mcp \
  -e DATABASE_URL="postgresql://localhost:5432/mydb" \
  -- /usr/local/bin/postgres-mcp

# 모든 서버 목록 확인
claude mcp list

# 서버 상세 정보
claude mcp get postgres-mcp

# 서버 제거
claude mcp remove postgres-mcp
```

**프로젝트별 MCP 설정 (.mcp.json)**
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "/usr/local/bin/postgres-mcp",
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    },
    "custom-api": {
      "command": "node",
      "args": ["./tools/api-server.js"],
      "env": {
        "API_KEY": "${CUSTOM_API_KEY}"
      }
    }
  }
}
```

**MCP 서버 범위**
```bash
# 1. 로컬 범위 (현재 프로젝트만)
claude mcp add local-db /path/to/server

# 2. 프로젝트 범위 (Git에 공유)
claude mcp add shared-db -s project /path/to/server

# 3. 사용자 범위 (모든 프로젝트)
claude mcp add my-tools -s user /path/to/server
```

#### 실전 MCP 활용 예제

**데이터베이스 연동**
```bash
# PostgreSQL MCP 서버 설정
claude mcp add postgres-mcp \
  --connection-string "postgresql://user:pass@localhost:5432/mydb"

# 사용
"users 테이블의 스키마를 분석하고 TypeScript 타입을 생성해주세요"
"지난 30일간 가장 활발한 사용자 10명을 찾는 쿼리를 작성해주세요"
```

**GitHub 통합**
```bash
# GitHub MCP 서버 설정
claude mcp add github-mcp \
  -e GITHUB_TOKEN="${GITHUB_TOKEN}" \
  -- npx @modelcontextprotocol/server-github

# 사용
"최근 일주일간 머지된 PR들을 요약해주세요"
"open 상태인 이슈 중 'bug' 라벨이 있는 것들을 분석해주세요"
```

**커스텀 MCP 서버 만들기**
```javascript
// custom-mcp-server.js
const { Server } = require('@modelcontextprotocol/server');

const server = new Server({
  name: 'my-custom-server',
  version: '1.0.0',
  capabilities: ['read', 'write']
});

server.on('request', async (request) => {
  // 커스텀 로직 구현
  if (request.method === 'search') {
    return await searchInternalDocs(request.params.query);
  }
});

server.start();
```

### 워크플로우 자동화

#### CLAUDE.md 파일 이해하기

**CLAUDE.md란?**
CLAUDE.md는 Claude Code가 프로젝트의 맥락을 이해하도록 돕는 '프로젝트 설명서'입니다. 마치 새로운 팀원에게 프로젝트를 소개하는 문서와 같은 역할을 합니다.

**기본 개념**
- Claude Code가 매 세션마다 자동으로 읽는 마크다운 파일
- 프로젝트의 구조, 규칙, 선호사항을 저장
- 계층적 구조로 여러 레벨에서 작동

**CLAUDE.md 파일 구조**
```markdown
# Project: E-commerce Platform

## Architecture
- Frontend: React 18 + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL + Redis
- Authentication: JWT with refresh tokens

## Coding Standards
- Use TypeScript strict mode
- Follow Airbnb ESLint rules
- Minimum 80% test coverage
- Use conventional commits

## Key Commands
- `npm run dev`: Start development server
- `npm test`: Run test suite
- `npm run build`: Production build

## Important Notes
- Never commit .env files
- Always update tests when changing logic
- Use feature branches for new development
```

**계층적 CLAUDE.md 사용**
```bash
# 1. 글로벌 설정 (~/.claude/CLAUDE.md)
"모든 프로젝트에서 TypeScript를 선호합니다"

# 2. 프로젝트 루트 (./CLAUDE.md)
"이 프로젝트는 React 18을 사용합니다"

# 3. 하위 디렉토리 (./src/api/CLAUDE.md)
"API 엔드포인트는 RESTful 규칙을 따릅니다"

# Claude는 가장 구체적인 설정을 우선 적용
```

**동적 메모리 추가**
```bash
# 대화 중 메모리 추가
"#auth-flow 인증 플로우는 JWT와 refresh token을 사용합니다"

# 자동으로 적절한 CLAUDE.md 파일에 저장됨
```

#### 커스텀 명령어 생성

**커스텀 명령어란?**
프로젝트나 팀에 특화된 반복 작업을 한 번의 명령으로 실행할 수 있게 해주는 기능입니다.

**기본 구조**
```bash
# 커스텀 명령어 디렉토리 생성
mkdir -p .claude/commands

# 명령어 파일 생성 (파일명이 명령어가 됨)
touch .claude/commands/deploy.md
```

**실전 커스텀 명령어 예제**

1. **배포 자동화 명령어**
```markdown
# .claude/commands/deploy.md
프로덕션 배포를 준비하고 실행하세요:

1. 현재 브랜치가 main인지 확인
2. 모든 테스트 실행 (npm test)
3. 빌드 생성 (npm run build)
4. 변경사항 요약 생성
5. 배포 스크립트 실행 준비

$ARGUMENTS 환경으로 배포

안전 체크:
- 환경 변수 확인
- 데이터베이스 마이그레이션 필요 여부
- 롤백 계획 수립
```

사용: `/deploy production`

2. **코드 리뷰 명령어**
```markdown
# .claude/commands/review.md
다음 파일/디렉토리를 상세히 리뷰하세요: $ARGUMENTS

리뷰 체크리스트:
- [ ] 코드 스타일 가이드 준수
- [ ] 성능 최적화 가능성
- [ ] 보안 취약점
- [ ] 테스트 커버리지
- [ ] 문서화 상태
- [ ] 접근성 고려사항

각 항목에 대해 구체적인 개선사항을 제시하세요.
```

사용: `/review src/components/Payment`

3. **데이터베이스 마이그레이션**
```markdown
# .claude/commands/db/migrate.md
데이터베이스 마이그레이션을 생성하세요:

마이그레이션 이름: $ARGUMENTS

요구사항:
1. up() 및 down() 메서드 구현
2. 트랜잭션 사용
3. 인덱스 최적화 고려
4. 기존 데이터 보존
5. 롤백 가능하도록 설계

TypeORM/Sequelize/Prisma 형식으로 생성
```

사용: `/db/migrate add-user-preferences-table`

4. **API 엔드포인트 생성**
```markdown
# .claude/commands/api.md
RESTful API 엔드포인트를 생성하세요: $ARGUMENTS

포함 사항:
- Express 라우터 설정
- 입력 검증 (Joi/Zod)
- 에러 핸들링
- 인증/인가 미들웨어
- Swagger 문서화
- 유닛 테스트
- 통합 테스트

CRUD 작업 모두 구현하고 적절한 HTTP 상태 코드를 사용하세요.
```

사용: `/api products`

**고급 커스텀 명령어 기법**

```bash
# 조건부 명령어
cat > .claude/commands/optimize.md << 'EOF'
최적화 대상: $ARGUMENTS

파일 확장자에 따라 다른 최적화 수행:
- .js/.ts: 번들 크기 최적화
- .css: 중복 제거 및 압축
- .png/.jpg: 이미지 최적화
- .json: 민감한 정보 제거

최적화 전후 비교 리포트 생성
EOF

# 체인 명령어
cat > .claude/commands/feature.md << 'EOF'
새 기능 "$ARGUMENTS" 개발 시작:

1. /sc:git checkout -b feature/$ARGUMENTS
2. /sc:design --ddd
3. /sc:implement --tdd
4. /sc:test --coverage 80
5. /sc:document
6. /commit
EOF
```

**프로젝트 vs 사용자 명령어**
```bash
# 프로젝트 명령어 (Git에 포함)
.claude/commands/deploy.md

# 사용자 전역 명령어 (모든 프로젝트)
~/.claude/commands/personal-review.md

# 팀 공유 명령어 (Git 서브모듈)
.claude/shared-commands/team-standards.md
```

---

## 6. 실전 예제

### 프로젝트별 활용 사례

#### React 프로젝트 시작
```bash
# 1. 프로젝트 초기화
claude
/init

# 2. 아키텍처 설계
/persona:architect
"React + TypeScript + Tailwind CSS를 사용한 Todo 앱 설계"

# 3. 컴포넌트 구현
/persona:frontend
/sc:implement --react --magic "TodoList 컴포넌트"

# 4. 테스트 작성
/sc:test TodoList --coverage 90%
```

#### 백엔드 API 개발
```bash
# 1. API 설계
/persona:backend
/sc:design "RESTful API for user management"

# 2. 구현
/sc:implement --express --typescript "user CRUD endpoints"

# 3. 보안 검토
/persona:security
/sc:analyze --security api/
```

#### IDE 플러그인을 활용한 워크플로우

**VS Code에서의 작업 흐름**
```bash
# 1. VS Code에서 파일 열기
# 2. 코드 선택 후 ⌘+Esc로 Claude Code 실행
# 3. "선택한 코드를 TypeScript로 리팩토링하고 테스트 추가"

# 또는 터미널 통합
# VS Code 터미널에서 직접 실행
claude "현재 열린 파일의 함수들에 JSDoc 주석 추가"
```

**WebStorm에서의 디버깅 워크플로우**
```bash
# 1. 오류가 있는 파일에서 ⌘+Esc
# 2. Claude Code가 자동으로 진단 정보 수신
# 3. "현재 표시된 오류들을 수정해주세요"

# Diff 뷰어에서 변경사항 검토 후 적용
```

### 코드 분석, 디버깅, 리팩토링 예제

#### 코드 분석 시나리오
```bash
# 전체 프로젝트 분석
/sc:analyze --code

# 특정 모듈 집중 분석
/sc:analyze src/auth/ --focus performance

# 보안 취약점 스캔
/persona:security
/sc:scan --security --owasp
```

#### 디버깅 워크플로우
```bash
# 1. 문제 분석
/sc:troubleshoot "TypeError: Cannot read property 'id' of undefined"

# 2. 관련 코드 검토
/persona:analyzer
"@src/services/userService.js의 getUserById 함수 분석"

# 3. 수정 및 테스트
"버그를 수정하고 유닛 테스트를 추가해주세요"
```

#### 리팩토링 프로세스
```bash
# 1. 코드 품질 분석
/sc:analyze --code-quality

# 2. 리팩토링 계획
/persona:refactorer
"이 레거시 코드를 현대적인 패턴으로 리팩토링 계획 수립"

# 3. 단계별 실행
/sc:improve --step-by-step --safe-mode
```

### 팀 협업 시나리오

#### PR 리뷰 자동화
```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Claude Review
        run: |
          claude review --pr ${{ github.event.pull_request.number }}
```

#### 팀 표준화
```bash
# 팀 공유 CLAUDE.md
cat > CLAUDE.md << EOF
# Team Standards

## 코드 리뷰 체크리스트
- [ ] 테스트 커버리지 80% 이상
- [ ] 타입 안정성 확인
- [ ] 보안 취약점 없음
- [ ] 성능 영향 검토

## 커밋 메시지 형식
- feat: 새로운 기능
- fix: 버그 수정
- docs: 문서 업데이트
- refactor: 코드 개선

## 아키텍처 원칙
- DDD(Domain-Driven Design) 적용
- 마이크로서비스 간 느슨한 결합
- CQRS 패턴 사용
- 이벤트 소싱 고려
EOF
```

#### 페르소나 기반 팀 워크플로우

**1. 새 기능 개발 프로세스**
```bash
# Step 1: 아키텍트가 설계
/persona:architect
"결제 시스템 마이크로서비스 아키텍처 설계"

# Step 2: 백엔드 개발자가 API 구현
/persona:backend
/sc:implement payment-api --ddd --event-sourcing

# Step 3: 프론트엔드 개발자가 UI 구현
/persona:frontend
/sc:build payment-form --react --accessible

# Step 4: 보안 전문가가 검토
/persona:security
/sc:analyze payment-system --owasp --pci-dss

# Step 5: QA가 테스트 수행
/persona:qa
/sc:test payment-flow --e2e --coverage
```

**2. 프로덕션 이슈 대응**
```bash
# 긴급 대응 팀 구성
# Analyzer가 문제 진단
/persona:analyzer
"프로덕션에서 5분마다 메모리 사용량이 급증하는 문제 분석"

# Performance 전문가가 최적화
/persona:performance
"메모리 누수 지점을 찾고 최적화 방안 제시"

# Backend가 핫픽스 구현
/persona:backend
/sc:implement memory-leak-fix --urgent --safe-mode
```

**3. 코드 품질 개선 스프린트**
```bash
# Refactorer가 개선 대상 식별
/persona:refactorer
/sc:analyze legacy-code --code-smells

# Mentor가 팀 교육
/persona:mentor
"식별된 안티패턴들을 모던 패턴으로 전환하는 방법 설명"

# 각 개발자가 담당 모듈 개선
/persona:refactorer
/sc:improve user-module --step-by-step
```

#### 일일 스탠드업 자동화
```bash
# 일일 리포트 생성
cat > .claude/commands/daily.md << EOF
어제 이후의 활동을 요약하세요:

1. 완료된 작업 (커밋 분석)
2. 진행 중인 작업 (열린 브랜치)
3. 블로커 (미해결 이슈)
4. 오늘의 계획

Slack 형식으로 출력
EOF

# 사용
/daily | slack-cli post --channel=#dev-team
```

#### 코드 리뷰 문화 정착
```bash
# 리뷰어 체크리스트
cat > .claude/commands/reviewer-checklist.md << EOF
PR #$ARGUMENTS 리뷰:

**기능적 정확성**
- [ ] 요구사항 충족
- [ ] 엣지 케이스 처리
- [ ] 에러 핸들링

**코드 품질**
- [ ] 가독성
- [ ] 유지보수성
- [ ] DRY 원칙

**성능**
- [ ] 시간/공간 복잡도
- [ ] 데이터베이스 쿼리 최적화
- [ ] 캐싱 전략

**보안**
- [ ] 입력 검증
- [ ] 인증/인가
- [ ] 민감 데이터 처리

각 항목에 대한 구체적 피드백 제공
EOF
```

---

## 7. 팁과 트러블슈팅

### 자주 묻는 질문

**Q: Claude Code가 명령어를 찾을 수 없다고 나옵니다.**
```bash
# PATH 확인
echo $PATH

# npm 전역 경로 추가
echo 'export PATH="/usr/local/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# npm 전역 설치 경로 확인
npm config get prefix
```

**Q: "command not found: claude" 오류가 발생합니다.**
```bash
# npm 재설치
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code

# 심볼릭 링크 생성
ln -s $(npm root -g)/@anthropic-ai/claude-code/bin/claude /usr/local/bin/claude
```

**Q: IDE 플러그인이 Claude Code를 찾지 못합니다.**
```bash
# PATH에 claude가 있는지 확인
which claude

# IDE를 터미널에서 실행하여 환경 변수 상속
# VS Code
code .

# WebStorm
webstorm .
```

**Q: API 키 오류가 발생합니다.**
```bash
# API 키 확인
echo $ANTHROPIC_API_KEY

# 재설정
export ANTHROPIC_API_KEY="sk-ant-..."

# keychain에 저장 (보안 강화)
security add-generic-password -a "$USER" -s "ANTHROPIC_API_KEY" -w "your-api-key"
```

**Q: 토큰 사용량이 너무 많습니다.**
```bash
# SuperClaude 설치로 70% 절약
# 정기적으로 /clear 사용
# /compact로 대화 압축
```

### 일반적인 오류 해결법

#### Node.js 버전 문제
```bash
# 버전 확인 (18+ 필요)
node --version

# Homebrew로 업그레이드
brew update
brew upgrade node

# 또는 nvm 사용 (버전 관리)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.zshrc
nvm install 20
nvm use 20
nvm alias default 20
```

#### macOS 권한 문제
```bash
# npm 전역 설치 권한 오류 시
sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}

# 또는 npm 디렉토리 재설정
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

#### Apple Silicon 호환성 문제
```bash
# Rosetta 2가 필요한 경우 (일부 종속성)
softwareupdate --install-rosetta --agree-to-license

# 네이티브 ARM64 버전 강제 사용
arch -arm64 npm install -g @anthropic-ai/claude-code

# 프로세스 아키텍처 확인
# Activity Monitor에서 Claude Code가 'Apple' 타입으로 실행되는지 확인
```

### 성능 최적화 팁

#### macOS 메모리 최적화
```bash
# Claude Code 메모리 사용량 확인
ps aux | grep claude

# 메모리 제한 설정
export CLAUDE_MAX_MEMORY=4096  # 4GB로 제한
echo 'export CLAUDE_MAX_MEMORY=4096' >> ~/.zshrc
```

#### 토큰 사용량 최적화

**1. 컨텍스트 관리 전략**
```bash
# 새 작업 시작 시 항상 clear
/clear

# 대화 압축 (토큰 70% 절약)
/compact "authentication implementation 완료, 이제 테스트 작성"

# 필요한 파일만 참조
"@src/auth/*.js를 확인해주세요"  # ❌ @src/**/* 대신

# 큰 파일은 부분만 참조
"@package.json#L10-30의 dependencies를 확인해주세요"
```

**2. SuperClaude 토큰 절약 기능**
```bash
# 초압축 모드 활성화
/sc:analyze --uc  # Ultra-compressed mode

# 자동 압축 설정
echo "auto_compress_threshold: 3000" >> ~/.claude/config.yml

# 응답 길이 제한
/sc:explain function --answer-only  # 불필요한 설명 제외
```

**3. .claudeignore 파일 활용**
```bash
# 대용량/불필요 파일 제외
cat > .claudeignore << EOF
# 의존성
node_modules/
vendor/
.pnpm-store/

# 빌드 결과물
dist/
build/
*.min.js
*.min.css

# 테스트 커버리지
coverage/
.nyc_output/

# 대용량 에셋
*.mp4
*.zip
*.tar.gz

# 자동 생성 파일
package-lock.json
yarn.lock
EOF
```

#### 효율적인 프롬프팅

**구체적이고 명확한 지시**
```bash
# ❌ 나쁜 예
"코드를 개선해주세요"
"버그를 고쳐주세요"

# ✅ 좋은 예
"@src/api/userController.js의 getUserById 함수에서
1. try-catch로 에러 핸들링 추가
2. 입력값 검증 로직 추가
3. TypeScript 타입 정의 추가"

# ✅ IDE 활용 예
# 코드 선택 후 ⌘+Esc
"선택한 함수의 시간 복잡도를 O(n²)에서 O(n log n)으로 개선"
```

**응답 형식 지정**
```bash
# 코드만 받기
"수정된 코드만 보여주세요. 설명은 필요 없습니다."

# 단계별 설명
"단계별로 번호를 매겨 설명해주세요."

# 특정 형식 요구
"마크다운 테이블 형식으로 정리해주세요."
```

#### 모델 선택 전략

**작업별 최적 모델**
| 작업 유형 | 추천 모델 | 이유 |
|----------|----------|------|
| 복잡한 리팩토링 | Claude Opus 4 | 깊은 추론 능력 |
| 간단한 버그 수정 | Claude Sonnet 4 | 빠른 응답 |
| 코드 설명 | Claude Sonnet 4 | 비용 효율적 |
| 아키텍처 설계 | Claude Opus 4 | 전체적 사고 |
| 문서 작성 | Claude Sonnet 4 | 충분한 성능 |

**모델 전환 방법**
```bash
# 현재 모델 확인
/model

# 모델 변경
/model opus-4
/model sonnet-4

# 작업별 자동 전환 설정
cat > ~/.claude/model-rules.yml << EOF
rules:
  - pattern: "architect|design|refactor"
    model: "opus-4"
  - pattern: "fix|bug|typo"
    model: "sonnet-4"
  - pattern: "explain|document"
    model: "sonnet-4"
EOF
```

#### Apple Silicon 성능 최적화

**CPU 사용률 모니터링**
```bash
# Activity Monitor에서 확인사항:
# 1. Claude Code가 'Apple' 타입으로 실행 중인지
# 2. CPU 사용률이 효율 코어를 활용하는지
# 3. 메모리 압력이 녹색 상태인지

# 터미널에서 실시간 모니터링
top -pid $(pgrep -f claude)
```

**대용량 프로젝트 최적화**
```bash
# 1. 프로젝트 인덱싱 최적화
/index --fast  # 빠른 인덱싱 (정확도 약간 감소)

# 2. 검색 범위 제한
/config set search_depth 3  # 최대 3단계 깊이만 검색

# 3. 캐시 활용
export CLAUDE_CACHE_DIR=~/.claude/cache
echo 'export CLAUDE_CACHE_SIZE=2G' >> ~/.zshrc
```

#### 병렬 처리 활용

**여러 Claude 인스턴스 실행**
```bash
# tmux/screen을 사용한 병렬 작업
tmux new-session -d -s frontend 'cd frontend && claude'
tmux new-session -d -s backend 'cd backend && claude'
tmux new-session -d -s tests 'cd tests && claude'

# VS Code에서 여러 터미널 탭
# 각 탭에서 다른 모듈 작업
```

**작업 큐 시스템**
```bash
# 작업 목록 생성
cat > tasks.txt << EOF
/sc:test auth-module
/sc:improve database-queries
/sc:document api-endpoints
EOF

# 순차 실행
while read task; do
  echo "$task" | claude --dangerously-skip-permissions
done < tasks.txt
```

### 고급 설정

#### 커스텀 훅 설정
```javascript
// ~/.claude/hooks.mjs
export async function preEdit({ filePath, oldContent }) {
  // 보호된 파일 체크
  if (filePath.includes('.env.production')) {
    throw new Error('프로덕션 환경 파일은 수정할 수 없습니다');
  }
  return { proceed: true };
}
```

#### IDE별 커스텀 설정

**VS Code 커스텀 키바인딩**
```json
// keybindings.json
{
  "key": "cmd+shift+c",
  "command": "claude.openWithContext",
  "when": "editorTextFocus"
}
```

**WebStorm 라이브 템플릿**
```xml
<!-- Claude Code 빠른 실행 템플릿 -->
<template name="claude" value="claude &quot;$SELECTION$&quot;" />
```

#### macOS 키체인 통합
```bash
# API 키를 키체인에 안전하게 저장
security add-generic-password \
  -a "$USER" \
  -s "ANTHROPIC_API_KEY" \
  -w "your-api-key-here" \
  -T /usr/local/bin/claude

# ~/.zshrc에 자동 로드 설정
echo 'export ANTHROPIC_API_KEY=$(security find-generic-password -a "$USER" -s "ANTHROPIC_API_KEY" -w)' >> ~/.zshrc
```

#### Git 워크플로우 최적화
```bash
# 여러 브랜치 동시 작업
git worktree add ../feature-auth feature/auth
cd ../feature-auth
claude

# 자동 커밋 메시지
claude "변경사항을 검토하고 의미있는 커밋 메시지를 생성해주세요"
```

#### iTerm2 통합 (선택사항)
```bash
# iTerm2 프로필 설정
echo '
{
  "Claude Code": {
    "Working Directory": "~/Projects",
    "Custom Command": "Yes",
    "Command": "claude",
    "Initial Text": "/init"
  }
}' > ~/Library/Application\ Support/iTerm2/DynamicProfiles/claude.json
```

---

## 마무리

### 핵심 개념 정리

**Claude Code**
- Anthropic의 공식 AI 코딩 어시스턴트
- 터미널과 IDE에서 직접 실행
- 전체 코드베이스 이해 및 직접 수정

**SuperClaude**
- Claude Code의 기능을 확장하는 프레임워크
- 19개 전문 명령어와 9개 페르소나
- 토큰 사용량 70% 절감

**CLAUDE.md**
- 프로젝트 컨텍스트를 저장하는 설정 파일
- 계층적 구조로 세밀한 제어 가능
- 팀 표준과 개인 선호사항 관리

**페르소나**
- 전문가의 사고방식을 AI에 부여
- 작업에 맞는 최적의 접근 방식 제공
- 순차적 체인으로 복잡한 워크플로우 구성

**MCP**
- 외부 도구와 데이터 소스 연결
- 데이터베이스, API, 커스텀 서비스 통합
- 프로젝트별/사용자별 설정 가능

### 추천 학습 경로
1. **기본 설치 및 설정** 완료
   - Claude Code 설치
   - IDE 플러그인 설정
   - API 키 구성

2. **간단한 프로젝트**에서 기본 명령어 연습
   - 코드 설명 및 리팩토링
   - 버그 수정
   - 문서화

3. **SuperClaude 설치**로 고급 기능 활용
   - 전문 명령어 사용
   - 페르소나 활용
   - 토큰 최적화

4. **페르소나와 플래그** 조합으로 전문적 사용
   - 복잡한 아키텍처 설계
   - 보안 검토
   - 성능 최적화

5. **팀 표준화**로 협업 효율성 극대화
   - CLAUDE.md 공유
   - 커스텀 명령어 생성
   - Git 워크플로우 자동화

### 실전 팁 요약

**효율성 극대화**
- 항상 `/clear`로 새 작업 시작
- 구체적이고 명확한 지시 제공
- 적절한 모델 선택 (Opus vs Sonnet)
- `.claudeignore`로 불필요한 파일 제외

**비용 최적화**
- SuperClaude 설치로 토큰 70% 절약
- `/compact`로 대화 압축
- `--uc` 플래그로 초압축 모드 사용
- 필요한 파일만 선택적 참조

**협업 강화**
- 팀 공유 CLAUDE.md 작성
- Git 훅으로 코드 품질 자동 검증
- PR 템플릿과 리뷰 자동화
- 페르소나 기반 역할 분담

### 참고 링크

#### 영문 자료
- [Anthropic 공식 문서](https://docs.anthropic.com)
- [Claude Code IDE 통합 가이드](https://docs.anthropic.com/en/docs/claude-code/ide-integrations)
- [SuperClaude GitHub](https://github.com/NomenAK/SuperClaude)
- [VS Code Marketplace - Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
- [JetBrains Plugin - Claude Code [Beta]](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)
- [Claudia 공식 사이트](https://claudiacode.com/)
- [Claudia GitHub](https://github.com/getAsterisk/claudia)

#### 한국어 자료

**공식 문서 및 가이드**
- [Anthropic Claude Code 한국어 문서](https://docs.anthropic.com/ko/docs/claude-code/overview)
- [Claude Code 사용 가이드 - 터미널 AI 코딩 어시스턴트](https://claude.develop-on.co.kr/ko/)
- [Claude Code 한국어 튜토리얼](https://docs.anthropic.com/ko/docs/agents-and-tools/claude-code/tutorials)

**블로그 및 커뮤니티**
- [클로드 코드 (Claude Code) 총정리 - 프롬프트해커 대니](https://www.magicaiprompts.com/docs/claude/claude-code/)
- [클로드 코드 리뷰: 10배의 코더가 되는 방법](https://apidog.com/kr/blog/claude-code-kr/)
- [슈퍼클로드: 클로드 코드 즉시 강화하기](https://apidog.com/kr/blog/superclaude-kr/)
- [클라우디아 오픈소스 Claude 코드 GUI 사용 후기](https://apidog.com/kr/blog/claudia-the-gui-for-claude-code-kr/)
- [Claude Code를 위한 경량 프레임워크 "SuperClaude"](https://discuss.pytorch.kr/t/superclaude-claude-code/7188)
- [Claude code 를 사용하자 - Velog](https://velog.io/@bang9dev/just-use-claude-code)
- [Claude Code 사용 가이드 - 하이퍼리즘 기술 블로그](https://tech.hyperithm.com/claude_code_guides)
- [SuperClaude 사용자 가이드](https://vibenewb.com/boards/board-1/posts/8)

**GitHub 프로젝트**
- [Claude Code Mastering (한국어 가이드북)](https://github.com/revfactory/claude-code-mastering)

