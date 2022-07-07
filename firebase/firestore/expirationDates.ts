import firebaseApp from "../firebaseApp";
import "firebase/firestore";

const db = firebaseApp.firestore();
const expirationCollection = db.collection("expiration_dates");

/**
 * Returns all userInvite data from firestore
 */
export const getExpirations = async (): Promise<Date[]> => {
  try {
    // query everything in the userInvite collection
    const allExpirations = await expirationCollection.get();
    var expirations = [];
    allExpirations.docs.map((doc) =>
      expirations = parseExpiration(doc)
    );
    return expirations;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

// TODO replace doc with proper type
const parseExpiration = (doc: any) => {
  const data = doc.data();
  const expirations = data.expirations;
  var parsed = [];
  expirations.map((date) => {
    parsed.push(new Date(date.toMillis()));
  })
  return parsed;
};
