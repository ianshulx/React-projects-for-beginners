'use client';

import React from 'react';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';

// components
import Banner from '@/app/(DashboardLayout)/components/landingpage/banner/Banner';
import Footer from '@/app/(DashboardLayout)/components/landingpage/footer/Footer.tsx';
import LpHeader from '@/app/(DashboardLayout)/components/landingpage/header/Header.jsx';
import CardComponent from '@/app/(DashboardLayout)/components/landingpage/card/CardComponent.tsx';

export default function Landingpage() {
  return (
    <PageContainer title="Landingpage" description="this is Landingpage">
      <LpHeader />
      <Banner />
      <CardComponent />
      <Footer />
    </PageContainer>
  );
}
