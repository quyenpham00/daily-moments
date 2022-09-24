import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth'
import { firestore } from '../firebase'
import { Entry, toEntry } from '../models'
import { addOutline } from 'ionicons/icons'

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const HomePage: React.FC = () => {
  const { userId } = useAuth()
  const [entries, setEntries] = useState<Entry[]>([])
  useEffect(() => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
    return entriesRef
      .orderBy('date', 'desc')
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)))
  }, [userId])
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          {entries.map((entry) => (
            <IonItem key={entry.id} routerLink={`/my/entries/view/${entry.id}`}>
              <IonThumbnail slot="end">
                <IonImg src={entry?.pictureUrl}></IonImg>
              </IonThumbnail>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addOutline}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default HomePage
