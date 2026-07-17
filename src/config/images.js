// // src/config/images.js
// const IMAGEKIT_URL = "https://ik.imagekit.io/toncompte"; // Remplace par ton URL ImageKit

// export const getImageUrl = (imageName, width = 800) => {
//   if (!imageName) return "";
//   // Extrait juste le nom du fichier si le chemin complet est passé
//   const fileName = imageName.includes('/') ? imageName.split('/').pop() : imageName;
//   return `${IMAGEKIT_URL}/${fileName}?tr=f-auto,q-80,w-${width}`;
// };

// // Liste de toutes tes images (optionnel mais pratique)
// export const images = {
//   salle1: getImageUrl("imgg1.jpg"),
//   salle2: getImageUrl("img2.png"),
//   salle3: getImageUrl("imgg2.jpg"),
//   salle4: getImageUrl("imgg3.jpg"),
//   salle5: getImageUrl("imgg4.jpg"),
//   salle6: getImageUrl("imgg5.jpg"),
//   photo1: getImageUrl("photo1 copie.jpg"),
//   photo2: getImageUrl("photo2 copie.jpg"),
  
//   // ... etc
// };