import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState({
    needToBeDone: "",
  });

  const [list, setList] = useState([]);

  const handlerOnChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const getListCard = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/todo/users/maryanni",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setList(data.todos);
    } catch (error) {
      console.log(error);
    }
  };

  const postCardList = async () => {
    let bodyPost = {
      label: inputValue.needToBeDone,
      is_done: false,
    };
    try {
      const responsePost = await fetch(
        "https://playground.4geeks.com/todo/todos/maryanni",
        {
          method: "POST",
          body: JSON.stringify(bodyPost),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dataPost = await responsePost.json();
      getListCard();
    } catch (error) {
      console.log(error);
    }
  };

  
  const deleteCardList = async (todo_id) => {
    try {
      const responseDelete = await fetch(
        `https://playground.4geeks.com/todo/todos/${todo_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dataDelete = await responseDelete.json();
      getListCard();
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getListCard();
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    postCardList();
    setInputValue({ needToBeDone: "" });
  };

 

  return (
    <div className="App Container classContainer">
      <div className="classDivPrincipal">
        <h1 className="justify-content-center d-flex">Todos</h1>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleOnSubmit}>
              <input
                onChange={handlerOnChange}
                name="needToBeDone"
                value={inputValue.needToBeDone}
                className="placeholderInput"
                type="text"
                placeholder="What needs to be done?"
              />
            </form>
          </div>
        </div>
        <ul className="list-group">
          {list.map((item, index) => {
            return (
              <li className="list-group-item trushIcon" key={index}>
                {item.label}
                <span onClick={() => deleteCardList(item.id)}>
                  <i className="fa fa-regular fa-rectangle-xmark"></i>
                </span>
              </li>
            );
          })}
          <li className="list-group-item bg-secondary-subtle">
            <b> {list.length} </b> items left
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
