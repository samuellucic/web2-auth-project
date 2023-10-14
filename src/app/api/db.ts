import serviceAccount from '../../../serviceAccountKey.json';
import { initializeApp } from '@firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from '@firebase/firestore';
import { Competition, Match, MatchType } from '../components/Types';

const firebaseApp = initializeApp(serviceAccount);

export const db = getFirestore(firebaseApp);

export const addUser = async (userData: any) => {
  return await addDoc(collection(db, 'users'), userData);
};

export const getCompetitionsByUserId = async (userId: string) => {
  const q = query(collection(db, 'users', userId, 'competitions'));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const getCompetitionById = async (
  userId: string,
  competitionId: string
) => {
  const docRef = doc(db, 'users', userId, 'competitions', competitionId);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data() };
};

export const addCompetition = async (
  userId: string,
  competitionData: Competition,
  schedule: [string, string][][]
) => {
  const competitionDocRef = await addDoc(
    collection(db, 'users', userId, 'competitions'),
    competitionData
  );

  for (const round of schedule) {
    for (const match of round) {
      const matchData: Match = {
        firstOpponent: match[0],
        secondOpponent: match[1],
        status: 'upcoming',
      };

      await addDoc(
        collection(
          db,
          'users',
          userId,
          'competitions',
          competitionDocRef.id,
          'matches'
        ),
        matchData
      );
    }
  }
};

const getMatchesBasedOnStatus = async (
  userId: string,
  competitionId: string,
  status: MatchType
) => {
  const q = query(
    collection(db, 'users', userId, 'competitions', competitionId, 'matches'),
    where('status', '==', status)
  );

  const results = await getDocs(q);
  return results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getUpcomingMatches = async (
  userId: string,
  competitionId: string
) => {
  return getMatchesBasedOnStatus(userId, competitionId, 'upcoming');
};

export const getFinishedMatches = async (
  userId: string,
  competitionId: string
) => {
  return getMatchesBasedOnStatus(userId, competitionId, 'finished');
};
