import {
  makeObservable,
  observable,
  computed,
  autorun,
  action,
  runInAction
} from "mobx";
import axios from "axios";

class PetOwnerStore {
  pets = [];
  owners = [];

  constructor() {
    makeObservable(this, {
      pets: observable,
      owners: observable,
      totalOwners: computed,
      totalPets: computed,
      storeDetails: computed,
      getPetsByOwner: action,
      createPet: action,
      createOwner: action,
      updatePet: action,
      updateOwner: action,
      deletePet: action,
      deleteOwner: action,
      assignOwnerToPet: action
    });
    autorun(this.logStoreDetails);
    runInAction(this.prefetchData);
  }

  // total number owners
  get totalOwners() {
    return this.owners.length;
  }

  // total number of pets
  get totalPets() {
    return this.pets.length;
  }

  // Get pets using ownerId
  getPetsByOwner(ownerId) {
    return this.pets.filter((pet) => {
      return pet.owner && pet.owner.id === ownerId;
    });
  }

  createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
    this.pets.push(pet);
  }

  createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
    this.owners.push(owner);
  }

  updateOwner(ownerId, update) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
    if (ownerIndexAtId > -1 && update) {
      this.owners[ownerIndexAtId] = update;
    }
  }

  updatePet(petId, update) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1 && update) {
      this.pets[petIndexAtId] = update;
    }
  }

  deletePet(petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    if (petIndexAtId > -1) {
      this.pets.splice(petIndexAtId, 1);
    }
  }

  deleteOwner(ownerId) {
    const ownerIndexAtId = this.owners.findIndex(
      (owner) => owner.id === ownerId
    );
    if (ownerIndexAtId > -1) {
      this.owners.splice(ownerIndexAtId, 1);
    }
  }

  // assign an owner using ownerId to a pet using petId
  assignOwnerToPet(ownerId, petId) {
    const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
    const ownerIndexAtId = this.owners.findIndex((pet) => pet.id === ownerId);
    if (petIndexAtId > -1 && ownerIndexAtId > -1) {
      this.pets[petIndexAtId].owner = this.owners[petIndexAtId];
    }
  }

  get storeDetails() {
    return `We have ${this.totalPets} total pets and ${this.totalOwners} total owners, so far!!!`;
  }

  logStoreDetails() {
    console.log(this.storeDetails);
  }

  prefetchData = () => {
    axios
      .get(
        "https://raw.githubusercontent.com/KVdan/fake_name_data/main/MOCK_NAME_DATA.json"
      )
      .then((res) => {
        res.data.slice(50).forEach((item, index) => {
          this.createOwner({
            firstName: item.first_name,
            lastName: item.last_name,
            id: index
          });
        });
        res.data.slice(-50).forEach((item, index) => {
          this.createPet({
            name: item.first_name,
            id: index
          });
          this.assignOwnerToPet(index, index);
        });
      });
  };
}

export default PetOwnerStore;
