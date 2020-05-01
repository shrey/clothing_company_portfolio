import React from 'react';
import {Route} from 'react-router-dom'
import CollectionPage from '../collection/collection.component'
import { identifier } from '@babel/types';
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions'
import CollectionOverview from '../../components/collections-overview/collections-overview.component'
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'    
import WithSpinner from '../../components/with-spinner/with-spinner.component'
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
const CollectionOverviewWithSpinner =  WithSpinner(CollectionOverview); 
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component
    {   
        state = {
            loading: true
        }
        unsubscribeFromSnapshot = null;
        componentDidMount(){
            const {updateCollections} = this.props;
            const collectionRef = firestore.collection('collections'); 
            this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            console.log(collectionsMap);
            updateCollections(collectionsMap);
            this.setState({loading: false});
            })
        }
         
        render(){
            const {loading} = this.state;
            const { match } = this.props;  
            return (
                <div className = "shop-page">
            
                <Route exact path = {`${match.path}`} 
                render = {(props) => 
                <CollectionOverviewWithSpinner isLoading = {loading} {...props}/>
                }/>
                <Route path = {`${match.path}/:collectionId`} 
                render = {(props) => 
                <CollectionPageWithSpinner isLoading = {loading} {...props}/>
                }/>
            
                </div>
            )
        }   
    
    }
        
    const mapDispatchToProps = dispatch =>({
        updateCollections : (collectionsMap) => dispatch(updateCollections(collectionsMap))
    })

export default connect(null,mapDispatchToProps)(ShopPage)