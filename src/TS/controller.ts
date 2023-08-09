import * as model from "./model.js";
import { recipeView  ,searchResultsView , renderSpinner , paginationView , bookmarkView , renderError} from "./Views.js" ;


class App {

  private  modal: HTMLElement  = document.querySelector('.modal')  as HTMLElement;

  private closeModal: HTMLElement = document.querySelector('.close-modal') as HTMLElement;

  private addBtn : HTMLElement = document.querySelector('.addModal') as HTMLElement;  

  private bookBtn : HTMLElement  = document.querySelector('.showBooks') as HTMLElement; 

  private bookList : HTMLElement = document.querySelector('.book-list') as HTMLElement;

  private recipeListContainer = document.querySelector('.recipe-list') as HTMLElement; 

  private searchInpt : HTMLInputElement = document.querySelector('.inptSrch') as  HTMLInputElement ; 

  private searchBtn : HTMLElement = document.querySelector('.searchBtn')  as HTMLElement; 

  private ItemList :  HTMLElement[] = [] ;

  private itemDataContainer : HTMLElement = document.querySelector('.item-details') as HTMLElement ; 

  private recipeMsg :HTMLElement = document.querySelector('.recipe_details_Msg') as HTMLElement ;

  private detailsContainer : HTMLElement = document.querySelector('.recipe-details') as HTMLElement ;

  private  bookmarks : HTMLElement[]   =  [] ;

  private bookmarkMsg = document.querySelector('.bookmark_alert') as HTMLElement;


  constructor() {

    this.mainEvents() ; 

    this.searchBtn?.addEventListener('click' , () => {
        if(this.searchInpt.value) {
          model.state.searchResult = this.searchInpt.value ; 

          this.controlSearchResults(this.searchInpt.value) ;

          this.searchInpt.value = '' ;

          model.state.currentPage = 1 ;
        }
    });

  
  }

  mainEvents() {
    this.bookBtn?.addEventListener('mouseover' , this.showModal.bind(this , this.bookList)) ; 

    this.bookBtn?.addEventListener('mouseout' , this.hideModal.bind(this , this.bookList)) ; 

    this.bookList?.addEventListener('mouseover' , this.showModal.bind(this ,this.bookList)) ;

    this.bookList?.addEventListener('mouseout' , this.hideModal.bind(this ,this.bookList)) ;

    this.addBtn?.addEventListener('click' ,  this.showModal.bind(this ,this.modal))  ;

    this.closeModal?.addEventListener('click' , this.hideModal.bind(this , this.modal)) ;
  }

  showModal(element  : HTMLElement) : void {
    element.classList.remove('hideModal') ; 
  }

  hideModal(element  : HTMLElement) : void {
    element.classList.add('hideModal') ; 
  }




  show(element : HTMLElement) : void  {
    element.classList.remove('hide') ;
  }



  hide(element :HTMLElement) : void  {
    element.classList.add('hide') ;
  }



  clear(container : HTMLElement) : void {
    container.textContent = ''  ;
  }


  /* On mobile Screen */
  handleAnimation() : void  {
    this.detailsContainer.classList.add('showView') ;
       
    if(this.detailsContainer.classList.contains('hideView')) {
     this.detailsContainer.classList.remove('hideView') ;
    }
  
    this.show(this.detailsContainer) ;
  
  
    const closeMobileView = document.querySelector('.closeView') as HTMLElement ;
  
    closeMobileView.addEventListener('click' , () => {
       this.detailsContainer.classList.add('hideView') ;
    });
   }






 async controlSearchResults(search : string )  {
    try {

      this.clear(this.recipeListContainer) ;

      renderSpinner(this.recipeListContainer) ;

      await model.getData(search) ; 

      this.clear(this.recipeListContainer) ;

      if(!model.state.recipes.length) {
        renderError(this.recipeListContainer) ; 
      }
      else {
        searchResultsView(model.getCurrentPage(model.state.currentPage) , this.recipeListContainer) ;
      }


      if(model.state.recipes.length > 10) { 
        paginationView(this.recipeListContainer , model.state.currentPage , model.state.totalPages) ;
      }

      this.ItemList = Array.from(document.querySelectorAll('.item'))  as HTMLElement[] ;

      this.handleRecipe(this.ItemList) ;

      this.handlePagination() ;

    }
    catch (err) {
      throw err ; 
    }

 }

 



 async loadRecipe(ID : string | any ) {
  this.hide(this.recipeMsg) ;

  this.clear(this.itemDataContainer) ;

  renderSpinner(this.itemDataContainer);

  await model.getRecipeData(ID); 

  this.clear(this.itemDataContainer) ;

  if(this.isBookmarked(ID)) {

    recipeView(model.state.recipeDetails, this.itemDataContainer);

    this.changeBookmarkIcon(false) ; 

  }
  else {

    recipeView(model.state.recipeDetails, this.itemDataContainer);

    this.changeBookmarkIcon(true) ; 

  }

  this.handleAnimation() ;
 }
 




 
  handleRecipe(list: HTMLElement[]) : void {

  list.forEach((element:HTMLElement) => {

    element.addEventListener('click' , async () => {

     const recipeID = element.children[0].textContent ; 

     await  this.loadRecipe(recipeID); 

     this.handleBookmarks(recipeID) ;
     

    });

  });

 }





 handlePagination ()   : void {
    const goNext = document.querySelector('.arrow-right') as HTMLElement;

    const goBack = document.querySelector('.arrow-left') as HTMLElement; 


    goNext?.addEventListener('click' , () => {
      model.state.currentPage++;

      this.controlSearchResults(model.state.searchResult) ;
    }); 


    goBack?.addEventListener('click' , () => {
      model.state.currentPage--;

      this.controlSearchResults(model.state.searchResult) ;
    });
 }






handleBookmarks(bookmarkID : string | any ) : void  {
  const addBookmark = document.querySelector('.bookmark_btn') as HTMLElement; 


  addBookmark?.addEventListener('click' ,  async () => {
    this.hide(this.bookmarkMsg) ;

      if(!this.isBookmarked(bookmarkID)) {

        await  this.saveBookmark(bookmarkID) ;

        this.changeBookmarkIcon(false) ; 

      }
      else {

          this.deleteBookmark(bookmarkID) ; 

          this.changeBookmarkIcon(true) ; 
      }

  });
 }





 deleteBookmark(ID : string) : void  {
        this.bookmarks.forEach((element) => {

            if(element.children[0].textContent === ID) {
                  this.bookList.removeChild(element) ;
            }

        }) ;

        model.state.bookmarks = model.state.bookmarks.filter((element) => {
            return element !== ID ; 
        });
        
        if(!model.state.bookmarks.length) {
            this.show(this.bookmarkMsg) ;
        }
 }




 changeBookmarkIcon(isBookmarked : boolean) : void  {
        const regularIcon = document.querySelector('.regular-icon') as HTMLElement ; 

        const solidIcon = document.querySelector('.solid-icon') as HTMLElement ;

      if(!isBookmarked) {
        this.show(solidIcon) ; 

        this.hide(regularIcon) ; 
      }
      else {
        this.show(regularIcon) ; 

        this.hide(solidIcon) ; 
      }
 }




async saveBookmark(bookmarkID : string | any )   { 
  model.state.bookmarks.push(bookmarkID) ;

  bookmarkView(model.state.recipeDetails , this.bookList) ;

  this.bookmarks = Array.from(document.querySelectorAll('.book'))  as HTMLElement[] ;

  this.handleRecipe(this.bookmarks) ; 
}



isBookmarked(ID : string | any ) : boolean {

for(const element of model.state.bookmarks) {

  if(element === ID) {
    return true ; 
  }

}

return false ; 
}




}


const app = new App() ;

