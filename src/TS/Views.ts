export const renderSpinner = (container : HTMLElement) => {
  const HTML = `
    <div class="spinner">
  <i class="fa-solid fa-spinner"></i>
    </div>
  ` ; 

  container.insertAdjacentHTML('afterbegin' , HTML) ; 
}

export const  searchResultsView = (list : Array<Object>, container : HTMLElement) => {

  list.forEach((element  : any) => {
    const HTML  = `
    <div class="item">
    <span class= "myID">${element.id}</span>
    <img src="${element.image_url}" alt="">
    <div class="text">
      <h3 class="highlight">${element.title}</h3>
      <p>${element.publisher}</p>
    </div>
  </div>
    ` ; 
    container.insertAdjacentHTML('beforeend' , HTML)  ;
  }) ; 
}


export const bookmarkView = (element : any , container : HTMLElement) => {
      const HTML = `<div class="book">
      <span class= "myID">${element.id}</span>
      <img src="${element.image_url}" alt="">
      <div class="text">
        <h3 class="highlight">${element.title}</h3>
        <p>${element.publisher}</p>
      </div>
    </div> `


    container.insertAdjacentHTML('afterbegin' , HTML) ; 
    
}


const getIngredients = (list: []) => {
   return list.map((element : any) => {
      return  `<li>
      <p class="ingred-name"><i class="fa-solid fa-check"></i>${element.description}</p>
         </li>` ;
    }).join('');
}

export const recipeView = (element : any , container : HTMLElement) => {
  const HTML = `
  <button class="btn closeView"><i class="fa-solid fa-xmark"></i></button>
  <div class="item-details">
    <div class="img">
      <div class="overlay">
        <img src="${element.image_url}" alt="">
      </div>
      <div class="title">
        <h3>${element.title}</h3>
      </div>
    </div>
  
    <div class="controls">
      <p><i class="fa-regular fa-clock"></i> <span class="time">${element.cooking_time}</span> MINUTES </p>
      <p><i class="fa-solid fa-users"></i> <span class="servs">${element.servings}</span> SERVINGS </p>

  
      <button class="btn bookmark_btn">
      <i class="fa-regular fa-bookmark  regular-icon"></i>
      <i class="fa-solid fa-bookmark hide solid-icon"></i>
      </button>
    </div>
  
  
    <div class="ingreds">
      <h3 class="highlight">RECIPE INGREDIENTS</h3>
      <ul class="list">
  
        ${getIngredients(element.ingredients)}
  
      </ul>
    </div>
  
    <div class="reference">
      <h3 class="highlight">HOW TO COOK IT</h3>
      <p>This recipe was carefully designed and tested by Simply Recipes. Please check out directions at their
        website.</p>
  
   
        <button class="btn"><a href="${element.source_url}"  target="_blank">DIRECTIONS</a><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  
  
  </div>
  
  
  `;
  
  container.insertAdjacentHTML('afterbegin' , HTML) ;
}


export const paginationView = (container : HTMLElement,   currentPage : number , totalPages : number ) => {


  let page = currentPage , pageOf = currentPage; 

  const HTML = `
  <div class="pagination">
  <div class="left">
  <button class="btn arrow-left ${currentPage !== 1  ? null : 'hide'} "> <i class="fa-solid fa-arrow-left"></i>  Page ${currentPage-=1}</button>
      </div>
  <div class="right">
  <button class="btn arrow-right ${currentPage === totalPages - 1 ? 'hide' : null} "> Page ${page+=1} <i class="fa-solid fa-arrow-right"></i></button>
        </div>
</div>
<div class="totalPages">
<span>${pageOf} / ${totalPages}</span>
</div>
  `

    container.insertAdjacentHTML('beforeend' , HTML) ; 
}


export const renderError = (container : HTMLElement) => {
      const HTML = `  <div class="message">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p>No recipes found for your query! Please try again</p>
    </div>`

    container.insertAdjacentHTML('afterbegin' , HTML) ; 
}

