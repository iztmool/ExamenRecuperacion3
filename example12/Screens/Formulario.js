import React, {useContext} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {Button} from 'react-native-elements'
import {Picker} from '@react-native-picker/picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ProductosContext} from '../Context/ProductosContext';
import Constants from 'expo-constants';
import firebase from '../Settings/ConfigFirebase'

const validations =Yup.object().shape({
    id:Yup.number().typeError('Este campo es numérico').max(99999999,"Número muy grande").required('Obligatorio'),
    cantidad:Yup.number().typeError('Este campo es numérico').max(99999999,"Número muy grande").required('Obligatorio'),
    precio:Yup.number().typeError('Este campo es numérico').max(99999999,"Número muy grande").required('Obligatorio'),
    descripcion: Yup.string().min(2,'Descripción muy chico').max(50,'Descripción muy Grande').required('Obligatorio')
})

export default function Formulario({route,navigation}){
    const {status} = route.params;
    const {productos,lista,total,setProductos,setLista,setTotal}= useContext(ProductosContext);

    return(
        <View style={styles.container}>
            <Text style={styles.header}>productos</Text>

            <Formik
                initialValues={productos}
                onSubmit={(values,{resetForm})=>{
                     firebase.database().ref('Productos/'+productos.id).update(productos).then(()=>{
                         alert("Enviado")
                     })
                    const temporal = lista.filter(al=>al.id!=productos.id);//!==
                    //alert('enviado')
                    const importe=(productos.cantidad)*(productos.precio);
                    setTotal(total-importe);
                    setLista([...temporal,productos]);
                    resetForm({
                        id:"",
                        cantidad:"",
                        descripcion:"",

                        precio:"",
                    
                    })
                    navigation.navigate('Listado')

                    console.log(lista) 
                }}
                validationSchema={validations}
                validate={(values)=>{
                    setProductos(values)
                }}
            >
            {
                ({handleChange, handleBlur, handleSubmit, setFieldValue, handleReset, errors, values})=>(
                    <View>
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('id')}
                            onBlur={handleBlur('id')}
                            placeholder="id"
                            value={values.id}
                            editable={status==="add"?true:false}
                        />
                        
                        {errors.id && <Text style={styles.texterror}>{errors.id}</Text>}
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('descripcion')}
                            onBlur={handleBlur('descripcion')}
                            placeholder="Descripción"
                            value={values.descripcion}
                        
                        />
                        
                        {errors.descripcion && <Text style={styles.texterror}>{errors.descripcion}</Text>}

                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('cantidad')}
                            onBlur={handleBlur('cantidad')}
                            placeholder="cantidad"
                            value={values.cantidad}                        

                        />

                        {errors.cantidad && <Text style={styles.texterror}>{errors.cantidad}</Text>}
                        <TextInput
                            style={styles.textinput}
                            onChangeText={handleChange('precio')}
                            onBlur={handleBlur('precio')}
                            placeholder="precio"
                            value={values.precio}                        

                        />

                        {errors.precio && <Text style={styles.texterror}>{errors.precio}</Text>}

                       
                       

                        <View style={{marginTop:20}}>
                            <Button
                                buttonStyle={styles.buttons}
                                onPress={handleSubmit}
                                title="Enviar"
                            />

                            {
                                status==="add"
                                &&
                                <Button
                                buttonStyle={styles.buttons}
                                onPress={handleReset}
                                title="Limpiar"
                                />

                            }
                        


                        </View>

                    </View>
                )


            }    
                
            </Formik>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      margin:20,
      marginTop:Constants.statusBarHeight
   
    },
    texterror:{
      color:'red'
    },
    textinput:{
      borderRadius:10, 
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      margin:5, 
      paddingLeft:15, 
      backgroundColor:'white',
      elevation: 5,
    },
    buttons:{
      backgroundColor:'gray', 
      color:'black', 
      marginTop:10, 
      borderRadius:10
    },
    header:{
      fontSize:20, 
      textAlign:'center', 
      marginBottom:40
    },
    picker:{
      margin:5, 
      borderRadius: 10, 
      borderWidth: 1, 
      borderColor: 'gray', 
      overflow: 'hidden',
      elevation: 5,
    }
  
  });