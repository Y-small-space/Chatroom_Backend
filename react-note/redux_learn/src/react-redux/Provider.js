import React from 'react';
import ReactReduxContext from './ReactReduxContext';
export default function({children,store}){
  return (
    <ReactReduxContext.Provider value={{store}}>
        {children}
    </ReactReduxContext.Provider>
  )
}