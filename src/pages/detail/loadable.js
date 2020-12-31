//异步组件，实现异步加载需求
import React from 'react';
import Loadable from 'react-loadable';


const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading(){
      return <div>loading...</div>
  }
});

export default () => <LoadableComponent />
