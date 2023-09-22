import { useState } from 'react';
import { useDispatch } from 'react-redux';
import cls from 'classnames';

import { getVideosByCategory } from '@store/reducers/videoSlice';

import './_categories-bar.scss';

const keywords = [
  'All',
  'React Js',
  'Angular Js',
  'Astro Js',
  'Svelte',
  'Solid Js',
  'Qwik Js',
  'React Native',
  'use of API',
  'Redux',
  'Music',
  'Algorithm Art ',
  'Guitar',
  'Coding',
  'Cricket',
  'Football',
  'Gatsby',
];

const CategoriesBar = () => {
  const [active, setActive] = useState('All');
  const dispatch = useDispatch();

  const handleClick = (value) => {
    setActive(value);
    dispatch(getVideosByCategory(value));
  };
  return (
    <div className="categories-bar">
      {keywords.map((value, i) => (
        <span key={i} onClick={() => handleClick(value)} className={cls({ active: value === active })}>
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
