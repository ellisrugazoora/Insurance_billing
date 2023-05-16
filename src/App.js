import './App.css';
import saveAs from 'file-saver';
import logo from './logo.svg'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faCircle as fullcircle } from '@fortawesome/free-solid-svg-icons';
import { faCircle as emptycircle } from '@fortawesome/free-regular-svg-icons';
//import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  color,
  Center,
  Button,
  Input,
  Heading,
  Divider,
  RangeSliderTrack,
  RangeSlider,
  Circle,
  Icon,
  createIcon,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
  Stack
} from '@chakra-ui/react';

import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/table';
import Rating from 'react-rating';

import PrintTableNumber from './PrintTableNumber';
console.log("App.js has been entered successfully!")

const excel = require('exceljs'); 
const workbook = new excel.Workbook(); //create new workbook object called workbook

var sheetvalues1 = [[], [ ,1, 2], [ ,3, 4]];
var sheetvalues2 = [[], [ ,1, 2], [ ,3, 4]];
var sheetvalues3 = [[], [ ,1, 2], [ ,3, 4]];
var sheetvalues = {table1: {matrix: sheetvalues1}, table2: {matrix: sheetvalues2}, output1: {matrix: sheetvalues3}}

var sheet;//declare sheet
var sheetnumber = 0;
var excelfile;//declare excelfile that is going to be read

var col_nums = {table1: sheetvalues.table1.matrix[1].length, table2: sheetvalues.table2.matrix[1].length, output: 2}
console.log("The number of columns: " + sheetvalues.table1.matrix[0].length)
function handlefile(e){ //this function is called when input 'inpt' is changed. Calls variables that are declared
  console.log("The name of the table to update is: " + e.target.id + ". And the name of file is: " + e.target.files[0].name)
  excelfile = e.target.files[0]//obtain the file from the cause of this event instance
  console.log("The name of the file: " + e.target.files[0].name)
  var table_to_upload = e.target.id //This is the key as to which table to write to
  workbook.xlsx.load(excelfile).then(() => {
    //sheet = workbook.getWorksheet('EllisSheet')
    sheet = workbook.worksheets[sheetnumber] //the first sheet
    console.log("This is the sheetnumber: " + sheetnumber)
    //sheet.columns = [{key:"name", header:"nye  _*_nkyakare"}, {key: "age", header: "age"}, {key: "The Lord", header: "Liveth"}];
    console.log(sheet.getSheetValues())
    sheetvalues[table_to_upload].matrix = sheet.getSheetValues()
    //test_col_num = sheet._rows[0]._cells.length;
    col_nums[table_to_upload] = sheet._rows[0]._cells.length
    //test_col_num = sheetvalues[table_to_upload].cols
  })
  /*
  .then(() => {
      console.log(sheet._rows)
      console.log(sheet._rows[0]._cells[0]._value.model.value)
      console.log("The number of rows: ")
      console.log(sheet._rows.length)
      console.log("The number of columns: ")
      console.log(sheet._rows[0]._cells.length)
      console.log("Matrix will be created now")
  }).then(() => {
    workbook.xlsx.writeBuffer().then(function(buffer){
      console.log("Below is the buffer: ")
      console.log(buffer)
    })
  })*/
}


function handlebuf(e){
  console.log("export excel file!")
  workbook.xlsx.writeBuffer().then(function(buffer){
    saveAs(
      new Blob([buffer]), 'export_excel_delete.xlsx'
    )
  })
}
var numbers = [[1, 2], [2, 4]];
var colored_col1a = "nothing";
var colored_col1b = "nothing";
var colored_col2 = "nothing";
function highlight_column(column){
  let col = column.toString()
  console.log("Hello, column: " + column)
  console.log("The number of elements in class : " + document.getElementsByClassName(col)[0].innerHTML)
  let x = document.getElementsByClassName(col)
  let colors = {"red": "green", "green": "", "": "red"}

  if(highlight_column_num !== "nothing"){
    console.log("Colored column is not nothing")
    for (var i = 0; i < document.getElementsByClassName(highlight_column_num).length; i++) {
      document.getElementsByClassName(highlight_column_num)[i].style.backgroundColor = "";
    }
  }
  
  for (var i = 0; i < x.length; i++) {
    x[i].style.backgroundColor = "green";
  }

  if(colors[x[0].style.backgroundColor] === "green"){
    highlight_column_num = col
  }
}
var highlight_column_num = "nothing"
function highlight_chakra_table_column(){
  console.log("Highlight chakra table column!")
  let x = document.getElementsByClassName("convert")
  x[0].style.backgroundColor = ""
  console.log(x[0].innerHTML)
  console.log(x[0].style.backgroundColor)
}

function App() {
  const [sv1, setAge] = useState(sheetvalues1);
  const [sv2, setTable2] = useState(sheetvalues2);
  var inputtable1 = 
  sv1.map((num, row, arr) => 
    <tr key={row} onClick={function(){console.log("Hello, row: " + row)}}>{num.map(nestedmap)}</tr>
  )
  
  var inputtable2 = 
  sv2.map((num, row, arr) => 
  <tr key={row} onClick={function(){console.log("Hello, row: " + row)}}>{num.map(nestedmap2)}</tr>
  )

  function nestedmap(test, testrow){
    let colm = testrow;
    let cname = colm.toString();
    return <td /*onClick={function(){highlight_column(colm)}}*/ className={cname}>{test}</td>
  }

  function nestedmap2(test, testrow){
    let colm = testrow + 200;//Not robust enough, what if there are more than 200 columns in table 1? There will be overlap
    let cname = colm.toString();
    return <td /*onClick={function(){highlight_column(colm)}}*/ className={cname}>{test}</td>
  }

  function nestedmap3(test, testrow){
    let colm = testrow + 300;//Not robust enough, what if there are more than 200 columns in table 1? There will be overlap
    let cname = colm.toString();
    return <td /*onClick={function(){highlight_column(colm)}}*/ className={cname}>{test}</td>
  }

  //var testoutput = 10
  const [sv3, setTestoutput] = useState(sheetvalues3)
  var outputtable1 =
  sv3.map((num, row, arr) => 
  <tr key={row} /*style={{border: 'dashed'}}*/ onClick={function(){console.log("Hello, row: " + row)}}>{num.map(nestedmap3)}</tr>
  )
  function changearray(){
    if(highlight_column_num !== "nothing"){
      let x = document.getElementsByClassName(highlight_column_num)
      for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = "green";
      }
      console.log("clear highlighted column!")
    }
    setAge(numbers => 
      sheetvalues.table1.matrix
    )
  }
  function update_t2(){
    console.log("Refresh the table. clear highlights and set update state")
    console.log(sheetvalues.table2.matrix)
    
    setTable2(nums =>
      sheetvalues.table2.matrix
    )
  }
  function update_and_display_output(){
    /*
    let num_of_rows = sheetvalues.table1.matrix.length;
    let num_of_columns = sheetvalues.table1.matrix[1].length;
    let dummymatrix = [];
    console.log("This is the update and display output: ")
    for (let row = 1; row < num_of_rows; row++) {
      let temp = []
      for (let column = 1; column < num_of_columns; column++) {
        if((sheetvalues.table1.matrix[row][column] !==  undefined)){
          //console.log("NOT UNDEFINED")
          temp[column] = sheetvalues.table1.matrix[row][column] + sheetvalues.table2.matrix[row][column]
        }
        else {
          console.log("UNDEFINED")
        }
      }
      dummymatrix[row] = temp
    }
    console.log(dummymatrix)
    sheetvalues.output1.matrix = dummymatrix;
    */
    ///PATIENT ID PARSING
    let parsecondition = true;
    let col1 = {array: collection_to_array(document.getElementsByClassName(colored_col1a)), start: 0, length: 10};
    let col2 = {array: collection_to_array(document.getElementsByClassName(colored_col1b)), start: 0, length: 10};
    let col3 = {array: collection_to_array(document.getElementsByClassName(colored_col2)), start: 0, length: 10};
    let result_column_position = 1;
    let dummymatrix2 = []
    //let dummymatrix3 = sheetvalues.table1.matrix
    
    if(parsecondition){
      console.log(parsecondition)
      for (let index1 = col1.start; index1 < col1.array.length; index1++) {
        for (let index2 = col2.start; index2 < col2.array.length; index2++) {
          if(col1.array[index1] === col2.array[index2]){
            dummymatrix2[index1] = [col1.array[index1], col3.array[index2]] //OR
            //dummymatrix3[index1].splice(result_column_position, 0, col3.array[index2])
          }
        }
      }
      console.log("Here are the selected columns! \n GREEN: %d, \n BLUE: %d, \n PURPLE: %d",colored_col1a,colored_col2,colored_col1b)
      console.log(col1.array,col2.array,col3.array)
      //console.log(dummymatrix3)
    }
    else {
      console.log(parsecondition)
    }
    function collection_to_array(x){
      let y = []
      for (let index = 0; index < x.length; index++) {
        y[index] = x[index].innerHTML
      }
      return y
    }
    
    console.log("Update the output table based on the input tables")
    if(sheet !== undefined){
      sheet.getRows(1, sheet._rows.length).forEach(function(value, index){ //this loop just assigns the updated matrix to worksheet
        value.values = dummymatrix2[index]; //replace this array with the new matrix
      })
      console.log(sheet.getSheetValues())
    }
    console.log("Print the most updated table to the UI")
    //console.log(sheet.getSheetValues())
    setTestoutput((x) =>
      dummymatrix2
      //sheetvalues.output1.matrix
      //sheet.getSheetValues()
    )
  }

  var color_array = ["green", "green", "orange", "red", "red"]
  const [fullcolor, setFullcolor] = useState("purple")

  function highl_col1a(val){
    console.log(val)
    console.log(val.target)
    let col = val.toString()
    let x = document.getElementsByClassName(col)
    let colors = {"red": "green", "green": "", "": "red"}

    if(colored_col1a !== "nothing"){
      console.log("Colored column is not nothing")
      for (var i = 0; i < document.getElementsByClassName(colored_col1a).length; i++) {
        document.getElementsByClassName(colored_col1a)[i].style.backgroundColor = "";
      }
    }

    for (var i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "green";
      colored_col1a = col
    }
  }
  function highl_col1b(val){
    console.log(val)
    console.log(val.target)
    let j = Number(val) + 200
    let col = j.toString();
    let x = document.getElementsByClassName(col)
    let colors = {"red": "green", "green": "", "": "red"}

    if(colored_col1b !== "nothing"){
      console.log("Colored column is not nothing")
      for (var i = 0; i < document.getElementsByClassName(colored_col1b).length; i++) {
        document.getElementsByClassName(colored_col1b)[i].style.backgroundColor = "";
      }
    }

    for (var i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "green";
      colored_col1b = col
    }
  }
  function highl_col2(val){
    console.log(Number(val) + 200)
    let j = Number(val) + 200
    let col = j.toString()
    let x = document.getElementsByClassName(col)
    let colors = {"red": "green", "green": "", "": "red"}
    
    if(colored_col2 !== "nothing"){
      console.log("Colored column is not nothing")
      for (var i = 0; i < document.getElementsByClassName(colored_col2).length; i++) {
        document.getElementsByClassName(colored_col2)[i].style.backgroundColor = "";
      }
    }

    for (var i = 0; i < x.length; i++) {
      x[i].style.backgroundColor = "blue";
      colored_col2 = col
    }
    
  }//Test commit
  function initialize_highlight(val){
    console.log("INITIALIZE HIGHLIGHTED COLUMN")
  }
  return (
    <ChakraProvider>
      <div className="App" id='div1'>
      <Heading>Billing</Heading>   
       
      <Center>
      Sheet number:
      <NumberInput defaultValue={0} min={0} max={6} width='10%' onChange={function(value){sheetnumber = value; console.log(value)}} onLoad={initialize_highlight} id='green'>
        <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
      </NumberInput>
      </Center>
      <Center>
      Column1:
      <NumberInput defaultValue={1} min={1} max={col_nums.table1} width='10%' onChange={highl_col1a} onLoad={initialize_highlight} id='0'>
        <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
      </NumberInput>
      </Center>
      <Center>
      Column2:
      <NumberInput defaultValue={1} min={1} max={col_nums.table1} width='10%' onChange={highl_col1b} id='purple'>
        <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
      </NumberInput>
      </Center>
      <Center>
      Column3:
      <NumberInput defaultValue={1} min={1} max={col_nums.table2} width='10%' onChange={highl_col2} onLoad={initialize_highlight} id='200'>
        <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
      </NumberInput>
      </Center>

        <Box className='Box1'>
          <PrintTableNumber tablenumber="one"/>
          <Title />
          <input type="file" id='table1' onChange={handlefile}/>
          <Center>
          <Box minWidth='10%' maxHeight='500px' overflow='scroll'>
              <TableContainer maxWidth="100%" minWidth="10%">
                <Table variant="striped" colorScheme="twitter" size="sm" id='t1' className='t1' style={{border: '1px outset'}}/*style={{border: '1px solid rounded', borderSpacing: '0px', borderCollapse: 'collapse'}}*/>
                  <Tbody>
                    {inputtable1}
                  </Tbody>
                </Table>
              </TableContainer>
          </Box>
          </Center>
          <Button onClick={changearray}>Update table 1</Button>
        </Box>
        
        <Box>
          <PrintTableNumber tablenumber="two"/>
          <input type='file' id='table2' onChange={handlefile} ></input>
          <Center>
          <Box minWidth='10%' maxHeight='500px' overflow='scroll'>
            <TableContainer maxWidth="100%" minWidth="10%">
              <Table variant="striped" colorScheme="twitter" size="sm" className='t2' id='t2' style={{border: '1px outset'}}>
                  <Tbody>
                    {inputtable2}
                  </Tbody>
                </Table>
            </TableContainer>
          </Box>
          </Center>
          <Button onClick={update_t2}>Update table 2</Button>
        </Box>

        <Box>
            <PrintTableNumber tablenumber="three" />
            <Center>
            <Box minWidth='10%' maxHeight='500px' overflow='scroll'>
              <TableContainer maxWidth="100%" minWidth="10%">
                <Table variant="striped" id='outputtable' className='t3'  colorScheme="twitter" size="sm" style={{border: '1px outset'}}>
                  <Tbody>
                    {outputtable1}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            </Center>
            
        </Box>

        <Center><Button onClick={update_and_display_output}>Refresh and display output table</Button></Center>
        <Center><Button className='yup' onClick={handlebuf}>Export excel file</Button></Center>
          
    </div> 
    </ChakraProvider>
  );
}


/*
function PrintTableNumber(props){
  function test(){
    console.log("YOU CAN DECLARE A FUNCTION INSIDE A COMPONENT!")
  }
  return <h2 onClick={test}>Below is table {props.tablenumber}</h2>;
}
*/

class Title extends React.Component {
  render() {
    return <h2>This is the section of both tables</h2>;
  }
}
export default App;


console.log("App.js has been read successfully!")

/*Reusable components
- Saving(location, content)
- Dynamic Table components (contents, dimensions)
- Interactivity components
*/