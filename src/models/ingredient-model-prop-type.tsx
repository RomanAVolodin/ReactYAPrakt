import PropTypes from 'prop-types';


const ingredientPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    replyTo: PropTypes.number,
    text: PropTypes.string.isRequired
})

export default ingredientPropType;