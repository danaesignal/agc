import React, { PureComponent } from 'react';
import serverHelper from '../../../helpers/serverHelper';

class ServerSelector extends PureComponent{
  generateSelect = () => {
    let serverList = serverHelper.serverListTemplate('na');
    return (
      <select
        id="server"
        onChange={() => {this.props.changeActiveServer(document.querySelector('#server').value)}}
        defaultValue={this.props.activeServer}
        style={{'fontFamily': '"Prompt", sans-serif'}}>
        {serverList.map(server => {
          return (
            <option
              key={server[0]}
              value={server[0]}>
              {server[1]}</option>
          )
        })}
      </select>
    )
  }
  render(){
    return (
      <div>
        {this.generateSelect()}
      </div>
    );
  }
}

export default ServerSelector;