import React, { Suspense, lazy } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const Regions = lazy(() => import('../Project/Regions'));
const RegionDetail = lazy(() => import('../Project/RegionDetail'));
const LivingLabDetail = lazy(() => import('../Project/LivingLabDetail'));
const Contact = lazy(() => import('../Project/Contact'));
const KnowledgeCloud = lazy(() => import('../Project/KnowledgeCloud'));
const NotFound = lazy(() => import('../Project/NotFound'));

export default function LegacyRouteRenderer({ path = '/' }) {
  return (
    <Suspense fallback={null}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/living-labs" element={<Regions />} />
          <Route path="/living-labs/:regionId" element={<RegionDetail />} />
          <Route path="/living-labs/:regionId/:labId" element={<LivingLabDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    </Suspense>
  );
}
