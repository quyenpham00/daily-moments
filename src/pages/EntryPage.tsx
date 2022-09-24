import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { useAuth } from '../auth'
import { firestore } from '../firebase'
import { Entry, toEntry } from '../models'
import { trash, arrowBackOutline } from 'ionicons/icons'

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

interface RouterParams {
  id: string
}

const EntryPage: React.FC = () => {
  const history = useHistory()
  const { userId } = useAuth()
  const { id } = useParams<RouterParams>()
  const [entry, setEntry] = useState<Entry>()
  useEffect(() => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id)
    entryRef.get().then((doc) => setEntry(toEntry(doc)))
  }, [id, userId])

  const handleDelete = async () => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id)
    await entryRef.delete()
    history.goBack()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" color="none">
            <IonBackButton />
          </IonButton>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon slot="icon-only" icon={trash}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        {entry?.description}
      </IonContent>
    </IonPage>
  )
}

export default EntryPage
