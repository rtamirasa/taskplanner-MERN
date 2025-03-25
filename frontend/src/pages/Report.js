import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Cell, PieChart, Pie, Legend
} from 'recharts';
import { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

const Report = () => {
  const [summaryData, setSummaryData] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // preprocessed
  const fetchSummary = async (filterValue) => {
    try {
      const res = await fetch(`http://localhost:4000/api/report/status-summary?filter=${filterValue}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const formatted = data.map(item => ({
          status: item._id,
          count: item.count
        }));
        setSummaryData(formatted);
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    }
  };

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/tasks');
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setAllTasks(data);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchSummary(filter);  // refetch
  }, [filter]);

  useEffect(() => {
    fetchTasks(); // fetch all 
  }, []);

  // Filter tasks by due date 
  const getFilteredTasks = () => {
    if (filter === 'week') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return allTasks.filter(task => new Date(task.dueDate) >= oneWeekAgo);
    }
    return allTasks;
  };

  // Pie Chart 
  const getCategoryData = () => {
    const counts = {};
    getFilteredTasks().forEach(task => {
      counts[task.category] = (counts[task.category] || 0) + 1;
    });
    return Object.entries(counts).map(([category, count]) => ({
      name: category,
      value: count
    }));
  };

  const categoryData = getCategoryData();
  const pieColors = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Task Summary
      </Typography>

      {/* Filter*/}
      <FormControl sx={{ minWidth: 200, marginBottom: 3 }} size="small">
        <InputLabel>Filter</InputLabel>
        <Select
          value={filter}
          label="Filter"
          onChange={(e) => setFilter(e.target.value)}
        >
          <MenuItem value="all">All-Time</MenuItem>
          <MenuItem value="week">Last 7 Days</MenuItem>
        </Select>
      </FormControl>

      {/* Bar Chart*/}
      {summaryData.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summaryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count">
              <Cell fill="#ff9800" /> {/* Pending */}
              <Cell fill="#2196f3" /> {/* In Progress */}
              <Cell fill="#4caf50" /> {/* Completed */}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography>No task summary data available.</Typography>
      )}

      {/* Pie Chart */}
      {categoryData.length > 0 && (
        <>
          <Typography variant="h6" fontWeight="bold" mt={5}>
            Task Distribution by Category
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </Box>
  );
};

export default Report;
