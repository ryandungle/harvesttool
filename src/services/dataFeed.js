import { firestore } from "../firebase";
import moment from "moment";

const dataFeed = {};

dataFeed.getPlants = () => {
    return new Promise(async (resolve, reject) => {
        let plants = [];
        try {
            const querySnapshot = await firestore.collection("Plants").get();
            querySnapshot.forEach((doc) => {
                let plant = doc.data();
                plant.id = doc.id;
                plant.BirthDate = moment(plant.BirthDate).format('DD/MM/YYYY');
                plants.push(plant);
            });
            resolve(plants);
        } catch (err) {
            reject(err);
        }
    })
}

//Listener
dataFeed.onPlants = (action) => {
    return firestore.collection('Plants').onSnapshot(action);
}

dataFeed.offPatients = () => {
    firestore.collection('patients').onSnapshot(() => { });
}

dataFeed.getPatient = (patientId) => {
    return new Promise(async (resolve, reject) => {
        let patient = {};
        try {
            const patientRef = await firestore
                .collection("patients")
                .doc(patientId)
                .get();
            patient = patientRef.data();
            resolve(patient);
        }
        catch (err) {
            reject(err);
        }
    })
}

dataFeed.updatePatient = (patient) => {
    return new Promise(async (resolve, reject) => {
        try {
            const patientRef = await firestore
                .collection("patients")
                .doc(patient.PatientId)
                .update(patient);
            resolve(patientRef);
        }
        catch (err) {
            reject(err);
        }
    })
}

dataFeed.setEditStatus = (patientId, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const patientRef = await firestore
                .collection("patients")
                .doc(patientId)
                .update({ EditStatus: status });
            resolve(patientRef);
        }
        catch (err) {
            reject(err);
        }
    })
}


export default dataFeed;