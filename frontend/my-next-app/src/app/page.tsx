import { AddTask } from "./components/AddTask";
import { ToDoList } from "./components/ToDoList";

export default function Home() {
  return (
    
      <main className="max-w-4xl mx-auto mt-4" >
        <div className="text-center my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">ToDo List</h1>
       <AddTask/>
        </div>
       
        <ToDoList/>
      </main>

      
   
  );
}
