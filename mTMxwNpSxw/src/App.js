import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
// import Share from "./pages/Share";
import AddSample from "./pages/AddSample";
import {
  drumsPart,
  frenchHornPart,
  guitarPart,
  pianoPart,
  toneObject,
  toneTransport,
} from "./data/instruments";
import Share from "./pages/Share";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              instruments={{
                toneObject: toneObject,
                toneTransport: toneTransport,
                pianoPart: pianoPart,
                guitarPart: guitarPart,
                frenchHornPart: frenchHornPart,
                drumsPart: drumsPart,
              }}
            />
          }
        />
        <Route
          path="/edit"
          element={
            <AddSample
              toneObject={toneObject}
              toneTransport={toneTransport}
              pianoPart={pianoPart}
              guitarPart={guitarPart}
              frenchHornPart={frenchHornPart}
              drumsPart={drumsPart}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <Edit
              toneObject={toneObject}
              toneTransport={toneTransport}
              pianoPart={pianoPart}
              guitarPart={guitarPart}
              frenchHornPart={frenchHornPart}
              drumsPart={drumsPart}
            />
          }
        />

        <Route
          path="/share/:id"
          element={
            <Share
              toneObject={toneObject}
              toneTransport={toneTransport}
              pianoPart={pianoPart}
              guitarPart={guitarPart}
              frenchHornPart={frenchHornPart}
              drumsPart={drumsPart}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
