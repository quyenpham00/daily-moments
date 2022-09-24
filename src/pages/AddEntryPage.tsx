import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from '@ionic/react'
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core'
import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import { useAuth } from '../auth'
import { firestore, storage } from '../firebase'

const { Camera } = Plugins

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`)
  const respone = await fetch(blobUrl)
  const blob = await respone.blob()

  const snapshot = await pictureRef.put(blob)
  const url = snapshot.ref.getDownloadURL()
  return url
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png')
  const fileInputRef = useRef<HTMLInputElement>()

  useEffect(
    () => () => {
      if (pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl)
      }
    },
    [pictureUrl],
  )
  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          width: 600,
        })
        setPictureUrl(photo.webPath)
      } catch (error) {
        console.log(error)
      }
    } else {
      fileInputRef.current.click()
    }
  }

  const handelFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0)
      const pictureUrl = URL.createObjectURL(file)
      setPictureUrl(pictureUrl)
    }
  }
  const handleSave = async () => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
    const entryData = { date, title, pictureUrl, description }
    if (!pictureUrl.startsWith('/assets')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId)
    }
    const entryRef = await entriesRef.add(entryData)
    history.goBack()
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton color="none" />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              type="text"
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handelFileChange}
              ref={fileInputRef}
            ></input>
            <img
              style={{ cursor: 'pointer' }}
              src={pictureUrl}
              alt="placeholder"
              onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            ></IonTextarea>
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default AddEntryPage
