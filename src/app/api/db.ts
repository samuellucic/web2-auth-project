import serviceAccount from '../../../serviceAccountKey';
import { initializeApp } from '@firebase/app';
import {
  addDoc,
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@firebase/firestore';
import { Competition, Match, MatchType } from '../components/Types';

const firebaseApp = initializeApp(serviceAccount);

export const db = getFirestore(firebaseApp);

export const getCompetitionsByUserId = async (username: string) => {
  const q = query(collection(db, 'users', username, 'competitions'));

  const results = await getDocs(q);
  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
};

export const getCompetitionById = async (
  username: string,
  competitionId: string
) => {
  const docRef = doc(db, 'users', username, 'competitions', competitionId);
  const docSnap = await getDoc(docRef);
  return { ...docSnap.data() };
};

export const addCompetition = async (
  username: string,
  competitionData: Competition,
  schedule: [string, string][][]
) => {
  const competitionDocRef = await addDoc(
    collection(db, 'users', username, 'competitions'),
    competitionData
  );

  for (let i = 0; i < schedule.length; i++) {
    const round = schedule[i];
    for (const match of round) {
      const matchData: Match = {
        firstOpponent: match[0],
        secondOpponent: match[1],
        status: 'upcoming',
        round: i + 1,
      };

      await addDoc(
        collection(
          db,
          'users',
          username,
          'competitions',
          competitionDocRef.id,
          'matches'
        ),
        matchData
      );
    }
  }
};

export const getMatches = async (
  username: string,
  competitionId: string,
  status?: MatchType
) => {
  const q = status
    ? query(
        collection(
          db,
          'users',
          username,
          'competitions',
          competitionId,
          'matches'
        ),
        where('status', '==', status)
      )
    : query(
        collection(
          db,
          'users',
          username,
          'competitions',
          competitionId,
          'matches'
        )
      );

  const results = await getDocs(q);
  return results.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateMatch = async (
  username: string,
  competitionId: string,
  matchId: string,
  data: {
    firstOpponentScore: number;
    secondOpponentScore: number;
    status: 'finished';
  }
) => {
  const matchRef = doc(
    db,
    'users',
    username,
    'competitions',
    competitionId,
    'matches',
    matchId
  );
  try {
    await updateDoc(matchRef, data);
  } catch (error) {
    return false;
  }
  return true;
};

export const deleteMatchResults = async (
  username: string,
  competitionId: string,
  matchId: string
) => {
  const matchRef = doc(
    db,
    'users',
    username,
    'competitions',
    competitionId,
    'matches',
    matchId
  );
  try {
    await updateDoc(matchRef, {
      firstOpponentScore: deleteField(),
      secondOpponentScore: deleteField(),
      status: 'upcoming',
    });
  } catch {}
};
