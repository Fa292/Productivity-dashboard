import Analytics from './pages/Analytics.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Login from './pages/Login.jsx'
import Products from './pages/Products.jsx'
import Settings from './pages/Settings.jsx'
import Todos from './pages/Todos.jsx'
import { Route, Routes, Navigate } from 'react-router-dom'
import { Icons } from './components/Icons.jsx'
import Card from './components/Card'
import Button from './components/Button'
import Input from './components/Input'
import Chip from './components/Chip'
import Avatar from './components/Avatar'
import Tabs from './components/Tabs.jsx'
import { useState } from 'react'
import Modal from './components/Modal.jsx'
import { useTheme } from './context/ThemeContext.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import './index.css'
import './App.css'
import ProtectedRoute from './components/ProtectedRoutes.jsx'

function App() {
  
  return(
    <Routes>
        <Route path='login' element={<Login/>}></Route>
        <Route path='/' 
          element={<ProtectedRoute>
            <DashboardLayout/>
          </ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path='dashboard' element={<Dashboard/>} />
            <Route path='analytics' element={<Analytics/>} />
            <Route path='products' element={<Products/>} />
            <Route path='todos' element={<Todos/>} />
            <Route path='settings' element={<Settings/>} />
        </Route>
    </Routes>
    
  )
}

export default App;








/*const [tab, setTab] = useState("all")
  const [open, setOpen] = useState(false)
  const {darkMode, Toggle} = useTheme();
  return(
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-8 transition
      duration-300">
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          {id: "all", label: "All"},
          {id: "active", label: "Active"},
          {id: "completed", label: "Completed"}
        ]}
      />
      <p className='text-sm text-gray-500'>Active tab: {tab}</p>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Test Modal"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p className="text-gray-600 dark:text-gray-300">Modal content goes here.</p>
      </Modal>

      <div>
        <Button variant="ghost" size="iconSm" onClick={Toggle}>
          {darkMode
            ? <Icons.Sun className="w-4 h-4" />
            : <Icons.Moon className="w-4 h-4" />
          }
        </Button>
        <p className="mt-4 text-gray-900 dark:text-white">{darkMode ? 'Dark' : 'Light'}</p>
      </div>
    </div>
    
  )*/
  /*return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col gap-6">

      {/* Input */
    /*  <Card className="p-6 max-w-sm flex flex-col gap-3">
        <Input placeholder="Plain input" />
        <Input
          leading={<Icons.Search className="w-4 h-4" />}
          placeholder="With leading icon"
        />
      </Card>

      {/* Chips */
    /*  <div className="flex gap-2 flex-wrap">
        <Chip tone="neutral">Neutral</Chip>
        <Chip tone="brand">Brand</Chip>
        <Chip tone="success">Success</Chip>
        <Chip tone="warn">Warning</Chip>
        <Chip tone="danger">Danger</Chip>
        <Chip tone="info" size="sm">Small</Chip>
      </div>

      {/* Avatars */
    /*  <div className="flex gap-3 items-center">
        <Avatar name="Maya Okonkwo" size={40} />
        <Avatar name="Aiden Chen" size={40} />
        <Avatar name="Sofia Reyes" size={40} />
        <Avatar name="Daniel Park" size={32} />
        <Avatar name="Jordan Liu" size={24} />
      </div>

    </div>
  )*/
  
    /*return (
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col gap-4">
        <Card className="p-6 max-w-sm">
          <p className="text-gray-900 font-semibold">This is a Card</p>
          <p className="text-gray-500 text-sm mt-1">With some content inside</p>
        </Card>
        

        <div className="flex gap-3 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" leading={<Icons.Plus className="w-4 h-4" />}>
            New task
          </Button>
          <Button variant="ghost" size="iconSm">
            <Icons.Bell className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )*/