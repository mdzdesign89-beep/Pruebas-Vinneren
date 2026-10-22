import { BrowserRouter, Route, Routes } from "react-router-dom"
import CalendarPage from "@/pages/CalendarPage"
import DashboardPage from "@/pages/DashboardPage"
import PlaceholderPage from "@/pages/PlaceholderPage"

const pendientes = [
  { path: "/turnos", title: "Turnos" },
  { path: "/voluntarios", title: "Voluntarios" },
  { path: "/escenarios", title: "Escenarios y actividades" },
  { path: "/settings", title: "Settings" },
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/calendario" element={<CalendarPage />} />
        {pendientes.map((p) => (
          <Route key={p.path} path={p.path} element={<PlaceholderPage title={p.title} />} />
        ))}
        <Route path="*" element={<PlaceholderPage title="No encontrado" />} />
      </Routes>
    </BrowserRouter>
  )
}
