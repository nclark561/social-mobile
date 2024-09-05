import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CreateAccount from '@/components/CreateAccount';
import SignIn from '@/components/SignIn';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';



export default function Login() {

  const [loginToggle, setLoginToggle] = useState(true)


  return (
    <ThemedView style={styles.page}>
      <ThemedText>Testing</ThemedText>
      {loginToggle ? <SignIn setLoginToggle={setLoginToggle} /> : <CreateAccount setLoginToggle={setLoginToggle} />}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});