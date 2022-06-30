import React from "react";

import jsonObj from "../../utils/ringSize.json";


export default class RingSizeConverter extends React.Component {
    state = {
        optionsStateTo: "cm",
        optionsStateFrom: "US",
        ringSizeNumFrom: "H",
        ringSizeNumTo: "",
    };

    onOptionsStateTo = (event) => {
        this.setState({optionsStateTo: event.target.value});
    }

    onOptionsStateFrom = (event) => {
        this.setState({optionsStateFrom: event.target.value});
    }

    handleChange = (event) =>{
        this.setState({
            ringSizeNumFrom: event.target.value
        });
    }

    convert = () => {
        let arr = jsonObj;
        let indxObj = 0;
        let i =0;
        arr.forEach((item)=>{
            if(item[this.state.optionsStateFrom] == this.state.ringSizeNumFrom)
                indxObj = i;
                i++;
            }
        );
        indxObj = arr[indxObj][this.state.optionsStateTo];
        this.setState({
            ringSizeNumTo: indxObj
        });
        return indxObj;
    };

    render() {
        const ringSizeArray = jsonObj.map((item, index) =>{
            return (
              (item[this.state.optionsStateFrom] != "-" && item[this.state.optionsStateFrom] != " ") ? <option value={item[this.state.optionsStateFrom]} key={`size ${index}`}>{item[this.state.optionsStateFrom]}</option>: false
            )
            
          });
      
        return (
            <div className="block_size_ring_wrapper">
              <h2>Ring Size Converter</h2>
              <form>
                <div>
                  <div className="ringSize_label">from:</div> 
                  <select className="beauty_select_list" value={this.state.optionsStateFrom} onChange={this.onOptionsStateFrom}>
                    <option value="US">US</option>
                    <option value="UK">UK</option>
                    <option value="Japan">Japan</option>
                    <option value="Spain">Spain</option>
                    <option value="cm">cm</option>
                  </select>
                </div>

                <div>
                  <div className="ringSize_label">size:</div>
                  <select className="beauty_select_list" value={this.state.ringSizeNumFrom} onChange={this.handleChange}>        
                  {ringSizeArray}
                  </select>
                </div>

                <div>
                  <div className="ringSize_label">to:</div> 
                    <div> 
                      <select className="beauty_select_list" value={this.state.optionsStateTo} onChange={this.onOptionsStateTo}>
                          <option value="US">US</option>
                          <option value="UK">UK</option>
                          <option value="Japan">Japan</option>
                          <option value="Spain">Spain</option>
                          <option value="cm">cm</option>
                      </select>
                    </div>
                </div>
              </form>
              <div>
                <button onClick={this.convert} className="default-btn default-btn--bigger beauty_select_btn">convert</button><br/>
                <input placeholder="your size is..." type="text" value={this.state.ringSizeNumTo} className="beauty_select_list_output" />
              </div>
            </div>
        )
    }
}