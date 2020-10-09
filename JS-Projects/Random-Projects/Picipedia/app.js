const auth = '563492ad6f91700001000001251cae71e2014e38a71500a5f3b0da53'
const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const more = document.querySelector('.more');
let searchValue;
let fetchLink;
let heart;
let currentSearch;
let page=1;


//EVENT LISTENERS
searchInput.addEventListener('input',updateInput);
searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    curretnSearch=searchValue;
    searchPhotos(searchValue);
});
more.addEventListener('click',loadMore);

function updateInput(e){
    searchValue=e.target.value;
    // console.log(searchValue);
}

async function fetchApi(url){
    const dataFetch = await fetch(url,{
        method:'GET',
        headers:{
            Accept:"application/json",
            Authorization:auth
        }
    });
    const data = await dataFetch.json();
    // console.log(data);
    console.log(data.photos);
    return data;
}

function generatePhotos(data){
    data.photos.forEach(photo=>{
        const galleryImg= document.createElement('div');
        galleryImg.classList.add('gallery-img');
        galleryImg.innerHTML = `     
            <div class='gallery-info'>
               <div><a class='photographer' href=${photo.photographer_url}>${photo.photographer}&nbsp; &nbsp;</a><i class="fa fa-heart-o" 'like' aria-hidden="true"></i></div>
               <a class='download' href=${photo.src.original}>Download</a>
            </div>
            <img class='gallery-img' src = ${photo.src.large} alt='image'>  
        `
        gallery.appendChild(galleryImg);
    });
}

(async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
    const data=await fetchApi(fetchLink);
    generatePhotos(data);
})();

async function searchPhotos(search){
    clear();
    // console.log(search);
    fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=15&page=1`;
    // console.log(fetchLink);
    const data=await fetchApi(fetchLink);
    generatePhotos(data);
    searchInput.value='';
};

async function loadMore(){
    page++;
    if(currentSearch){
        fetchLink=`https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
    }else{
        fetchLink=`https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
    }
    const data = await fetchApi(fetchLink);
    generatePhotos(data);
}

function clear(){
    // console.log(gallery.innerHTML);
    gallery.innerHTML='';
    // console.log(gallery.innerHTML);
}
