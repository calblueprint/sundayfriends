import firebaseApp from "../firebaseApp";
import "firebase/firestore";
import { Tiers } from "../../types/schema";

const db = firebaseApp.firestore();
const tiersCollection = db.collection("tiers");

/**
 * Returns all tiers data from firestore
 */
export const getAllTiers = async (): Promise<Tiers> => {
  try {
    // query everything in the tier collection
    const tiers = await tiersCollection.doc("tiers").get();
    const parsedTiers = parseTiers(tiers);
    return parsedTiers;
  } catch (e) {
    console.warn(e);
    throw e;
  }
};

export const updateTiers = async (
  tier2: number,
  tier3: number,
  tier4: number
): Promise<void> => {
  const doc = await tiersCollection.doc("tiers").get();
  var data = doc.data();
  data.tier2 = tier2;
  data.tier3 = tier3;
  data.tier4 = tier4;
  tiersCollection.doc("tiers").set(data);
};

export const updateTierDescriptions = async (
  tier1Title: string,
  tier2Title: string,
  tier3Title: string,
  tier4Title: string,
  tier1Description: string,
  tier2Description: string,
  tier3Description: string,
  tier4Description: string
): Promise<void> => {
  const doc = await tiersCollection.doc("tiers").get();
  var data = doc.data();
  data.tier1title = tier1Title;
  data.tier2title = tier2Title;
  data.tier3title = tier3Title;
  data.tier4title = tier4Title;
  data.tier1description = tier1Description;
  data.tier2description = tier2Description;
  data.tier3description = tier3Description;
  data.tier4description = tier4Description;
  tiersCollection.doc("tiers").set(data);
};

const parseTiers = async (doc: any) => {
  const data = doc.data();
  const tiers = {
    tier2: data.tier2,
    tier3: data.tier3,
    tier4: data.tier4,
    tier1title: data.tier1title,
    tier2title: data.tier2title,
    tier3title: data.tier3title,
    tier4title: data.tier4title,
    tier1description: data.tier1description,
    tier2description: data.tier2description,
    tier3description: data.tier3description,
    tier4description: data.tier4description,
  };
  return tiers as Tiers;
};
