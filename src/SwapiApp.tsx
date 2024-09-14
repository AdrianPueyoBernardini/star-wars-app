import { Header } from "./Header";
import { DataDisplay } from "./DataDisplay";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export const SwapiApp = () => {
  const HomePage: React.FC = () => {
    return (
      <div>
        <Header />
        <DataDisplay />
      </div>
    );
  };

  const ProfilePage: React.FC = () => {
    return <Profile />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};
