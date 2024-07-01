import { FormControl, InputLabel, Select, MenuItem, Stack, Toolbar, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { useForm } from "react-hook-form"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs } from "firebase/firestore";
import { database } from "./firebase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};


type Backtesting = {
  id: string;
  balance: number;
  date: any;
  duretion: string;
  position: string;
  profit: number;
}

const fetchs = async (duretion: string): Promise<Backtesting[]> => {
  const q = query(
    collection(database, 'backtesting'),
    where('duretion', '==', duretion)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map(doc => ({
      id: doc.id,
      balance: doc.get("balance"),
      date: doc.get("date"),
      duretion: doc.get("duretion"),
      position: doc.get("position"),
      profit: doc.get("profit"),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // เรียงลำดับตามวันที่
}


export default function App() {
  const [duretion, setDuretion] = useState<string>('1y');
  const { data, refetch } = useQuery({
    queryKey: ['backtesting', duretion],
    queryFn: () => fetchs(duretion)
  });

  const { register, handleSubmit, formState: { } } = useForm()

  useEffect(() => {
    refetch();
  }, [duretion, refetch])



  const data2 = {
    labels: data?.map(row => row.date) || [],
    datasets: [
      {
        label: 'Balance',
        data: data?.map(row => row.balance) || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  return (
    <div className="container mx-auto h-screen">
      <Toolbar />
      <Stack
        component={'form'}
        direction="row"
        spacing={1}
        onSubmit={handleSubmit((data) => {
          setDuretion(data.duretion)
        })}
      >
        <FormControl sx={{ width: 150 }} size="small">
          <InputLabel id="demo-simple-select-label">EMA</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("EMA")}
            label="EMA"
            defaultValue="15"
          >
            {Array.from({ length: 21 }, (_, index) => (
              <MenuItem key={index} value={index + 10}>{index + 10}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ width: 150 }} size="small">
          <InputLabel id="demo-simple-select-label">ระยะเวลา</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            {...register("duretion")}
            label="ระยะเวลา"
            defaultValue="1y"
          >
            {[
              { duretion: "3 เดือน", value: "3m" },
              { duretion: "6 เดือน", value: "6m" },
              { duretion: "1 ปี", value: "1y" },
              { duretion: "3 ปี", value: "3y" },
              { duretion: "5 ปี", value: "5y" }
            ].map((item) => (
              <MenuItem value={item.value} key={item.value}>{item.duretion}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={{ width: 100 }} type="submit" variant="outlined" size="small">ยืนยัน</Button>
      </Stack>
      <Line options={options} data={data2} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>วันที่</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Profit</TableCell>
              <TableCell align="right">Period</TableCell>
              <TableCell align="right">Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="right">{row.profit}</TableCell>
                <TableCell align="right">{row.duretion}</TableCell>
                <TableCell align="right">{row.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

