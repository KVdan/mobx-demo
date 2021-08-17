import "./styles.css";
import PetOwnerStore from "./store/PetOwnerStore.js";
import PetList from "./components/PetList.js";
import OwnerList from "./components/OwnList.js";

function App() {
  const store = new PetOwnerStore();


  return (
    <div className="App">
      <h3>Pets List</h3>
      <PetList store={store} />
      <hr />
      <h3>Owners List</h3>
      <OwnerList store={store} />
    </div>
  );
}

export default App;
