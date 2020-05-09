 import React from 'react'
import  {connect} from 'react-redux'
import {createStructuredSelector } from 'reselect'
import './collections-overview.styles.scss'
import CollectionPreview from '../collection-preview/collection-preview.component'
import {selectCollectionsForPreview} from '../../redux/shop/shop.selector'
const CollectionOverview = ({collections }) =>{
    const categories = [];
    for(var key in collections){
        categories.push(collections[key]);
    }
    
    return(
    <div className =  "collections-overview">
         {
             collections.map(({id,...otherCollectionProps}) => <CollectionPreview key = {id} {...otherCollectionProps}/>)
             
         }
    </div>
)}
const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})
export default connect(mapStateToProps)(CollectionOverview)