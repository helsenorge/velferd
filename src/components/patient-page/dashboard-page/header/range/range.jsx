import React, { PropTypes, Component } from 'react';
import './range.scss';
import Icon from '../../../../icon/icon.jsx';
import pil from '../../../../../../svg/pil-venstre.svg';
import Month from './month/month.jsx';
import classNames from 'classnames';

class Range extends Component {
  constructor(props) {
    super(props);
    this.scrollListener = this.scrollListener.bind(this);
    this.addPlaceholder = this.addPlaceholder.bind(this);
    this.removePlaceholder = this.removePlaceholder.bind(this);
    this.state = { sticky: false };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  addPlaceholder() {
    // get height of range element
    const height = this.refs.range.offsetHeight;
    // add placeholder element to keep the height in DOM
    const placeholder = document.createElement('div');
    placeholder.style.height = `${height}px`;
    placeholder.style.width = '100%';
    // store placeholder so it can be removed later
    this.setState({ placeholder });
    // insert placeholder
    this.refs.range.parentNode.insertBefore(this.state.placeholder, this.refs.range);
  }

  removePlaceholder() {
    this.state.placeholder.remove();
  }

  scrollListener() {
    if (window.scrollY > this.refs.range.offsetTop && !this.state.sticky) {
      this.setState({ sticky: true, offsetTop: this.refs.range.offsetTop });
      this.addPlaceholder();
      this.refs.range.classList.add('range--sticky');
    }
    else if (window.scrollY < this.state.offsetTop && this.state.sticky) {
      this.refs.range.classList.remove('range--sticky');
      this.removePlaceholder();
      this.setState({ sticky: false });
    }
  }

  render() {
    const {
      handleBackClick,
      handleForwardClick,
      handleDateClick,
      fromDate,
      toDate,
      activeRange,
    } = this.props;

    const to = new Date(toDate.getTime());
    to.setDate(to.getDate() - 1);

    const months = [];
    for (let d = new Date(fromDate);
      d.getTime() < toDate.getTime(); d.setDate(d.getDate() + 1)) {
      if (months.indexOf(d.getMonth()) < 0) {
        months.push(d.getMonth());
      }
    }

    const rangeClasses = classNames('range__months', {
      'range__months--borders': activeRange >= 90,
    });
    return (
      <nav className="range" ref="range">
        <div className="range__wrapper">
          <div className="range__controls">
            <button
              className="range__button range__button--rev"
              onClick={() => handleBackClick()}
            >
              <Icon className="range__arrow" glyph={pil} width={51} height={51} />
              <span className="range__text--rev">Eldre</span>
            </button>
          </div>
          <div className={rangeClasses}>
            {months.map((month) =>
              <Month
                key={month}
                month={month}
                activeRange={activeRange}
                fromDate={fromDate}
                toDate={toDate}
                handleDateClick={handleDateClick}
              />
            )}
          </div>
          <div className="range__controls">
            <button
              className="range__button range__button--fwd"
              onClick={() => handleForwardClick()}
            >
              <span className="range__text--fwd">Nyere</span>
              <Icon className="range__arrow range__arrow--fwd" glyph={pil} width={51} height={51} />
            </button>
          </div>
        </div>
      </nav>
      );
  }
}

Range.propTypes = {
  handleForwardClick: React.PropTypes.func.isRequired,
  handleBackClick: React.PropTypes.func.isRequired,
  handleDateClick: PropTypes.func.isRequired,
  fromDate: PropTypes.instanceOf(Date).isRequired,
  toDate: PropTypes.instanceOf(Date).isRequired,
  selectedDate: PropTypes.instanceOf(Date),
  activeRange: PropTypes.number.isRequired,
};

export default Range;
