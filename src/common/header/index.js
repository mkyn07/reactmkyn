import React ,{ PureComponent }from "react";
import {HeaderWrapper,SearchWrapper,
    Logo,Nav,NavItem,NavSearch,
    SearchInfo,SearchInfoTitle,SearchInfoSwitch,SearchInfoList,SearchInfoItem,
    Addition,Button} from "./style";
import '../../statics/iconhead/iconfont.css';
import {connect} from 'react-redux';
import {CSSTransition} from "react-transition-group";
import {actionCreators}  from './store';
import {Link} from "react-router-dom";
import {actionCreators as loginActionCreators} from '../../pages/login/store';

class Header extends PureComponent{
    getListArea() {
        const {focused,list,page,totalPage,mouseIn,
            handleMouseEnter,handleMouseLeave,handleChangePage} = this.props;
        const jsList = list.toJS()
        const pageList = [];

        if(jsList.length){
            for (let i = ((page-1) * 10); i < page * 10; i++){
            pageList.push(<SearchInfoItem key={jsList[i]}>{jsList[i]}</SearchInfoItem>)
            }
        }



        if (focused || mouseIn) {
            return(
                <SearchInfo onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={() => handleChangePage(page,totalPage,this.spinIcon)}>
                            <i ref={(icon)=>{this.spinIcon = icon }} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else {
            return null;
        }

    }

    render() {
        const {focused,handleInputFocus,handleInputBlur,list,login,logout} = this.props;
        return(
            <HeaderWrapper>
                   <Link to='/'>
                       <Logo />
                   </Link>

                    <Nav>
                        <Link to='/'>
                        <NavItem className='left active'>首页</NavItem>
                        </Link>
                        <NavItem className='left'>下载App</NavItem>
                        {
                            login ? <NavItem onClick={logout} className='right logout' >退出</NavItem> :
                                <Link to='/login'><NavItem className='right'>登录</NavItem></Link>
                        }

                        <NavItem className='right'>
                            <i className="iconfont">&#xe636;</i>
                        </NavItem>

                        <SearchWrapper>
                            <CSSTransition
                                in={focused}
                                timeout={200}
                                classNames='slide'
                            >
                                <NavSearch
                                    className = {focused ? 'focused' : ''}
                                    //聚焦变长
                                    onFocus={() =>handleInputFocus(list)}
                                    //失焦变短
                                    onBlur={handleInputBlur}
                                ></NavSearch>
                            </CSSTransition>
                            <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe623;</i>
                            {this.getListArea()}
                        </SearchWrapper>

                    </Nav>
                    <Addition>
                        <Link to='/write'>
                            <Button className='write'>
                                <i className="iconfont" >&#xe678;</i>
                                写文章
                            </Button>
                        </Link>
                        <Button className='reg'>注册</Button>
                    </Addition>
                </HeaderWrapper>
        )
    }
}


//无状态组件



const mapStateToProps = (state) =>{
    return{
        focused: state.getIn(['header','focused']),
        list: state.getIn(['header','list']),
        page: state.getIn(['header','page']),
        totalPage: state.getIn(['header','totalPage']),
        mouseIn: state.getIn(['header','mouseIn']),
        login: state.getIn(['login','login'])
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        handleInputFocus(list) {
            //这句话等于if size=0，则发送。。。
            (list.size === 0) && dispatch(actionCreators.getList());

            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave());
        },
        handleChangePage(page,totalPage,spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'');
            if (originAngle){
                originAngle = parseInt(originAngle,10);
            }else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate('+(originAngle+360)+'deg)';

            if (page<totalPage){
                dispatch(actionCreators.changePage(page+1));
            }else {
                dispatch(actionCreators.changePage(1));
            }
        },
        logout(){
            dispatch(loginActionCreators.logout())

        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);