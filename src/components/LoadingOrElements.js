import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';


export const LoadingOrElements = (elements, ready) => {
    if(!ready){
        return (
            <div className="lds-css ng-scope loading-icon">
                <div style={{width:'100%', height:'100%'}} className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
    return (
        <CSSTransitionGroup
            transitionName="mount-animation"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}>
            {elements}
        </CSSTransitionGroup>
    )
};


export default LoadingOrElements;