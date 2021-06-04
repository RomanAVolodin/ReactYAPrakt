import PropTypes from 'prop-types';

export interface Order {
  name: string;
  number: string;
  status: 'done' | 'canceled' | 'pending' | string;
  ingredients: string[];
}

export const orderPropType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
});
