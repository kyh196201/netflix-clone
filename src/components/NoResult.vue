<template>
    <div class="noResult-wrapper">
        <div class="noResult">
            <p class="noResult__result">
                입력하신 검색어 "{{ keyword }}"(와)과 일치하는 결과가 없습니다.
            </p>
            <div class="noResult__recommend">
                <h3 class="noResult__recommend__title">추천 검색어</h3>
                <ul class="noResult__recommend__list">
                    <li>다른 키워드를 입력해보세요.</li>
                    <li>TV프로그램이나 영화를 찾고있으신가요?</li>
                    <li>
                        영화 제목, TV프로그램 제목, 또는 배우나 감독의 이름으로
                        검색해보세요.
                    </li>
                    <li>
                        코미디, 로맨스, 스포츠 또는 드라마와 같은 장르명으로
                        검색해 보세요.
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NoResult",
    props: ["keyword"],
};
</script>

<style>
.noResult-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 50px 0;
}

.noResult {
    color: white;
    font-size: 16px;
}

.noResult__result {
    margin-bottom: 10px;
}

.noResult__recommend__title {
    margin-bottom: 15px;
}

.noResult__recommend__list {
    padding-left: 50px;
    font-size: 14px;
    list-style: initial;
}

.noResult__recommend__list li {
    line-height: 1.4;
}
</style>
