// import React, { useEffect } from 'react'
// import { View, TextInput, Button, StyleSheet } from 'react-native'

// // const Contact = () => {
// //   useEffect(() => {
// //     alert('Contact screen is mounted')
// //     return () => {
// //       alert('Contact screen is unmounted')
// //     }
// //   })
// const Contact = ({ navigation }) => {
//   useEffect(() => {
//     navigation.addListener('beforeRemove', (event) => {
//       event.preventDefault()
//       alert('Are you sure?')
//     })
//   })
//   return (
//     <View style={styles.container}>
//       <TextInput placeholder="Nama Anda" style={styles.textInput} />
//       <TextInput placeholder="Pesan" style={styles.textInput} />
//       <View style={styles.buttonContainer}>
//         <Button title="Kirim" />
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     margin: 30,
//   },
//   textInput: {
//     height: 60,
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 20,
//   },
//   buttonContainer: {
//     marginTop: 20,
//   },
// })

// export default Contact

import React, { useEffect, useState } from 'react'
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native'

const Contact = ({ navigation }) => {
  const [nama, setNama] = useState('')
  const [pesan, setPesan] = useState('')
  const [formIsFilled, setFormIsFilled] = useState(false)

  // Effect untuk mengatur event listener sebelum layar dihapus
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (event) => {
      if (!formIsFilled) {
        // Jika form tidak diisi, biarkan pengguna pergi
        return
      }

      event.preventDefault()

      // Tampilkan dialog konfirmasi
      Alert.alert(
        'Apakah Anda yakin?',
        'Anda belum mengirim pesan. Apakah Anda ingin tetap di halaman ini?',
        [
          {
            text: 'Tetap di sini',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Lanjutkan pergi',
            style: 'destructive',
            onPress: () => navigation.dispatch(event.data.action),
          },
        ],
        { cancelable: false }
      )
    })

    // Clean up effect
    return unsubscribe
  }, [formIsFilled, navigation])

  const handleKirim = () => {
    // Handle logika pengiriman pesan disini
    // Misalnya, validasi dan pengiriman data ke server
    if (nama !== '' && pesan !== '') {
      // Contoh sederhana, bisa disesuaikan dengan kebutuhan
      alert(`Pesan dari ${nama}: ${pesan}`)
      setFormIsFilled(true)
    } else {
      alert('Harap isi semua field sebelum mengirim.')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nama Anda"
        style={styles.textInput}
        value={nama}
        onChangeText={(text) => setNama(text)}
      />
      <TextInput
        placeholder="Pesan"
        style={styles.textInput}
        value={pesan}
        onChangeText={(text) => setPesan(text)}
        multiline
      />
      <View style={styles.buttonContainer}>
        <Button title="Kirim" onPress={handleKirim} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  textInput: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
})

export default Contact
