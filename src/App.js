import 'react-perfect-scrollbar/dist/css/styles.css';
import React, { useEffect, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import { Button, ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';

import { Navigate, Routes, Route, BrowserRouter } from 'react-router-dom';
import { auth } from 'src/firebase';
import Router from 'src/routes';

import MainLayout from 'src/layouts/MainLayout';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';

//redux
import * as actions from 'src/redux/types';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './PrivateRoute';
import Loader from 'src/views/Loader';

const App = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onAuthStateChangedObserver = auth.onAuthStateChanged(user => {
      if (!user || !user.uid) {
        setUser('');
        setLoading(false);
        return;
      }
      setUser(user);
      setLoading(false);

    });

    return () => {
      onAuthStateChangedObserver();

    }
  })

  

  if (loading) {
    return <Loader />;
  }

  if (user) {
    return (
      <ThemeProvider theme={theme}>
        <Router user={user} />

      </ThemeProvider>
    )
  }


  return (
    //fix router problem by waiting until user is ready.
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<LoginView user1={user} />} />
          <Route path="404" element={<NotFoundView />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>

    </ThemeProvider>
  );
};

export default App;

