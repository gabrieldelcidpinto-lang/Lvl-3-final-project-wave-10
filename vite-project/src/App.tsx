import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Ico } from "./components/Icon";
import { Dashboard } from "./components/Dashboard";
import { Schedule } from "./components/Schedule";
import { CalendarView } from "./components/Calendar";
import { ProfileView } from "./components/Profile";
import { Tip } from "./components/Tip";
import "./App.css";

function App() {
  return (
    <div>
      <Signup />
      <Signin />
      <Ico.grid />
      <Dashboard onNavigate={() => {}} onGame={() => {}} />
      <Schedule onGame={() => {}} />
      <CalendarView onGame={() => {}} />
      <ProfileView />
      <Tip />
    </div> // I don't understand why it had to be Ico.grid. Is it because it is carrying images and not a function itself?
  );
}

export default App;
