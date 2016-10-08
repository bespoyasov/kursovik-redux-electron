import React from 'react';


export default class Header extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      course: this.props.course.current
    }
  }


  render() {
    return (
      <header className="header">
        <div className="header-title">Курс $ по ЦБ РФ</div>
        <div className="header-value">
          {this.state.course}<span className="header-halfspace"></span>₽
        </div>
      </header>
    )
  }
}
