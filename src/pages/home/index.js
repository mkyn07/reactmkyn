import React, {PureComponent} from "react";
import { connect } from 'react-redux';
import Topic from "./components/Topic";
import Recommend from "./components/Recommend";
import List from "./components/List";
import Writer from "./components/Writer";
import {HomeWrapper,HomeLeft,HomeRight,BackTop} from "./style";
import { actionCreators} from './store';


//UI组件啥也不干
class Home extends PureComponent {

    handleScrollTop(){
        window.scrollTo(0,0);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll',this.props.changeScrollTopSow);

    }

    render() {
        return(
            <HomeWrapper>
                <HomeLeft>
                    <img className='banner-img'
                         alt=''
                         src="https://upload.jianshu.io/admin_banners/web_images/5010/8e6ff43ffeeadc5deb237a4c1da797b486904373.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540" />
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommend />
                    <Writer />
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null}
            </HomeWrapper>
        )
    }

    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();

    }
    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopSow);
    }
}
//容器组件做逻辑处理
const mapState = (state) => ({
    showScroll: state.getIn(['home','showScroll'])
})
const mapDispatch = (dispatch) => ({

        changeHomeData(){
            dispatch(actionCreators.getHomeInfo());
        },
        changeScrollTopSow(){
            if (document.documentElement.scrollTop > 300){
                dispatch(actionCreators.toggleTopShow(true))
            }else {
                dispatch(actionCreators.toggleTopShow(false))
            }
        }
});
export default connect(mapState, mapDispatch)(Home);