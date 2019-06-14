import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtDivider, AtModal } from 'taro-ui'
import './index.scss'
import answers from '../../enums/answers';

type MyProps = {}
type MyState = {
  isOpened: boolean,
  answer: string,
  loading: boolean,
  btnDisabled: boolean
}

export default class Index extends Component<MyProps, MyState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '答案之神'
  }

  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      answer: '',
      loading: false,
      btnDisabled: false
    }
    this.getAnswer = this.getAnswer.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  getAnswer(event) {
    this.setState({
      loading: true,
      btnDisabled: true
    });

    const answer = answers[Math.floor(Math.random() * answers.length)];
    const ramdon = Math.floor(Math.random() * 1000);

    setTimeout(() => {
      this.setState({
        isOpened: true,
        answer: answer,
        loading: false,
      });
    }, 500 + ramdon);

    event.preventDefault();
  }

  handleClose() {
    this.setState({
      isOpened: false,
      btnDisabled: false,
    });
  }

  handleCancel() {
    this.handleClose();
  }

  handleConfirm() {
    this.handleClose();
  }

  render() {
    // wx config
    Taro.showShareMenu({
      withShareTicket: true,
    });

    return (
      <View className='index'>
        <View className='manual-container'>
          <View className='title'><Text># 介绍</Text></View>
          <AtDivider />
          <View className='list'><Text>这是一款可以在你陷入麻烦摇摆不定左右为难犹豫不决时给予你帮助的app。</Text></View>
        </View>
        <View className='manual-container'>
          <AtDivider />
          <View className='title'><Text># 使用手册</Text></View>
          <AtDivider />
          <View className='list'><Text>1. 双手捧起手机，贴胸而放。</Text></View>
          <View className='list'><Text>2. 默想你心中的问题。</Text></View>
          <View className='list'><Text>3. 闭上眼睛，默想问题三遍。</Text></View>
          <View className='list'><Text>4. 深呼吸，睁开眼睛点击按钮。</Text></View>
          <View className='list'><Text>5. 希望答案对你的人生有帮助。</Text></View>
        </View>
        <View className='button-container'>
          <AtButton className='button' size='normal' circle type='primary'
            loading={this.state.loading}
            disabled={this.state.btnDisabled}
            onClick={this.getAnswer}
          >请给我答案吧！</AtButton>
        </View>
        <AtModal
          isOpened={this.state.isOpened}
          title={this.state.answer}
          confirmText='我明白了！'
          onClose={this.handleClose}
          onCancel={this.handleCancel}
          onConfirm={this.handleConfirm}
        >
        </AtModal>
      </View >
    )
  }
}
