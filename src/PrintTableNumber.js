function PrintTableNumber(props){
    function test(){
      console.log("YOU CAN DECLARE A FUNCTION INSIDE A COMPONENT!")
    }
    return <h2 onClick={test}>Below is table {props.tablenumber}</h2>;
  }

export default PrintTableNumber