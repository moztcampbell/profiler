/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @flow
import * as React from 'react';
import classNames from 'classnames';
import IdleSearchField from './IdleSearchField';

import './PanelSearch.css';

type Props = {|
  +className: string,
  +label: string,
  +title: string,
  +currentSearchString: string,
  +onSearch: string => void,
|};

type State = {| searchFieldFocused: boolean |};

class PanelSearch extends React.PureComponent<Props, State> {
  state = { searchFieldFocused: false };
  _onSearchFieldIdleAfterChange = (value: string) => {
    this.props.onSearch(value);
  };

  _onSearchFieldFocus = () => {
    this.setState({ searchFieldFocused: true });
  };

  _onSearchFieldBlur = () => {
    this.setState(() => ({ searchFieldFocused: false }));
  };

  render() {
    const { label, title, currentSearchString, className } = this.props;
    const { searchFieldFocused } = this.state;
    const showIntroduction =
      searchFieldFocused &&
      currentSearchString &&
      !currentSearchString.includes(',');
    return (
      <div className={classNames('panelSearchField', className)}>
        <label className="panelSearchFieldLabel">
          {label}
          <IdleSearchField
            className="panelSearchFieldInput"
            title={title}
            idlePeriod={200}
            defaultValue={currentSearchString}
            onIdleAfterChange={this._onSearchFieldIdleAfterChange}
            onBlur={this._onSearchFieldBlur}
            onFocus={this._onSearchFieldFocus}
          />
          <div
            className={classNames('panelSearchFieldIntroduction', {
              isHidden: !showIntroduction,
              isDisplayed: showIntroduction,
            })}
          >
            Did you know you can use the comma (,) to search using several
            terms?
          </div>
        </label>
      </div>
    );
  }
}

export default PanelSearch;
