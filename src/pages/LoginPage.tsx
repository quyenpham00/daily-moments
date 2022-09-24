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

const LoginPage: React.FC = () => {
  const { loggedIn, userId } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState({ loading: false, error: false })

  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false })
      const credential = await auth.signInWithEmailAndPassword(email, password)
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
          <IonTitle>Login Page</IonTitle>
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
        {status.error && <IonText color="danger">Invalid credentials</IonText>}
        <IonButton expand="block" onClick={handleLogin}>
          Login
        </IonButton>
        <IonButton fill="clear" expand="block" routerLink="/register">
          Don't have an account?
        </IonButton>
        <IonLoading isOpen={status.loading}></IonLoading>
      </IonContent>
    </IonPage>
  )
}

export default LoginPage
