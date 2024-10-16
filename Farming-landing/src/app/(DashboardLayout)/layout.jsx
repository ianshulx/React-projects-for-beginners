'use client';
import Container from '@mui/material/Container';
import { styled, useTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import Landingpage from '../landingpage/page';
import { useSelector } from 'react-redux';
import 'tailwindcss/tailwind.css';
// import './global.css';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '20vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  width: '100%',
  backgroundColor: 'transparent',
}));

export default function RootLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const theme = useTheme();

  return (
    <MainWrapper>
      {/* ------------------------------------------- */}
      {/* Sidebar */}
      {/* ------------------------------------------- */}

      {/* ------------------------------------------- */}
      {/* Main Wrapper */}
      {/* ------------------------------------------- */}
      <PageWrapper className="page-wrapper">
        {/* ------------------------------------------- */}
        {/* Header */}
        {/* ------------------------------------------- */}
        {/* {customizer.isHorizontal ? <HorizontalHeader /> : <Header />} */}
        {/* PageContent */}
        <Landingpage />
        {/* ------------------------------------------- */}
        <Container></Container>
      </PageWrapper>
    </MainWrapper>
  );
}
