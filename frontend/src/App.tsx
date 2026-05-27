import Weather from "./components/Weather";
import TodoList from "./components/TodoList";
import "./App.css";
function App() {
  return (
    <>
      <main className="widgets">
        <Weather />
        <TodoList />
      </main>
    </>
  );
}

export default App;
