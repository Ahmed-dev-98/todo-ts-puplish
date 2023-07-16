import { PayloadAction, createSlice} from "@reduxjs/toolkit"


type todo = {
    todo : string ;
    completed : boolean ;
    id : number
  }

  // Define a type for the slice state
type appState = {
    todos:{todo:string , completed:boolean , id:number}[] ,
    isDarkMode : boolean
  }


const initialState :appState = {
    todos: [
        {
            todo: "take break ", completed: true, id: 12
        },
        {
            todo: "practice coding ", completed: false, id: 432
        },

    ], isDarkMode: false
}

export const createTodoSlice = createSlice({
    name: 'createTodo',
    initialState,
    reducers: {
        updateTodo: (state, action:PayloadAction<number>) => {
            const todo = state.todos.find((e) => e.id === action.payload)
            todo!.completed = !todo?.completed
        },
        craeteTodo: (state, action) => {
            state.todos.push({ todo: action.payload.todo, id: action.payload.id, completed: false })
        },
        deleteTodo: (state, action:PayloadAction<number>) => {
            state.todos = state.todos.filter((e) => e.id !== action.payload)
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter((e) => e.completed === false)
        },
        toggleMode: (state, action:PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
        }
    }
})



export const { craeteTodo, deleteTodo, updateTodo, clearCompleted, toggleMode } = createTodoSlice.actions

export const createTodoReducer = createTodoSlice.reducer