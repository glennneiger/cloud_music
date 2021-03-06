import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import TabHead from './head'
import * as api from '../../api'
import {getSongSheet} from '../../store/actions'

import DiscussTarget from './discussTarget'
import WonderfulDiscuss from './wonderful'
import Newest from './newest'
import '../../css/discuss.css'

class Discuss extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            con: null,
            newCon: null
        }
    }
    componentDidMount(){
        let id = this.props._discuss_sheet_id,
            type = this.props._discuss_sheet_type
        //热门评论
        api.getHotDiscuss(id, type).then(res => {
            if(res.data.code === 200){
                this.setState({
                    con: res.data
                })
            }
        })
        if(type === 2){
            //最新歌单评论
            api.getSheetDiscuss(id, 10, 1).then(res => {
                if(res.data.code === 200){
                    this.setState({
                        newCon: res.data
                    })
                }
            })
        }else if(type === 0){
            //最新歌单评论
            api.getSongDiscuss(id, 10, 1).then(res => {
                if(res.data.code === 200){
                    this.setState({
                        newCon: res.data
                    })
                }
            })
        }
    }
    render(){
        const _props = this.props
        // console.log(this.props)
        return (
            <React.Fragment>
                {/* 标签 */}
                <TabHead comment={_props._discuss_intro ? _props._discuss_intro.commentCount : (this.state.newCon ? this.state.newCon.total : 0)} />
                {/* 歌单标题及创建者 */}
                <DiscussTarget {..._props} />
                {/* 精彩评论 */}
                <WonderfulDiscuss con={this.state.con}/>
                {/* 最新评论 */}
                <Newest con={this.state.newCon} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        _discuss_sheet_id: state.sheetDiscussReducer.id,
        _discuss_sheet_type: state.sheetDiscussReducer._type,
        _discuss_sheet_intro: state.sheetDiscussReducer.intro,
        _discuss_song_infor: state.songDiscussReducer.infor
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSendSheet: (id) => {
            dispatch(getSongSheet(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discuss)