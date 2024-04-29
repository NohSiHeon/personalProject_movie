const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTkxNzZiZjc5YjQwOGM0NTczMWFjYjI3YTQyOTZiZSIsInN1YiI6IjY2Mjc5NmYxMjU4ODIzMDE3ZDkzY2Y5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KcmxaX1HaVpSUCVMkWhDuQrFIh2rY5s0OY3XfO9RE0c'
    }
};

let moviedata = [];

// api
const api = async function () {

    const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
    const rsp = await response.json()

    const map1 = [];

    for (let i = 0; i < rsp['results'].length; i++) {
        let temp = {};

        temp['title'] = rsp['results'][i]['title'];
        temp['overview'] = rsp['results'][i]['overview'];
        temp['vote_average'] = rsp['results'][i]['vote_average'];
        temp['id'] = rsp['results'][i]['id'];
        temp['poster_path'] = rsp['results'][i]['poster_path'];
        map1.push(temp);
    }
    moviedata = map1.map((x)=> x);
}
// img id값 구분주는 변수
let cardCount = 0;


const awake = async function () {
    await api();
    let imgNum = document.getElementById(`img${cardCount}`);
    moviedata.forEach((i) => {


        let title = i['title'];

        let overview = i['overview'];

        let vote_average = i['vote_average'];

        let poster_path = i['poster_path'];

        let id = i['id'];



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
    for (let i = 0; i < 20; i++) {

        imgNum = document.getElementById(`img${i}`);
        console.log(cardCount);

        imgNum.addEventListener("click", () => {
            alert(`영화 ID: ${moviedata[i]['id']}`);
        });
    }
    const searchBtn = document.getElementById('searchBtn');
    searchBtn.addEventListener("click", search);

}
awake();

// 검색
function search() {
    let inputValue = document.getElementById('inputText').value;


    let number = 0;
    moviedata.forEach((i) => {

        if (i['title'].search(inputValue) >= 0) {
            document.getElementById(`img${number}`).parentElement.style.display = "block"
        } else {
        
            document.getElementById(`img${number}`).parentElement.style.display = "none"
        }
        number++;
    });


}
