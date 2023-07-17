import { deleteTodo, updateTodo } from "../Features/CreateTodoSlice";
import { useAppDispatch, useAppSelector } from "../Hooks/Hooks";
import todoType from "../typescriptTypes/customTypes";

interface Props {
  todo: todoType
}



function OverLay({todo}:Props) {

  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.createTodo);

  return (
    <>
      <div
        className={
          isDarkMode
            ? "duration-500 bg-slate-800  font-josefin font-bold"
            : "duration-500 bg-white font-josefin font-bold"
        }

      >
        <div className="py-3 border-b mx-4 border-slate-400">
          <li className="flex justify-between items-center ">
            <div className="flex items-center justify-start">
              <div
                onClick={() => dispatch(updateTodo(todo.id))}
                className={
                  todo.completed
                    ? "w-4 h-4 sm:w-8 sm:h-8 border rounded-full bg-gradient-to-b from-sky-600 to-purple-600 flex justify-center items-center cursor-pointer"
                    : " cursor-pointer w-4 h-4 sm:w-8 sm:h-8 border rounded-full "
                }
              >
                {todo.completed ? (
                  <span className="font-extrabold text-white">&#x2713;</span>
                ) : (
                  ""
                )}
              </div>
              <h3
                onClick={() => dispatch(updateTodo(todo.id))}
                className={
                  todo.completed
                    ? `${
                        isDarkMode ? "text-slate-600" : " text-slate-400"
                      } duration-500 font-normal sm:font-bold  text-base sm:text-2xl  mx-2 sm:mx-8 line-through cursor-pointer hover:text-purple-500`
                    : `${
                        isDarkMode ? "text-slate-400" : " text-slate-600"
                      } font-normal sm:font-bold  duration-500 text-base sm:text-2xl  mx-2 sm:mx-8 cursor-pointer hover:text-purple-500 `
                }
              >
                {todo.content}{" "}
              </h3>{" "}
            </div>
            <div
              className="mx-4 cursor-pointer "
              onClick={() => dispatch(deleteTodo(todo.id))}
            >
              <span
                className={
                  isDarkMode
                    ? "text-xl sm:text-3xl self-end font-extrabold duration-500 hover:text-red-600 text-slate-400"
                    : "duration-500 text-xl sm:text-3xl self-end font-extrabold text-slate-600"
                }
              >
                &#10005;
              </span>
            </div>
          </li>
        </div>{" "}
      </div>
    </>
  );
}

export default OverLay;









// ✅ THIS COULD WORK
// const BlogPostComponent = (props:
//   // { title: string, subtitle: string }
// ) => ...
// //