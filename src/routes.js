import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import PlantsListView from 'src/views/plantsListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';

export default function Router() {

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/app/dashboard" />} />
        <Route path="404" element={<NotFoundView />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route path="app" element={<DashboardLayout />}>
        <Route path="account" element={<AccountView />} />
        <Route path="customers" element={<CustomerListView />} />
        <Route path="plants" element={<PlantsListView />} />
        <Route path="dashboard" element={<DashboardView />} />
      </Route>
    </Routes>
  )
}
