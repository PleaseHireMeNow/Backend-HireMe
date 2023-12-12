import {questionsCol} from '../database/firestore'
import { getDocs, setDoc, doc } from '@firebase/firestore'
import { Questions } from '../types/models/Questions';
import { createQuestion } from './firestoreTestfunctions';
import * as admin from 'firebase-admin';

// jest.mock('firebase-admin', () => {
//   const set = jest.fn();
//
//   return {
//     database: jest.fn(() => ({
//       ref: jest.fn(() => ({
//         push: jest.fn(() => ({
//           set,
//         })),
//       })),
//     })),
//   };
// });

// Tests for DB
describe('createTestQuestion', () => {
    test('create a question'), async () => {
        const result = createQuestion();
        await expect(result).resolves.toEqual(true);
         
    };
});




