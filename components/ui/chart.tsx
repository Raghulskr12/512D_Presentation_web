import type React from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend)

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors: string[]
  yAxisWidth?: number
  className?: string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
}

export const BarChart: React.FC<ChartProps> = ({ data, index, categories, colors, yAxisWidth, className }) => {
  const chartData = {
    labels: data.map((item) => item[index]),
    datasets: categories.map((category, i) => ({
      label: category,
      data: data.map((item) => item[category]),
      backgroundColor: colors[i],
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        ticks: {
          callback: (value: number) => {
            if (yAxisWidth) {
              const stringValue = value.toString()
              const maxLength = yAxisWidth / 8
              if (stringValue.length > maxLength) {
                return stringValue.substring(0, maxLength - 1) + "..."
              }
              return value
            }
            return value
          },
        },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
    },
  }

  return <Bar data={chartData} options={options} className={className} />
}

export const LineChart: React.FC<ChartProps> = ({
  data,
  index,
  categories,
  colors,
  className,
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
}) => {
  const chartData = {
    labels: data.map((item) => item[index]),
    datasets: categories.map((category, i) => ({
      label: category,
      data: data.map((item) => item[category]),
      borderColor: colors[i],
      backgroundColor: colors[i],
      tension: 0.4,
      fill: false,
      pointRadius: 3,
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        display: showXAxis,
      },
      y: {
        grid: {
          display: true,
        },
        display: showYAxis,
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      title: {
        display: false,
      },
    },
  }

  return <Line data={chartData} options={options} className={className} />
}

