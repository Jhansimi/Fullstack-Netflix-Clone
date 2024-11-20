import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyC3TL3RkJS8JehJ90s865MfnXq1iXAPnQI",
  authDomain: "netflix-clone-89465.firebaseapp.com",
  projectId: "netflix-clone-89465",
  storageBucket: "netflix-clone-89465.firebasestorage.app",
  messagingSenderId: "862577051713",
  appId: "1:862577051713:web:f1731bbca4a164b8cc5ec0",
  measurementId: "G-K02HWXWTEG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth=getAuth(app)
const db=getFirestore(app)
const signup=async (name,email,password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth,email,password)
       const user=res.user
       await addDoc(collection(db,"user"),{

        uid:user.uid,
        name,
        authProvider:"local",
        email,



       })

    }
    catch(error){
        console.log(error)
        toast.error(error.code.split('/'),[1].split('-').join(" "))

    }

}

const login = async(email,password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password)

    }
    catch(error){
     console.log(error)
     toast.error(error.code.split('/'),[1].split('-').join(" "))

    }

}
const logout=()=>{
    signOut(auth);


}

export {auth,db,login,signup,logout}