import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons'
import { Route, Redirect } from 'react-router'
import SettingPage from './pages/SettingPage'
import EntryPage from './pages/EntryPage'
import React from 'react'
import HomePage from './pages/HomePage'
import { useAuth } from './auth'
import AddEntryPage from './pages/AddEntryPage'
const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth()
  if (!loggedIn) {
    return <Redirect to="/login" />
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage />
        </Route>
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
        <Route exact path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route exact path="/my/settings">
          <SettingPage />
        </Route>
        <Redirect exact path="/" to="/my/entries" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default AppTabs
