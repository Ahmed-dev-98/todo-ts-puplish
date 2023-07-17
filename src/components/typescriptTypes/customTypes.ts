
type todoType = {

    content: string;
    completed: boolean;
    id: number

}


  // Define a type for the slice state
 export  type appState = {
    todos:todoType[] ,
    isDarkMode : boolean
  }

export default todoType