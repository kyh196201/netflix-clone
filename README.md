# netflix-clone

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

# netflix-clone

### TodoList

1. Swiper 스크롤바, 네비게이션 버튼 CSS 수정
2. tmdb api 연동

3. Axios 에러 핸들링 및 에러 처리 컴포넌트

4. 로딩 컴포넌트 ==> 유튜브, 아프리카 처럼 미리 로딩 페이지 만들어놓기

5. 데이터를 한번에 불러오지않고, 레이지로딩 처럼불러오는 방법..?

6. 소스 리팩토링!!

7. Math.random()으로 movie id값 가져오고, browse의 백그라운드 영화 데이터 가져오기

8. 상세정보 컴포넌트 => 모달

9. 검색 기능

10. ....

---

### Api refactoring

1. 비동기 데이터를 컴포넌트에 전달하는 적합한 방법

: "검색어" = pass down async props vue

: https://dev.to/yasunoritanaka/pass-parent-s-async-data-to-child-component-in-nuxtjs-1bbo

비동기처리 유명한 글 : https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call

2. 반복되는 부분 줄이기

3. 스토어를 사용하는 올바른 로직..?

4. 스토어 모듈 만들기

---

-   짤막 노트

1. vuex actions : 비동기 요청을 일으키는 것

2. vuex mutations : 단순히 상태를 변경

3. vuex getters : computed와 비슷한 느낌??

4 vuex state : 상태 관리.

그러면 왜 actions, mutations를 구분했을까..?

상태 변이는 동기적이어야한다.

그런데 actions에서는 비동기를 처리할 수 있다.

actions에서 commit을 통해 상태를 변이한다.

---

-   생각 정리

1. my-list에 어떻게 추가할까?

vuex에 user모듈을 만들고, user 모듈안에 myList 프로퍼티를 만든다.

=> 영화 찜하기 버튼을 클릭했을 경우, 영화 데이터 전체를 넣을지 아니면, id 값만 넣을지..

1. 영화 데이터를 넣을경우 => getters로 리스트에서 데이터만 가져오면 된다.

2. 영화 아이디 값만 넣을 경우 => id값으로 다시 데이터를 요청해야한다.

---

-   생각 정리2

2. 상세보기 modal에 어떻게 띄울까

vuex에 selectedMovie : 라는 프로퍼티를 만들자 이 프로퍼티에 modal에 띄울 데이터를 담는다.

modal이 created될때 전달받은 영화 id를 통해 selectedMovie를 set하자.

#### 11/10

1. SearchInput 컴포넌트 생성

2. SearchResult 작성중

#### 11/11

1. SearchResult 완성 => 데이터 연동 성공

2. SearchInput 입력시, route의 쿼리가 같이 변하는 부분 생각해보기 => X

#### 11/12

1. SearchResult => 렌더링 하기 [O]

2. 무한 스크롤?!
