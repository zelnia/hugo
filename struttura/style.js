import { StyleSheet } from 'react-native';


// 76497f
const accent1="#6f10b7";
// const accent1="#d44b9e";

const ss= StyleSheet.create({
    accent1:{
      color:accent1,
    },
    nrs:{
      // padding:10,
      borderRadius:9,
      borderColor:accent1,
      backgroundColor: "#fff",
      overflow:"hidden",
    },
    bwith1:{
      borderWidth:1,
    },
    bwith3:{
      borderWidth:3,
    },
    divinterno1: {
      flex: 1,
      marginVertical:30,
      paddingHorizontal:20,
      paddingTop:25,
      paddingBottom:30,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: "#ccc",
      borderRadius: 4,
    },
    divinterno2: {
      flex: 1,
      marginVertical:50,
      paddingHorizontal:20,
      paddingTop:15,
      paddingBottom:20,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: "#444",
      borderRadius: 4,
    },
    divinterno3: {
      padding:25,
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: "#ccc",
      borderRadius: 4,
    },
    // divinterno4: {
    //   padding:15,
    //   backgroundColor: '#fff',
    //   borderWidth: 2,
    //   borderColor: "#ccc",
    //   borderRadius: 4,
    // },
    row: {
      flexDirection:"row"
    },
    mx25:{
      marginHorizontal:25,
    },
    mx10:{
      marginHorizontal:10,
    },
    maxw150:{
      maxWidth:150,
    },
    maxw250:{
      maxWidth:250,
    },
    maxw350:{
      maxWidth:350,
    },
    mauto:{
      margin:'auto',
    },
    mt15p: {
      marginTop:"15%",
    },
    mb15: {
      marginBottom:15,
    },
    mb5: {
      marginBottom:5,
    },
    img:{
      width:'100%',
      resizeMode: 'contain',
      flex: 1
    },
    cardField:{
      height: 50,
    },
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      padding:10,
      minHeight:100
    },
    container2: {
      flex: 1,
      backgroundColor: '#f7f4ee',
      justifyContent: 'left',
      padding:5,
      margin:5
    },
    container3: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding:10,
    },
    separator: {
      flex: 1,
      backgroundColor: '#fff',
      alignSelf: 'stretch',
      width:'100%',
      padding:1,
      marginBottom:5
    },
    safeareaview: {
      flex: 1,
      backgroundColor: '#eee',
    },
    safeareaview2: {
      flex: 1,
      backgroundColor: '#fff',
    },
    bordogrigio: {
      borderWidth: 1,
      borderColor: "#6200ee",
      // borderColor: "#00a1ae",
      borderRadius: 7,
      backgroundColor: "#eee",
    },
    bordomare: {
      borderWidth: 1,
      borderColor: "#6200ee",
      // borderColor: "#00a1ae",
      borderRadius: 7,
    },
    bordoaccent1: {
      borderWidth: 1,
      borderColor: accent1,
      borderRadius: 7,
    },
    input1: {
      height: 50,
      backgroundColor: "#fff",
    },
    bordogrigiochiaro: {
      borderWidth: 1,
      borderColor: "#999",
      borderRadius: 7
    },
    surface1: {
      borderWidth: 1,
      borderColor: "#ccc",
      backgroundColor: "#fafafa",
      borderRadius: 7
    },
    bordoBottomGrigio: {
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      borderBottomRadius: 2,
    },
    bordomsblu: {
      borderWidth: 1,
      borderColor: "mediumslateblue",
      borderRadius: 2,
      backgroundColor: "#cceeff",
    },
    btn:{
      padding: 10,
      textAlign:"center"
    },
    giustificato:{
      textAlign:'justify'
    },
    btnprimary:{
      backgroundColor:"#0d6efd",
      borderRadius: 5,
      color:"#fff"
    },
    mx0:{
      marginHorizontal: 0,
    },
    m0:{
      margin: 0,
    },
    me5:{
      marginEnd: 5,
    },
    mt5:{
      marginTop: 5,
    },
    mt50:{
      marginTop: 50,
    },
    mt10:{
      marginTop: 10,
    },
    mt15:{
      marginTop: 15,
    },
    mt25:{
      marginTop: 25,
    },
    my5:{
      marginVertical: 5,
    },
    my10:{
      marginVertical: 10,
    },
    m10:{
      margin: 10,
    },
    px15:{
      paddingHorizontal: 15,
    },
    px5:{
      paddingHorizontal: 5,
    },
    pe5:{
      paddingEnd: 5,
    },
    py10:{
      paddingVertical: 10,
    },
    p10:{
      padding: 10,
    },
    p25:{
      padding: 25,
    },
    p3:{
      padding: 3,
    },
    p5:{
      padding: 5,
    },
    hextra: {
      fontSize: 36, 
      // color: '#6200ee'
      color: '#00a1ae'
    },
    h1: {
      fontSize: 16, 
      color: accent1
      // color: '#6200ee'
      // color: '#00a1ae'
    },
    h2: {
      fontSize: 16
    },
    h3: {
      fontSize: 16,
      fontWeight: "bold",
    },
    h4: {
      fontSize: 16,
    },
    w100: {
      alignSelf: 'stretch',
      width:'100%',
    },
    w50: {
      alignSelf: 'stretch',
      width:'50%',
    },
    w10: {
      width:'10%',
    },
    w15: {
      width:'15%',
    },
    w20: {
      width:'20%',
    },
    w25: {
      width:'25%',
    },
    w32: {
      width:'32%',
    },
    w33: {
      width:'33.33%',
    },
    w2: {
      width:'2%',
    },
    w49: {
      width:'49%',
    },
    w50: {
      width:'50%',
    },
    w60: {
      width:'60%',
    },
    w75: {
      width:'75%',
    },
    w85: {
      width:'85%',
    },
    w90: {
      width:'90%',
    },
    bglightgrey: {
      backgroundColor: 'lightgrey'
    },
    bgverdemare: {
      backgroundColor: '#6200ee'
      // backgroundColor: '#00a1ae'
    },
    centro: {
      alignItems: 'center',
      marginHorizontal:'auto'
    },
    gra: {
      fontWeight:"bold"
    },
    item: {
      backgroundColor: "#f7ead7",
      padding: 20,
      marginVertical: 8
    },
    title: {
      fontSize: 24
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    bianco:{
      color:"#fff"
    },
    textcentro: {
      textAlign:"center",
      justifyContent:"center"
    },
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    },
    surface1: {
      padding: 8,
      alignItems: 'stretch',
      justifyContent: 'space-between',
      borderRadius: 10,
    },
    surface2: {
      padding: 8,
      borderRadius: 10,
    },
    selected: {
      backgroundColor: accent1,
      // backgroundColor: '#6200ee',
      // backgroundColor: '#00a1ae',
    },
    labelselected: {
      color:"#fff"
    },
    unselected: {},
  });

  export {ss}