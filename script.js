const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer= document.querySelector('.recipe-container');
const recipeDetailsContent= document.querySelector('.recipe-details-content');
const recipeCloseBtn= document.querySelector('.recipe-closeBtn');

//func to fetch recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "Fetching Recipes. . .";
    try{
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal =>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        
        <img src ="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish</p>
        <p>${meal.strCategory}</p>

        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);

        //adding eventistner to recipe button
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    });

    }
    catch (eror) {
        recipeContainer.innerHTML = "Error in Searching Recipes. . .";
    }
}
 //func to fetch ing and measurements
 const fetchIngredients =(meal) =>{
    console.log(meal);
    let ingredientsList = "";
    for(let i=1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
        const measure = meal[`strMeasure${i}`];
        ingredientsList += `<li> ${measure} ${ingredient}</li>`;

    }
    else{
        break;
    }
    }
    return ingredientsList;
 }

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";

}

//for close the popup
recipeCloseBtn.addEventListener('click', ()=> {
    recipeDetailsContent.parentElement.style.display="none";

})
searchBtn.addEventListener('click', (e) => {
    e.preventDefault(); //autosubmit se rok dega
    const searchInput = searchBox.value.trim();
    if(!searchInput) {
        recipeContainer.innerHTML = `<h2>Enter the meal name you want to find in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
});
