import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getPostsDb() {
    const postsCol = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCol);
    // const postList = postsSnapshot.docs.map(doc => doc.data());

    // Probar solo paras el snapshot para obtener los ids

    return postsSnapshot;
}

export async function addPostDb(post: any) {
    const postsCol = collection(db, 'posts');
    const docRef = await addDoc(postsCol, post);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
}

export async function deletePostDb(postId: string) {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);
}

export async function registerUserDb(username: string, userType: string) { //Crear un usuario
    // Check if the user already exists
    const userCol = collection(db, 'users');
    const docRef = await addDoc(userCol, {
        username: username,
        userType: userType
    });
    console.log("Document written with ID: ", docRef.id); // Agregar un console log para verificar el ID del documento
    return docRef.id;
}

export async function getUsersDb() { // Esta función obtiene todos los usuarios almacenados en Firestore.

    const usersCol = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCol);

    return usersSnapshot;
}