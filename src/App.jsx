import { useState } from "react";
import GlobalStyle from "./GlobalStyles";
import { v4 as uuid } from "uuid";
import {
  Container,
  ToDoList,
  Input,
  Button,
  ListItem,
  Check,
  Trash,
} from "./styles";

function App() {
  const [list, setList] = useState([]);
  const [inputTask, setInputTask] = useState("");

  function handleInputChange(event) {
    setInputTask(event.target.value);
  }

  function handleAddTask() {
    if (!inputTask.trim()) return;
    setList([...list, { id: uuid(), task: inputTask, finished: false }]);
    setInputTask("");
  }

  function finishTask(id) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, finished: !item.finished } : item,
    );
    setList(newList);
  }

  function deleteTask(id) {
    setList(list.filter((item) => item.id !== id));
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <ToDoList>
          <h1>My To-Do List</h1>
          <Input
            value={inputTask}
            onChange={handleInputChange}
            placeholder="Task to do"
          />

          <Button onClick={handleAddTask}>Add</Button>

          <ul>
            {list.length > 0 ? (
              list.map((item) => (
                <ListItem isFinished={item.finished} key={item.id}>
                  <Check onClick={() => finishTask(item.id)} />
                  <span>{item.task}</span>
                  <Trash onClick={() => deleteTask(item.id)} />
                </ListItem>
              ))
            ) : (
              <h3> No items on the list</h3>
            )}
          </ul>
        </ToDoList>
      </Container>
    </>
  );
}

export default App;
