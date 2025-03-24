import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer, Cell
  } from 'recharts';
  import { useEffect, useState } from 'react';
  
  // MUI imports
  import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography
  } from '@mui/material';
  
  const Report = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
  
    useEffect(() => {
      const fetchTasks = async () => {
        try {
          const res = await fetch('http://localhost:4000/api/tasks');
          const data = await res.json();
          if (res.ok && Array.isArray(data)) {
            setTasks(data);
          }
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
        }
      };
  
      fetchTasks();
    }, []);
  
    const getFilteredTasks = () => {
      if (filter === 'week') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        return tasks.filter(task => new Date(task.dueDate) >= oneWeekAgo);
      }
      return tasks;
    };
  
    const getSummaryData = () => {
      const summary = {
        Pending: 0,
        'In Progress': 0,
        Completed: 0,
      };
  
      getFilteredTasks().forEach(task => {
        if (summary[task.status] !== undefined) {
          summary[task.status]++;
        }
      });
  
      return Object.entries(summary).map(([status, count]) => ({
        status,
        count
      }));
    };
  
    const summaryData = getSummaryData();
  
    return (
      <Box sx={{ padding: '2rem' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Task Summary
        </Typography>
  
        {/* Material UI Dropdown */}
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
          <Typography>No tasks found for the selected filter.</Typography>
        )}
      </Box>
    );
  };
  
  export default Report;
  