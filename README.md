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

3. SearchInput 에러 해결

3.1 양방향 바인딩이 맞는건지..?

=> 아니다 다시 양방향 바인딩 사용 => 그래야지 검색 히스토리를 클릭시 검색 키워드를 변경하고, 이 변경사항을 searchInput에도 적용시킬 수 있다.
=> NoResult의 경우 updated될때 키워드 값을 변경해서 사용하자. => store의 값이 변했는데도, updated 훅이 실행을 안함

=> 😎 lastKeyword라는 새로운 값을 만들고, 검색을 할때마다 이 값을 변이시켜서 NoResult에서 사용

3.2 search 라우트 경로로 중복 이동 방지 => router.replace로 해결

3.3 검색 결과 없는 경우 키워드가 반영이 안된다
=> 처음 생성시에 데이터를 가져오므로

✔ branch => search/input-refactoring

1. 검색을하면 search 경로로 이동한다.

2. ✨ 이미 search 경로라면 경로를 변경하지 않는다.

=> ✨ 최초 search 경로로 갈때는 push
=> ✨ 그 이후에는 rouger.replace를 이용해서 query값만 변경한다.

😎: https://stackoverflow.com/questions/40382388/how-to-set-url-query-params-in-vue-with-vue-router

5. ✨ Vue js CJK 언어 정확하게 데이터바인딩하기

😎 : https://medium.com/@idchoi2/vue-js-%EC%97%90%EC%84%9C-%EC%A0%95%ED%99%95%ED%95%9C-cjk-%EC%A4%91%EA%B5%AD%EC%96%B4-%EC%9D%BC%EB%B3%B8%EC%96%B4-%ED%95%9C%EA%B8%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%94%EC%9D%B8%EB%94%A9-d7cb57c67edc

-   ✨ 소스

```javascript
<input v-on:input=”keyword = $event.target.value” v-on:keyup=”getRecommendations()”>
```

---

### 기본 플로우

1. 헤더 [O]

2. 검색 기능 [O]

2.1 검색 결과 [O]

2.2 검색 history

3. 메인 화면 []

4. 메인화면/상세 정보 []

5. 메인화면/재생 []

6. 메인화면/top10

7. 메인화면/영화 리스트 [O]

8. 메인화면/영화 리스트 슬라이더 [O]

9. 장르 페이지

10. 찜한 콘텐츠

11. my-list/내가 찜한 콘텐츠

12. latest/최신 콘텐츠

13. 영화 상세 정보

### 추가 플로우

1. 프로필 관리 페이지 접속

2. 프로필 선택

3. 홈페이지 리다이렉트

4. 프로필 추가

5. 프로필 추가 화면

6. 프로필 수정

7. 프로필 수정 페이지

8. FireBase 연동
