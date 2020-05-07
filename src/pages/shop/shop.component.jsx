import React from 'react';
import {Route} from 'react-router-dom'

import {createStructuredSelector } from 'reselect'
import { identifier } from '@babel/types';
import {connect} from 'react-redux';
import {fetchCollectionsStart} from '../../redux/shop/shop.actions'
   
import {selectIsCollectionFetching,selectIsCollectionsLoaded} from  '../../redux/shop/shop.selector'


import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container'

import CollectionContainer from '../../pages/collection/collection.container';

class ShopPage extends React.Component
    {   
       
        
        componentDidMount(){
           const {fetchCollectionsStart} = this.props

            fetchCollectionsStart(); 
            
        }
         
        render(){
            
            const { match } = this.props;  
            return (
                <div className = "shop-page">
            
                <Route exact path = {`${match.path}`} 
                component = {CollectionsOverviewContainer}
                />
                <Route path = {`${match.path}/:collectionId`} 
                component = {CollectionContainer}
                />
            
                </div>
            )
        }   
    
    }
        
    const mapStateToProps = createStructuredSelector({
        isCollectionFetching: selectIsCollectionFetching,
        isCollectionLoaded: selectIsCollectionsLoaded
    })
    const mapDispatchToProps = dispatch =>({
        fetchCollectionsStart: () => dispatch(fetchCollectionsStart()) 
    })

export default connect(mapStateToProps ,mapDispatchToProps)(ShopPage)