import { useState } from "react";
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
//import { FcCheckmark, FcEmptyTrash } from 'react-icons/fc'
import "./App.css";

function App() {
  const [list, setList] = useState([]);
    
    
  

  const [inputTask, setInputTask] = useState("");

  function inputMudou(event) {
    setInputTask(event.target.value);
  }

  function cliqueNoBotao() {
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
    <Container>
      <ToDoList>
        <Input
          value={inputTask}
          onChange={inputMudou}
          placeholder="Task to do "
        />
        <Button onClick={cliqueNoBotao}>Adicionar</Button>

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
  );
}

export default App;
