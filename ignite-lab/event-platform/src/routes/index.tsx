import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Event, Subscribe } from '../pages';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Subscribe />} />
      <Route path="/event" element={<Event />} />
      <Route path="/event/lesson/:slug" element={<Event />} />
    </Routes>
  );
};

export { Router };
