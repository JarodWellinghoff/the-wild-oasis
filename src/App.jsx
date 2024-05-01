import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";

import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./ui/AppLayout";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 1, // 1 minute
    },
  },
});

const toastOptions = {
  success: {
    duration: 3000,
  },
  error: {
    duration: 5000,
  },
  style: {
    fontSize: "16px",
    maxWidth: "500px",
    padding: "16px 24px",
    backgroundColor: "var(--color-grey-0)",
    textColor: "var(--color-grey-700)",
  },
};

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <Toaster
          position='top-center'
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={toastOptions}
        />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }>
              <Route path='account' element={<Account />} />
              <Route path='settings' element={<Settings />} />
              <Route path='users' element={<Users />} />
              <Route path='cabins' element={<Cabins />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='bookings/:bookingId' element={<Booking />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route index element={<Navigate replace to='dashboard' />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route path='login' element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
