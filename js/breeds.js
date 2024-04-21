// MAX == 50
// https://dog.ceo/api/breeds/image/random/42
// https://dog.ceo/api/breeds/list/all

const num = 42;
const apiRandomDogs = `https://dog.ceo/api/breeds/image/random/${num}`;
const apiAllBreeds = 'https://dog.ceo/api/breeds/list/all';
const requestRd = new XMLHttpRequest();
const requestAll = new XMLHttpRequest();

const header = document.getElementById('header');
const filterText = document.getElementById('filter-text');
const filterBtn = document.getElementById('filter-button');
const filterSelect = document.getElementById('filter-select');
const main = document.getElementById('main');

const more = document.getElementById('more');
const tothetop = document.getElementById('tothetop');

const resetBtn = document.getElementById('reset');

const currentDogs = [];

// 강아지 리스트 뿌리기 함수
function displayDogs(item) {
    const dogImgDiv = document.createElement('div');
    dogImgDiv.classList.add('flex-item');
    dogImgDiv.innerHTML = `
        <img src=${item}>
    `;
    main.appendChild(dogImgDiv);
}

window.addEventListener('load', function(){
    // 강아지 사진 뿌리기 (랜덤)
    requestRd.open('get',apiRandomDogs);
    requestRd.addEventListener('load', function(){
        const response = JSON.parse(requestRd.response);
        response.message.forEach(function(item){
            currentDogs.push(item);
            displayDogs(item);
        });
    });
    requestRd.send();

    // select 에 견종 정보 뿌리기
    requestAll.open('get', apiAllBreeds);
    requestAll.addEventListener('load', function(){
        const response = JSON.parse(requestAll.response);
        const keys = Object.keys(response.message);
        keys.forEach(function(item){
            const option = document.createElement('option');
            option.textContent = item;
            option.value = item;
            filterSelect.appendChild(option);
        });

    });
    requestAll.send();
});

// 필터링 버튼 클릭 시 내용 출력
filterBtn.addEventListener('click', function(){
    main.innerHTML = '';
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(filterText.value) !== -1;
    });

    filterText.value = "";

    filteredDogs.forEach(function(item){
        displayDogs(item);
    });
});

// select 에서 필더링
filterSelect.addEventListener('change', function(){
    main.innerHTML = '';
    let filteredDogs = currentDogs.filter(function(item){
        return item.indexOf(filterSelect.value) !== -1;
    });

    filteredDogs.forEach(function(item){
        displayDogs(item);
    });
});

// more 버튼
more.addEventListener('click', function(){
    requestRd.open('get', apiRandomDogs);
    requestRd.addEventListener('load', function(){
        const response = JSON.parse(requestRd.response);
        response.message.forEach(function(item){
            currentDogs.push(item);
            displayDogs(item);
        });
    });
    requestRd.send();
});


// top 버튼
tothetop.addEventListener('click', function(){
    // scrollTo : 주어진 위치로 스크롤을 이동한다.
    window.scrollTo({top: 0});
});

// reset 버튼
resetBtn.addEventListener('click', function(){
    requestRd.open('get', apiRandomDogs);
    requestRd.addEventListener('load', function(){
        main.innerHTML = '';
        const response = JSON.parse(requestRd.response);
        response.message.forEach(function(item){
            displayDogs(item);
        });
    });
    requestRd.send();
});