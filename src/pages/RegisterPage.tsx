import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import { useAuth } from '../auth'
import { auth } from '../firebase'

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ loading: false, error: false })

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false })
      const credential = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )
    } catch (error) {
      setStatus({ loading: false, error: true })
    }
  }
  if (loggedIn) {
    return <Redirect to="/my/entries"></Redirect>
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(event) => setEmail(event.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(event) => setPassword(event.detail.value)}
            ></IonInput>
          </IonItem>
        </IonList>
        {status.error && <IonText color="danger">Registation failed</IonText>}
        <IonButton expand="block" onClick={handleRegister}>
          Create Account
        </IonButton>
        <IonButton fill="clear" expand="block" routerLink="/login">
          Already have an account?
        </IonButton>
        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  )
}

export default RegisterPage
