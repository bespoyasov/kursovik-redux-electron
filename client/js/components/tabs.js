import React from 'react';


export default class Tabs extends React.Component {

  constructor(props, context) {
    super(props, context);
  }


  render() {
    return(
      <ul className="tabs">
        <li className="tabs-tab is-active">Неделя</li>
        <li className="tabs-tab">Месяц</li>
        <li className="tabs-tab">3 месяца</li>
      </ul>
    )
  }
}
