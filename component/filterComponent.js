import React, { memo,useEffect } from "react";
import { Text, Pressable,StyleSheet, } from "react-native";
import { useDispatch,useSelector } from "react-redux"

let backgroundColorStyle 
let importantText
let normalText
let fadeColor
let blue




const FilterComponent = (props) => {
  const { filterDay, filterText, selectedRange, setSelectedRange } = props;
  const isFilterSelected = (filter) => filter === selectedRange;
  let { background } = useSelector(state => state.userAuth)

  useEffect(()=>{
      backgroundColorStyle = background
    if (backgroundColorStyle == 'white') {
      importantText = 'black'
      normalText = '#5d616d'
      fadeColor = 'rgb(240,240,240)'
      blue = '#1652f0'


    } else if (backgroundColorStyle == 'black') {
      importantText = 'white'
      normalText = '#5d616d'
      normalText = 'rgb(200,200,200)'
      fadeColor = 'rgb(30,30,30)'
      blue = '#1652f0'
    }

  },[background])

  return (
    <Pressable
      style={{
        width:53,
        height:53,
        borderRadius: 53,
        backgroundColor:isFilterSelected(filterDay)?fadeColor:backgroundColorStyle,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
      }}
      onPress={() =>{ /*setSelectedRange(filterDay)*/}}
    >
      <Text style={{...styles.text,color:isFilterSelected(filterDay)?'#1652f0':'rgb(100,100,100)',}}>{filterText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text:{
    color:'rgb(100,100,100)',
    fontSize:17,
    fontFamily:'ABeeZee'
  }
 

})

export default memo(FilterComponent);