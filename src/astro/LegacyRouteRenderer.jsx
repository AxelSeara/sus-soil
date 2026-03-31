import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Home from '../Project/Home/Home';
import Regions from '../Project/Regions';
import RegionDetail from '../Project/RegionDetail';
import LivingLabDetail from '../Project/LivingLabDetail';
import About from '../Project/Project1/About';
import Partners from '../Project/Project1/Partners';
import WorkPackages from '../Project/Project1/WorkPackages';
import Contact from '../Project/Contact';
import Resources from '../Project/Resources/Resources';
import KnowledgeCloud from '../Project/KnowledgeCloud';
import NotFound from '../Project/NotFound';

export default function LegacyRouteRenderer({ path = '/' }) {
  return (
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/living-labs" element={<Regions />} />
        <Route path="/living-labs/:regionId" element={<RegionDetail />} />
        <Route path="/living-labs/:regionId/:labId" element={<LivingLabDetail />} />
        <Route path="/project/about" element={<About />} />
        <Route path="/project/work-packages" element={<WorkPackages />} />
        <Route path="/project/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/knowledge-cloud" element={<KnowledgeCloud />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}
