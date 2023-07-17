import { PayloadAction, createSlice} from "@reduxjs/toolkit"
import todoType, { appState } from "../typescriptTypes/customTypes";





const initialState :appState = {
    todos: [
        {
            content: "take break ", completed: true, id: 12
        },
        {
            content: "practice coding ", completed: false, id: 432
        },

    ], isDarkMode: true
}

export const createTodoSlice = createSlice({
    name: 'createTodo',
    initialState,
    reducers: {
        updateTodo: (state, action:PayloadAction<number>) => {
            const todo:(todoType|undefined) = state.todos.find((e) => e?.id === action.payload)
            todo!.completed = !todo?.completed
        },
        craeteTodo: (state, action) => {
            state.todos.push({ content: action.payload.todo, id: action.payload.id, completed: false })
        },
        deleteTodo: (state, action:PayloadAction<number>) => {
            state.todos = state.todos.filter((e) => e?.id !== action.payload)
        },
        clearCompleted: (state) => {
            state.todos = state.todos.filter((e) => e?.completed === false)
        },
        toggleMode: (state, action:PayloadAction<boolean>) => {
            state.isDarkMode = action.payload
        }
    }
})



export const { craeteTodo, deleteTodo, updateTodo, clearCompleted, toggleMode } = createTodoSlice.actions

export const createTodoReducer = createTodoSlice.reducer