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
  const [categoryData, setCategoryData] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchSummary = async (filterValue) => {
    try {
      const res = await fetch(`https://cs348taskplanner.uc.r.appspot.com/api/report/status-summary?filter=${filterValue}`);
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

  const fetchCategorySummary = async (filterValue) => {
    try {
      const res = await fetch(`https://cs348taskplanner.uc.r.appspot.com/api/report/category-summary?filter=${filterValue}`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const formatted = data.map(item => ({
          name: item._id,
          value: item.count
        }));
        setCategoryData(formatted);
      }
    } catch (error) {
      console.error('Failed to fetch category summary:', error);
    }
  };

  useEffect(() => {
    fetchSummary(filter);
    fetchCategorySummary(filter);
  }, [filter]);

  const pieColors = ['#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Task Summary
      </Typography>

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
              <Cell fill="#ff9800" />
              <Cell fill="#2196f3" />
              <Cell fill="#4caf50" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Typography>No task summary data available.</Typography>
      )}

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
