import React, { useEffect, useState } from "react";
import OverLay from "../OverLay/OverLay";
import moon from "../../assets/icon-moon.svg";
import sun from "../../assets/icon-sun.svg";
import backgrounDark from "../../assets/bg-desktop-dark.jpg";
import backgrounLight from "../../assets/bg-desktop-light.jpg";
import {
  clearCompleted,
  craeteTodo,
  toggleMode,
} from "../Features/CreateTodoSlice";
import { useAppDispatch, useAppSelector } from "../Hooks/Hooks";
import todoType from "../typescriptTypes/customTypes";

function Home() {
  const [todoContent, setTodoContent] = useState<string>(""); // add new todo state //
  const { todos } = useAppSelector((state) => state.createTodo); // get todos data from redux store
  const { isDarkMode } = useAppSelector((state) => state.createTodo); // get current mode state from redux store Dark / light
  const [isActive, setIsActive] = useState<string>(""); // state for add active class
  const [copyArr, setCopyArr] = useState<todoType[]>([]); // state for manipulate todos array without change the main array
  const dispatch = useAppDispatch();

  const calcItemsLeft = todos.filter((todo) => todo.completed === false).length;

  const getCompletedTodos = () => {
    const filterdArray = todos.filter(
      (todo: todoType) => todo.completed === true
    );
    if (filterdArray.length === 0) {
      return;
    } else {
      setCopyArr(filterdArray);
    }
  };
  const getActive = () => {
    const filterdArray: todoType[] = todos.filter(
      (todo: todoType) => todo.completed === false
    );
    if (filterdArray.length === 0) {
      return;
    } else {
      setCopyArr((prev) => filterdArray);
    }
  };

  const getAll = () => {
    setCopyArr(todos);
  }; // manipulate copied array and render all todos

  // set isActive state === the id value of clicked button to use it at adding active class to the clicked button
  const activeButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsActive((e.target as HTMLButtonElement).id);
  };

  useEffect(() => {
    setCopyArr([...todos]);
  }, [todos]);

  // input for new todo
  const getInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoContent((e.target as HTMLInputElement).value);
  };

  const createTodoHandler = () => {
    if (!todoContent) {
      return;
    } else {
      const id = Math.random(); // create random id to use it as component key , update todo , delete todo
      dispatch(craeteTodo({ todoContent, id }));
      setTodoContent("");
    }
  };

  const backgroundStyle = {
    backgroundImage: isDarkMode
      ? `url(${backgrounDark})`
      : `url(${backgrounLight})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <section
      className={`relative font-josefin font-bold ${
        isDarkMode ? "bg-slate-900" : "bg-white"
      }  h-screen`}
    >
      <div style={backgroundStyle} className=" h-56 w-full duration-500 "></div>

      <div className="todo-container w-[16rem] sm:w-[30rem] h-[35rem]  mx-auto absolute top-6 right-1/2   translate-x-1/2  ">
        <div className="mode-typing rounded-xl">
          <div className="mode flex justify-between bg-transparent py-6">
            <h1 className=" text-3xl sm:text-5xl text-white">TODO</h1>
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={() => dispatch(toggleMode(!isDarkMode))}
            >
              <img src={isDarkMode ? sun : moon} alt="" />
            </div>
          </div>
          <div
            className={` mb-6 py-3 flex  items-center  ${
              isDarkMode ? "bg-slate-800 " : "bg-white"
            } duration-500`}
          >
            <div
              onClick={createTodoHandler}
              className="mx-4 w-8 h-8 border  rounded-full cursor-pointer duration-700 hover:bg-gradient-to-b from-sky-600 to-purple-600  "
            ></div>

            <input
              type="text"
              onChange={getInput}
              value={todoContent}
              placeholder="Create a new todo..."
              className={`bg-transparent w-3/4  sm:w-1/2 outline-none   sm:text-2xl py-1 duration-500 ${
                isDarkMode ? " text-white " : "text-slate-400 "
              }`}
            />
          </div>
        </div>
        <div className="overflow-y-auto max-h-[19rem]">
          {copyArr
            ? copyArr.map((todo: todoType) => {
                return <OverLay key={todo.id} todo={todo} />;
              })
            : ""}
        </div>
        {copyArr.length > 0 ? (
          <div
            className={`duration-500  text-slate-400 shadow-[0_35px_60px_-15px_rgba(0,0,0,1)] py-3 ${
              isDarkMode ? "bg-slate-800" : " bg-white  "
            }`}
          >
            <li className="flex flex-col sm:flex-row gap-y-4 justify-between items-center mx-4 ">
              <div>
                <p
                  className={
                    calcItemsLeft === 0
                      ? "text-sm text-green-700 font-bold"
                      : "text-sm"
                  }
                >
                  {calcItemsLeft === 0
                    ? "All Completed"
                    : `${calcItemsLeft} items left`}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={(e) => {
                    getAll();
                    activeButton(e);
                  }}
                  className={`hover:text-purple-500 duration-500 ${
                    isActive === "all" ? "text-blue-800" : ""
                  }`}
                  id="all"
                >
                  All
                </button>
                <button
                  onClick={(e) => {
                    getActive();
                    activeButton(e);
                  }}
                  className={`hover:text-purple-500 duration-500 ${
                    isActive === "active" ? "text-blue-800" : ""
                  } ${
                    calcItemsLeft === 0 ? "cursor-not-allowed text-red-500" : ""
                  } `}
                  id="active"
                >
                  Active
                </button>
                <button
                  className={`hover:text-purple-500 duration-500 ${
                    isActive === "completed" ? "text-blue-800" : ""
                  } ${calcItemsLeft === copyArr.length ? "text-red-500" : ""} ${
                    calcItemsLeft === 0 ? "text-green-700" : ""
                  }`}
                  onClick={(e) => {
                    getCompletedTodos();
                    activeButton(e);
                  }}
                  id="completed"
                >
                  Completed
                </button>
              </div>
              <div>
                <button
                  className="  hover:text-purple-500 duration-500"
                  onClick={() => dispatch(clearCompleted())}
                >
                  Clear Completed
                </button>
              </div>
            </li>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Home;
