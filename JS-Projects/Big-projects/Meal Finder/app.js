const search = document.querySelector('form button'),
      random = document.querySelector('.random'),
      mealsEl = document.querySelector('.meals'),
      singleMeal = document.querySelector('.single-meal'),
      resultHead = document.querySelector('.result-heading');
      input = document.querySelector('#meal');

async function getMeals(){
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await res.json();
    // console.log(data);
    const result = data.meals;
    // console.log(result);
};
// getMeals();
async function searchMeals(query){
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();
    // console.log(data);
    const result = data.meals;
    // console.log(result);
  
    if(result===null){
        resultHead.innerHTML=`<h3>No search results for : ${query}. PLease try again..`;
    }else{
        resultHead.innerHTML=`
        <h3>Showing search results for : ${query}</h3>
        <h4>Click on a meal to know more about it</h4>
        `;
        mealsEl.innerHTML= result.map(item => `
                <div class='meal'>
                    <a href='#single-meal'>
                        <img src="${item.strMealThumb}" alt="${item.strMeal}"/>
                        <div class='meal-info' data-meal-id="${item.idMeal}">
                            <div class='meal-name'>
                                <h4>${item.strMeal}</h4>
                                <p>Click and Scroll for more info</p>
                            </div>
                        </div>
                    </a>
                </div>
            `)
            .join('');
        }

};

async function getMealByID(mealID) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    const data = await res.json();
    const result = data.meals[0];
    // console.log(data);  
    // console.log(result);
    

    addMealToDOM(result);
}

function addMealToDOM(meal) {
    const ingredients =[];
    
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}~${meal[`strMeasure${i}`]}`);
        }else{
            break;
        }
    }    

    singleMeal.innerHTML =`
        <div class='single-meal'>
            <i class="fa fa-arrow-circle-up fa-3x" aria-hidden="true"></i>
            <h3 class='meal-title' id='single-meal'>${meal.strMeal}</h3>
            <img src ="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class = 'meal-info'>
                ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class='main'>
                <p>${meal.strInstructions}</p>
                <h4>Ingredients</h4>
                <h5>Click on an ingredient to purchase it</h5>
                <ul>
                    ${ingredients.map(ing=> `<li><a target="_blank" href='https://www.amazon.com/s?k=${ing}&ref=nb_sb_noss_2'>${ing}</a></li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

async function getRandMeal() {
    mealsEl.innerHTML='';
    resultHead.innerHTML='';

    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const data = await res.json();
    const result = data.meals[0];
    // console.log(result);

    addMealToDOM(result);
  
}

search.addEventListener('click',(e)=>{
    e.preventDefault();
    const inputValue = input.value;
    singleMeal.innerHTML='';
    if(inputValue.trim()){
        searchMeals(inputValue);
    }else{
        alert('Please enter a search term !')
    }
    // input.value='';
});

mealsEl.addEventListener('click',e=>{
    const mealInfo = e.path.find(mealItem=>{
        if(mealItem.classList){
            return mealItem.classList.contains('meal-info');
        }else{
            return false;
        }
    });

    if(mealInfo){
        const mealID = mealInfo.getAttribute('data-meal-id');
        // console.log(mealID);
        getMealByID(mealID);
    }
});

random.addEventListener('click',getRandMeal);