import { useEffect, useState } from 'react';
import TaskDetails from "../components/TaskDetails";
import TaskForm from "../components/TaskForm";
import Report from "../pages/Report"
import { Link } from 'react-router-dom';
const Home = () => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/tasks');
      const data = await res.json();
      console.log("Fetched tasks:", data);
      if (res.ok) {
        setTasks(data);
      }
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Home</h2>
        <Link to="/report">
          <button style={{ marginLeft: '1rem' }}>View Report</button>
        </Link>
      </div>
  
      <div className="home-layout">
        <TaskForm onTaskCreated={fetchTasks} />
  
        <div className="tasks">
          {tasks
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map((task) => (
              <TaskDetails key={task._id} task={task} onStatusUpdate={fetchTasks} />
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default Home;
