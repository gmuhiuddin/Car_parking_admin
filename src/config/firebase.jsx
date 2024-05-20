import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCYZ7jrySsTMZtSDI3cMNK1Vqk8kcvXswk",
    authDomain: "car-parking-lot-9a802.firebaseapp.com",
    projectId: "car-parking-lot-9a802",
    storageBucket: "car-parking-lot-9a802.appspot.com",
    messagingSenderId: "892918611033",
    appId: "1:892918611033:web:d3cc172ccd701f4f194548",
    measurementId: "G-67FW8XVQJQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const login = async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password);
};

const logout = async () => {
    await signOut(auth);
};

const getAppointment = async () => {

    const appointmentDate = new Date();

    const appointmentCollection = collection(db, "appointment");

    const q = query(
        appointmentCollection,
        orderBy("date", "asc"),
        where("date", ">=", appointmentDate.getTime()),
    );

    const appointments = await getDocs(q);

    return appointments.docs;
};

export { auth, login, logout, getAppointment };