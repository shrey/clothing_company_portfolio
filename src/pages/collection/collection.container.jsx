import CollectionPage from './collection.component'
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';
import {selectIsCollectionsLoaded} from '../../redux/shop/shop.selector'
import {compose} from 'redux'
const mapStateToProps = createStructuredSelector({
    isLoading: state => !selectIsCollectionsLoaded(state)
})
const CollectionContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);
export default CollectionContainer;