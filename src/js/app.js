import React from 'react';

class Nav extends React.Component {
  render(){
    return (
      <nav>
        <ul>
          <li>freeCodeCamp</li>
        </ul>
      </nav>
    )
  }
}

class CamperList extends React.Component {
  render(){
    return (
      <tr>
        <td>{this.props.index}</td>
        <td><img src={this.props.data.img} />&nbsp;&nbsp;{this.props.data.username}</td>
        <td>{this.props.data.recent}</td>
        <td>{this.props.data.alltime}</td>
      </tr>
    )
  };
};

class Table extends React.Component {
  render(){
    var rows = [];
    this.props.data.forEach((data, index) => {
      rows.push(<CamperList data={data} key={index+1} index={index+1}/>)
    })
    return(
      <table>
        <caption><p>Leaderboard</p></caption>
        <colgroup span="4"></colgroup>
        <thead>
          <tr>
            <th>#</th>
            <th>Camper Name</th>
            <th onClick={this.props.onClick1} className='link'>{this.props.header1}</th>
            <th onClick={this.props.onClick2} className='link'>{this.props.header2}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}

export default class CL extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      header1: "Points in past 30 days ▼",
      header2: "All Time Points"
    };
  };

  clickToRecent(){
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
    .then( (response) => {
      return response.json() })
        .then( (json) => {
          this.setState({data: json});
        });
      this.setState({
       header1: "Points in past 30 days ▼",
       header2: "All Time Points"
     });
    };

  clickToAllTime(){
    fetch("https://fcctop100.herokuapp.com/api/fccusers/top/alltime")
    .then( (response) => {
      return response.json() })
        .then( (json) => {
          this.setState({data: json});
        });
     this.setState({
       header1: "Points in past 30 days",
       header2: "All Time Points ▼"
     });
   };


  render(){
    return(
      <div>
        <Nav />
        <Table data={this.state.data} onClick1={() => this.clickToRecent()} onClick2={() => this.clickToAllTime()} header1={this.state.header1} header2={this.state.header2}/>
      </div>
    )
  };

  componentDidMount() {
   fetch("https://fcctop100.herokuapp.com/api/fccusers/top/recent")
    .then( (response) => {
      return response.json() })
        .then( (json) => {
          this.setState({data: json});
        });
   };
}
