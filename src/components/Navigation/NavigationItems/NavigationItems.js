import React from 'react';

import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';
const navigationItems = (props) => (
    <ul className={classes.NavigationItems} >
        <NavigationItem link="/" exact >FlowersValley</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>

        <NavigationItem link="/gallery">Gallery</NavigationItem>

    </ul>
);

export default navigationItems;