import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventList from './pages/EventList';
import CreateEvent from './pages/CreateEvent';
import EventDetail from './pages/EventDetail';
import MyCreatedEvents from './pages/MyCreatedEvents';
import MyParticipations from './pages/MyParticipations';
import PrivateRoute from './components/PrivateRoute';
import EditEvent from './pages/EditEvent';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/create"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-participations"
          element={
            <PrivateRoute>
              <MyParticipations />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-created-events"
          element={
            <PrivateRoute>
              <MyCreatedEvents />
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id/edit"
          element={
            <PrivateRoute>
              <EditEvent />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
