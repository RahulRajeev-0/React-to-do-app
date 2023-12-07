import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [dayOfWeek, setDayOfWeek] = useState('');

  useEffect(() => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date().getDay();
    setDayOfWeek(daysOfWeek[today]);
  }, []);

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {dayOfWeek} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={(e) => setToDo(e.target.value)} type="text" placeholder="🖊️ Add item..." />
        <i onClick={() => {
          const trimmedInput = toDo.trim();
          if (trimmedInput !== ""){
          setToDos([...toDos, { id: Date.now(), text: toDo, status: false }])
        setToDo("")}
     } } className="fas fa-plus"></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => {
          return (
            <div className={`todo ${obj.status ? 'completed' : ''}`} key={obj.id}>
              <div className="left">
                <input
                  onChange={(e) => {
                    setToDos((prevToDos) =>
                      prevToDos.map((obj2) =>
                        obj2.id === obj.id
                          ? { ...obj2, status: e.target.checked }
                          : obj2
                      )
                    );
                  }}
                  checked={obj.status}
                  type="checkbox"
                  name=""
                  id=""
                />
                <p>{obj.text}</p>
              </div>
              <div className="right">
              <i className="fas fa-pencil-alt" onClick={()=> {
                setToDo(obj.text)
                setToDos((prevToDos) =>
                prevToDos.filter((item)=> item.id !== obj.id)
                );
              }} ></i>

                <i
                  className="fas fa-times"
                  onClick={() => {
                    setToDos((prevToDos) =>
                      prevToDos.filter((item) => item.id !== obj.id)
                    );
                  }}
                ></i>
              </div>
            </div>
          );
        })}
        {toDos.map((obj) => {
          if (obj.status) {
            return (
              <div className="completedTask" key={obj.id}>
                <p>{obj.text}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
