import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonRouterLink,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React from 'react'
import { auth } from '../firebase'

const SettingPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setting Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" color="medium" onClick={() => auth.signOut()}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default SettingPage
