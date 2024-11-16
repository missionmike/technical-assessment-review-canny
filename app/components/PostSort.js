import './css/_PostSort.css';

import React from 'react';
import { changeSort } from '../actions/sort';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';

const Options = [
  {
    name: 'old',
    render: 'Old',
  },
  {
    name: 'top',
    render: 'Top',
  },
  {
    name: 'new',
    render: 'New',
  },
];

const Selector = ({ hidden, onSelect, sort }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onOpenMenu = () => {
    if (menuOpen) {
      return;
    }

    setMenuOpen(true);
  };

  const onClickOption = (option) => {
    setMenuOpen(false);
    onSelect(option);
  };

  const sorts = Options.map((option) => {
    const className = 'option' + (option.name === sort.sort ? ' selected' : '');
    return (
      <div
        className={className}
        key={option.name}
        onClick={() => onClickOption(option.name)}
      >
        <div className="dot" />
        {option.render}
      </div>
    );
  });

  const option = Options.find((option) => option.name === sort.sort);
  return (
    <div className="selector" onClick={onOpenMenu}>
      <div className="selectedName">{option.render}</div>
      <div className="icon-chevron-down">v</div>
      {menuOpen && (
        <div className="dropdown">
          <div className="sorts">
            <div className="sortHeader">Sort</div>
            {sorts}
          </div>
        </div>
      )}
    </div>
  );
};

const PostSort = ({ sort, changeSort }) => {
  return (
    <div className="postSort">
      <div className="text">Showing</div>
      <Selector onSelect={changeSort} sort={sort} />
      <div className="text">posts</div>
    </div>
  );
};

export default connect(
  ({ sort }) => ({ sort }),
  (dispatch) => ({
    changeSort: (sort) => {
      dispatch(changeSort(sort));
      return dispatch(fetchPosts({ sort }));
    },
  })
)(PostSort);
