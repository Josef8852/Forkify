  interface MyState {
    recipes : Array<Object> , 
    recipeDetails : Object , 
    currentPage : number , 
    searchResult : string ,
    totalPages : number  , 
    bookmarks : Array<string> , 
  }


  export  const state : MyState  = {
    recipes: [] ,
    recipeDetails : {}, 
    currentPage : 0  , 
    searchResult : '' ,
    totalPages : 0 , 
    bookmarks : [] 
  }


 export const getData = async (search : string) => {

  try {
  const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`) ; 

  const data = await res.json() ; 


   state.recipes = data.data.recipes  ;

   state.totalPages = Math.round(state.recipes.length / 10)  ;

  }
  catch(err) {
    throw err ; 
  }
};

export const getRecipeData = async (recipeID : string | unknown) => {

  try {
  const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeID}`) ; 

  const data = await res.json() ; 


  state.recipeDetails = data.data.recipe  ;
  


  }
  catch(err) {
    throw err ; 
  }
};



export const  getCurrentPage = (page : number) : Array<Object> => {

  state.currentPage = page ; 

  const start = (page - 1) * 10 ;

  const end = page * 10 ;
  
  return  state.recipes.slice(start , end)   ; 
}



