import { Navigate, Route, Routes } from "react-router";

import { AppLayout } from "./components/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { PlaceholderPage } from "./pages/PlaceholderPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route
          path="companies"
          element={
            <PlaceholderPage
              title="Companies"
              description="Keep every organization, relationship, and opportunity in one clear place."
            />
          }
        />
        <Route
          path="contacts"
          element={
            <PlaceholderPage
              title="Contacts"
              description="Know the people behind every account and keep conversations connected."
            />
          }
        />
        <Route
          path="deals"
          element={
            <PlaceholderPage
              title="Deals"
              description="Track each opportunity from first conversation through close."
            />
          }
        />
        <Route
          path="pipeline"
          element={
            <PlaceholderPage
              title="Pipeline"
              description="See where active opportunities are moving across your sales stages."
            />
          }
        />
        <Route
          path="tasks"
          element={
            <PlaceholderPage
              title="Tasks"
              description="Plan follow-ups and keep the next action visible for every deal."
            />
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}