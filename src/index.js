import React from 'react';
import ReactDOM from 'react-dom';

var DatePicker = require('react-datepicker');
var DataTable = require('react-data-components').DataTable;	
var moment = require('moment');


var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPoTouch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus7'}
];

var ADSTATUSARRAY=[
	{category: '全部',selected: true, value: 'null'},
	{category: '过期',selected: false, value: '1'},
	{category: '投放中',selected: false, value: '2'},
	{category: '新建',selected: false, value: '3'},
	{category: '即将到期',selected: false, value: '4'}
];

var ADPROJECTARRAY=[
	{category: '全部',selected: true, value: 'null'},
	{category: 'AP门户',selected: false, value: '1'},
	{category: 'AP咨询',selected: false, value: '2'},
	{category: 'AP游戏',selected: false, value: '3'},
	{category: 'AP用户中心',selected: false, value: '4'}
];

var columns = [
  { title: 'Name', prop: 'name'  },
  { title: 'City', prop: 'city' },
  { title: 'Address', prop: 'address' },
  { title: 'Phone', prop: 'phone' }
];

var data = [
  { name: 'name value', city: 'city value', address: 'address value', phone: 'phone value' }
  // It also supports arrays
  // [ 'name value', 'city value', 'address value', 'phone value' ]
];


var FilterSelect = React.createClass({
	handleSelectChange: function(event) {
		this.props.callbackParent(event.target.value);		
	},
	render: function() {
	var options = [];
	this.props.myoptions.forEach(function(myOption) {
	   options.push(<option value={myOption.value} selected={myOption.selected}>{myOption.category}</option>);
	});
	return (
		<div class="form-group">
			<label class="col-xs-12 col-sm-3 control-label"></label>
			<div class="col-xs-12 col-sm-5">
				<span class="block input-icon input-icon-right" > 
					<select name="adSatus" class="number" onChange={this.handleSelectChange}>
					{options}
					</select>
				</span>
			</div>
		</div>
	);
	}
});


var TableFormBox = React.createClass({
  getInitialState: function() {
    return {
	adname: '',
	adStatus:'',
	adProject:'',
	startDate:moment(),
	endDate:moment()
	};
  },	
  handleAdNameChange: function(e) {
    this.setState({adname: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
  },
  onSelectChangeStatus:function(myvalue) {
	  this.setState({adStatus: myvalue});
  },
  onSelectChangeProject:function(myvalue) {
	  this.setState({adProject: myvalue});
  },
  handleChangeStart:function(seldate) {
	  this.setState({startDate: seldate});
  },
  handleChangeEnd:function(seldate) {
	  this.setState({endDate: seldate});
  },
  render: function() {
    return (
    <form class="form-horizontal form-addGame" onSubmit={this.handleSubmit}>
		<div class="form-group">
			<label class="col-xs-12 col-sm-3 control-label">广告名称</label>
			<div class="col-xs-12 col-sm-5">
				<span class="block input-icon input-icon-right"> 
				<input type="text" placeholder="ad name" value={this.state.adname} onChange={this.handleAdNameChange}/>
				</span>
			</div>
		</div>
		<FilterSelect myoptions={ADSTATUSARRAY} filtername="广告状态" callbackParent={this.onSelectChangeStatus}/>{this.state.adStatus}
		<FilterSelect myoptions={ADPROJECTARRAY} filtername="所属项目" callbackParent={this.onSelectChangeProject}/>{this.state.adProject}
		广告开始时间: <DatePicker dateFormat="YYYY-MM-DD" selected={this.state.startDate} startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleChangeStart} />
        广告结束时间: <DatePicker dateFormat="YYYY-MM-DD" selected={this.state.endDate} startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleChangeEnd} />
	</form>
    );
  }		
});

var FullTable = React.createClass({
  render: function() {
    return (
      <div class="main-content">
        <TableFormBox />
		<DataTable
			className="container"
			keys={[ 'name', 'address' ]}
			columns={columns}
			initialData={data}
			initialPageLength={5}
			initialSortBy={{ prop: 'city', order: 'descending' }}
			pageLengthOptions={[ 5, 20, 50 ]}
		/>
      </div>
    );
  }	
});

ReactDOM.render(
  <FullTable />,
  document.getElementById('root')
);
