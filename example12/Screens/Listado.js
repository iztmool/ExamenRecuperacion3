import React, {useContext,useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {ListItem, Header} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ProductosContext} from '../Context/ProductosContext';

const Listado = ({navigation}) => {

    const {lista,setProductos,eliminar,total} = useContext(ProductosContext);
   
    const operacion =(precio,cantidad)=>{
       
         
      return (precio*cantidad);
    }
    return (
    
    <View style={styles.container}>
        <Header
            centerComponent={{ text: 'Lista de Productos', style: { color: '#fff', fontSize:20 } }}
            rightComponent={{ icon: 'add', color: '#fff', onPress:()=>{
                 setProductos({
                     id:null,
                     cantidad:"",
                     descripcion:"",
                     precio:""
                     
                 })   

                 navigation.navigate('Formulario',{status:"add"})

            }}}
            containerStyle={{backgroundColor:'#258902'}}
        />
        <ScrollView>
        {
            lista.length>0
            ?
            lista.map((a,i)=>(
                
                <ListItem key={i} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>Descripción:{a.descripcion}</ListItem.Title>
                        <ListItem.Subtitle>Cantidad:{a.cantidad}</ListItem.Subtitle>
                        <ListItem.Subtitle>Precio:{a.precio}</ListItem.Subtitle>
                        <ListItem.Subtitle>Importe:{operacion(a.precio,a.cantidad)}</ListItem.Subtitle>
                    </ListItem.Content>
                    <View style={styles.buttons}>
                        <Ionicons name='ios-trash' size={30} color={'red'} onPress={()=>eliminar(a.id,a.precio,a.cantidad)}/>
                        <Ionicons name='md-create' size={30} color={'green'}  onPress={()=>{
                            setProductos({
                                id:a.id.toString(),
                                cantidad:a.cantidad,
                                descripcion:a.descripcion,
                                precio:a.precio
                                
                            })

                            navigation.navigate('Formulario',{status:"edit"})
                        }}/>
            
                    </View>
                </ListItem>
            
            ))
            
            :
            <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>No hay Productos</Text>


        }
          <Text style={{marginTop:50, textAlign:'center', fontSize:20}}>{total}</Text>

        </ScrollView>


    </View>
    );
}
 
export default Listado;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    buttons:{
        width:'25%', 
        flexDirection:'row', 
        justifyContent:'space-between'
    }
});