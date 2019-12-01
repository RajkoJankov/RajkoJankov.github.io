import firebase from 'firebase/app'
import 'firebase/firestore'

export const db = firebase
.initializeApp({ projectId : 'snakes-e537b'})
.firestore()

const { TimeStamp, GeoPoint} = firebase.firestore
export { TimeStamp, GeoPoint}