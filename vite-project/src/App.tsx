import Signup from "./components/Signup";
import Signin from "./components/Signin";
import { Ico } from "./components/Icon";
import { Dashboard } from "./components/Dashboard";
import { Schedule } from "./components/Schedule";
import { Calendar } from "./components/Calendar";
import { Profile } from "./components/Profile";
import "./App.css";

function App() {
  return (
    <div>
      <Signup />
      <Signin />
      <Ico.grid />
      <Dashboard />
      <Schedule />
      <Calendar />
      <Profile />
    </div> // I don't understand why it had to be Ico.grid. Is it because it is carrying images and not a function itself?
  );
}

export default App;
