const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTkxNzZiZjc5YjQwOGM0NTczMWFjYjI3YTQyOTZiZSIsInN1YiI6IjY2Mjc5NmYxMjU4ODIzMDE3ZDkzY2Y5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KcmxaX1HaVpSUCVMkWhDuQrFIh2rY5s0OY3XfO9RE0c'
    }
};

let movieData = [];

// api
const api = async function () {

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const rsp = await response.json()

    const map1 = [];

    for (let i = 0; i < rsp['results'].length; i++) {
        const temp = {};

        temp['title'] = rsp['results'][i]['title'];
        temp['overview'] = rsp['results'][i]['overview'];
        temp['vote_average'] = rsp['results'][i]['vote_average'];
        temp['id'] = rsp['results'][i]['id'];
        temp['poster_path'] = rsp['results'][i]['poster_path'];
        map1.push(temp);
    }
    movieData = map1.map((x) => x);
}
// img id값 구분하게 하는 변수
let cardCount = 0;


const awake = async function () {
    await api();
    let imgNum = document.getElementById(`img${cardCount}`);
    movieData.forEach((i) => {


        let title = i['title'];
        let overview = i['overview'];
        let vote_average = i['vote_average'];
        let poster_path = i['poster_path'];



        // 카드 추가
        let appendCard = `
            <div>
                <div class="card" style="width: 18rem;">
                    
                        <img id="img${cardCount}" src="https://image.tmdb.org/t/p/w500/${poster_path}" class="card-img-top" alt="...">
                    
                    
                        <div class="card-body">
                            <h5 class="card-title" style="font-weight: bold;">${title}</h5>
                            <p class="card-text">${overview}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">평점: ${vote_average}</li>
                        </ul>
                </div>
            </div>
        `;
        document.querySelector("#main").innerHTML += appendCard;


        cardCount++;

    });
    // 각 포스터에 별개의 id 값을 부여하기 위한 반복
    for (let i = 0; i < 20; i++) {

        // 포스터 클릭에 대한 이벤트 추가
        imgNum = document.getElementById(`img${i}`);
        imgNum.addEventListener("click", () => {
            alert(`영화 ID: ${movieData[i]['id']}`);
        });
    }
    // 검색 버튼에 대한 이벤트 추가
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener("click", search);

}
awake();

// 검색
function search() {
    // input에 있는 값에 접근
    let inputValue = document.getElementById('inputText').value;

    let number = 0;

    movieData.forEach((i) => {
        // movieData에 있는 타이틀과 input에 넣은 값을 비교 후 있으면 보이게, 없으면 안보이게 설정
        if (i['title'].toLowerCase().search(inputValue.toLowerCase()) >= 0) {
            document.getElementById(`img${number}`).parentElement.style.display = "block"
        } else {
            document.getElementById(`img${number}`).parentElement.style.display = "none"
        }
        number++;
    });

console.log('asdasdasd')

}