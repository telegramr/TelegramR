import PropTypes from 'prop-types';

export interface Photo {
  id: number;
  src: string;
  large: string;
}

export const PropsChildren = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.arrayOf([PropTypes.node]),
]);

export const PropsStyle = PropTypes.oneOfType([
  PropTypes.object, // inline style
  PropTypes.number, // style sheet entry
  PropTypes.array,
]);

//
// export default {
//   Children,
//   Style,
// };
