import React from 'react';
import { Link } from 'react-router';
import cssModules from 'react-css-modules';
import Masonry from 'react-masonry-component';
import { Notification } from 'react-notification';
import EventCardContainer from '../EventCard/Container';
import styles from '../../styles/dashboard.css';

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      notificationIsActive: false,
      notificationMessage: '',
    };
  }

  render() {
    return (
      <div styleName="wrapper">
        {/* New Event Icon */}
        <div className="fixed-action-btn" styleName="new-event-icon">
          <Link to="/event/new" className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </Link>
        </div>
        {/* Card Template */}
        {this.props.events.length !== 0 ?
          <Masonry>
            {this.props.events.map(event => (
              <EventCardContainer
                key={event._id}
                event={event}
                removeEventFromDashboard={this.props.removeEventFromDashboard}
              />
            ))}
          </Masonry> :
            this.props.showNoScheduledMessage ?
              <em>
                <h4
                  styleName="no-select"
                  className="card-title center-align white-text"
                >
                  You have no scheduled events yet.
                </h4>
              </em> :
              null
        }
        <Notification
          isActive={this.state.notificationIsActive}
          message={this.state.notificationMessage}
          action="Dismiss"
          title="Error!"
          onDismiss={() => this.setState({ notificationIsActive: false })}
          onClick={() => this.setState({ notificationIsActive: false })}
          activeClassName="notification-bar-is-active"
          dismissAfter={10000}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  events: React.PropTypes.arrayOf(React.PropTypes.object),
  removeEventFromDashboard: React.PropTypes.func,
  showNoScheduledMessage: React.PropTypes.bool,
};

export default cssModules(Dashboard, styles);
