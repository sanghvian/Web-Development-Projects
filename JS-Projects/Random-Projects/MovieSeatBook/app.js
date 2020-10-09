const movieContainer = document.querySelector('.container');
const movieSelect = document.querySelector('#movie');
const seats = document.querySelectorAll('.seat');
let ticketPrice = +movieSelect.value;
// console.log(ticketPrice);
let seatCount = document.querySelector('#count');
let totalCost = document.querySelector('#total');

//FUNCTIONS

function updateCost(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //Subtracted 1 to exclude the .seat having .selected in our key/legend
    let count = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(seat =>[...seats].indexOf(seat) ); 
    localStorage.setItem('selectedSeatsIndex', JSON.stringify(seatsIndex));

    seatCount.innerText= count;
    totalCost.innerText = count*ticketPrice;
}

function setMovieData(movieSelectIndex,movieSelectPrice){
    localStorage.setItem('movieSelectIndex', JSON.stringify(movieSelectIndex));
    localStorage.setItem('movieSelectPrice', JSON.stringify(movieSelectPrice));
}

(function populateUI(){
    const restoredPlaces = JSON.parse(localStorage.getItem('selectedSeatsIndex'));
    if(restoredPlaces !== null && restoredPlaces.length >0){
        seats.forEach((seat,index) =>{
            if(restoredPlaces.indexOf(index)>-1){
                seat.classList.add('selected');
            }
        });
    }
    const restoredMovieIndex = JSON.parse(localStorage.getItem('movieSelectIndex'));
    movieSelect.selectedIndex = restoredMovieIndex;

    const restoredMoviePrice = JSON.parse(localStorage.getItem('movieSelectPrice'));
    ticketPrice=restoredMoviePrice;
    updateCost();
})()

//EVENT LISTENERS

movieSelect.addEventListener('change',(e)=>{
    // console.log(e);
    // console.log(movieSelect.value);
    ticketPrice=+movieSelect.value;
    // console.log(e.target.selectedIndex);
    const movieSelectIndex = e.target.selectedIndex;
    const movieSelectPrice = ticketPrice;
    
    setMovieData(movieSelectIndex,movieSelectPrice);
    updateCost();
});
movieContainer.addEventListener('click', e =>{
    // console.log(e.target);
    if(e.target.classList.contains('seat') && !(e.target.classList.contains('occupied'))){
        e.target.classList.toggle('selected');
    }
    updateCost();
});

