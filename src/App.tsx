// import { FormControl, InputLabel, Select, MenuItem, Stack, Toolbar, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
// import { useForm } from "react-hook-form"
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js'
// import { Bar, Line } from 'react-chartjs-2'
// import { useQuery } from "@tanstack/react-query"
// import { useEffect, useState } from "react"
// import { query, collection, where, getDocs, orderBy } from "firebase/firestore"
// import { database } from "./firebase"

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// )

// export const options = {
//   responsive: true,
//   interaction: {
//     mode: 'index' as const,
//     intersect: false,
//   },
//   stacked: false,
//   plugins: {
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart - Multi Axis',
//     },
//   },
//   scales: {
//     y: {
//       type: 'linear' as const,
//       display: true,
//       position: 'left' as const,
//     },
//     y1: {
//       type: 'linear' as const,
//       display: true,
//       position: 'right' as const,
//       grid: {
//         drawOnChartArea: false,
//       },
//     },
//   },
// }

// export default function App() {
//   const [duretion, setDuretion] = useState<string>('3m')
//   const { data, refetch } = useQuery({
//     queryKey: ['backtesting', duretion],
//     queryFn: () => fetchs(duretion)
//   })

//   const { register, handleSubmit, formState: { } } = useForm()



//   const dataChart = {
//     labels: data?.maxLen.map(row => row.date) || [],
//     datasets: [
//       {
//         label: 'EMA 10',
//         data: data?.ema10.map(row => row.profit) || [],
//         borderColor: '#36A2EB',
//         backgroundColor: '#9BD0F5',
//         yAxisID: 'y',
//       },
//       {
//         label: 'EMA 11',
//         data: data?.ema11.map(row => row.profit) || [],
//         borderColor: '#FF6384',
//         backgroundColor: '#FFB1C1',
//         yAxisID: 'y1',
//       },
//     ],
//   }

//   return (
//     <div className="container mx-auto h-screen">
//       <Toolbar />
//       <Stack
//         component={'form'}
//         direction="row"
//         spacing={1}
//         onSubmit={handleSubmit((data) => {
//           setDuretion(data.duretion)
//         })}
//       >
//         <FormControl sx={{ width: 150 }} size="small">
//           <InputLabel id="demo-simple-select-label">EMA</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             {...register("EMA")}
//             label="EMA"
//             defaultValue="15"
//           >
//             {Array.from({ length: 21 }, (_, index) => (
//               <MenuItem key={index} value={index + 10}>{index + 10}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <FormControl sx={{ width: 150 }} size="small">
//           <InputLabel id="demo-simple-select-label">ระยะเวลา</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             {...register("duretion")}
//             label="ระยะเวลา"
//             defaultValue="1y"
//           >
//             {[
//               { duretion: "3 เดือน", value: "3m" },
//               { duretion: "6 เดือน", value: "6m" },
//               { duretion: "1 ปี", value: "1y" },
//               { duretion: "3 ปี", value: "3y" },
//               { duretion: "5 ปี", value: "5y" }
//             ].map((item) => (
//               <MenuItem value={item.value} key={item.value}>{item.duretion}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button sx={{ width: 100 }} type="submit" variant="outlined" size="small">ยืนยัน</Button>
//       </Stack>
//       <Bar options={options} data={dataChart} />
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>วันที่</TableCell>
//               <TableCell align="right">Position</TableCell>
//               <TableCell align="right">Profit</TableCell>
//               <TableCell align="right">Period</TableCell>
//               <TableCell align="right">Balance</TableCell>
//             </TableRow>
//           </TableHead>
//           {/* <TableBody>
//             {data?.map((row) => (
//               <TableRow
//                 key={row.id}
//                 sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell component="th" scope="row">
//                   {row.date}
//                 </TableCell>
//                 <TableCell align="right">{row.position}</TableCell>
//                 <TableCell align="right">{row.profit}</TableCell>
//                 <TableCell align="right">{row.duretion}</TableCell>
//                 <TableCell align="right">{row.balance}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody> */}
//         </Table>
//       </TableContainer>
//     </div>
//   )
// }


import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { database } from './firebase';
import { useQuery } from '@tanstack/react-query';
import { ButtonGroup, Toolbar, Button } from "@mui/material"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart - Stacked',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};


type Period = {
  ema10: number
  ema11: number
  ema12: number
  ema13: number
  ema14: number
  ema15: number
  ema16: number
  ema17: number
  ema18: number
  ema19: number
  ema20: number
  ema21: number
  ema22: number
  ema23: number
  ema24: number
  ema25: number
  ema26: number
  ema27: number
  ema28: number
  ema29: number
  ema30: number
}

// type Backtesting = {
//   id: string
//   amount: number
//   bought: number
//   category: number
//   date: any
//   ema: string
//   period: string
//   profit: number
// }

const fetchs = async (period: string): Promise<Period> => {
  const q = query(
    collection(database, 'back_testv2'),
    where('period', '==', period),
    // orderBy('date', 'desc')
  )

  const querySnapshot = await getDocs(q)
  const result = querySnapshot.docs
    .map(doc => ({
      id: doc.id,
      amount: doc.get("amount"),
      bought: doc.get("bought"),
      category: doc.get("category"),
      date: doc.get("date"),
      ema: doc.get("ema"),
      period: doc.get("period"),
      profit: doc.get("profit"),
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return {
    ema10: result.filter(p => p.ema === 'EMA_10').reduce((total, current) => total + current.profit, 0),
    ema11: result.filter(p => p.ema === 'EMA_11').reduce((total, current) => total + current.profit, 0),
    ema12: result.filter(p => p.ema === 'EMA_12').reduce((total, current) => total + current.profit, 0),
    ema13: result.filter(p => p.ema === 'EMA_13').reduce((total, current) => total + current.profit, 0),
    ema14: result.filter(p => p.ema === 'EMA_14').reduce((total, current) => total + current.profit, 0),
    ema15: result.filter(p => p.ema === 'EMA_15').reduce((total, current) => total + current.profit, 0),
    ema16: result.filter(p => p.ema === 'EMA_16').reduce((total, current) => total + current.profit, 0),
    ema17: result.filter(p => p.ema === 'EMA_17').reduce((total, current) => total + current.profit, 0),
    ema18: result.filter(p => p.ema === 'EMA_18').reduce((total, current) => total + current.profit, 0),
    ema19: result.filter(p => p.ema === 'EMA_19').reduce((total, current) => total + current.profit, 0),
    ema20: result.filter(p => p.ema === 'EMA_20').reduce((total, current) => total + current.profit, 0),
    ema21: result.filter(p => p.ema === 'EMA_21').reduce((total, current) => total + current.profit, 0),
    ema22: result.filter(p => p.ema === 'EMA_22').reduce((total, current) => total + current.profit, 0),
    ema23: result.filter(p => p.ema === 'EMA_23').reduce((total, current) => total + current.profit, 0),
    ema24: result.filter(p => p.ema === 'EMA_24').reduce((total, current) => total + current.profit, 0),
    ema25: result.filter(p => p.ema === 'EMA_25').reduce((total, current) => total + current.profit, 0),
    ema26: result.filter(p => p.ema === 'EMA_26').reduce((total, current) => total + current.profit, 0),
    ema27: result.filter(p => p.ema === 'EMA_27').reduce((total, current) => total + current.profit, 0),
    ema28: result.filter(p => p.ema === 'EMA_28').reduce((total, current) => total + current.profit, 0),
    ema29: result.filter(p => p.ema === 'EMA_29').reduce((total, current) => total + current.profit, 0),
    ema30: result.filter(p => p.ema === 'EMA_30').reduce((total, current) => total + current.profit, 0),
  }
}

const labels = [
  'EMA 10',
  'EMA 11',
  'EMA 12',
  'EMA 13',
  'EMA 14',
  'EMA 15',
  'EMA 16',
  'EMA 17',
  'EMA 18',
  'EMA 19',
  'EMA 20',
  'EMA 21',
  'EMA 22',
  'EMA 23',
  'EMA 24',
  'EMA 25',
  'EMA 26',
  'EMA 27',
  'EMA 28',
  'EMA 29',
  'EMA 30',
]

export default function App() {
  const [period, setPeriod] = useState<string>('3m')
  const { data, refetch } = useQuery({
    queryKey: ['backtesting', period],
    queryFn: () => fetchs(period)
  })

  useEffect(() => {
    refetch()
  }, [period, refetch])

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'EMA 10',
        data: [
          data?.ema10,
          data?.ema11,
          data?.ema12,
          data?.ema13,
          data?.ema14,
          data?.ema15,
          data?.ema16,
          data?.ema17,
          data?.ema18,
          data?.ema19,
          data?.ema20,
          data?.ema21,
          data?.ema22,
          data?.ema23,
          data?.ema24,
          data?.ema25,
          data?.ema26,
          data?.ema27,
          data?.ema28,
          data?.ema29,
          data?.ema30,
        ],
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
    ],
  }

  return (
    <div className='container mx-auto'>
      <Toolbar />
      <ButtonGroup variant="text" aria-label="Basic button group" className='flex justify-center w-full'>
        <Button
          onClick={() => setPeriod('3m')}
        >
          3 เดือน
        </Button>
        <Button
          onClick={() => setPeriod('6m')}
        >
          6 เดือน
        </Button>
        <Button
          onClick={() => setPeriod('1y')}
        >
          1 ปี
        </Button>
        <Button
          onClick={() => setPeriod('3y')}
        >
          3 ปี
        </Button>
        <Button
          onClick={() => setPeriod('5y')}
        >
          5 ปี
        </Button>
      </ButtonGroup>
      <Bar options={options} data={dataChart} />
    </div>
  )
}