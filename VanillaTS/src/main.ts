import "./style.css";

interface Todo {
  text: string;
  isCompleted: boolean;
  readonly id: string;
}
let todos: Todo[] = [];

const todoContainer = document.querySelector(
  ".todoContainer"
) as HTMLDivElement;
const todoForm = document.querySelector(".todoForm") as HTMLFormElement;
const todoInput = document.querySelector(".todoInput") as HTMLInputElement;

todoForm.onsubmit = (e) => {
  e.preventDefault();
  const todo: Todo = {
    text: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000),
  };
  todos.push(todo);
  todoInput.value = "";
  renderTodos(todos);
};

const renderTodos = (todos: Todo[]) => {
  todoContainer.innerHTML = ``;
  todos.forEach((item) => {
    generateTodo(item);
  });
};

const generateTodo = (item: Todo) => {
  const todoBox = document.createElement("div") as HTMLDivElement;
  todoBox.className = "todoBox  ";

  //delte button
  const deletebtn = document.createElement("button") as HTMLButtonElement;
  deletebtn.innerText = `X`;
  deletebtn.addEventListener("click", () => deleteAction(item.id));

  //checkbox
  const checkbox = document.createElement("input") as HTMLInputElement;
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = item.isCompleted;
  checkbox.onchange = () => {
    item.isCompleted = checkbox.checked;
    para.className = item.isCompleted ? "underline" : "";
  };
  //todo title
  const para = document.createElement("p") as HTMLParagraphElement;
  para.innerText = item.text;
  para.className = item.isCompleted ? "underline" : "";

  todoBox.append(checkbox, para, deletebtn);
  todoContainer.append(todoBox);
};

const deleteAction = (id: string) => {
  todos = todos.filter((todo) => {
    return todo.id != id;
  });
  renderTodos(todos);
};
